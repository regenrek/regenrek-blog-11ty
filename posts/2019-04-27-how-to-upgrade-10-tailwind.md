---
title: How to use Tailwind CSS with Nuxt.js
summary: In this tutorial, we will integrate Tailwind CSS with PostCSS to Nuxt.js. I've been using TailwindCSS since early 2019 and I never regret to leave Bootstrap CSS behind.  In a nutshell TailwindCSS is a "utility-first" CSS framework which is easy to learn, lightweight and very flexible. 
date: 2020-04-27
tags:
  - post
  - nuxt-js
  - tailwind-css
image: 2019/02-post-tailwind-1_0_0-nuxt
image_alt: tailwind-1.0.0-nuxt
permalink: /posts/how-to-use-tailwind-css-with-nuxt/
---


## Introduction{data-toc-exclude}

Don't be afraid of the long class names TailwindCSS generates like `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`. Despite the seemingly obvious HTML cluttering I quickly realized the advantage of using it when working on a team project. Team members can read and understand your code more efficiently. Additional when working with `vue`, `react` e.g. you should always build [small components](https://tailwindcss.com/docs/extracting-components/){target="_blank" rel="noopener"} which keeps your code maintainable and prevents code duplication.

## 1. Quickstart TailwindCSS with the `@nuxtjs/tailwindcss` module

The recommended approach is to install the official `@nuxtjs/tailwindcss` module. 

### a) Start a new nuxt project

If you start from scratch then you can choose Tailwind as your favorite UI framework during the `create-nuxt-app` scaffolding process.

```bash
npx create nux-app my-cool-project
# Choose your favorite UI framework
* Tailwind
```

### b) Add TailwindCSS to an existing project

You may have an existing Nuxt.js project. Install and enable the module like the following

```bash
yarn add -D @nuxtjs/tailwindcss
```

nuxt.config.js{.file}
```js
{
  buildModules: [
    '@nuxtjs/tailwindcss'
  ]
}
```

So far the module integration is finished. From here you can decide to

