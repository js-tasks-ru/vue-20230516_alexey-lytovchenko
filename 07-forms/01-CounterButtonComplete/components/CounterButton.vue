<template>
  <button
    class="button"
    @click="clickButton"
  >
    {{ countData }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',
  emits: ['update:count'],
  inheritAttrs: false,
  props: {
    count: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      countData: this.count
    }
  },

  methods: {
    clickButton() {
      this.countData += 1
      this.$emit('update:count', this.countData)
    }
  },
  watch: {
    count: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.countData = newValue
      },

    }
  }
};
</script>
<style scoped>
.button {
  padding: 5px 10px;
}
</style>
