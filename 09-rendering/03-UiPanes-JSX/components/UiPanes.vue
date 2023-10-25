<script lang="jsx">
import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей
       * @type {number[]|null}
       */
      panes: null,
    };
  },

  created() {
    const slotsLength = Object.keys(this.$slots).length
    if (slotsLength !== this.panes?.length) {
      this.panes = [...new Array(slotsLength).keys()]
    }
    if (!!this.$slots.default && slotsLength === 1) {
      this.panes = [...new Array(this.$slots.default().length).keys()]
    }
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },
  render() {
    const buttons = [
      {
        name: 'Up',
        id: 0,
        variant: 'secondary',
        method: (idx) => this.up(idx)
      },
      {
        name: 'Down',
        id: 1,
        variant: 'danger',
        method: (idx) => this.down(idx)
      },
    ]
    const slotsLength = Object.keys(this.$slots).length
    const isShowButton = (index, buttonsName) => {
      const arr = slotsLength > 1 ? slotsLength : this.$slots.default().length
      return index === 0 && buttonsName === buttons[0].name ||
        (index === arr - 1) && buttonsName === buttons[1].name
    }

    const controls = (idx) => {
      return <div className="pane__controls">
        {buttons.map(button =>
          <UiButton
            data-item={idx}
            variant={button.variant}
            block
            class={isShowButton(idx, button.name) && 'pane__disabled-button'}
            onClick={() => button.method(idx)}
          >
            {button.name}
          </UiButton>
        )}
      </div>
    }
    const contents = () => {
      if (this.$slots.default && slotsLength >= 1) {
        const vNodes = this.$slots.default()
        return (this.panes).map((item, idx) => {
          return (
            <div className="pane">
              <div className="pane__content">
                {vNodes[item]}
              </div>
              {controls(idx)}
            </div>
          )
        })
      } else {
        return (
          this.panes.map((item, idx) =>
            <div className="pane">
              <div className="pane__content">
                {Object.values(this.$slots)[item]()}
              </div>
              {controls(idx)}
            </div>
          ))
      }
    }
    return (
      <div className="panes">
        {contents()}
      </div>
    )
  }
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
