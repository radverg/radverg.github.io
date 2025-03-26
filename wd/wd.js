import WaterIndicator from "./WaterIndicator.js";
import ButtonAdder from "./ButtonAdder.js";
import StreakBar from "./StreakBar.js";
import FlashOverlay from "./FlashOverlay.js";

const rewards = {
    "brumik": {
        "text": "BEBE BRUMÍK!",
        "image_url": "assets/brumik.jpg",
        "emoticon": "🥳"
    }
}

const current_reward = rewards.brumik;

const day_done_overlay = {
    "text": "Vendulka pije! Ráďa je šťastný! 🥰",
}

const day_failed_overlay = { 
    "text": "Vendulka málo pije a Ráďa se o ni bojí 😢 Dnes pij víc miláčku, prosím.",
    "emoticon": "😢"
}


export default {
    data() {
      return {
        records: [],

        current_date: new Date(),
        current_liters: 0,
        target_liters: 2000,

        flash_message: null,

        streak_target_days: 7,
        streak_current_days: 0,

        last_use: null,

        overlay: null

      }
    },

    components: {
        'water-indicator': WaterIndicator,
        'button-adder': ButtonAdder,
        'streak-bar': StreakBar,
        'flash-overlay': FlashOverlay
    },

    created() {
        this.load_data();
        this.current_liters = this.consumationForDate(this.current_date);
        this.streak_current_days = this.streakForDate(this.current_date);
    },

    mounted() {
        this.checkLastUse();
    },

    methods: {
        load_data() {
            this.records = JSON.parse(localStorage.getItem('records')) || []
            // Convert dates to date objects
            this.records.forEach(r => r.date = new Date(r.date));
            let lastUse = localStorage.getItem('last_use');
            this.last_use = lastUse ? new Date(lastUse) : new Date();
        },

        save_data() {
            const json_str = JSON.stringify(this.records);
            localStorage.setItem('records', json_str);
            localStorage.setItem('last_use', this.last_use.toISOString());
        },

        flash(message) {
            this.flash_message = message;
            setTimeout(() => {
                this.flash_message = null;
            }, 2000);
        },

        closeOverlay() {
            this.overlay = null;
        },

        checkLastUse() {

            // Do we have new date? 
            if (this.last_use.toDateString() !== (new Date()).toDateString()) {
                // Last day failed?
                let lastDay = new Date(this.last_use);
                lastDay.setDate(lastDay.getDate() - 1);

                if (this.streakForDate(lastDay) < 1) {
                    // Failed, show overlay
                    this.overlay = day_failed_overlay;
                }
            }

            this.last_use = new Date();
            this.save_data();
        },


        addWater(amount) {
            // console.log(amount)
            let wasCompleted = this.current_liters >= this.target_liters;
            this.current_liters += amount;
            let isCompleted = this.current_liters >= this.target_liters;
            this.records.unshift({
                date: (new Date()).toISOString(),
                amount: amount
            });

            if (!wasCompleted && isCompleted) {
                this.streak_current_days++;
                if (this.streak_current_days == this.streak_target_days) {
                    this.streakCompleted();
                } else {
                    this.dailyGoalCompleted();
                }
            }
            else {
                this.flash("Šikulka moje 🥰")
            }

            this.save_data();
        },

        dropLastRecord() {
            this.records.pop();
            this.save_data();
        },

        dailyGoalCompleted() {
            this.overlay = day_done_overlay;
        },

        streakCompleted() {
            this.overlay = current_reward;
        },

        consumationForDate(date) {
            const cons = this.records
                .filter(r => r.date.toDateString() === date.toDateString())
                .reduce((acc, r) => acc + r.amount, 0);
            console.log(cons);
            return cons;
        },

        streakForDate(date) {
            let streak = 0;
            let current = date;
            while (true) {
                if (this.consumationForDate(current) >= this.target_liters) {
                    streak++;
                }
                else {
                    break;
                }
                current.setDate(current.getDate() - 1);
            }
            return streak % this.streak_target_days;
        }

    }


   
  }