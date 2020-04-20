---
title: Create a frontmatter Markdown powered Blog with Nuxt.JS
summary: 
date: 2020-04-19
tags:
  - post
  - nuxt-js
  - markdown
image: 2019/02-post-website-nuxt
image_alt: 02-post-website-nuxt
---

## Introduction

Hey Everyone in this article we're going to create a simple blog with nuxt.js and markdown functionality. 

### Why I should use markdown?

I personally love the clean and foolproof way to write any content with markdown. You don't need to care about writing your posts with HTML and that means you avoid like missing closing tags or quotation marks. Even if you copy your text from another source like Microsoft Word you don't get improper styling and many more.

Initially I started to extend my project with the popular [nuxtent](https://github.com/nuxt-community/nuxtent-module){target="_blank" rel="noopener"} module to achieve blog functionality with nuxt. But I wasn't happy with it in the end (got stuck multiply times and couldn't find an appropriate solution - probably my fault). So I decided to go with [hmsk - frontmatter library](https://github.com/hmsk/frontmatter-markdown-loader-vue-sample){target="_blank" rel="noopener"} and implemented everything manually which gives me more flexibility at the end of the day.

Before we start here are some cool things you get with frontmatter loader:

* **[Frontmatter](https://jekyllrb.com/docs/front-matter/){target="_blank" rel="noopener"} markdown** - keeps metadata inside your post or page written in `YAML`. E.g. custom variables `hero-image` or `author`.
*  [Optional] You can use your vue components inside markdown easily.
*  [Optional] Use your own markdown compiler

## 1. Setup Project

### 1.1 Create new nuxt project

If you're starting from scratch you have to generate a new nuxt project.

```bash
npx create-nuxt-app my-blog
```

## 1.2 Enable `markdown`

To parse markdown you need an appropiate loader so we add `frontmatter-markdown-loader` to our project.

```bash
npm install frontmatter-markdown-loader
# or
yarn add frontmatter-markdown-loader
```

To use it extend the webpack loader inside `nuxt.config.js` in the `build` section
and add the `path` package on top of the config

```js
const path = require("path");


export default {


  // more config ...
  build: {
    extend(config, ctx) {
      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META]
        }
      });
    }
  }
}


```

If you not familiar with webpack here is an explanation of the above snippet:

* With `config.module.rules.push` we're extending the webpack module bundler with some additional fancy functionality.
* We only want to handle `.md` file extensions
* inside the `content` folder. 
* Finally we tell webpack that we want to use a custom loader called `frontmatter-markdown-loader`. This loader is like a predefined "task" which is **responsible** for **transforming** our **markdown code to json** so we can process and use it in our nuxt project.
* Since we're using two different modes we get an markdown parsed vue component (`Mode.VUE_COMPONENT`) and with `Mode.META` we can get the filename easily. 

If you need more info on frontmatter-markdown loader modes and options see [here](https://hmsk.github.io/frontmatter-markdown-loader/options.html){target="_blank" rel="noopener"}


## 2. Let's create your first blog post with nuxt

In the loader configuration above we defined that all our markdown files will be inside a `content` folder. So please create this folder now: 

```bash
mkdir content
```

Finally add a new file called `2019-05-02-my-first-blogpost.md` inside this folder. You can put any content you like into the blogpost. Just tell your first story to the future audience.

```markdown

---
title: Why I don't care about the starbucks cup in Game of Thrones
---

Hey Everyone, this is simple a test blog post to show you
the functionality of nuxt markdown blog.

```

## 3. Configure your post url structure with nuxt router

Now ask yourself how you would like to call your blogpost in the browser. I decided to go with the following structure:

* **View all posts** `http://localhost:3000/posts` 
* **View a single post** `http://localhost:3000/posts/yyyyy-mm-dd-my-post` 

To achieve this behaviour we need to add a [dynamic route](https://nuxtjs.org/guide/routing/){target="_blank" rel="noopener"} which is pretty easy with nuxt.

* Create a new folder `posts` inside the `pages` directory.
* Follow up with creating a new dynamic Page with underscore prefix `_slug.vue`.

```bash
pages/
--| posts/
-----| _slug.vue
```

With this setup you will have dynamic routes enabled without any additional setup. For example you can do this now:

```bash
http://localhost:3000/posts/<slug>

http://localhost:3000/posts/2019-05-03-my-first-website
http://localhost:3000/posts/2019-09-04-my-second-post-in-a-while
http://localhost:3000/posts/2022-09-04-why-i-hate-blogging
```

## 4 Create the template for a single post  

Now we're going to build our template for our blogpost. This is done via [nuxt pages](https://nuxtjs.org/guide/views#pages){target="_blank" rel="noopener"} which is nothing more than a `vue component` with additional attributes and functions. 

* `pages/posts/_slug.vue`
```html
<template>
  <div>
    <h1>{{ title }}</h1>
    <component :is="singlePostComponent" />
  </div>
</template>
<script>
export default {
  async asyncData({ params }) {
    try {
      console.info(params.slug);
      let post = await import(`~/content/${params.slug}.md`);
      return {
        title: post.attributes.title,
        singlePostComponent: post.vue.component
      };
    } catch (err) {
      console.debug(err);
      return false;
    }
  }
};
</script>
```

## 5. List all your blogposts

Update your posts folder with a new file called `index.vue`. Again we're using dynamic routing here.

```bash
pages/
--| posts/
-----| _slug.vue
-----| index.vue <- add this
```

Now lets read all blogposts in the `content` folder and output and loop through the results.

```html
<template>
    <div>
        <h1>My blog posts</h1>
        <ul>
            <li v-for="post in posts" :key="post.attributes.title">
                <nuxt-link to="getPermalink(post)">{{ post.attributes.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  async asyncData() {
    const resolve = require.context("~/content/", true, /\.md$/);
    const imports = resolve.keys().map(key => {
      const [, name] = key.match(/\/(.+)\.md$/);
      return resolve(key);
    });
    return {
      posts: imports
    };
  },
  data() {
    return {
      prefix: 'posts'
    }
  },
  methods: {
    getPermalink(post) {
        return  `${this.prefix}/${post.meta.resourcePath.split('\\').pop().split('/').pop().split('.')[0]}`;
    }
  }
};
</script>
```


Test it:

```bash
http://localhost:8080/posts/
```

## 6. Generate routes dynamically for Static Site hosting (SSG)


Since we're using dynamic routing we can't guess which routes are necessary. So we need to make this work on the live hosting server with the nuxt `generate` option. That means if we're going deploy and compile the project on the server for example on netlify (JAMStack) with `npm run generate` or `nuxt generate` it will handle dynamic post generation inside the content folder. 

* The `getDynamicPaths` will generate an url based on the prefix path given and the filename
* The configs `export default` is now an  `export default async()` function so it can handle our dynamic Path generation
* Finally call the `getDynamicPaths` function 

* nuxt.config.js
```js
var glob = require('glob');

async function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
    })
  );
}

export default async () => {
  
  // ... other code
    
  generate: {
    routes:  await getDynamicPaths({
      '/posts': 'posts/*.md'
    })
  }
}
```


## 7. Why nuxt?

Nuxt is great for creating simples websites, blogs and advanced web applications. In fact its a really well written framework for individual needs. It is still more [popular](https://www.npmtrends.com/nuxt-vs-vuepress-vs-gridsome){target="_blank" rel="noopener"} than gridsome or vuepress.  

### 7.1 Isn't `vuepress` made for this kind of scenario?

[Vuepress](https://vuepress.vuejs.org/guide/#todo){target="_blank" rel="noopener"} is designed for static content websites and provide some fancy features for documentation focused websites. So in fact it's kind of the same what we're doing here - yes.
 
 But I'm familiar with nuxt and sometimes I want to combine application logic with markdown content. 
 
 If you really just need full blog functionality and nothing more you should look into [11ty.io](https://11ty.io/docs/){target="_blank" rel="noopener"} Static Site Generator too which is written in pure javascript. Also this blog regenrek.com is poweredy by eleventy ssg.

## 8. Summary

That's it we have written a simple blog with blog with nuxt markdown functionality. If you want to read more on this topic you can check out the author of the frontmatter-markdown-loader repository. So big credits to him [https://medium.com/haiiro-io/compile-front-matter-markdown-as-vue-template-9ccd55afb672](https://medium.com/haiiro-io/compile-front-matter-markdown-as-vue-template-9ccd55afb672){target="_blank" rel="noopener"}

## Demo

[Source on Github](https://github.com/regenrek/nuxt-blog-frontmatter-markdown-loader){target="_blank" rel="noopener"}

## Whats next?{data-toc-exclude}

In the next post we're going to add netlify cms to our website so we can create dynamic content.


## Changelog{data-toc-exclude}

*Update: 2020-04-19*

* Works with newest frontmatter-markdown 3.1.x version
* Added optional permalink option  
* Added The github source code
