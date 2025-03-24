export default {
    name: 'ButtonAdder',
    template: `
      <button @click="handleClick" class="btn btn-primary mx-3">
        +{{ value }} ml
        <div v-for="(emoji, index) in emojis" :key="index" class="absolute text-3xl" :style="emoji.style">
          💕
        </div>
      </button>
    `,
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        emojis: []
      };
    },
    methods: {
      handleClick() {
        // Emit click event
        this.$emit('click', this.value);
  
        // Generate love emojis
        for (let i = 0; i < 10; i++) {
          const randomAngle = Math.random() * 360;
          const randomDistance = Math.random() * 100 + 50;
          const duration = Math.random() * 1 + 0.5;
  
          this.emojis.push({
            style: {
              transform: `translate(-50%, -50%) rotate(${randomAngle}deg) translate(${randomDistance}px)` ,
              opacity: 1,
              transition: `all ${duration}s ease-out`
            }
          });
        }
  
        // Fade out after animation
        setTimeout(() => {
          this.emojis = [];
        }, 1000);
      }
    }
  };
  