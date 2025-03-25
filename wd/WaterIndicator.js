export default {
    props: {
      current: {
        type: Number,
        required: true
      },
      target: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        animatedCurrent: this.current
      };
    },
    watch: {
      current(newVal) {
        this.animateValue(newVal);
      }
    },
    computed: {
      percentage() {
        return (this.animatedCurrent / this.target) * 100;
      },
      strokeDasharray() {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        return `${(this.percentage / 100) * circumference} ${circumference}`;
      }
    },
    methods: {
      animateValue(newVal) {
        const duration = 800;
        const frameRate = 60;
        const totalFrames = Math.round((duration / 1000) * frameRate);
        const start = this.animatedCurrent;
        const change = newVal - start;
        let currentFrame = 0;
  
        const animate = () => {
          currentFrame++;
          const progress = currentFrame / totalFrames;
          this.animatedCurrent = start + change * progress;
  
          if (currentFrame < totalFrames) {
            requestAnimationFrame(animate);
          } else {
            this.animatedCurrent = newVal;
          }
        };
        animate();
      }
    },
    template: `
      <div class="flex items-center justify-center">
        <svg width="250" height="250" viewBox="0 0 100 100" class="relative">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            stroke-width="10"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            :stroke-dasharray="strokeDasharray"
            stroke="#3b82f6"
            stroke-width="10"
            transform="rotate(-90 50 50)"
          />
          <text
            x="50%"
            y="40%"
            text-anchor="middle"
            dominant-baseline="central"
            class="font-semibold text-xl"
          >
            {{ animatedCurrent.toFixed(0) }} ml
          </text>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="central"
            class="text-sm text-gray-500"
          >
            {{ percentage.toFixed(1) }}%
          </text>
        </svg>
      </div>
    `
  };
  