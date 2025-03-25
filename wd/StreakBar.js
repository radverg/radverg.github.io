export default {
    props: {
      total_parts: {
        type: Number,
        required: true
      },
      completed_parts: {
        type: Number,
        required: true
      }
    },
    template: `
      <div class="d-flex align-items-center m-4">
        <div class="progress position-relative flex-grow-1 rounded-pill" style="height: 24px;">
          <div 
            class="progress-bar bg-primary" 
            role="progressbar" 
            :style="{ width: (completed_parts / total_parts) * 100 + '%' }">
          </div>
          <div class="position-absolute start-0 w-100 h-100 d-flex" style="pointer-events: none; top: 0px;">
            <div 
              v-for="n in total_parts" 
              :key="n" 
              class="border-end border-2  flex-grow-1">
            </div>
          </div>
        </div>
        <img src="/wd/assets/gift.png" alt="Gift" class="gift-image">
      </div>
    `
  };
  