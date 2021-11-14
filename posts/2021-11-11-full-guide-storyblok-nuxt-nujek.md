---
title: Full Guide to build a Job Board website app with Nuxt, Storyblok and Nujek
summary: This guide will help you to build your scheme, frontend and connect everything together to build a simple job board website with Storyblok, Nuxt and Nujek Framework.
date: 2021-11-10
tags:
  - post
  - storyblok
  - vue-js
  - nuxt-js
  - nujek
image: 2021/nuxt-storyblok-nujek
image_alt: 
permalink: /posts/nuxt-js-storyblok-nujek-job-board-website-tutorial/
---

This post is a work in progress. It's kind of a preview for early readers. No grammar check. No review yet. {.tip}  


{% myCustomImage "/assets/images/2021/nuxt-storyblok-nujek-job-board.gif", "nuxt storyblok nujek job board" %}

## Demo

- 🎲 [Demo](https://nujek-job-board.vercel.app/){target="_blank" rel="noopener"} 
- 🐱 [Github](https://github.com/regenrek/nujek-job-board){target="_blank" rel="noopener"} 

## 1. Introduction

Personally I prefer a hands-on guide where you can see the progress of the app you like to build. So first get sure you prepare your workspace with the following tools.

* [Nuxt.js](https://nuxtjs.org/)
* NodeJS
* Yarn
* TailwindCSS
* [Nujek framework](https://nujek.io/){target="_blank" rel="noopener"} 
* Storyblok Account with a fresh space

## 2. Build the Storyblok Schema

You will need to create a new space on [app.storyblok.com](http://app.storyblok.com/){target="_blank" rel="noopener"}.

We're going to start building the Storyblok CMS scheme first. Then we will create stories based on the scheme and will fill it with some sample data like job posts e.g.

My approach to explain Storyblok to anyone is that I divide the needed steps into 3 pillars. 


```bash
- Pillar I - Content Types (Blueprint)
- Pillar II - Components Bloks (Used by Content Types)
- Pillar III - Content Creation (Choose a Content Type and fill it with Component Bloks)
```

## 3. Pillar I - Understand Storyblok Content Types

With Content Types you define the schema for the content you later want to create. Probably best explained with an example: Imagine two authors want to publish blog posts on their new blog website. Both of them will agree on a set of fields how a blog post should look like. 

Basically they will need a `title`, `content` and maybe an `author` field. The blueprint with these three fields will be used by both of the authors and each of them know which fields they need to fill in to publish this post. Thats a content type. A defined schema of how your content will be build up.

### 3.1 Create the "Job" Content Type

On our job board we want to give the author the possibilities to add many job listings to our final website. So we need to prepare a scheme - a job content type to his Storyblok space.

To build this scheme do the following:

* Navigate to: Components -> New.
* **{1}** - Name: **Job**.
* **{2}** - Tick **"Act as content type"**.
* Hit **Next**.

{% myCustomImage "/assets/images/2021/01-storyblok-new-component.png", "create new storyblok component" %}

A typical job listing content type could need the following fields:

* Job title | title | text
* Job Description | description | richtext
* Salary | salary | text)
* ... and so on

The next screen let you define the fields which the content type supports. 

* **{1}** - Add the 3 fields to it.
* Click **Save schema**

{% myCustomImage "/assets/images/2021/02-storyblok-content-type-scheme-job-board.png", "storyblok content type scheme job board" %}

### 3.2 Create a "flexible" Default Content Type

Since we have removed all default content types from the demo space (if not you can do it) we're going to create a new content type which will act as our base **Landingpage** type. 

With this special content type we will introduce the "Blocks" field. Which allows us to add and order flexible Website Section to each of our pages. The landingpage content will be used widely and on the frontpage.

As you probably already know - Storyblok offers this great visual block based editor which makes website and landingpage building very flexible and scalable. To achieve this you will absolutly need "Blocks" field on the content type{.tip}

* Navigate to: Components -> New.
* **{1}** - Name for content type: **Landingpage**.
* **{2}** - Tick **"Act as content type"**.
* Hit **Next**.

{% myCustomImage "/assets/images/2021/01-storyblok-new-component.png", "how to create a new storyblok content type" %}

* **{1}** - Add a field title and the mentioned "Blocks" Field type. **Important:** Use `bloks` as name for the field to make it work with Nujek framework (will exaplin later in the tutorial)

{% myCustomImage "/assets/images/2021/02-storyblok-blok-dynamic.png", "storyblok dynamic bloks" %}


## 4. Pillar II - Create Storyblok Component Bloks

We have already learned about **content types** in the previous section. Now we will talk about "Bloks". 

Lets take this hierachy to see a clearer picture

```bash
 - Content Type
   - Field
    - Blok
    - Blok
    - Blok
    ...
```

Or even better:

```bash
 - Content Type: Landingpage
   - Field: title
   - Field: bloks (Blocks Field type)
    - Blok: BlokHero
    - Blok: BlokSlider
    - Blok: BlokText
    ...
```

So that means our content type **Landingpage** allows us to insert as many bloks as we want in to our `bloks` field. (Kind of confusing I know).

But in practice you will do the following:
* Create Page called "My Landingpage" with content type **"Landingpage"**
* Create different Bloks (Text, Images, Sliders, endless possibilities) inside the page you have created based on the given content type.


### 4.1 Hero Blok

Ok enough talking. Lets continue with creating our flexible bloks. We will start with the `Hero` component which is a nice header component to make our new website shiny 🌟.

Lets start with a simple `hero` component.

* Components -> New
* Name for content type: **BlokHero** (**Important:** Use the prefix "Blok" to make it work with Nujek Framework)
* **Don't** tick - "Act as content type" !


{% myCustomImage "/assets/images/2021/03-hero-blok.jpg", "storyblok blok component scheme how to" %}

* Now choose your fields. Add a title and a `assets` field type with options `image` & `video`.

{% myCustomImage "/assets/images/2021/04-hero-fields.jpg", "storyblok blok component fields" %}

### 4.2 Jobs Blok

As we will build a job board we need a simple job listing blok for the frontpage. So lets create a blok which will handle the blog listing later on.

* `Components -> New`
* Name for content type: `BlokJobsList`
* **Don't** tick - `Act as content type` !
* Just save scheme and lets deal with possible fields later here.


I highly recommend to make use of the component groups to **organize** your **content-types/** and **bloks/**. The blok amount will grow quickly with a bigger website. Also you can constraint the Landingpage **bloks** Bloks field that it's only allowed to choose from a specific folder.{.tip}

## 5. Pillar III - Create Storyblok Content

A long way to go isn't it? If you get into schema creation it just will take you about 20-30 minutes to build a initial schema which you can always adapt later. 

Now the third and last pillar of Storyblok setup is to create our content. 

### 5.1 Create multiple job listings

Since we want to build some job board we will need some jobs to list on the board. 

* Go to the **Content** folder on the left sidebar and add a folder named **Jobs**
* **{1}** - Name is **Jobs**
* **{2}** - Choose the default content **Jobs** which we created earlier
* Hit save

{% myCustomImage "/assets/images/2021/08-jobs-folder-creation.png", "storyblok job board - create folder" %}

* Open the **Jobs** folder and quickly add 3 jobs with **+Entry**`** Button in the right-upper corner.

{% myCustomImage "/assets/images/2021/09-storyblok-job-board.png", "storyblok job board - create posts" %}

### 5.2 Create the homepage

Our homepage will the site which you will see first when you go to your url or in dev `http://localhost:3000`. We will make now use of **Landingpage** with our flexible **bloks** Component to add multiple bloks to it.

* Go to the `Content` folder on the left side and delete the default `Home` Story page.

* Click on **+Entry** (In the right upper corner)
* Add new story with Name and content Type `Landingpage`

{% myCustomImage "/assets/images/2021/05-create-home-page-storyblok.png", "storyblok create homepage" %}

* **{1}** - Switch to preview urls and set it to `http://localhost:3000/`
* **{2}** - In the right tab menu click `Config` and then... 
* **{3}** - update `Real Path` to `/`
* Click on **publish**

**Attention:** Set your preview url to `http://` and not `https://`. It's a mistake I made which you can see in the following screenshots.{.tip}

{% myCustomImage "/assets/images/2021/06-home-page-settings-storyblok.png", "storyblok create homepage settings" %}

Fill the homepage with some `bloks`.

* Click **+ Add Blocks** and add `BlokHero` and `BlokJobs`
* **{1}** - Add some title for the current page (maybe used later - just to demonstrate fields on content types)
* **{2}** - Add some 🖍️ fancy `title` and `image` to the hero component
* Click on publish

{% myCustomImage "/assets/images/2021/07-fill-content-storyblok.png", "storyblok fill content" %}


We don't have any preview to see how our content looks like. We just built our CMS Content Structure and thats it. 

In the next part we will build the job board with Nuxt.Js and [Nujek](https://nujek.io){target="_blank" rel="noopener"} and connect it to Storyblok. 


## 6. Building the Job Board frontend

### 6.1 Project Setup

From now its probably better to build our website and lets see how our scheme looks in the frontend. We're going to build our frontend very straight forward with

* Nuxt.js
* TailwindCSS
* [Nujek](https://nujek.io/){target="_blank"}

I won't go through all steps here since there is already a detailed tutorial on the nujek [documentation](https://nujek.io/documentation/getting-started/installation){target="_blank"} how you can quickly build up your project.

Choose between **Manual Setup** or **Clone the repository** step. What you prefer...

**Start with Manual Setup...**

Read the [install docs](https://nujek.io/documentation/Installation/manual-install#quick-installation-with-nujekbundle){target="_blank"} from nujek and come back later when you finished.

**... or clone the repository**

If you're really lazy like I'm and you don't want to install from scratch then just clone the repository here and checkout the **boilerplate** branch.

```bash
git clone git@github.com:regenrek/nujek-job-board.git
git checkout boilerplate
```

**Important:** Create a `.env` file and add your Storyblok API Token to it{.tip}

* 📝 &nbsp;&nbsp;`.env`
```bash
SB_CLIENT_ACCESS_TOKEN=<your-token>
```

Install & run

```bash
yarn;yarn dev
```

### 6.2 Run the application

If you run the application with the following command you should see something like this

```bash
yarn dev
```
{% myCustomImage "/assets/images/2021/10-nujek-intro.png", "storyblok fill content" %}

What you see on this screen is your previously created content type **"Landingpage"**. If you wonder how this already working I can tell you:

The nujek module in the `nuxt.config.js` is acting as a bridge to Storyblok. Thats all! If you want to read more on nujek you can dig into [nujek docs](https://nujek.io/documentation/){target="_blank"} later.

* 📝 &nbsp;&nbsp;`nuxt.config.js`
```js
  buildModules: [
    '@nujek/bundle',
    // other entries
  ],

  nujekStoryblok: {
    storyblokConfig: {
      accessToken: process.env.SB_CLIENT_ACCESS_TOKEN
    }
  },  
```


### 6.3 Build the "Landingpage" component

First we start with building the content types in our frontend (like we did before in Storyblok). 

**Good to know:** Nujek gives you already prewritten code snippets. Click on the **Component** Tab and copy-paste the code you need for the Landingpage.{.tip}

{% myCustomImage "/assets/images/2021/11-nujek-landingpage-blok-component.png", "nujeklandingpage blokcomponent" %}

* The Slot `<slot name="bloks" />` is used to place it on the correct position within the Landingpage.
* In our example we just use the slot to show underlying bloks.

<br />

* 📝 &nbsp;&nbsp;`content-types/Landingpage.vue`
```html
<template>
  <div>
    <!-- render dynamic bloks from `Landingpage` content type -->
    <slot name="bloks" />
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
```

Save the file and reload your page (Sometimes you need to reload the dev server too). 

If you open the **Home** Page in Storyblok you can see the relation between CMS and your frontend. This should now all make more sense. 🙌

{% myCustomImage "/assets/images/2021/12-nujek-preview.png", "nujeklandingpage blokcomponent" %}

### 6.4 Build "BlokHero" component

Next we're going to `BlokHero` component to show some fancy hero title.

* Create `bloks/BlokHero.vue` file
* You will always get a `bloks` prop object where you filled fields are stored.
* Use `blok` prop to fill components like for `<SbImage :src="blok.image" />` ([SbImage](https://nujek.io/components/images))


The `blok` prop contains all your fields from Storyblok. It populates data to each of your `Blok` components. Earlier we have defined a `title` and a `image` for the `BlokHero` component. Now you can access them easily with

{% raw %}


```html
<div>
  <h1>{{ blok.title }}</h1>
  <img :src="blok.image.filename" />
</div>
```
{% endraw %}

<br />


* 📝 &nbsp;&nbsp;`bloks/BlokHero.vue`
```html
<template>
  <div v-editable="blok">
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="relative shadow-xl sm:overflow-hidden">
          <div class="absolute inset-0">
            <SbImage
              v-if="blok.image"
              :src="blok.image"
              :classes="{picture: 'aspect-ratio-16/9', image:'object-cover h-full w-full' }"
              :resize="{ width: '1200', height: '0' }"
            />
            <div class="absolute inset-0 bg-yellow-200 mix-blend-multiply" />
          </div>
          <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span class="block text-white">We're Hiring</span>
              <span class="block text-yellow-200">Join us today!</span>
            </h1>
            <p class="mt-6 max-w-lg mx-auto text-center text-xl text-yellow-200 sm:max-w-3xl">
              We're looking for people to play! :)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
```
{% myCustomImage "/assets/images/2021/13-nujek-blok-hero.png", "nujek storyblok nuxt hero design" %}


### 6.5 Build "BlokJobListing" component

Below the hero we want to show the latest jobs available. 

* We make use of [`<NjSection />`](https://nujek.io/components/sections){target="_blank"} to build consistent container constraints
* To <strong>retrieve multiple stories</strong> from Storyblok (i.e. from `jobs/` folder) Nujek offers the [`<SbQuery />`](https://nujek.io/components/queries){target="_blank"} which we will use in the next example.
* [`<SbQuery />`](https://nujek.io/components/queries){target="_blank"}: Limit posts per page `posts-per-page-client-only` to 1 and use `path` to filter stories by slug. Path is important to retrieve our story collection.
* We use `#default` template to create custom single template for our job items. 

<br />

* 📝 &nbsp;&nbsp;`bloks/BlokJobListing.vue`
```html
<template>
  <NjSection
    variant="constrained"
    :fixed-classes="{ wrapper: 'pt-12 pb-24', container: 'max-w-3xl' }"
  >
    <div class="shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <SbQuery :posts-per-page-client-only="1" path="jobs" :filter-client-only="true">
          <template #default="story">
            <JobItem :title="story.content.title" :salary="story.content.salary" :link="story.full_slug" />
          </template>
        </SbQuery>
      </ul>
    </div>
    </div>
  </NjSection>
</template>

<script>
export default {
  props: {
    bloks: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
```

Now lets create a reusable component to display a single job item.

* 📝 &nbsp;&nbsp;`bloks/atoms/JobItem.vue`
```html
<template>
  <li>
    <nuxt-link :to="link" class="block hover:bg-gray-50">
      <div class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <p class="text-lg font-medium text-blue-500 truncate">
            {{ title }}
          </p>
          <div class="ml-2 flex-shrink-0 flex">
            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {{ salary }}
            </p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props:
    {
      title: {
        type: String,
        default: ''
      },
      salary: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      }
    }
}
</script>
```

We should now see a single job listing. We set `posts-per-page-client-only` to a value of `1`. Nevermind we can try the infinite loader which get shipped with `<SbQuery>` and click on `Load more`.

{% myCustomImage "/assets/images/2021/14-nujek-job-listing.png", "nujek storyblok nuxt blok job listing design" %}


To show more jobs from the start, lets increase the `posts-per-page-client-only` prop to 5. 


### 6.6 Add Richtext support

As you might remember we used for the `Job` content type the `richtext` (Job description) field type. This field is more complex to render on frontend. Luckily a [package](https://github.com/MarvinRudolph/storyblok-rich-text-renderer/tree/master/packages/storyblok-rich-text-vue-renderer){target="_blank" rel="noopener"} exists which helps us here.

To proceed we need to extend our application with a plugin and add the `VueRichTextRenderer`

* 📝 &nbsp;&nbsp;`plugins/richtext.js`

```js
import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'

Vue.use(VueRichTextRenderer)

```

* Add the **plugin** to the config section
* **Important:** Add the package to `transpile` section!
&nbsp;
* 📝 &nbsp;&nbsp;`nuxt.config.js`
```js
  plugins: [
    { src: '~/plugins/richtext.js' }
  ],

  build: {
    transpile: [
      '@marvr/storyblok-rich-text-vue-renderer'
    ]
  }
```
### 6.7 Create the Job Detail page

We achieved now to show a list of jobs on our homepage from Storyblok. With the help of nujek we already have saved us a ton of time to build our frontend. 

<!-- {% myCustomImage "/assets/images/2021/15-nujek-job-detail-page.png", "nujek storyblok nuxt blok job listing detail design" %} -->

{% myCustomImage "/assets/images/2021/16-nujek-board-single.png", "nujek storyblok nuxt blok job listing detail design" %}


* First rename `pages/index.vue` to `page/_.vue` to create a [catch all route](https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route){target="_blank" rel="noopener"}. The catch all route matches any url you type in.

```bash
pages/
  _.vue
```

Then add the content type template for `Job` content type.

* 📝 &nbsp;&nbsp;`components/content-types/Job.vue`

```html
<template>
  <NjSection
    variant="constrained"
    :fixed-classes="{ wrapper: 'pt-12 pb-24', container: 'max-w-3xl' }"
  >
    <nav aria-label="Back">
      <nuxt-link to="/" class="py-2 text-sm font-medium">
        Back to <b>Job Board</b>
      </nuxt-link>
    </nav>

    <div v-if="blok" class="py-12">
      <h1 class="text-3xl">
        {{ blok.content.title }}
      </h1>
      <SbRichtext class="mt-8" :text="blok.content.description" />

      <span class="block mt-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
          💰 {{ blok.content.salary }} €
        </span>
      </span>

      <button type="button" class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Apply now
      </button>
    </div>
  </NjSection>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
```


{% myCustomImage "/assets/images/2021/nuxt-storyblok-nujek-job-board.gif", "nuxt storyblok nujek job board" %}



If the job description doesn't display at all. Double check if you have added the vue-rich-text-renderer <a href="/posts/nuxt-js-storyblok-nujek-job-board-website-tutorial/#66-add-richtext-support">(6.6 Add richtext support)</a>{.tip}


## 7. Deploy on vercel

Personally I can recommend [vercel](https://vercel.com/){target="_blank" rel="noopener"}, [netlify](https://www.netlify.com/) and [AWS Amplify](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/) for hosting your sites. 

Always check which [rendering mode](link){target="_blank" rel="noopener"} you are targeting for.

For this app we're targeting `ssr` mode and choose **vercel** as hosting provider.

Before you push your project to vercel add a `vercel.json` file to the project root. Read more here: [nuxt/vercel-builder](https://github.com/nuxt/vercel-builder){target="_blank" rel="noopener"}.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/vercel-builder"
    }
  ]
}
```