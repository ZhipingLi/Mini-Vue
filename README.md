# Mini-Vue

A simple implementation of Vue.js


## Usage

### 1. git clone https://github.com/ZhipingLi/Mini-Vue.git

```js
import {
  reactive,
  watchEffect,
  h,
  createApp
} from './Mini-Vue/index.js'
```


### 2. npm install mini-vue-impl

  ```js
import mini_vue from 'mini-vue-impl'
  ```
&nbsp;&nbsp;&nbsp;&nbsp;or

```js
const {
  reactive,
  watchEffect,
  h,
  createApp
} = require('mini-vue-impl')
```


## Example

```js
import {
  reactive,
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

```

![demo](https://user-images.githubusercontent.com/89546528/206865724-8c024d0b-4051-4598-b893-4250ac1d2005.gif)

Tips: example.html needs to be opened with Live Server.
