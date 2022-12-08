import {
  reactive,
  watchEffect,
  h,
  createApp
} from "../index.js"

// 1.创建根组件
const App = {
  data: reactive({
    counter: 0
  }),
  render() {
    return h('div', { class: "counter" }, [
      h('h2', null, '当前计数: ' + this.data.counter),
      h('button', { onClick: () => this.data.counter++ }, "+1"),
      h('button', { onClick: () => this.data.counter-- }, "-1")
    ])
  }
}

// 2.挂载根组件
const app = createApp(App).mount("#app")