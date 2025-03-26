export default {
    name: 'ButtonAdder',
    template: `
      <button @click="handleClick" class="btn-water" ontouchstart="">
        <img class="img-glass" src="assets/glass-of-water.png" alt="Glass of water" :style="{ transform: 'scale(' + value / 1000 + ')' }">
        <div class="fs-1 fw-bold">+{{ value }} ml</div>
      </button>
    `,
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    emits: ['add'],
    data() {
      return {
        emojis: []
      };
    },
    methods: {
      handleClick() {
        // Emit click event
        this.$emit('add', this.value);
  
        // Generate love emojis
        // for (let i = 0; i < 10; i++) {
        //   const randomAngle = Math.random() * 360;
        //   const randomDistance = Math.random() * 100 + 50;
        //   const duration = Math.random() * 1 + 0.5;
  
        //   this.emojis.push({
        //     style: {
        //       transform: `translate(-50%, -50%) rotate(${randomAngle}deg) translate(${randomDistance}px)` ,
        //       opacity: 1,
        //       transition: `all ${duration}s ease-out`
        //     }
        //   });
        // }
  
        // // Fade out after animation
        // setTimeout(() => {
        //   this.emojis = [];
        // }, 1000);
      }
    }
  };
  