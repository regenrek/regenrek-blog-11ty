---
title: Create a frontmatter Markdown powered Blog with nuxt js in 2019
summary: 
date: 2019-05-10
tags:
  - post
  - nuxt
  - markdown
image: 2019/02-post-website-nuxt
image_alt: 02-post-website-nuxt
---

Hey Everyone in this article we're going to create a simple blog with nuxt and markdown functionality. 

## Why markdown?

I personally love the clean and foolproof way to write any content with markdown. You don't need to care about writing your posts with html and that means you avoid like missing closing tags or quotation marks. Even if you copy your text from another source like Microsoft Word you don't get improper styling and many more.

Initially I started to extend my project with the popular [nuxtent](https://github.com/nuxt-community/nuxtent-module){target="_blank" rel="noopener"} module to achieve blog functionality with nuxt. But I wasn't happy with it in the end (got stuck multiply times and couldn't find an appropriate solution - probably my fault). So I decided to go with [hmsk - frontmatter library](https://github.com/hmsk/frontmatter-markdown-loader-vue-sample){target="_blank" rel="noopener"} and implemented everything manually which gives me more flexibility at the end of the day.

Before we start here are some cool things you get with frontmatter loader:

* **[Frontmatter](https://jekyllrb.com/docs/front-matter/){target="_blank" rel="noopener"} markdown** - keeps metadata inside your post or page written in `YAML`. E.g. custom variables `hero-image` or `author`.
*  [Optional] You can use your vue components inside markdown easily.
*  [Optional] Use your own markdown compiler

## Install

If you're starting from scratch you have to generate a new nuxt project.

```bash
npx create-nuxt-app my-blog
```

Start with adding `frontmatter-markdown-loader` to handle markdown file parsing in your project.

```bash
npm install frontmatter-markdown-loader
# or
yarn add frontmatter-markdown-loader
```

To use it extend the webpack loader inside `config.nuxt.js` in the `build` section. 

```js
build: {
    extend(config, ctx) {
        
        // ... other code ...
        
        // add frontmatter-markdown-loader
        config.module.rules.push(
            {
                test: /\.md$/,
                include: path.resolve(__dirname, "content")
                loader: "frontmatter-markdown-loader",
            }
        );
    }
}
```

If you not familiar with webpack here is an explanation of the above snippet:

* With `config.module.rules.push` we're extending the webpack module bundler with some additional fancy functionality.
* We only want to handle `.md` file extensions
* inside the `content` folder. 
* Finally we tell webpack that we want to use a custom loader called `frontmatter-markdown-loader`. This loader is like a predefined "task" which is **responsible** for **transforming** our **markdown code to json** so we can process and use it in our nuxt project.


## Lets create yur first blog post

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

## The url structure

Now ask yourself how you would like to call your blogpost(s)in the browser. I decided to go with the following structure:

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

## Create the template for a single post  

Now we're going to build our template for our blogpost. This is done via [nuxt pages](https://nuxtjs.org/guide/views#pages){target="_blank" rel="noopener"} which is nothing more than a `vue component` with additional attributes and functions. 

* `pages/posts/_slug.vue`
```html
<template>
  <div>
    <div class="post-title">
      <h1>{{ post.attributes.title }}</h1>
    </div>
    <div class="content" v-html="post.html"></div>
  </div>
</template>
<script>
  export default {
    async asyncData({ params }) {
      try {
        let post = await import(`~/content/${params.slug}.md`);
        console.debug(post)
        return {
          post
        }
      } catch(err) {
        console.debug(err)
        return false
      }
    }
  }
</script>
```

## List all your blogposts

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
                <nuxt-link to="#">{{ post.attributes.title }}</nuxt-link>
            </li>
        </ul>

    </div>
</template>
<script>
  export default {
    async asyncData() {
      const resolve = require.context("~/content/", true, /\.md$/)
      const imports = resolve.keys().map((key) => {
        const [, name] = key.match(/\/(.+)\.md$/);
        return resolve(key);
      });
      return {
        posts: imports
      }
    },
  }
</script>
```


Test it:

```bash
http://localhost:8080/posts/
```

## Generate routes dynamically for Static Site hosting


Since we're using dynamic routing we can't guess which routes are necessary. So we need to make this work on the live hosting server with the nuxt `generate` option. That means iif we're going deploy and compile the project on the server for example on netlify with `npm run generate` or `nuxt generate` it will handle dynamic post generation inside the content folder 

Add the following snippet to your `nuxt.config.js`

```js
var dynamicRoutes = getDynamicPaths({
 '/posts': 'posts/*.md'
});

export default {
    
  // don't replace other code just add the
  // generate attribute
    
  generate: {
    routes: dynamicRoutes
  }
}

/* https://github.com/jake-101/bael-template */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
    })
  );
}
```  




## Why nuxt?

Nuxt is great for creating simples websites, blogs and advanced web applications. In fact its a really well written framework for individual needs. It is still more [popular](https://www.npmtrends.com/nuxt-vs-vuepress-vs-gridsome){target="_blank" rel="noopener"} than gridsome or vuepress.  

## Isn't `vuepress` made for this kind of scenario?

[Vuepress](https://vuepress.vuejs.org/guide/#todo){target="_blank" rel="noopener"} is designed for static content websites and provide some fancy features for documentation focused websites. So in fact it's kind of the same what we're doing here - yes.
 
 But I'm familiar with nuxt and sometimes I want to combine application logic with markdown content. 
 
 If you really just need full blog functionality and nothing more you should look into [11ty.io](https://11ty.io/docs/){target="_blank" rel="noopener"} Static Site Generator too which is written in pure javascript. Also this blog regenrek.com is poweredy by eleventy ssg.

## Summary

That's it we have written a simple blog with blog with nuxt markdown functionality. If you want to read more on this topic you can check out the author of the frontmatter-markdown-loader repository. So big credits to him [https://medium.com/haiiro-io/compile-front-matter-markdown-as-vue-template-9ccd55afb672](https://medium.com/haiiro-io/compile-front-matter-markdown-as-vue-template-9ccd55afb672){target="_blank" rel="noopener"}

## Whats next?

In the next post we're going to add netlify cms to our website so we can create dynamic content.

