---
title: How to use Tailwind CSS 1.0.1 in Nuxt
summary: The final release of Tailwind CSS 1.0.1 is here. Time to integrate the next Tailwind version into nuxt and vue.js 
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

- [Table of contents](#table-of-contents)
- [1. Install Tailwind CSS 1.0.1](#1-install-tailwind-css-101)
- [2. Rename your Tailwind Config file to `tailwind.config.js`](#2-rename-your-tailwind-config-file-to-tailwindconfigjs)
- [3. New default Config structure](#3-new-default-config-structure)
- [4. Configure `postcss` in `nuxt.config.js`](#4-configure-postcss-in-nuxtconfigjs)
- [5. Replace `@tailwind preflight` with `@tailwind base`](#5-replace-tailwind-preflight-with-tailwind-base)
- [[BONUS] Use `purgecss` to remove unused css in the production build](#bonus-use-purgecss-to-remove-unused-css-in-the-production-build)
- [[BONUS] Use Google Fonts with nuxt js and Tailwind](#bonus-use-google-fonts-with-nuxt-js-and-tailwind)
- [[BONUS] How to use sass with Tailwind 1.0.1](#bonus-how-to-use-sass-with-tailwind-101)
- [Summary](#summary)

## 1. Install Tailwind CSS 1.0.1

Start your terminal. `cd` to your project and upgrade to the latest tailwind build.

```bash
npm install tailwindcss --save-dev
# or
yarn add -D tailwindcss
```

## 2. Rename your Tailwind Config file to `tailwind.config.js`

If you don't have a `tailwind.js` config file in your project root directory then create a file called `tailwind.config.js` or rename your existing config file. In the official Tailwind [documentation](https://tailwindcss.com/docs/upgrading-to-v1#3-rename-tailwind-js-to-tailwind-config-js){target="_blank" rel="noopener"}, you can read that the rename part is entirely **optional** but **recommended**.

## 3. New default Config structure

Put the following code snippet in the `tailwind.config.js` or adjust your existing file according to the new defaults which you can read up [here](https://tailwindcss.com/docs/upgrading-to-v1#2-update-your-config-file){target="_blank" rel="noopener"}.

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

Click here for an example of the new  [default config file](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js){target="_blank" rel="noopener"}.

## 4. Configure `postcss` in `nuxt.config.js`

Lets start with the nuxt changes here. Instead of creating a separate file for `postcss` put the configuration inside the `nuxt.config.js`. If you have an existing `postcss.config.js` file which is usually inside your project root - *remove it.*

*nuxt.config.js

Add the `path` lib to the top of the config. 
```js
const path = require('path')
```

```js
// you will need to include the @tailwind directives inside this
// css file.  
css: [
    '~assets/css/tailwind.css', 
],
// this is necessary
build: {
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js')
      }
    }
}
```

## 5. Replace `@tailwind preflight` with `@tailwind base`

Look for your `tailwind.css` file where you make the basic includes and add the `@tailwind` directive to inject the base styles.

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

Or if you have an existing tailwind project update the code to the following

```diff
- @tailwind preflight
+ @tailwind base
``` 

You're now **finished** with your **Tailwind CSS 1.0.1** setup. 🎉 
 
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

## [BONUS] Use Google Fonts with nuxt js and Tailwind 

If you want to use Google Fonts or maybe Adobe Typekit its really easy to achieve it with this setup. We will use the [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader){target="_blank" rel="noopener"}.

```bash
npm install --save-dev nuxt-webfontloader
# or
yarn add -D node-sass nuxt-webfontloader
```
Include the `nuxt-webfontloader` to `module` section of `nuxt.config.js`

```js
{
  modules: [
    'nuxt-webfontloader',
  ],
}
```

Add your Google Fonts you want to use inside `nuxt.config.js`

```js
export default {
  webfontloader: {
    google: {
      families: ['Lato:400,700'] //Loads Lato font with weights 400 and 700
    }
  },
}
```

The next part is really up to you on how you want to handle fonts inside your app.
Here are some tips to use it with the `tailwind.config.js`. 

What we're going todo is to add `Lato` font to the default `sans` Font Family Stack. 

```js
// load default theme settings
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
      },
    }
  }
}
```

And then `apply` this default fontFamily style to the `html` tag.

```css
html {
  font-family: @apply font-sans;
}
``` 


## [BONUS] How to use sass with Tailwind 1.0.1

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



