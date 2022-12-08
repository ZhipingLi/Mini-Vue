/**
 * 响应式系统模块
 */

let activeFn = null
const targetMap = new WeakMap()

class Depend {
  constructor() {
    this.activeFns = new Set()
  }

  depend(){
    if(activeFn) this.activeFns.add(activeFn)
  }

  notify(){
    this.activeFns.forEach(fn => fn())
  }
}

function getDepend(target, key) {
  let depMap = targetMap.get(target)
  if(!depMap) {
    depMap = new Map()
    targetMap.set(target, depMap)
  }

  let dep = depMap.get(key)
  if(!dep) {
    dep = new Depend()
    depMap.set(key, dep)
  }

  return dep
}

/* 基于Proxy实现(Vue3) */
function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      const dep = getDepend(target, key)
      dep.notify()
      return true
    }
  })
}

/* 基于Object.defineProperty实现(Vue2) */
// function reactive(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
//     Object.defineProperty(obj, key, {
//       get: function () {
//         const dep = getDepend(obj, key)
//         dep.depend()
//         return value
//       },
//       set: function (newValue) {
//         value = newValue
//         const dep = getDepend(obj, key)
//         dep.notify()
//       }
//     })
//   })
//   return obj
// }

function watchEffect(fn) {
  activeFn = fn
  fn()
  activeFn = null
}

export {
  reactive,
  watchEffect
}

/**
 * test demo
 */

//  const objProxy = reactive({
//   name: "Michael",
//   age: 18,
//   friends: [reactive({
//     name: "Sara",
//     age: 19
//   })]
// })

// watchEffect(() => console.log(objProxy.name))
// watchEffect(() => console.log(objProxy.age))
// watchEffect(() => console.log(objProxy.friends[0].name))
// watchEffect(() => console.log(objProxy.friends[0].age))

// objProxy.name = "Zhiping Li"
// objProxy.age++
// objProxy.friends[0].name = "Rachael"
// objProxy.friends[0].age += 2
