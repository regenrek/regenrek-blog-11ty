---
title: Full Guide to build a job board website app with Nuxt, Storyblok and Nujek
summary: This guide will help you to build your scheme, frontend and connect everything together to build a simple job board website with Storyblok, Nuxt and Nujek Framework
date: 2021-11-10
tags:
  - post
  - storyblok
  - vue-js
  - nuxt-js
  - nujek
image: 
image_alt: 
permalink: /posts/nuxt-js-storyblok-nujek-job-board-website-tutorial/
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Demo](#demo)
- [1. Introduction](#1-introduction)
- [2. Analyze the client use case](#2-analyze-the-client-use-case)
- [3. Build a Storyblok scheme](#3-build-a-storyblok-scheme)
- [4. Create Storyblok Content](#4-create-storyblok-content)
Work in progress

## Demo

Work in progress

## 1. Introduction

Personally I prefer a hands-on guide where you can see the progress of the app you like to build. So you will meet the following requirements to start.

* Nuxt.js
* NodeJS
* Yarn
* TailwindCSS
* Storyblok Account with a fresh space

### 2. Build a Storyblok scheme

We're going to start building the Storyblok CMS scheme first. Then we will create stories based on the scheme and will fill it with some sample data like job posts e.g.

#### 2.1 Job Content Type

Imagine content types like blueprints where you define the structure for it. 
A tipical job listing includes for example 

* Job title -> (title|text)
* Job Description -> (description|richtext)
* Salary -> (salary|text)
... many more

Ok lets start with a new demo space including with some basic content-types and components. Go to 

* `Components -> New` 
* **{1}** - Name for content type: `Job`
* **{2}** - `Act as content type`

![create new storyblok component](/assets/images/2021/01-storyblok-new-component.png){.shadow}

* **{1}** - Add some fields to it (title - Text, description - RichText, salary - Text)
* Hit `Save`

![storyblok content type scheme job board](/assets/images/2021/02-storyblok-content-type-scheme-job-board.png){.shadow}

#### 2.2 Default Content Type

Since we have removed all default content types from the demo space we're going to create a new content type which will act as our base Landingpage type. 

* `Components -> New`
* **{1}** - Name for content type: `Landingpage`
* **{2}** - `Act as content type`

![02-storyblok-blok-dynamic](/assets/images/2021/01-storyblok-new-content-type.png){.shadow}

* **{1}** - Add field title and a field named `bloks` with type `Blocks`

![02-storyblok-blok-dynamic](/assets/images/2021/02-storyblok-blok-dynamic.png){.shadow}

#### 2.3 Create Storyblok Component Bloks


##### 2.3.1 Hero Blok

Our content types are ready to go. Now we need to define more blok components which can be used on our `Landingpage` content-type. 

Lets start with a simple `hero` component.

* `Components -> New`
* - Name for content type: `BlokHero`
* - **Don't** tick - `Act as content type` !


![storyblok blok component scheme](/assets/images/2021/03-hero-blok.png){.shadow}

* Add a title and a `assets` field with options `image`, `video` to it.

![storyblok blok component fields](/assets/images/2021/04-hero-fields.png){.shadow}


##### 2.3.2 Jobs Blok

Our goal is to show some of our jobs on the job board later on. So we need to create `BlokJobs` which handles the list of jobs later on.


* `Components -> New`
* - Name for content type: `BlokJobsList`
* - **Don't** tick - `Act as content type` !
* - Just save scheme and lets deal with fields later here.


## 4. Create Storyblok Content

### 4.1 Create jobs stories

Since we want to build some job board we will need some jobs to list on the board. 

* Go to the `Content` folder on the left sidebar and add a folder named `Jobs``
* **{1}** - Name is `Jobs`
* **{2}** - Choose the default content `Jobs` which we created earlier
* Hit save

![storyblok job board - create folder](/assets/images/2021/08-jobs-folder-creation.png){.shadow}

* Open the `Job` folder and quickly add 3 jobs with `+Entry` Button in the right corner.

![storyblok job board - create posts](/assets/images/2021/09-storyblok-job-board.png){.shadow}


#### 3.2 Create a homepage

As we have now defined our scheme we can start to create our stories based on the previous created content-types. 

* Go to the `Content` folder on the left side and delete the default `Home` Story page.

* Click on `+Entry` (In the right upper corner)
* Add new story with Name and content Type `Landingpage`

![storyblok create homepage](/assets/images/2021/05-create-home-page-storyblok.png){.shadow}


* **{1}** - Switch to preview urls and set to `https://localhost:3000/`
* **{2}** - In the right tab menu click `Config` and then 
* **{3}** - update the `Real Path` to `/`
* Click on publish


![storyblok create homepage settings](/assets/images/2021/06-home-page-settings-storyblok.png){.shadow}

Fill the homepage with some `bloks`.

* Click `Blocks` and add `BlokHero` and `BlokJobs`
* **{1}** - Add some title for the current page (maybe used later - just to demonstrate fields on content types)
* **{2}** - Add some 🖍️ fancy `title` and `image` to the hero component
* Click on publish

![storyblok fill content](/assets/images/2021/07-fill-content-storyblok.png){.shadow}


## 5. Build you frontend 

From now its probably better to build our website and lets see how our scheme looks in the frontend. We're going to build our frontend very straight forward with

* Nuxt.js
* TailwindCSS
* [Nujek Framework](https://nujek-docs.vercel.app/)


### 5.1 Project Setup

I won't go through all steps here since there is already a detailed tutorial on the nujek documentation how you can quickly build up your project.

Choose between `Manual Setup` or `Clone the repository` step. What you prefer...

**Manual Setup**

Read the [install docs](https://nujek-docs.vercel.app/documentation/Installation/manual-install#quick-installation-with-nujekbundle) from nujek and come back later when you finished.

**Clone the repository**

If you're really lazy like I'm and yo  don't want to setup the inital then just clone the repository here and checkout the `boilerplate`

```bash
git clone git@github.com:regenrek/nujek-job-board.git
git checkout boilerplate
```

**Important: ** Create a `.env` file and your Storyblok API Token to it

* .env
```bash
SB_CLIENT_ACCESS_TOKEN=<your-token>
```

### 5.2 Run the application

Welcome Back! If you run the application with the following command you should see something like this

```
yarn dev
```

![storyblok fill content](/assets/images/2021/10-nujek-intro.png){.shadow}

What you see on this screen is your previously created content type called "Landingpage". If you wonder how this already working I can tell you.

The nujek module in the `nuxt.config.js` is acting as a bridge to Storyblok. Thats all! If you want to read more on nujek you can go to the [docs](https://nujek-docs.vercel.app/documentation/getting-started/why) later

* nuxt.config.js
```
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


### 5.3 Build "Landingpage" component

First we start with building the content types in our frontend (like we did before in Storyblok). 

If you look at your application and switch to the `Component` Tab then you can already copy-paste the code you need for the landingpage. 

![nujeklandingpage blokcomponent](/assets/images/2021/11-nujek-landingpage-blok-component.png){.shadow}

* content-types/Landingpage.vue
```vue
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

Ok hit save and reload your page (Sometimes you need to reload the dev server). If all works you should get now the list of the used bloks which you created in storyblok.

Now we're going to start to implement our `BlokHero` to show some fancy hero title.

![nujeklandingpage blokcomponent](/assets/images/2021/12-nujek-preview.png){.shadow}

### 5.4 Build "BlokHero" component

Ok we're going to build each blok we've added to this landingpage as separeted vue component. 

* Create `bloks/BlokHero.vue` file
* You will always get a `bloks` prop object where you filled fields are stored.
* Use `blok` prop to fill components like for `<SbImage :src="blok.image" />` ([SbImage](https://nujek-docs.vercel.app/components/images))


* bloks/BlokHero.vue
```vue
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

![nujek storyblok nuxt hero design](/assets/images/2021/13-nujek-blok-hero.png){.shadow}

