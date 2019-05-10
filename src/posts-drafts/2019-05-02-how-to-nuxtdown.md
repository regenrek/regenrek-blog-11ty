---
title: Create a Markdown powered Blog with nuxt and nuxtent module
summary: 
date: 2019-05-02
tags:
  - post
  - nuxt
image: 2019/02-post-tailwind-1_0_0-nuxt
image_alt: tailwind-1.0.0-nuxt
---

Hey Everyone in this article we're going to implement blog functionality with nuxt and the nuxtent module which gives us all we need to suceed.

Start your terminal. `cd` to your project and install nuxtent module.

## Install

```bash
npm install nuxtent
# or
yarn add nuxtend
```

Enable it inside the module section in your `nuxt.config.js` file. 

```js
modules: [
   'nuxtent'
 ]
```

## Lets create a first blog post

You wil need to store your blogpost in a separate folder which is
default the `content folder`

```bash
mkdir content
```

Create a new file called `2019-05-02-my-first-blogpost.md` and put it into the
new content folder. 

__Attention:__ Either you name your posts with `YYYY-MM-DD-<post-name>.md` or you set `isPost: false`. If you miss this the compiler will raise a error.

```

---
title: Yo see my first blog post!
---

... it's going to happen.

```

Test your Blog post

You can open up your browser and type `http://localhost:3000/content-api` this is the url which nuxtent will generate to serve your posts/pages. I use [postman](https://www.getpostman.com/){target="_blank" rel="noopener"} for that scenario. 

POSTMAN IMAGE @todo
[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"


