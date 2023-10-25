<template>
  <div class="pagination-container">
    <template v-for="item in itemsPerPage" :key="item.id">
      <slot :item="item" />
    </template>
  </div>
</template>

<script lang="jsx">
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },
  computed:{
    itemsPerPage(){
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.items.slice(start, end);
    }
  }
};
</script>
