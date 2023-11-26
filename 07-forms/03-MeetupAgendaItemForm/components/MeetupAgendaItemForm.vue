<template>
  <fieldset class="agenda-item-form">
    <button
      type="button"
      class="agenda-item-form__remove-button"
      @click="$emit('remove')"
    >
      <UiIcon icon="trash"/>
    </button>

    <UiFormGroup>
      <UiDropdown
        title="Тип"
        name="type"
        v-model="localAgendaItem.type"
        :options="$options.agendaItemTypeOptions"
      />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput
            type="time"
            placeholder="00:00"
            name="startsAt"
            v-model="localAgendaItem.startsAt"
          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput
            type="time"
            placeholder="00:00"
            name="endsAt"
            v-model="localAgendaItem.endsAt"
          />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup
      :label=fieldSet.title
    >
      <UiInput
        name="title"
        v-model="localAgendaItem.title"
      />
    </UiFormGroup>
    <UiFormGroup
      v-if="fieldSet.speaker"
      :label=fieldSet.speaker
    >
      <UiInput
        name="speaker"
        v-model="localAgendaItem.speaker"
      />
    </UiFormGroup>
    <UiFormGroup
      v-if="fieldSet.description"
      :label=fieldSet.description
    >
      <UiInput
        multiline
        name="description"
        v-model="localAgendaItem.description"
      />
    </UiFormGroup>
    <UiFormGroup
      v-if="fieldSet.language"
      :label="fieldSet.language"
    >
      <UiDropdown
        title="Язык"
        v-model="localAgendaItem.language"
        :options="$options.talkLanguageOptions"
        name="language"
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  {value: null, text: 'Не указано'},
  {value: 'RU', text: 'RU'},
  {value: 'EN', text: 'EN'},
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: {UiIcon, UiFormGroup, UiInput, UiDropdown},

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:agendaItem', 'remove'],
  data() {
    return {
      localAgendaItem: {...this.agendaItem},
    }
  },
  watch: {
    localAgendaItem: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', {...newValue})
      },
    },
    'localAgendaItem.startsAt'(newValue, oldValue) {
      const newMinStartAt = this.getMinutesFromTime(newValue)
      const oldMinStartAt = this.getMinutesFromTime(oldValue)
      const minEndAt = this.getMinutesFromTime(this.localAgendaItem.endsAt)
      const oldDeltaTimeAt = minEndAt - oldMinStartAt

      let newDeltaTime = newMinStartAt + oldDeltaTimeAt
      if (Math.sign(newDeltaTime) < 0) {
        newDeltaTime = newDeltaTime + 1440
      }
      this.localAgendaItem.endsAt = this.getTimeFromMinutes(newDeltaTime)
    },
  },
  computed: {
    fieldSet() {
      if (this.localAgendaItem.type === 'talk') {
        return {
          title: 'Тема',
          speaker: 'Докладчик',
          description: 'Описание',
          language: 'Язык',
        }

      } else if (this.localAgendaItem.type === 'other') {
        return {
          title: 'Заголовок',
          description: 'Описание'
        }
      } else {
        return {
          title: 'Нестандартный текст (необязательно)'
        }
      }
    }
  },
  methods: {
    getMinutesFromTime(time) {
      const arrTime = time.split(':')
      return arrTime[0] * 60 + +arrTime[1]
    },
    getTimeFromMinutes(mins) {
      if (mins > 1400) mins -= 1440
      const hours = String(Math.trunc(mins / 60))
      const minutes = String(mins % 60)
      return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0')
    }
  },
}
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
