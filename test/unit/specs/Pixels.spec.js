import Vue from 'vue';
import Pixels from '@/components/Pixels';

describe('Pixels.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Pixels);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('div.grid').length)
      .to.equal(1);
  });
});
