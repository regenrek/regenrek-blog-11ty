---
title: How to use Tailwind CSS 1.0.0 in Nuxt today
summary: Since Adam Wathan recently announced the 1.0.0 beta of his Tailwind CSS Toolkit the final release doesn't seem to be far away. Time to integrate the next Tailwind version into nuxt and vue.js 
date: 2019-04-27
tags:
  - post
  - nuxt
  - css
image: 2019/02-post-tailwind-1_0_0-nuxt
image_alt: tailwind-1.0.0-nuxt
---

I would like to mention that there is already an official upgrade guide which you should follow too. So if you want to know in-depth changes especially for the new config file please look at the [official  upgrade documentation](https://next.tailwindcss.com/docs/upgrading-to-v1){target="_blank" rel="noopener"}. The following guide is written to use Tailwind with [nuxt.js](https://nuxtjs.org/guide/){target="_blank" rel="noopener"}.

## Table of contents

1. [Install Tailwind 1.0.0 Beta](#1-install-tailwind-100-beta)
2. [Rename your Tailwind Config file to `tailwind.config.js`](#2-rename-your-tailwind-config-file-to-tailwindconfigjs)
3. [New default Config structure](#3-new-default-config-structure)
4. [Configure postcss in `nuxt.config.js`](#4-configure-postcss-in-nuxtconfigjs)
5. [Replace @tailwind preflight with @tailwind base](#5-replace-tailwind-preflight-with-tailwind-base)
6. [Use purgecss to remove unused css in the production build](#bonus-use-purgecss-to-remove-unused-css-in-the-production-build)
7. [How to use sass with Tailwind 1.0.0](#bonus-how-to-use-sass-with-tailwind-100)
8. [Summary](#summary)

## 1. Install Tailwind 1.0.0 Beta

Start your terminal. `cd` to your project and upgrade to the latest tailwind build.

```bash
npm install tailwindcss@next --save-dev
# or
yarn add -D tailwindcss@next
```

## 2. Rename your Tailwind Config file to `tailwind.config.js`

If you don't have a `tailwind.js` config file in your project root directory then create a file called `tailwind.config.js` or rename your existing config file. In the official Tailwind [documentation](https://next.tailwindcss.com/docs/upgrading-to-v1#3-rename-tailwind-js-to-tailwind-config-js){target="_blank" rel="noopener"}, you can read that the rename part is entirely **optional** but **recommended**.

## 3. New default Config structure

Put the following code snippet in the `tailwind.config.js` or adjust your existing file according to the new defaults which you can read up [here](https://next.tailwindcss.com/docs/upgrading-to-v1#2-update-your-config-file){target="_blank" rel="noopener"}.

```bash
module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {},
  variants: {},
  plugins: [],
}
```

Click here for an example of the new  [default config file](https://github.com/tailwindcss/tailwindcss/blob/next/stubs/defaultConfig.stub.js){target="_blank" rel="noopener"}.

## 4. Configure `postcss` in `nuxt.config.js`

Lets start with the nuxt changes here. Instead of creating a separate file for `postcss` put the configuration inside the `nuxt.config.js`. If you have an existing `postcss.config.js` file which is usually inside your project root - *remove it.*

```js
css: [
    '~assets/css/tailwind.css',
],
build: {
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      }
    }
}
```

## 5. Replace `@tailwind preflight` with `@tailwind base`

Look for your `tailwind.css` file where you make the basic includes and update the code to the following:

```diff
- @tailwind preflight
+ @tailwind base
``` 

You're now **finished** with your **Tailwind 1.0.0** setup. 🎉 
 
The following parts are useful additions to the basic config.

## [BONUS] Use `purgecss` to remove unused css in the production build


The big advantage of purgecss is that your production website will get stripped of unused css which results in small css outputs.

First, we're going to install the `nuxt-purgecss` module

```bash
npm install nuxt-purgecss --save-dev
# or
yarn add -D nuxt-purgecss
```

Enable this module inside the `modules` section of your `nuxt.config.js`. You don't need to write a specific Tailwind Extractor since nuxt-purgecss does this by [default](https://github.com/Developmint/nuxt-purgecss#defaults){target="_blank" rel="noopener"}.

```js
{
  modules: [
    'nuxt-purgecss',
  ],
  purgeCSS: {}
}
```

You will need also `extractCSS` option for `purgeCSS`.

```js
build: {
    extractCSS: true
}
```


## [BONUS] How to use sass with Tailwind 1.0.0

If you would like to use sass in combination with postcss here are the steps to enable it. 

Install `node-sass` and `sass-loader` packages to make use of it. Or you can also read the official [nuxt guide](https://nuxtjs.org/api/configuration-css#the-css-property){target="_blank" rel="noopener"}.

```bash
npm install --save-dev node-sass sass-loader
# or
yarn add -D node-sass sass-loader
```

Rename the prefix of your `.css` files to `.scss`. Update your nuxt.config.js to new paths and filenames and you're done.

```js
  css: [
    '~assets/scss/tailwind.scss', 
    '~assets/scss/my-custom.scss',
  ],
```

_Hint:_ I would first examine if sass is really necessary for the given use case. E.g. [conditionals](https://github.com/andyjansson/postcss-conditionals){target="_blank" rel=noopener"} or [nested behaviour](https://github.com/postcss/postcss-nested){target="_blank" rel="noopener"} you can install a [postcss plugin](https://www.postcss.parts/){target="_blank" rel="noopener"} inside `nuxt.config.js` instead of using sass at all.

## Summary

Here is the final nuxt.config.js. Feel free to copy paste and adapt.

```js
import pkg from './package'
const path = require('path')
const glob = require('glob-all')

export default {
  mode: 'spa',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~assets/css/tailwind.css'
  ],
  modules: [
    'nuxt-purgecss'
  ],
  purgeCSS: {},
  build: {
    extractCSS: true, // if you use purgeCSS
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        cssnano: {
          preset: 'default',
          discardComments: { removeAll: true },
          zIndex: false
        }
      },
      // Change the postcss-preset-env settings
      preset: {
        stage: 0, // enable all (experimental) polyfills
        autoprefixer: {
          cascade: false,
          grid: true
        }
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```



