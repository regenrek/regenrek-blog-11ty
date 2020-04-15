---
title: How to build a breakfast restaurant locator with nuxtjs and algolia search2
summary:
date: 2020-03-27
tags:
  - post
  - nuxt-js
  - algolia
image: 2019/05-nuxt_algolia_search_breakfast_locator
image_alt: nuxt_algolia_search_breakfast_restaurant_locator
# permalink: posts/using-aws-lambda-insert-multiple-json-dynamodb/
---


## Install and configure Amplify CLI

If you already haven't done so install Amplify CLI and run the following command:

```bash
    npm install -g @aws-amplify/cli
```

Now lets setup the the Amplify CLI configuration

```bash
amplify configure
``` 

This command will usally open your browser and take you to the AWS Login page. Create an account or sign in and start to create an IAM user.

Amazon IAM (Identity and Access Management) allows user management and permissions.{.tip}

```bash
    Specify the AWS Region
    ? region:  # Your preferred region
    Specify the username of the new IAM user:
    ? user name:  # User name for Amplify IAM user
    Complete the user creation using the AWS console
```

The most important step here is to create an user with `AdministratorAccess`

https://docs.amplify.aws/images/user-creation.gif

```bash
Enter the access key of the newly created user:
? accessKeyId:  # YOUR_ACCESS_KEY_ID
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name:  # (default)

Successfully set up the new user.
```

If you ask yourself where you're credentials are stored just look into `~/.aws/credentials` file. Here you can adjust them if you need so.{.tip}


## Connect Nuxt with Amplify

We start with a fresh nuxt project,

```bash
npx create-nuxt-app my-app
```

```
yarn add aws-amplify
```

Here are some notes. I'm going to use tailwindcss as css framework.


## Setup an Amplify Backend



```bash
amplify init
````

```bash 
? Enter a name for the project umseck
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using vue
? Source Directory Path:  src
? Distribution Directory Path: dist
? Build Command:  yarn build
? Start Command: yarn start

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
````

Create a plugin to connect your amplify backend with your nuxt app

```js
import Vue from 'vue'
import Amplify from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from '~/src/aws-exports'

Amplify.configure(awsconfig)
Vue.use(AmplifyPlugin)
``` 

Enable this plugin in your `nuxt.config.js`

```js
  plugins: [
    {
      src: '~/plugins/aws-amplify',
      mode: 'client'
    },
  ],
  // ...

```

## Add User authentication

```bash
amplify add auth
```

```bash
Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Email
 Do you want to configure advanced settings? No, I am done.
```

Our location authentication setup is finished. Now lets push this settings to the cloud.

```bash
amplify push
```

Enable this plugin in your `nuxt.config.js`

```js
  plugins: [
    {
      src: '~/plugins/aws-amplify',
      mode: 'client'
    },
    '~/plugins/auth'
  ],
  // ...

```


## Create GraphQL API and database

We're starting to model the database with GraphQL

```bash
amplify add api
```


```bash
? Please select from one of the below mentioned services: GraphQL
? Provide API name: umseckapi
? Choose the default authorization type for the API API key
? Enter a description for the API key:
? After how many days from now the API key should expire (1-365):
365
? Do you want to configure advanced settings for the GraphQL API N
o, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: One-to-many relationship (e.g.
, “Blogs” with “Posts” and “Comments”)
? Do you want to edit the schema now? Yes
````


