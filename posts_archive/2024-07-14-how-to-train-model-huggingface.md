---
title: How to train model huggingface
summary: How do you use Nuxt together with the Composition API? In this tutorial, we take a quick look on how to integrate the API with the help of the 'nuxt-composition-api' module.
date: 2024-07-14
tags:
  - post
  - nuxt-js
  - vue-js
  - typescript
  - ai
image: waves
image_alt: waves
permalink: /posts/how-to-use-hug
---

## Introduction{data-toc-exclude}

Note: This quick tutorial is for developers familiar with the basics of Nuxt.js. I recommend skimming through the [Composition API](https://composition-api.vuejs.org/){target="_blank" rel="noopener"} specification first. Please note that using the API in production is not recommended{.tip}

## 1. QuickStart Vue 3 Composition API with the `nuxt-composition-api` module

As usual, we start with a fresh Nuxt project.

```bash
npx create-nuxt-app myproject
```