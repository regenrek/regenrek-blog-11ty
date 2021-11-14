---
title: Understanding Nujek dynamic bloks
summary: A dynamic approach
date: 2020-05-01
tags:
  - post
  - storyblok
  - vue-js
  - nuxt-js
  - nujek
image: 2021/nuxt-storyblok-nujek
image_alt: 
---


### 6.7 Create the Job Detail page

We achieved now to show a list of jobs on our homepage from Storyblok. With the help of nujek we already have saved us a ton of time to build our frontend. 

<!-- {% myCustomImage "/assets/images/2021/15-nujek-job-detail-page.png", "nujek storyblok nuxt blok job listing detail design" %} -->

{% myCustomImage "/assets/images/2021/16-nujek-board-single.png", "nujek storyblok nuxt blok job listing detail design" %}


There are many ways how to build your routes and how to use it with Nujek. I will show you two possible ways to build up your pages. It's good to have different ways since the all have their advantages and disadvantages. So check your use case before.{.tip}

#### Approach 1: Static Single Page

First we need to create new route for the job detail page. In Nuxt.js when you create a page a route will also generated for your nested page structure. Look a this table

<table class="font-consolas">
  <thead>
    <tr>
      <th>Page</th>
      <th>Route</th>
      <th>Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>pages/index.vue</td>
      <td>/<slug></td>
      <td>http://localhost:3000/</td>
    </tr>
    <tr>
      <td>pages/jobs/_slug.vue</td>
      <td>/jobs/:slug?</td>
      <td>http://localhost:3000/jobs/senior-javascript-developer<br />
      http://localhost:3000/jobs/rust-developer</td>
    </tr>
  </tbody>
</table>

* Create new vue component in  `pages/jobs/_slug.vue`.
* Use `asyncData` to fetch data from Storyblok API.
&nbsp;
* 📝 &nbsp;&nbsp;`pages/jobs/_slug.vue`

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

    <div v-if="story" class="py-12">
      <h1 class="text-3xl">
        {{ story.content.title }}
      </h1>
      <SbRichtext class="mt-8" :text="story.content.description" />

      <span class="block mt-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
          💰 {{ story.content.salary }} €
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
  async asyncData ({ $storyapi, error, route }) {
    try {
      const currentPage = await $storyapi.getStory(route.path)

      return {
        story: currentPage.data.story
      }
    } catch (e) {
      error({
        statusCode: 404,
        message: e.message
      })
    }
  }
}
</script>
```


**When to use**:
 
If your job listing page has predefined fields (e.g. title, description, salary) and doesn't need flexible bloks (`Blocks` field type).


You can use the following branch to see final results:

```bash
git clone git@github.com:regenrek/nujek-job-board.git
git checkout job-detail-1
```

#### Approach 2: Dynamic Bloks

The first approach is pretty straight forward and uses the power of [Nuxt.js File System Routing](https://nuxtjs.org/docs/features/file-system-routing/). 

We're facing **two "problems"** here which we can wipe out with the second approach.

You need the same code in `asyncData` code over and over for each page. You can solve this by creating a **mixin** and include it in every page. For example a `getCurrentStory.js` mixin.
But I will show you a more dynamic approach with the catch all route and the use of `@nujek/storyblok/Bloks` component. 

The **second issue** is that we're not really working with Storyblok content types and folders here. That means we have fetched the single job page and just show it fields in a custom design. But what if we want to have more control and logic for the job detail page.

* First rename `pages/index.vue` to `page/_.vue` to create a catch all route.


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


