---
title: How to create an animated Vue Sidebar menu with Vue.Observable
summary: Hey Everyone in this post I will guide you through the process of creating a smooth slideout menu for your website in vuejs
date: 2019-05-28
tags:
  - post
  - vue
image: 2019/03-post-vue-sidebar
image_alt: vue-sidebar-menu-burger
permalink: posts/how-to-create-an-animated-vue-sidebar-menu-with-vue-observable/
---


![alt text](/assets/images/2019-05/sidebar_animation_vuejs_.gif "vuejs Sidebar Menu 2019"){.shadow}

## Demo

[CodeSandbox Demo](https://codesandbox.io/embed/codesandbox-iv1zc){target="_blank" rel="noopener"}
[Codepen Demo](https://codepen.io/kkern/pen/zQLKQM){target="_blank" rel="noopener"}
[Source on Github](https://github.com/regenrek/vue-sidebar-menu-example){target="_blank" rel="noopener"}


## Features

- Slideout Sidebar with Burger Menu
- Using Vue.observable() to manage state (Introduced in vuejs 2.6)

## Table of contents

1. [Project Setup](#1-project-setup)
2. [Component Design](#2-component-design)
3. [The Vue Burger Menu Component](#3-the-vue-burger-menu-component)
4. [The Vue Sidebar Component](#4-the-vue-sidebar-component)
5. [Build the final UI Burger + Sidebar](#5-build-the-final-navigation-ui-burger--sidebar)
6. [Sharing Data between sidebar and burger component with Vue.Observable](#6-sharing-data-between-sidebar-and-burger-component-with-vueobservable)
6.1 [Creating the store with Vue.Observable](#61-creating-the-store-with-vueobservable)
6.2 [Make use of the store inside the Burger Component](#62-make-use-of-the-store-inside-the-burger-component)
6.3 [Make use of the store inside the Sidebar Component](#63-make-use-of-the-store-inside-the-sidebar-component)



## 1. Project Setup

If you missing Vue Cli then install it with

```bash
npm install -g vue-cli
```

Create a new vue project with vuejs CLI 

```bash
vue create awesome-website 
```

If you don't have a dev environment around you could also create a project with https://codesandbox.io vuejs template and start coding. {.tip} 


## 2. Component Design

To follow the vue approach we will split the app into different module-like pieces called `Components`. We will create two separate components named `Sidebar` and `Burger` which have their own markup, logic and style. This approach makes them reusable in other apps or websites. Also, you get a clear understanding of what component is used for the particular use case.

Here is a snippet of the component structure:

```js
components/
--| menu/
-----| Burger.vue
-----| Sidebar.vue
```

## 3. The Vue Burger Menu Component

Let's start with the `Burger` component. I will explain it step by step:

* The Burger component is not more than a simple toggle Button which handles if something is `true` (isBurgerActive) or `false` (!isBurgerActive). For this reason we create an boolean property `isBurgerActive` inside the components `data` option and set it default to `false`. 
* To listen to the DOM click event we add a click handler with [`@click.prevent`](https://vuejs.org/v2/guide/events.html#Event-Modifiers){target="_blank" rel="noopener"} attribute. That means if we click on the Burger the `toggle()` method will be triggered.
* Inside the `toggle()` method we just switching the state of `isBurgerActive` property from true to false (and vice versa).
* The `:class` attribute will either be `active` or empty depends on the state.



* `components/Menu/Burger.vue`

```html
<template>
    <div id="burger"
         :class="{ 'active' : isBurgerActive }"
         @click.prevent="toggle">
        <slot>
            <button type="button" class="burger-button" title="Menu">
                <span class="burger-bar burger-bar--1"></span>
                <span class="burger-bar burger-bar--2"></span>
                <span class="burger-bar burger-bar--3"></span>
            </button>
        </slot>
    </div>
</template>
<script>
    export default {
        data: () => ({
            isBurgerActive: false
        }),
        methods: {
            toggle() {
                this.isBurgerActive = !this.isBurgerActive
            }
        }
    }
</script>
<style>
   .hidden {
        visibility: hidden;
    }

    button {
        cursor: pointer;
    }

    /* remove blue outline */
    button:focus {
        outline: 0;
    }

    .burger-button {
        position: relative;
        height: 30px;
        width: 32px;
        display: block;
        z-index: 999;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        pointer-events: all;
        transition: transform .6s cubic-bezier(.165,.84,.44,1);
    }

    .burger-bar {
        background-color: #130f40;
        position: absolute;
        top: 50%;
        right: 6px;
        left: 6px;
        height: 2px;
        width: auto;
        margin-top: -1px;
        transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
    }

    .burger-bar--1 {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
    }

    .burger-bar--2 {
        transform-origin: 100% 50%;
        transform: scaleX(.8);
    }

    .burger-button:hover .burger-bar--2 {
        transform: scaleX(1);
    }

    .no-touchevents .burger-bar--2:hover {
        transform: scaleX(1);
    }

    .burger-bar--3 {
        transform: translateY(6px);
    }

    #burger.active .burger-button {
        transform: rotate(-180deg);
    }

    #burger.active .burger-bar {
        background-color: #fff;
    }

    #burger.active .burger-bar--1 {
        transform: rotate(45deg)
    }

    #burger.active .burger-bar--2 {
        opacity: 0;
    }

    #burger.active .burger-bar--3 {
        transform: rotate(-45deg)
    }
</style>

```

You can find a simple codepen example here: [https://codepen.io/kkern/pen/OYERMy](https://codepen.io/kkern/pen/OYERMy){target="_blank" rel="noopener"} 


Occasionally I develop some parts of my application inside codepen which gives  me an isolated workspace for my specific problem and copy/paste it back to my application until its finished. {.tip}

## 4. The Vue Sidebar Component

We will build a slide-out Sidebar which animates from the left to the right. This kind of sidebar is used in many apps and websites. To open the sidebar you need to click the burger button. To close it you can click anywhere outside of the sidebar like a modal. We proceed to build the sidebar component:

* First we're going to create a `sidebar-backdrop` div which is shown when the sidebar is open. So you have add the [`v-if`](https://vuejs.org/v2/guide/conditional.html#v-if){target="_blank" rel="noopener"} attribute to it. Also add a click event to close the sidebar.
* Next we add the [`<transition>`](https://vuejs.org/v2/guide/transitions.html){target="_blank" rel="noopener"} element around our sidebar panel. This gives us the advantage to add CSS transitions to the element and do it the vuejs way. For example you can handle enter/leave transitions with the predefined Transitions Classes. You can see an example in the `<style>` section of the component for `slide-enter` and `slide-leave` classes.
* Finally the sidebar has nearly the same behaviour than the burger button. 

* `components/Menu/Sidebar.vue`

```html
<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data: () => ({
            isPanelOpen: true
        }),
        methods: {
            closeSidebarPanel() {
                this.isPanelOpen = false
            }
        }
    }
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

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
    }

    .sidebar-panel {
        overflow-y: auto;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 300px;
    }
</style>
```



If you want this bare sidebar component in action visit the codepen snippet here: [https://codepen.io/kkern/pen/JqZWvV](https://codepen.io/kkern/pen/JqZWvV){target="_blank" rel="noopener"} 


## 5. Build the final navigation UI (Burger + Sidebar)

To test the component we add it to our `src/App.vue` main file. I removed all the predefined code parts to get a clean app. 

 * `src/App.vue`
 
 ```html
<template>
  <div id="app">
    <nav class="main-nav">
      <div class="logo">
        my.company
      </div>
      <Burger></Burger>
    </nav>

    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from './components/Menu/Burger.vue';
import Sidebar from './components/Menu/Sidebar.vue';

export default {
  name: 'app',
  components: {
    Burger,
    Sidebar
  }
}
</script>
<style>
 html {
    height: 100%;
    overflow:hidden;
  }

  body {
    border: 0; margin: 0; padding: 0;
    font-family: 'Lato';
    height: 100%;
    background: rgb(101,31,87);
    background: linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,1) 48%, rgba(249,248,113,1) 100%);
  }

  .logo {
    align-self: center;
    color: #fff;
    font-weight: bold;
    font-family: 'Lato'
  }

  .main-nav {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;
  }

  ul.sidebar-panel-nav {
    list-style-type: none;
  }

  ul.sidebar-panel-nav > li > a {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding-bottom: 0.5em;
  }
</style>
```

Ok fine the UI is finished. What's missing here is that the burger button doesn't talk to the sidebar. Let's do this in the next section.

## 6. Sharing data between sidebar and burger component with `Vue.observable()`

* _What do we expect to happen?_ The sidebar panel needs to open if you click on the burger button. 
* _What's the problem?_ Since both of their logic relies inside the component itself we need a way to let them talk to each other.
* _The solution:_ To achieve communication between components we will use [`Vue.observable`.](https://vuejs.org/v2/api/#Vue-observable)  which can be used as a minimal, cross-component state store for simple scenarios.

If you have just started with vue, react, angularjs, ... you mostly need a bit time to understand how you can *share data between two components* or *share global state between components*. Just google around if you need more info on that. Mostly you will find solving these problems with `vuex`. {.tip}


In fact, there is just one `variable` which we need to share between these two components: isBurgerActive or isPanelOpen (isPanelopen) @TODO. With this information, we can build our `store` with `Vue.observable()`

### 6.1 Creating the store with `Vue.observable`

Create a `store.js` file:
  
* `src/store.js`
   
```js
import Vue from "vue";

export const store = Vue.observable({
    isNavOpen: false
});
```

Since it's not recommended to change the value of `isNavOpen` directly instead you should use a `mutation` for it. That means whenever we want to update a state i.e. a simple variable we need to run a mutation. That's it. 

Mutations should be synchronous transactions. If you need to handle asynchronous operations use Actions. {.tip}

```js
import Vue from "vue";

// save our state (isPanel open or not) 
export const store = Vue.observable({
    isNavOpen: false
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    toggleNav() {
        store.isNavOpen = !store.isNavOpen
    }
};
```

### 6.2 Make use of the store inside the Burger component

We need to do a few changes to our components. Open your `burger.vue` component.

* Use the `import` statement to make use of your previously created store
* Instead of using the local data attribute `isBurgerActive` we will the current store state which is shared globally.
```diff
+   import { store, mutations } from '@/store.js'

export default {
-      data: () => ({
-          isBurgerActive: false
-      }),
       computed: {
            isBurgerActive() {
-               return this.isBurgerActive
+               return store.isNavOpen
            }
        },
        methods: {
            toggle() {
-               this.isBurgerActive = !this.isBurgerActive
+               mutations.toggleNav()
            }
        }
    }
``` 

Here is the final `burger.vue` file

```html
<template>
    <div id="burger"
         :class="{ 'active' : isBurgerActive }"
         @click.prevent="toggle">
        <slot>
            <button type="button" class="burger-button" title="Menu">
                <span class="hidden">Toggle menu</span>
                <span class="burger-bar burger-bar--1"></span>
                <span class="burger-bar burger-bar--2"></span>
                <span class="burger-bar burger-bar--3"></span>
            </button>
        </slot>
    </div>
</template>
<script>
    import { store, mutations } from '@/store.js'
    
    export default {
        computed: {
            isBurgerActive() {
                return store.isNavOpen
            }
        },
        methods: {
            toggle() {
                mutations.toggleNav()
            }
        }
    }
</script>
```

### 6.3 Make use of the store inside the Sidebar component

If you could follow until here you already can guess how we will implement the store in the sidebar component. 

* Begin to `import` the store into the component.
* Remove the `data` option and replace everything inside `methods` and `computed` with the state information from the store. 

```diff
+    import { store, mutations } from '@/store.js'

    export default {
-        data: () => ({
-            isPanelOpen: true
-        }),
        methods: {
-           this.isPanelOpen = false
+           closeSidebarPanel: mutations.toggleNav
        },
        computed: {
            isPanelOpen() {
-               return this.isNavOpen
+               return store.isNavOpen
            }
        }
    }
```


* Final `sidebar.vue` file

```html
<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    import { store, mutations } from '@/store.js'

    export default {
        methods: {
            closeSidebarPanel: mutations.toggleNav
        },
        computed: {
            isPanelOpen() {
                return store.isNavOpen
            }
        }
    }
</script>
```


## Summary

You can find the source on [github](https://github.com/regenrek/vue-sidebar-menu-example){target="_blank" rel="noopener"} and a demo [here](https://codesandbox.io/embed/codesandbox-iv1zc) {target="_blank" rel="noopener"} 
