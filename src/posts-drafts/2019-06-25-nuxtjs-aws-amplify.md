---
title: Build a Dashboard  nuxtjs app with aws amplify
summary: 
date: 2019-05-10
tags:
  - post
  - nuxt
  - markdown
image: 2019/02-post-website-nuxt
image_alt: 02-post-website-nuxt
---

Hey Everyone,

in this tutorial I would like to show you how you can develop really cool applications with the use of the `AWS Amplify CLI` in no time. 



## Table of contents

1. [Project Setup](#1)

## 1. Project Setup

Start with creating a new `nuxtjs` project with the `create-nuxt-app` cmd. 

```bash
npx create-nuxt-app myapp
cd myapp
```

### Create a new `aws amplify` project

Initialize aws amplify:

```bash
amplify init
``` 


```bash
? Enter a name for the project ampapp
```

We can create as many enviroments as we want but lets start with basic `dev` environment.

```bash
? Enter a name for the environment dev
```

I recently switched from phpstorm to [vscode](https://code.visualstudio.com/){target="_blank" rel="noopener"} as primary IDE.

```bash
? Choose your default editor: Visual Studio Code
```

The app type will be `javascript` and we\`re using `vue` as framework.

```bash
? Choose the type of app that you\'re building javascript
Please tell us about your project
? What javascript framework are you using vue
```
Since we're using the default `nuxtjs` structure we don't have a `src`
directory just put `.` as our src dir.
```bash
? Source Directory Path:  .
```

You can choose the default settings for the last questions.:

```bash
? Distribution Directory Path: dist
? Build Command:  npm run-script build
? Start Command: npm run-script serve
Using default provider  awscloudformation

? Do you want to use an AWS profile? Yes
```

Now the Amplify Console will create a bunch of resources in your aws account. This will take some time. ⏳☕

## 2. Build the GraphQL API

The following command enables AppSync GraphQL API in your project:

```bash
amplify add api
```

```bash
? Please select from one of the below mentioned services GraphQL
? Provide API name: appapi
```

```bash
? Choose an authorization type for the API key
```

Please use API key for development only. Later we can switch to cognito mode.

```bash
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with
 ID, name, description) Post
? Do you want to edit the schema now? Yes
Please edit the file in your editor: /Users/regenrek/projects/nuxt-aws-amplify/amplify/backend/api/nuxtawsapi/schema.graphql
```

Lets build a simple `Post` model where we will store our blog posts:

```graphql
type Post @model {
  id: ID!
  title: String
  content: String
}
```


After you have finished building your model hit save and switch back to the Terminal. Press `enter` and you're finished with the first setup.

With `aws status` we can see a summary what we have configured so far.

```bash
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | nuxtawsapi    | Create | awscloudformation |
```

Your freshly configured API isn't deployed yet. You can see this in the `Operation` column with the entry `Create`. So if you need to change something before you deploy the api you can use `amplify api update`. If not lets deploy it.


```
amplify push
```

The amplify push command is used to provision all your local developments. There is also a `amplify publish` command which invokes `amplify push` plus additional publish static assets to Amazon S3 and Amazon Cloudfront {.tip}


You should get similiar output to this:

```bash
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | nuxtawsapi    | No Change | awscloudformation |

GraphQL endpoint: https://<myendpoind.appsync-api>.eu-west-1.amazonaws.com/graphql
GraphQL API KEY: <your-api-key>
```

Great. Our API is deployed. 🎉 


## Create Testdata in the DynamoDB Table


```json
{
  "id": "2",
  "title": "Welcome back to my second blog post!",
  "content": "Nevermind I hate writing..."
}
```



### Test your API

The amplify console is pretty powerful and helpful if you get used to it. Lets make some tests to our API:

```bash
amplify console api

? Please select from one of the below mentioned services: GraphQL
```

The console will open the aws query editor in your browser

### Configure nuxtjs with aws amplify

To make use of the aws amplify API we need to import the local `aws-exports.js` into the nuxt app as a plugin. Create a new file `aws-amplify.js` inside the `~/plugins` folder and put the following snippet in this file.

```
import Amplify from 'aws-amplify'
import awsmobile from '~/aws-exports'
Amplify.configure(awsmobile)
```

Now we just need to enable the plugin inside the `nuxt.config.js` file.

```
  plugins: [
    '~/plugins/aws-amplify.js'
  ],
```


### Build the frontend

Our goal is to prepare data from the db inside the lambda function. Our lambda acts as a backend where we can add our frontend to it. In our case we will use `nuxtjs` as frontend. 

We will make use of the `aws-amplify` library. 

```bash
yarn add aws-amplify
# or
npm install aws-amplify
```

Cleanup the `pages/index.vue` to a minimal boilerplate.
* We will use `API` from `aws-amplify` package to call our backend functions. You could also use axios to handle requests but for example with the `API` you won't need the endpoint name.
* In `nuxt` usually you load your remote data with `asyncData` or the `fetch` (use fetch if you have a store like vuex) method.
* Inside asyncData we will call our API and return it so we can use it in our template

```html
<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>
<script>
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '~/src/graphql/queries';

export default {
  async asyncData() {
    const posts = await API.graphql(graphqlOperation(listPosts))
    return {
      posts : posts.data.listPosts.items
    }
  }
}
</script>
```