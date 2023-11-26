<template>
  <UiCalendarView v-slot="{date}">
    <UiCalendarEvent v-for="meetup in meetupsFilter(date)" tag="a" :href="`/meetups/${meetup.id}`" :key="meetup.id">
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  methods: {
    meetupsFilter(date) {
      return this.meetups.filter(meetup => {
        const dateMeetups = new Date(meetup.date)
        return date.date === dateMeetups.getDate() && date.month === dateMeetups.getMonth() && date.fullYear === dateMeetups.getFullYear()
      })
    }
  }
};
</script>

<style scoped></style>
