import WaterIndicator from "./WaterIndicator.js";
import ButtonAdder from "./ButtonAdder.js";

export default {
    data() {
      return {
        records: [],

        current_date: new Date(),
        current_liters: 5,
        target_liters: 2000,

      }
    },

    components: {
        'water-indicator': WaterIndicator,
        'button-adder': ButtonAdder
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

        addWater(amount) {
            this.current_liters += amount;
        },

        consumation_for_date(date) {
            return this.records
                .find(r => r.date === date)
                .reduce((acc, r) => acc + r.liters, 0);
        }

    }


   
  }