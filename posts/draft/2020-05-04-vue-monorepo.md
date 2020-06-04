


In this tutorial we will build a really small and simple monorepo with a ui library and some reusable functions which can be shared between multiple projects. 

If you work in a agency where you build websites for different clients you will need the same components (e.g. sidebar, header, footer) over and over. So you can either create the components in the project itself every time or you create a separate project which you include in your websites. 

We will take the second approach but put everything in one repository so we don't need to bother with dependency management all the time.


We start with the following directory hierarchy.

```bash
vue-monorepo/
--| packages/ 
----| components/  # reusable components
----| composables/ # reusable functions 
--| projects/
----| restaurant-website/ # example projects
----| fitness-website/
----| ecommerce-website/
----| ....
```


* Create a new project
```bash
cd projects

npx create-nuxt-app mywebsite

create-nuxt-app v2.15.0
✨  Generating Nuxt.js project in nujek-starter
? Project name nujek-starter
? Project description My remarkable Nuxt.js project
? Author name Kevin Regenrek
? Choose programming language TypeScript
? Choose the package manager Yarn
? Choose UI framework Tailwind CSS
? Choose custom server framework None (Recommended)
? Choose the runtime for TypeScript @nuxt/typescript-runtime
? Choose Nuxt.js modules (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose linting tools ESLint
? Choose test framework Jest
? Choose rendering mode Single Page App
? Choose development tools jsconfig.json (Recommended for VS Code)
```



pages/index.vue
```
<template>
  <div class="container">
    <div>
      <NjSidebar />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import NjSidebar from '../../../packages/nujek-ui/components/NjSidebar/NjSidebar'

export default Vue.extend({
  components: {
    NjSidebar
  }
})
</script>
```


* lerna.json{.file}
{
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}

* package.json{.file}
```bash
{
  "private": true,
  "version": "0.0.1",
  "main": "index.js",
  "devDependencies": {
    "lerna": "^3.20.2"
  },
  "workspaces": [
      "packages/*",
      "projects/*" 
  ],
  "scripts": {
    "bootstrap": "lerna bootstrap"
  }
}
```

```bash
cd packages/
mkdir nujek-ui
````

* packages/nujek-ui/package.json
```bash
{
    "name": "@nujek/ui",
    "version": "0.0.1",
    "description": "Nujek UI",
    "author": "Kevin Kernegger <hello@regenrek.at>",
    "repository": "git@github.com:regenrek/nujek.git",
    "license": "MIT",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: run tests from root\" && exit 1",
        "release": "git push --follow-tags && npm publish"
    },
    "publishConfig": {
        "access": "public"
    }
}
``` 

*
```
yarn bootstrap
```


```
<template>
  <div class="container">
    <div>
      <NjSidebar />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import NjSidebar from '@nujek/ui/components/NjSidebar/NjSidebar'

export default Vue.extend({
  components: {
    NjSidebar
  }
})
</script>
```


or even shorter

```
import { NjSidebar } from '@nujek/ui'
```


* packages/nujek-ui/index.js
```js
import NjSidebar from './components/NjSidebar/NjSidebar'

export {
    NjSidebar
}
```

To make this work we need to release our package again..

## Local packages

```
cd packages/nujek-ui/
yarn link

cd projects/nujek-starter/
yarn link "@nujek/ui"
````

* Restart server

```bash
yarn dev
```



