import WaterIndicator from "./WaterIndicator.js";
import ButtonAdder from "./ButtonAdder.js";
import StreakBar from "./StreakBar.js";
import FlashOverlay from "./FlashOverlay.js";

const rewards = {
    "brumik": {
        "text": "BEBE BRUMÍK!",
        "image_url": "brumik.jpg"
    }
}

const day_done_overlay = {
    "text": "Vendulka pije! Ráďa je šťastný! 🥰",
}

const day_failed_overlay = { 
    "text": "Vendulka málo pije a Ráďa se o ni bojí 😢 Zítra pij víc miláčku, prosím.",
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
        streak_current_days: 3,

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
    },

    methods: {
        load_data() {
            this.records = JSON.parse(localStorage.getItem('records')) || []
        },

        save_data() {
            const json_str = JSON.stringify(this.records);
            localStorage.setItem('records', json_str);
        },

        flash(message) {
            this.flash_message = message;
            setTimeout(() => {
                this.flash_message = null;
            }, 2000);
        },

        addWater(amount) {
            // console.log(amount)
            let completedDay = this.current_liters + amount >= this.target_liters;
            this.current_liters += amount;

            if (completedDay) {
                this.dailyGoalCompleted();
            }
            else {
                this.flash("Šikulka moje 🥰")
            }
        },

        dailyGoalCompleted() {
            this.overlay = day_done_overlay;
        },

        consumation_for_date(date) {
            return this.records
                .find(r => r.date === date)
                .reduce((acc, r) => acc + r.liters, 0);
        }

    }


   
  }