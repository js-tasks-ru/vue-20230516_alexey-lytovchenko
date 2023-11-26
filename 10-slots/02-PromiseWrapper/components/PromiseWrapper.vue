<template>
  <Transition name="fade" mode="out-in">
      <slot v-if="result" name="fulfilled" :result="result" key="fulfilled"/>
      <slot v-else-if="error" name="rejected" :error="error" key="rejected"/>
      <slot v-else name="pending" key="pending"/>
  </Transition>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler(newValue) {
        this.result = null
        this.error = null
        newValue.then(response => {
          this.result = response
        })
          .catch(error => {
            this.error = error
          })
      }
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
