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

    template: `
        <water-indicator :current="current_liters" :target="target_liters" class="mt-5"></water-indicator>

        <div class="flash-message-container">
            <Transition>
            <div v-if="flash_message" class="flash-message">{{ flash_message }}</div>
            </Transition>
        </div>

        <div class="mt-5 d-flex justify-content-around">
            <button-adder @add="addWater" :value="100"></button-adder>
            <button-adder @add="addWater" :value="300"></button-adder>
            <button-adder @add="addWater" :value="500"></button-adder>
        </div>

        <div class="vertical-spacer"></div>

        <div class="streak-container">
            <streak-bar :total_parts="streak_target_days" :completed_parts="streak_current_days"></streak-bar>
        </div>

        <Transition>
            <flash-overlay v-if="overlay" @done="closeOverlay" :text="overlay.text" :image_url="overlay.image_url" :emoticon="overlay.emoticon"></flash-overlay>
        </Transition>
        `,

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

                if (this.consumationForDate(lastDay) < this.target_liters) {
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
                .filter(r => {
                    console.log(r.date.toDateString(), date.toDateString())
                    return r.date.toDateString() === date.toDateString()
                } )
                .reduce((acc, r) => acc + r.amount, 0);
            console.log(cons);
            return cons;
        },

        streakForDate(date) {
            let streak = (this.consumationForDate(date) >= this.target_liters) ? 1 : 0;
            let current = date;
            current.setDate(current.getDate() - 1);

            while (this.consumationForDate(current) >= this.target_liters) {
                streak++;
                current.setDate(current.getDate() - 1);
            }

            return streak % this.streak_target_days;
        }

    }


   
  }