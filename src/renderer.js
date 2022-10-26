function h(tag, props, children) {
  return {
    tag,
    props,
    children
  }
}

/* vnode -> HTMLElement */
function mount(vnode, container) {
  // 1.创建DOM节点, 并在vnode上保留el
  const el = vnode.el = document.createElement(vnode.tag)

  // 2.处理props
  if(vnode.props){
    for(const key in vnode.props){
      const value = vnode.props[key]
      if(key.startsWith('on')){ // 时间监听
        el.addEventListener(key.slice(2).toLowerCase(), value)
      }else{
        el.setAttribute(key, value)
      }
    }
  }

  // 3.处理children
  if(vnode.children){
    if(typeof vnode.children === "string") {
      el.innerHTML = vnode.children
    }else{
      vnode.children.forEach(child => {
        mount(child, el)
      })
    }
  }

  // 4.挂载el节点
  container.appendChild(el)
}

/* 对比新旧VNode, 更新DOM节点 */
function patch(vnode1, vnode2) {
  if(vnode1.tag !== vnode2.tag){
    const parentEl = el.parentElement
    parentEl.removeChild(el)
    mount(vnode2, parentEl)
  }else{
    // 1.取出之前vnode1生成的DOM节点, 并在vnode2中保存
    const el = vnode2.el = vnode1.el

    // 2.处理props
    const oldProps = vnode1.props || {}
    const newProps = vnode2.props || {}

    // 2.1.获取所有的newProps添加到el
    for(const key in newProps){
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(key.startsWith('on')){ // 监听事件
        el.addEventListener(key.slice(2).toLowerCase(), newValue)
      }else{
        if(oldValue !== newValue){
          el.setAttribute(key, newValue)
        }
      }
    }

    // 2.2.删除旧的props
    for(const key in oldProps){
      if(key.startsWith('on')){ // 监听事件
        const oldValue = oldProps[key]
        el.removeEventListener(key.slice(2).toLowerCase(), oldValue)
      }else{
        if(!(key in newProps)){
          el.removeAttribute(key)
        }
      }
    }

    // 3.处理children
    const oldChildren = vnode1.children || []
    const newChildren = vnode2.children || []
    
    // 3.1.newChildren为一个字符串
    if(typeof newChildren === 'string'){
      el.innerHTML = newChildren
    }else{ // 3.2.newChildren为一个数组
      if(typeof oldChildren === 'string'){ // 3.2.1.oldChildren为一个字符串
        el.innerHTML = ''
        for(const child of newChildren){
          mount(child, el)
        }
      }else{ // 3.2.1.oldChildren为一个数组
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for(let i = 0; i <= commonLength - 1; i++){
          patch(oldChildren[i], newChildren[i])
        }

        if(oldChildren.length > newChildren.length){
          oldChildren.slice(commonLength).forEach(child => {
            el.removeChild(child.el)
          });
        }

        if(oldChildren.length < newChildren.length){
          newChildren.slice(commonLength).forEach(child => {
            mount(child, el)
          })
        }
      }
    }
  }
}

export {
  h,
  mount,
  patch
}