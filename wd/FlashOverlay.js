export default {
    props: {
      text: {
        type: String,
        required: true
      },
      image_url: {
        type: String,
        required: false
      },
      emoticon: {
        type: String,
        default: '🥰'
      },
      duration: {
        type: Number,
        default: 300000
      }
    },
    data() {
      return {
        hearts: []
      };
    },
    emits: ['done'],
    mounted() {
      this.spawnHearts();
      setTimeout(() => {
        this.$emit('done');
      }, this.duration);
    },
    methods: {
      spawnHearts() {
        setInterval(() => {
          const id = Date.now();
          this.hearts.push({
            id,
            left: Math.random() * 100,
            top: Math.random() * 100,
            fontSize: Math.round(Math.random() * 70 + 30)
          });
          setTimeout(() => {
            this.hearts = this.hearts.filter(heart => heart.id !== id);
          }, 3000);
        }, 300);
      }
    },
    template: `
      <div class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" @click="$emit('done')">
        <TransitionGroup>
            <div v-for="heart in hearts" :key="heart.id" :style="{ left: heart.left + '%', top: heart.top + '%', fontSize: heart.fontSize + 'px' }" class="position-absolute">{{ emoticon }}</div>
        </TransitionGroup>
        
        <div class="bg-white p-4 m-3 rounded-3 shadow-lg text-center position-relative">
          <img v-if="image_url" :src="image_url" alt="Image" class="rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;" />
          <p class="h1 fw-semibold">{{ text }}</p>
        </div>

      </div>
    `
  };
  