* jump straight to [7. Use TailwindCSS in your application](#7-use-tailwindcss-in-your-application)
* read more about the module configuration in the [docs](https://github.com/nuxt-community/tailwindcss-module){target="_blank" rel="noopener"}.
* keep reading for a better understanding how everythings work under the hood

## 2. Install/Upgrade TailwindCSS manually

For those of you who want to know how everything is coupled together we will integrate TailwindCSS and PostCSS manually to Nuxt.


Start your terminal. `cd` to your project and install TailwindCSS and PostCSS.

```bash
npm install tailwindcss postcss-import postcss-nested --save-dev
# or
yarn add -D tailwindcss postcss-import postcss-nested
```

### 2.1 Add the Tailwind `tailwind.config.js` to your project

If you don't have a Tailwind config file in your project root directory then create a file called `tailwind.config.js` or if you upgrading [rename](https://tailwindcss.com/docs/upgrading-to-v1#3-rename-tailwind-js-to-tailwind-config-js){target="_blank" rel="noopener"} your existing config file.

Put the following code snippet inside the `tailwind.config.js` or adjust your existing file according to the new [defaults](https://tailwindcss.com/docs/upgrading-to-v1#2-update-your-config-file){target="_blank" rel="noopener"}.

tailwind.config.js{.file}
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

### 2.2 Configure `postcss` in `nuxt.config.js`


`PostCSS` enables us to use advanced logic inside CSS code which isn't supported (yet). More precise it is a transpiler which turns PostCSS syntax to vanilla CSS.

The advantage of using PostCSS is that it's handled via [plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md){target="_blank" rel="noopener"} which gives you a lot of flexibility in your codebase.

Earlier we installed `postcss-import` and `postcss-nested` to the dependencies of our project. For example, the import plugin will resolve the path of an `@import` rule more specifically it will find TailwindCSS styles and import it accordingly.

All of the `postcss` options are handled in `nuxt.config.js`. That means if you have an existing `postcss.config.js` file which is usually in your project root - [migrate](https://nuxtjs.org/faq/postcss-plugins/){target="_blank" rel="noopener"} it to your `nuxt.config.js` file or just copy-paste the snippet below.

nuxt.config.js{.file}
```js
const path = require('path') # Don't forget to add path lib


export default {

  // ... some other code ...

  css: [
      '~assets/styles/tailwind.css', 
  ],


  build: {
      postcss: {
        plugins: {
          'postcss-import': {}
          tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
          'postcss-nested': {}
        }
      },
      preset: {
        stage: 1 // see https://tailwindcss.com/docs/using-with-preprocessors#future-css-featuress
      }
  }

}
```

### 2.3 Add tailwind imports to your styles

As I already mentioned before we use `postcss-import` plugin to build and resolve the TailwindCSS styles.

assets/styles/tailwind.css{.file}
```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
``` 


### 2.4 Use `purgecss` to remove unused CSS in the production build

The big advantage of purgecss is that your production website will get stripped of unused css which results in small css outputs. 

First, we're going to install the `nuxt-purgecss` module

```bash
npm install nuxt-purgecss --save-dev
# or
yarn add -D nuxt-purgecss
```

Enable this module inside the `modules` section of your `nuxt.config.js`. You don't need to write a specific Tailwind Extractor since `nuxt-purgecss` does this by [default](https://github.com/Developmint/nuxt-purgecss#defaults){target="_blank" rel="noopener"}.

PurgeCSS will only run on `nuxt generate`, `nuxt build` or `nuxt start`.

```js
{
  modules: [
    'nuxt-purgecss',
  ],
  purgeCSS: {
    mode: 'postcss',
    enabled: (process.env.NODE_ENV === 'production')
  }
}
```



## 3. Simple Demo - use TailwindCSS in your application

This is what we've all waiting for - let's build a simple page with TailwindCSS
to check if everything works as expected.

pages/index.vue{.file}
```html
<template>
  <section class="container">
    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-1 bg-gray-200 px-4 pb-12">
        <Logo width="100%" height="250"/>
        <h3 class="text-xl mb-4">My Blog</h3>
        <ul>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">About</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="col-span-2">
        <div class="mt-12">
          <h1 class="text-5xl pb-2">Some title</h1>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>
``` 

🎉 Congratulations! You have successfully integrated TailwindCSS with Nuxt.js


## How to use Google Fonts with Nuxt.js and TailwindCSS

If you want to use Google Fonts or maybe Adobe Typekit its really easy to achieve it with this setup. We will use the [nuxt-webfontloader](https://github.com/Developmint/nuxt-webfontloader){target="_blank" rel="noopener"}.

```bash
npm install --save-dev nuxt-webfontloader
# or
yarn add -D nuxt-webfontloader
```
Include the `nuxt-webfontloader` to `module` section of `nuxt.config.js`

```js

export default {

  // ... other code

  modules: [
    'nuxt-webfontloader',
  ],

  webfontloader: {
    google: {
      families: ['Lato:400,700'] //Loads Lato font with weights 400 and 700
    }
  },
}
```

A common use case could be that you want to add a custom font to one of the Tailwind default fonts which are `font-sans`, `font-serif`, and `font-mono`. What we're going to do is to add the custom font `PT Mono` to the default `mono` font family stack.

tailwind.config.js{.file}
```js
// load default theme settings
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'PT Mono',
          ...defaultTheme.fontFamily.mono,
        ]
      },
    }
  }
}
```

You can `apply` the sans fontFamily style to the `html` like below.

assets/styles/_site.css{.file}
```css
html {
  @apply font-mono;
}
``` 

Or you can use it directly in your markup.

```html
<p class="font-mono">
  Hello world!
</p>
```

## How to use SASS with TailwindCSS + PostCSS

If you would like to use sass in combination with postcss here are the steps to enable it. 

If you don't need sass then try to avoid mixing it with postcss. If you mix multiple processors your code will on the long term be harder to maintain. PostCSS has a lot of [plugins](https://www.postcss.parts/) which gives you features where you probably don't need sass.{.tip}  


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
  ],
```

```js
const path = require('path')

export default {
  mode: 'spa',
  head: {
    title: 'TailwindCSS + PostCSS + Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: [
    '~assets/styles/tailwind.css', 
  ],
  modules: [
    // Doc: https://http.nuxtjs.org
    'nuxt-purgecss',
    'nuxt-webfontloader'
  ],

  webfontloader: {
    google: {
      families: ['Lato:400,700'] //Loads Lato font with weights 400 and 700
    }
  },

  purgeCSS: {
    mode: 'postcss',
    enabled: (process.env.NODE_ENV === 'production')
  },

 build: {
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      'postcss-nested': {}
    }
  },
  preset: {
    stage: 1 // see https://tailwindcss.com/docs/using-with-preprocessors#future-css-featuress
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        tailwindConfig: {
            test: /tailwind\.config/,
            chunks: 'all',
            priority: 10,
            name: true
          }
        }
      }
    }
  }
};
```

## Demo / Source Code

[![Edit nuxtjs-tailwindcss-postcss-starter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/silly-haibt-4lcn8?fontsize=14&hidenavigation=1&theme=dark)

[Source on Github](https://github.com/regenrek/nuxt-tailwind-postcss-starter)
{target="_blank" rel="noopener"}

## Read more

[Tailwind CSS best practices](https://gist.github.com/sandren/0f22e116f01611beab2b1195ab731b63){target="_blank" rel="noopener"}
[Tailwind Documentation](https://tailwindcss.com/){target="_blank" rel="noopener"}
[TailwindCSS module for NuxtJS](https://github.com/nuxt-community/tailwindcss-module){target="_blank" rel="noopener"}