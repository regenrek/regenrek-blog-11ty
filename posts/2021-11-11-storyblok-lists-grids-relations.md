---
title: How to build Storyblok relations with lists and grids
summary: Working with dynamic "Blocks" inside Storyblok can lead to some confusion. Especially if you include relations to other stories.
date: 2021-11-10
tags:
  - post
  - storyblok
  - vue-js
  - nuxt-js
  - nujek
image: 2021/nuxt-storyblok-nujek
image_alt: 
permalink: /posts/storyblok-lists-grids-and-relations/
---

This post is a work in progress. It's kind of a preview for early readers. No grammar check. No review yet. {.tip}  

## Demo

TODO

## 1. Introduction

Working with dynamic "Blocks" inside Storyblok can lead to some confusion. Especially if you include relations to other stories.

In this post I will show my approach how I build storyblok lists, grids and relations. And how to distinguish between `static` and `dynamic` lists.

## 2. Analyze the client use case 

Before we begin to build a suitable scheme for our website we need to ask ourself some questions how the client or the author how he wants to fill the list. 

Basically we distinguish between three approaches

* Static Lists/Grids (manually filled)
* Relationship Lists/Grids (dynamicly fetched)
* Relationship Lists/Grids with override (dynamicly fetched + manually overriden)


### 2.1 Static Lists/Grids

These types of lists are always filled individually for each story and doesn't have any relations to other stories. For example if you need a fancy image gallery with 3-4 photos and some text below it. 

👍 **Advantages**

Easy to use

> Create each entry with the given fields on the fly. No relation fetching needed.

No side effects

> The list you create is only on this story

🙁 **Disadvantages**

Can lead to redudancy

> The Client logo carousel entries are filled on the frontpage and separatly on the about-us page.

 Can lead to inconsistenty

> The Client logo carousel on the frontpage and on the about-us page are different since entries are created manually on both Stories.

⚡ **Use-Case**

* The client wants a logo carousel of his clients **only** the frontpage.

### 2.2 Relationship Lists/Grids

One of the most common use cases ist blog and blog-posts relationship. Usually you have a `/blog` page where you want to list all your `/blog/<post-name>` posts. 

In Storyblok you will build a relationship between two `content-types`. 

👍 **Advantages**

Easy to use

> Create each entry with the given fields on the fly. No relation fetching needed.


🙁 **Disadvantages**


⚡ **Use-Case**

* A grid with cards in it which links to a specific content-type (Blog -> Blog Article)
* Show a list of blog posts on `/blog` overview page
* Show a list of team-members on the `/team` members pages (only if every team member has a detail page!)
* Show a list of jobs on the `/job-board`.


### 2.3 Relationship Lists/Grids with override

The last approach is maybe not clear from the start but it makes sense for specific use cases. Lets say you want a handpicked 🤏 list of news posts on the frontpage. You can solve this in two ways.

* In Storyblok you create a checkbox - `Show on Frontpage` in the content-type (e.g. `news-article`) or
* you create a Static List where you handpick the news articles (Stories) you would like to show on the frontpage. And even override title + image that they fit on the frontpage design. 

The second approach is more flexible. Since you don't need to click on every news article and add it to the frontpage list (and remove it later). Additionally you have more options to customize the article list on the frontpage with a custom blok. 


### ⚡ Use-Case

*  News entries should be handpicked on the frontend


You can read more here on how you should scan and analyze the given UI Design

[Nujek - Anatomy of a Website](https://nujek-docs.vercel.app/documentation/getting-started/anatomy-website)


Read more: [Full Guide to build a job board website app with Nuxt, Storyblok and Nujek](/posts/nuxt-js-storyblok-nujek-job-board-website-tutorial/)