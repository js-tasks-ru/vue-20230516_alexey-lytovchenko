<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="backMonth"></button>
        <div class="calendar-view__date">{{ showDateTitle }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div class="calendar-view__cell" :class="{ 'calendar-view__cell_inactive': day.inactive }" tabindex="0"
        v-for="day in monthArray" :key="day">
        <div class="calendar-view__cell-day">{{ day.day }}</div>
        <div class="calendar-view__cell-content">
          <a :href="`/meetups/${meetup.id}`" class="calendar-event" v-for="meetup in day.meetups" :key="meetup.id">
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    showDateTitle() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    monthArray() {
      let days = []
      const currentMonthDaysCount = (date) => {
        return new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
      }
      
      for (let i = 0; i < currentMonthDaysCount(this.date); i++) {
        days.push({
          day: i + 1,
          month: this.date.getMonth(),
          fullYear: this.date.getFullYear(),
          inactive: false
        })
      }
      const getStartMonthIndex = this.getIndexDayOfTheWeek(days[0].fullYear, days[0].month, days[0].day)
      const getEndMonthIndex = this.getIndexDayOfTheWeek(days[days.length - 1].fullYear, days[days.length - 1].month, days[days.length - 1].day)
      const lastDayOfPreviousMonth = new Date(this.date.getMonth() ? this.date.getFullYear() : this.date.getFullYear() - 1, this.date.getMonth(), 0)

      for (let i = 0; i < (getStartMonthIndex === 0 ? 6 : getStartMonthIndex - 1); i++) {
        days.unshift({
          day: currentMonthDaysCount(lastDayOfPreviousMonth) - i,
          month: this.date.getMonth() ? this.date.getMonth() - 1 : 11,
          fullYear: this.date.getMonth() ? this.date.getFullYear() : this.date.getFullYear() - 1,
          inactive: true
        })
      }

      for (let i = 0; i < (getEndMonthIndex === 0 ? 0 : 7 - getEndMonthIndex); i++) {
        days.push({
          day: i + 1,
          month: this.date.getMonth() === 11 ? 0 : this.date.getMonth() + 1,
          fullYear: this.date.getMonth() === 11 ? this.date.getFullYear() + 1 : this.date.getFullYear(),
          inactive: true
        })
      }

      days.forEach(d => {
        d.meetups = this.meetups.filter(meetup => {
          const day = new Date(meetup.date)
          return day.getFullYear() === d.fullYear && day.getMonth() === d.month && day.getDate() === d.day
        })
      })
      return days
    }
  },
  methods: {
    nextMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1, 1))
    },
    backMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1, 1))
    },
    getIndexDayOfTheWeek(year, month, day) {
      return new Date(year, month, day).getDay()
    }
  },
};
</script>

<style scoped>
.calendar-view {}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>