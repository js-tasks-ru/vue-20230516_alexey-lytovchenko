<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiTab from './UiTab.vue';

export default {
  name: 'UiTabs',

  props: {
    active: String,
  },

  emits: ['update:active'],

  methods: {
    setActive(tabId) {
      this.$emit('update:active', tabId);
    },
  },

  render() {
    const nav = this.$slots.default().map(vnod => {
      const isActive = vnod.props.name === this.active
      const classArr = ["tabs__tab", isActive ? "tabs__tab_active" : ""]
      return (
        <UiTab name={vnod.props.name} title={vnod.props.title}>
          <a
            className={classArr.join(" ")}
            role="tab"
            onClick={() => this.setActive(vnod.props.name)}
          >
            {vnod.props.title}
          </a>
        </UiTab>
      )
    })
    const content = this.$slots.default().map(vnod => {
      if (vnod.props.name === this.active) {
        return <div className="tabs__content">{vnod}</div>
      }
    })
    return (
      <div className="tabs">
        <div className="tabs__nav" role="tablist">
          {nav}
        </div>
        {content}
      </div>
    )
  },
};
</script>

<style scoped>
/* _tabs.css */
.tabs {
  margin: 0;
}

.tabs__content {
}

.tabs__nav {
  display: flex;
  flex-direction: row;
  position: relative;
}

.tabs__nav:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--grey-2);
}

.tabs__tab {
  display: inline-flex;
  padding: 10px 0;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  line-height: 28px;
  color: var(--grey-8);
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 18px;
  transition-duration: 0.2s;
  transition-property: border-color, color;
  box-shadow: none;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 1;
}

.tabs__tab:hover,
.tabs__tab.tabs__tab_active {
  border-bottom-color: var(--blue);
  color: var(--blue);
}
</style>
