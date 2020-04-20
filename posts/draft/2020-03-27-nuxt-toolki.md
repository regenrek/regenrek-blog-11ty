---
title: Useful Nuxt 
summary:
date: 2020-03-27
tags:
  - post
  - nuxt-js
  - algolia
image: 2019/05-nuxt_algolia_search_breakfast_locator
image_alt: nuxt_algolia_search_breakfast_restaurant_locator
# permalink: posts/using-aws-lambda-insert-multiple-json-dynamodb/
---


## Install and configure Amplify CLI

Install the vodal library 

```bash
    yarn add vodal
```

Create a plugin for it and it to your `nuxt.config.js`


* ~/plugins/vue-modal.js
```js
import Vue from 'vue'
import Vodal from 'vodal'

Vue.component(Vodal.name, Vodal)
```

* nuxt.config.js
```js
plugins: [
    {
      src: '~/plugins/vue-modal.js',
      mode: 'client'
    }
]
```