import Vue from 'vue';
import Router from 'vue-router';
import Pixels from '@/components/Pixels';

Vue.use(Router);

const store = {
  debug: true,
  state: {
    drawings: [],
  },
  loadDrawings() {
    this.state.drawings = JSON.parse(localStorage.getItem('drawings'));
    if (this.state.drawings === null || typeof this.state.drawings === 'undefined') {
      this.state.drawings = [];
    }
  },
  loadDrawing(title) {
    if (this.state.drawings.length > 0) {
      for (let i = 0; i <= this.state.drawings.length; i += 1) {
        if (this.state.drawings[i].title === title) {
          return this.state.drawings[i].cells;
        }
      }
    }
    return null;
  },
  saveDrawing(title, cells) {
    let found = false;
    if (this.state.drawings.length > 0) {
      for (let i = 0; i <= this.state.drawings.length; i += 1) {
        if (this.state.drawings[i].title === title) {
          this.state.drawings[i].cells = cells;
          found = true;
        }
      }
    }

    if (!found) {
      this.state.drawings.push({ title, cells });
    }

    localStorage.setItem('drawings', JSON.stringify(this.state.drawings));
  },
};

store.loadDrawings();

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pixels',
      component: Pixels,
      props: { state: store },
    },
  ],
});
