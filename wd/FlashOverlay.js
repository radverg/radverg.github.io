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
        default: '❤️'
      }
    },
    data() {
      return {
        hearts: []
      };
    },
    mounted() {
      this.spawnHearts();
    },
    methods: {
      spawnHearts() {
        setInterval(() => {
          const id = Date.now();
          this.hearts.push({
            id,
            left: Math.random() * 100,
            top: Math.random() * 100,
          });
          setTimeout(() => {
            this.hearts = this.hearts.filter(heart => heart.id !== id);
          }, 3000);
        }, 300);
      }
    },
    template: `
      <div class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
        <div class="bg-white p-4 rounded-3 shadow-lg text-center position-relative">
          <img :src="image_url" alt="Image" class="rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;" />
          <p class="h4 fw-semibold">{{ text }}</p>
        </div>

        <Transform v-for="heart in hearts" :key="heart.id">
            <div :style="{ left: heart.left + '%', top: heart.top + '%' }" class="position-absolute fs-1">{{ emoticon }}</div>
        </Transform>
      </div>
    `
  };
  