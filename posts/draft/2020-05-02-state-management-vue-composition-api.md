


https://github.com/vuejs/vue/issues/1987

I'm working on a side project where my app starts to grow and I got lost somehow with the complexity of building my components. Complexity means that you try to build your components as reusable (decoupled) as possible. Which gets more difficult if you try to share some state between these components. For this use-case you try to solve this with concepts like vuex (inject global state), provide/inject (selectively inject some state), $emit, $eventBus and even this.$parent (walk the chain up). With more options exists you have to select whats need to be used in a certain use case.




Which can help to reduce repeation and makes vue components more maintainable. So I started to integrate  `@vue/composition-api` inside my nuxt components with the [`nuxt-composition-api`](https://github.com/danielroe/nuxt-composition-api){target="_blank" rel="noopener"} module created by @danielroe.



This made me think of trying the new composition API which will be released alongside with vue 3. Meanwhile we are using the ['@vue/composition-api'](https://github.com/vuejs/composition-api) plugin  which allows you to experiment and with the API before it gets released.  


## 2. Build a reusable Vue sidebar menu with `composition-api`

Now lets build something more meaningful like a sidebar menu which you experience in most of your webapps or websites. Since I already wrote an article on [how to integrate a vue sidebar with vue](https://regenrek.com/posts/how-to-create-an-animated-vue-sidebar-menu-with-vue-observable/) you can compare the differences efficiently.

### 2.1 Component Design

The following will be our component structure 

```bash
components/
--| nav/
-----| Burger.vue
-----| Sidebar.vue
-----| Nav.vue
```

### 2.2 Create a vue burger menu button

Let's start with the burger menu. The behaviour we need to implement is to toggle to a specific state - `active` or `not active`. More or less the burger menu is a button with some beautiful styling.

* As we already have installed `nuxt-composition-api` module we can use `@vue/composition-api` in our app where we need it.

* We will use `defineComponent` which allows us to create a component with the new vue 3 composition api style

* and `ref` (reactive reference) which wraps primitives in an object to track changes. In short it makes our variable reactive.
* The `setup()` function is our main entry point inside the component. Here we will **compose** our properties, lifecycle registration methods and so on.

* Let's discover  the `setup()` function. First of all we have an object `active` which uses `ref` with the default value `false`. This means that our burger menu will be not active at start. As already mentioned `ref` returns a reactive and mutable ref object.

* Second we have a function called `toggle()` which will switch our `active` state if a button is click. Note: When you declare an object with `ref()` you can change the `value` of this object with `.value`

* At last you need to return all your defined objects and functions to make them available in the `<template>`. If you think looks verbose please read [this](https://composition-api.vuejs.org/#verbosity-of-the-return-statement){target="_blank" rel="noopener"}


burger.vue{.file}
{% highlight "html" %}
{% raw %}
<template>
  <button type="button" :class="{'active': active}" class="relative block z-999 border-0 cursor-pointer focus:outline-none" @click.prevent="toggle">
    {{ !active ? 'Click me 👍' : 'Close me ❌' }}
  </button>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const active = ref(false)

    function toggle () {
      active.value = !active.value
    }

    return {
      active,
      toggle
    }
  }
})
</script>
{% endraw %}
{% endhighlight %}

My codepen and github examples differ sometimes in style maybe also a bit in functionality. The reason behind this is that you get an additional idea how you could present your ui in terms of style too.{.tip}

Ok we've have finished a simple toggle button which we will extend to make it a full useful burger menu soon. Lets quickly add a `Nav` component where we place our burger in it. We will use then our `Nav` component to include it in our main layout.

{% codepen "https://codepen.io/kkern/pen/dyYVegO/", {tabs: "result", height: "175"} %}

### 2.3 Create an animated vue sidebar menu

The next part we will go through is to create a vue.js 3 sidebar menu which is similar to a vue modal and behaves like a button you can open and close (toggle) the menu. 

Since the sidebar has a toggle behavior too we have the same code as we used for burger button. Except the `closeSidebar()` function which ignores the toggle state and forces a close for the sidebar.


```html
<template>
  <div>
    <slot name="backdrop">
      <div
        v-if="active"
        class="w-screen h-screen fixed left-0 top-0 cursor-pointer bg-backdrop"
        @click="closeSidebar"
      />
    </slot>
    <transition name="slide">
      <div
        v-if="active"
        class="h-screen fixed overflow-y-auto bg-Cviolet left-0 top-0 z-999 w-300 px-12"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup () {
    const active = ref(true)

    function toggle () {
      active.value = !active.value
    }

    function closeSidebar (e) {
      active.value = false
    }

    return {
      active,
      toggle,
      closeSidebar
    }
  }
})
</script>
<style>
.slide-enter-active,
.slide-leave-active
{
    transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
}
</style>
```

{% codepen "https://codepen.io/kkern/pen/qBOPLXE", {tabs: "result", height: "300"} %}


### 3 Using the vue composition api

In this part we're going to use the composition api to optimize our code and more importantly we need a mechanism to let the **burger menu** and the **sidebar** interact to each other. 

We now have some code redundancy which we should avoid to reduce complexity and side effects. 


Lets make a quick hold here and summarize what we have right


## 3.1 Build reusable logic with vue composition functions 

When we talk about reusability of components then we can make use of the composition api to extract our logic to a function and use it whenever we need it across our components. This works as simple as it sounds with a function. 

In our example the toggle mechanism is a good example to extract it to a function outside of the component.

### local state
{One of the best things about Composition API is the fact that it allows to write Vue logic outside of Vue components. Because of that you can slice your code into reusable, independent and self-contained pieces and hide their business logic behind a nice API.}

{
The useProduct state is tightly coupled with the business logic that is managing it, and the state is local only to this function. It’s not in the app, even as empty object until it’s needed. It’s also only mutable only from the “inside”.
}



{
  The cool thing with Composition functions when it comes to state management, is that it allows us to easily choose if the state should be global or local. That freedom reduces some of the complexity and dependency to a root store object compared to solutions like Vuex.
}

composables/toggle.js{.file}
```
import { ref } from '@vue/composition-api'

export function useToggle () {
  const active = ref(false)

  const toggle = () => {
    active.value = !active.value
  }

  return { active, toggle }
}
```

Now you can use this function across all your components in the application. Further we optimize our burger and sidebar with this function.

```diff
<template>
  <button type="button" :class="{'active': active}" class="relative block z-999 border-0 cursor-pointer focus:outline-none" @click.prevent="toggle">
    {{ !active ? 'Click me 👍' : 'Close me ❌' }}
  </button>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
+ import { useToggle } from '~/composables'

export default defineComponent({
  setup () {
-    const active = ref(false)
-
-    function toggle () {
-      active.value = !active.value
-    }

+    const { active, toggle } = useToggle()

    return {
      active,
      toggle
    }
  }
})
</script>

```

We do the same for the sidebar component. Try if you can do this yourself.


## Introduction{data-toc-exclude}

I'm working on a side project where my app starts to grow and I got lost somehow with the complexity of my components. Complexity means that you try to build your components as reusable as possible and you try to solve this with vuex (inject global state), provide/inject (selectively inject some state), $emit, $eventBus and even this.$parent (walk the chain up). 


## 3.2 Share state between composition function

We notice that both of their component live in their own component. Note that composition functions are basically javascript functions which are intended to be reused in any component but have their own reactive state in each of the components. 

But we need a way to share state the state between these two components. We want bot `burger` and `sidebar` to refer to the same object.

Based on the use case you have a lot of possibilities to achieve a communication between components. Some of them are `eventBus`, using parent-child props or using the popular vuex for example. But with the composition API you can create your own state management easily{.tip}

