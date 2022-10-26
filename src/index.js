import { reactive, watchEffect } from './reactivity.js'
import { h, mount, patch } from './renderer.js'

function createApp(rootComponent){
  return {
    mount(selector){
      const rootEl = document.querySelector(selector)
      let isMounted = false, oldVNode = null
      watchEffect(() => {
        if(!isMounted){
          oldVNode = rootComponent.render()
          mount(oldVNode, rootEl)
          isMounted = true
        }else{
          const newVNode = rootComponent.render()
          patch(oldVNode, newVNode)
          oldVNode = newVNode
        }
      })
      return this
    }
  }
}

export {
  reactive,
  watchEffect,
  h,
  createApp
}