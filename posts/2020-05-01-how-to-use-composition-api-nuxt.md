---
title: How to use Vue Composition API with Nuxt.js
summary: How do you use Nuxt together with the Composition API? In this tutorial, we take a quick look on how to integrate the API with the help of the 'nuxt-composition-api' module.
date: 2020-05-01
tags:
  - post
  - nuxt-js
  - vue-js
image: 2020/vue-composition-api-nuxt
image_alt: nuxt-composition-api
permalink: /posts/how-to-use-vue-composition-api-with-nuxt/
---

## Introduction{data-toc-exclude}

Note: This quick tutorial is for developers familiar with the basics of Nuxt.js. I recommend skimming through the [Composition API](https://composition-api.vuejs.org/){target="_blank" rel="noopener"} specification first. Please note that using the API in production is not recommended{.tip}

## 1. QuickStart Vue 3 Composition API with the `nuxt-composition-api` module

As usual, we start with a fresh Nuxt project.

```bash
npx create-nuxt-app myproject
```

Nuxt modules give you the ability to extend your app with additional plugins and configuration options across different projects. Luckily [@danielroe](https://twitter.com/danielcroe) 👋 has created a module to get started quickly with the Vue Composition API.

```bash
yarn add nuxt-composition-api
```

nuxt.config.js{.file}
```js
{
  buildModules: [
    'nuxt-composition-api'
  ]
}
```

 🎉 That's it, we've already finished the API integration.

So, what's happening here exactly? 

* The module installs `@vue/composition-api` into the Nuxt plugin context. This means you can use the API everywhere in your app without manual integration of any additional plugins.

Further, you can make use of some useful functions:
* `useFetch` for asynchronous data-fetching and
* `withContext` to access the Nuxt.js context easily. 

You can find additional information on the `nuxt-composition-api` GitHub page. 

## 2. Install `@vue/composition-api` as a plugin

Naturally, we can integrate the Composition API as a plugin too. Please note that you have to handle fetch and context management yourself.

```bash
yarn add @vue/composition-api
```

* plugins/composition-api.js{.file}
```js
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)
```


Please let me know if you're interested in reading more on the new Vue Composition API. 


## Further reading

[Vue 3 Cheat Sheet](https://www.vuemastery.com/pdf/Vue-3-Cheat-Sheet.pdf){target="_blank" rel="noopener"}
[Vue composition API](https://composition-api.vuejs.org/){target="_blank" rel="noopener"}
[Composition API on github](https://github.com/vuejs/composition-api){target="_blank" rel="noopener"}