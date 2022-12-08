/**
 * 应用程序入口模块
 */

import { watchEffect } from './reactivity.js'
import { mount, patch } from './renderer.js'

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
  createApp
}