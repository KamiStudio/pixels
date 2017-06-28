<template>
  <div class="interface">
    <div class="column">
      <grid v-bind:cells="cells" v-bind:color="color" v-bind:columns="columns" v-bind:rows="rows" v-bind:width="cellWidth"></grid>
    </div>
    <div class="column colors">
      <p>
        <input v-model="title" placeholder="Your Drawing's Name!"></input>
        <a href="#" v-on:click="handleSave" class="waves-effect waves-light btn" v-bind:class="{ disabled: !title }">Save</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#" v-on:click="handleNew" class="waves-effect waves-light btn">New</a>
      </p>
      <color-picker v-model="color" ></color-picker>
      <h3>Saved Drawings</h3>
      <ul id="save-list">
        <li v-for="drawing in state.state.drawings" v-bind:key="drawing.title">
          <a href="#" v-on:click="handleLoad(drawing.title, $event)">{{ drawing.title }}</a>
        </li>
      </ul>
  </li>
</ul>
    </div>
  </div>
</template>

<script>
import { Swatches } from 'vue-color';

import Grid from '@/components/Grid';

const defaultColor = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1,
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1,
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1,
  },
  a: 1,
};

const CELL_WIDTH = 10; // Need to update Grid's css
const CELL_COLS = 75;
const CELL_ROWS = 75;

export default {
  name: 'pixels',
  props: ['state'],
  data() {
    const cells = [];
    for (let i = 0; i < CELL_COLS * CELL_ROWS; i += 1) {
      cells.push({ id: i, color: null });
    }
    return {
      cells,
      title: '',
      color: defaultColor,
      columns: CELL_COLS,
      rows: CELL_ROWS,
      cellWidth: CELL_WIDTH,
    };
  },
  methods: {
    handleNew(e) {
      e.preventDefault();
      this.title = '';
      const cells = [];
      for (let i = 0; i < CELL_COLS * CELL_ROWS; i += 1) {
        cells.push({ id: i, color: null });
      }
      this.cells = cells;
    },
    handleSave(e) {
      e.preventDefault();
      if (this.title === '') {
        return;
      }
      this.state.saveDrawing(this.title, this.cells);
    },
    handleLoad(title, e) {
      e.preventDefault();
      const loadedCells = this.state.loadDrawing(title);
      if (loadedCells !== null) {
        this.title = title;
        this.cells = loadedCells;
      }
    },
  },
  components: { 'color-picker': Swatches, grid: Grid },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.interface {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

div.column {
  flex: 0 1 auto;
  flex-grow: 3;
}

div.colors {
  flex-grow: 0;
}
.vue-color__swatches {
  height: auto;
}
</style>
