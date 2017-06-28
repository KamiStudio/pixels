<template>
  <div>
    <div class="grid" v-bind:class="{ gridlines: showGrid }" v-bind:style="gridStyle()" v-on:mouseup="stopDrag()">
      <div v-for="item in cells" :key="item.id" v-on:click="item.color = color.hex" v-on:contextmenu="handleRightClick($event, item)" v-on:mousedown="startDrag(item)" v-on:mouseover="handleMouseEnter(item)">
        <div class="cell" v-bind:id="`cell-${item.id}`" v-bind:style="computedStyle(item)"></div>
      </div>
    </div>
    <p>
        <input type="checkbox" id="showGridLines" v-model="showGrid">
        <label for="showGridLines">Show Grid</label>
        | Current Color: <span v-bind:style="styleObject">{{color.hex}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'grid',
  props: ['color', 'cells', 'columns', 'rows', 'width'],
  data() {
    return { dragging: false, showGrid: true };
  },
  computed: {
    styleObject() {
      return { color: this.color.hex };
    },
  },
  methods: {
    startDrag(item) {
      this.dragging = true;
      const ItemId = item.id;
      this.$nextTick(function updateCells() {
        this.cells[ItemId].color = this.color.hex;
      });
    },
    stopDrag() {
      this.dragging = false;
    },
    handleMouseEnter(item) {
      if (this.dragging) {
        const ItemId = item.id;
        this.$nextTick(function updateCells() {
          this.cells[ItemId].color = this.color.hex;
        });
      }
    },
    handleRightClick(e, item) {
      e.preventDefault();
      this.cells[item.id].color = null;
    },
    gridStyle() {
      return { width: `${this.columns * this.width}px` };
    },
    computedStyle(item) {
      const color = item.color || '#ffffff';
      return { backgroundColor: color };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
    display: flex;
    flex-flow: row wrap;
    border: 1px solid #ccc;
    box-sizing: content-box;
    justify-content: center;
    margin: 0 auto;
    cursor: default;
}
.grid > div {
    flex: 1 1 auto;
    display: block;
}
.cell {
    cursor: default;
    width: 10px;
    height: 10px;
}
.grid.gridlines {
    border: none;
}
.grid.gridlines .cell {
    box-shadow:
        1px 0 0 0 #ccc,
        0 1px 0 0 #ccc,
        1px 1px 0 0 #ccc,   /* Just to fix the corner */
        1px 0 0 0 #ccc inset,
        0 1px 0 0 #ccc inset;
}
</style>
