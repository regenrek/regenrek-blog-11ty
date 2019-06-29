---
title: Using Lambda functions and AWS Amplify to insert multiple json objects into DynamoDB
summary: 
date: 2019-06-25
tags:
  - post
  - aws-amplify
  - aws-dynamodb
  - aws-lambda
image: 2019/04-post-amplify-lambda-dynamodb
image_alt: 04-post-amplify-lambda-dynamodb
permalink: posts/using-aws-lambda-insert-multiple-json-dynamodb/
---

Hey Everyone, 


this time I won't write about nuxtjs here because recently I really needed to migrate some old database to dynamodb and tried to find a way how I could solve the task dynamicly instead of manually inserting it via the browser interface.

Anyway the topic which I'm going to write about especially `aws amplify` is something you should look out for. If you like me who is more into frontend but needs to handle backend aswell you should give `aws amplify` a try. For example I built [www.gotbet.io](https://www.gotbet.io){target="_blank" rel="noopener"} with `nuxtjs` and `aws amplify`. {.tip}

Back to the topic: In this post I will guide you through some quick steps to prefill `DynamoDB` from a `json` file with `aws lambda` and `aws amplify`.


## Table of contents

- [Table of contents](#table-of-contents)
- [1. Create a boilerplate vue Project](#1-create-a-boilerplate-vue-project)
- [2. Create new AWS Amplify project](#2-create-new-aws-amplify-project)
- [3. Create NoSQL DynamoDB Database](#3-create-nosql-dynamodb-database)
- [4. Build your first AWS Lambda function with Amplify](#4-build-your-first-aws-lambda-function-with-amplify)
- [5. Properly Test your lambda function with AWS Amplify](#5-properly-test-your-lambda-function-with-aws-amplify)
- [6. Insert JSON objects into DynamoDB](#6-insert-json-objects-into-dynamodb)
- [7. What about `amplify add api`?](#7-what-about-amplify-add-api)
- [Source on Github](#source-on-github)

## 1. Create a boilerplate vue Project

We're using `vue` to setup the project. But feel free to use whatever you like. You can also use `react` it doesn't matter.

```bash
vue create aws-amplify-lambda-dynamodb
```


## 2. Create new AWS Amplify project

```bash
amplify init
```

```bash
? Enter a name for the project amplambda-ddb
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you\'re building javascript
Please tell us about your project
? What javascript framework are you using vue
? Source Directory Path:  src
? Distribution Directory Path: dist
? Build Command:  npm run-script build
? Start Command: npm run-script serve
```


## 3. Create NoSQL DynamoDB Database


With Amplify CLI you can easily add a storage using Amazon DynamoDB.

```bash
amplify add storage
```

```bash
? Please select from one of the below mentioned services NoSQL Database

Welcome to the NoSQL DynamoDB database wizard
This wizard asks you a series of questions to help determine how to set up your NoSQL database table.

? Please provide a friendly name for your resource that will be used to label th
is category in the project: mystorage
? Please provide table name: people

You can now add columns to the table.

? What would you like to name this column: id
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: name
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: age
? Please choose the data type: number
? Would you like to add another column? No

? Please choose partition key for the table: id
? Do you want to add a sort key to your table? No

? Do you want to add global secondary indexes to your table? (Y/n)
```

Please keep in mind that your database is configured but not deployed yet. You always need to push your configuration. 

If you want to know whats going on like you want to see which services are already in the cloud and which needs to get provisioned you can always use the `amplify status` command. {.tip}

### Deploy the NoSQL database

This is a one-liner.

```bash
amplify push
```

With `amplify push` we can provision our local backend configuration resources. There is also a `amplify publish` command which invokes `amplify push` plus additional publish static assets to Amazon S3 and Amazon Cloudfront {.tip}


## 4. Build your first AWS Lambda function with Amplify

We will write some basic lambda function first and then finish it with our main use case. Amplify CLI will guide us step by step.

```bash
amplify add function
```

For the following you should choose `yes` for accessing other resources created in this project. Select `storage` for the resource.

```bash
amplify add function
Using service: Lambda, provided by: awscloudformation
? Provide a friendly name for your resource to be used as a label for this category in the project: insertdbbfunc
? Provide the AWS Lambda function name: insertdbbfunc
? Choose the function template that you want to use: Hello world function
? Do you want to access other resources created in this project from your Lambda function? Yes
? Select the category storage
Storage category has a resource called mystorage
? Select the operations you want to permit for mystorage create

You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageMystorageName = process.env.STORAGE_MYSTORAGE_NAME
var storageMystorageArn = process.env.STORAGE_MYSTORAGE_ARN

? Do you want to edit the local lambda function now? Yes
```


* First import `aws-sdk` library which we will use later to get access to `DynamoDB.DocumentClient`.

```js
const AWS = require("aws-sdk");

exports.handler = function (event, context) { 
  context.done(null, 'Hello World'); 
};
```

## 5. Properly Test your lambda function with AWS Amplify

It's really easy to test your functions with aws amplify. Open your terminal and call your function with

```bash
amplify invoke function insertdbbfunc
```

If you did copy+paste the above code you will run into the following error:

```bash
Warning: Cannot find module 'aws-sdk'
```

So we need to add the `aws-sdk` package inside our lambda function.

```bash
cd amplify/backend/function/insertdbbfunc/src/
yarn add aws-sdk
```

`cd` to the project root and try to invoke the function again and it should succeed.

```bash
Success!  Message:
------------------
Hello World

Done.
Done running invoke function.
```

## 6. Insert JSON objects into DynamoDB

After we have setup some basic lambda function we should know how to `invoke` and `test` our functions. In the next step, we will extend the function to **insert multiple records in dynamodb** from a json object. 

### JSON test data

* Open `amplify/backend/functions/insertdbbfunc/src/data/people.js`
```json
[
  {
    "id": "1",
	  "name": "Luke Skywalker",
	  "age": 23,
  },
  {
    "id": "2",
    "name": "Darth Vader",
    "age": 46
  },
  {
    "id": "3",
    "name": "Chewbacca",
    "age": 204
  }
]
```

### Insert multiple records with `batchWrite`

* Open your function `amplify/backend/functions/insertdbbfunc/src/index.js`
* We will use [`DynamoDB.DocumentClient`](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html){target="_blank" rel="noopener"} library to handle CRUD scenarios. In our case to `CREATE` data.
* I found some pretty nice [answer @ StackOverflow](https://stackoverflow.com/a/49169600){target="_blank" rel="noopener"} which is using `dynamoDB.DocumentClient.batchWrite()` to handle multiple inserts in dynamoDB.


The `DocumentClient` offers a simple way to create sets from javascript Arrays instead of AttributeValues. It feels more natural (for me) to work with native Javascript types.  {.tip}

```js
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.TABLE_REGION });
let documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

const tableName = "people-dev";
const itemsToInsert = require("./data/people.js");


async function batchedAsync({
  list,
  callback,
  chunkSize = 10,
  msDelayBetweenChunks = 0
}) {
  const emptyList = new Array(Math.ceil(list.length / chunkSize)).fill();
  const clonedList = list.slice(0);
  const chunks = emptyList.map(_ => clonedList.splice(0, chunkSize));
  for (let chunk of chunks) {
    if (msDelayBetweenChunks) {
      await new Promise(resolve => setTimeout(resolve, msDelayBetweenChunks));
    }
    await callback(chunk, chunks);
  }
}

async function writeItems(chunk, chunks) {
  const { UnprocessedItems } = await documentClient
    .batchWrite({
      RequestItems: {
        [tableName]: chunk.map(item => {
          return { PutRequest: { Item: item } };
        })
      }
    })
    .promise();
  if (UnprocessedItems.length) {
    chunks.push(UnprocessedItems);
  }
}

exports.handler = async function(event, context) {

  console.log("Insert records...")

  batchedAsync({
    list: itemsToInsert,
    callback: writeItems,
    chunkSize: 2, // adjust to provisioned throughput. Max 25 (batchWrite dynamodb limit)
    msDelayBetweenChunks: 1000
  });

  console.log('Finished...!'); 
};
```

Thats it thats all. Congrats you finished!

## 7. What about `amplify add api`?

If you're already familiar with amplify you may have recognized that I didn't create an api with `amplify add api`. For this scenario it's not needed but if you want to insert data into tables which you created with `graphql` and the `@model` directive you just need to replace the `tableName` object to the correct tableName amplify generates for you. Usually, you have this kind of tablename

```bash
people-<apiKey>-<env>
```

Unfortunately it's not possible to choose a table created with a `grapqhl @model type` from the amplify cli. But it's already being addressed here: [github/aws-amplify/issue#997](https://github.com/aws-amplify/amplify-cli/issues/997){target="_blank" rel="noopener"}


## Source on Github

[https://github.com/regenrek/aws-amplify-lambda-multi-inserts-dynamodb](https://github.com/regenrek/aws-amplify-lambda-multi-inserts-dynamodb){target="_blank" rel="noopener"}

Thanks for reading!