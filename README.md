# Test Ivosights AdonisJs + LucidMongo

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

### Setup DATABASE
MongoDB can be downloaded and installed for free from the MongoDB website. It is available in Community Server and Enterprise Server editions. The difference between the two is that the Enterprise Server includes extra functionality, such as in-memory storage engine, encrypted storage engine, advanced security, and a commercial licence.

This repository uses the MongoDB Community Server.

In MongoDB, you create a database by switching to a non-existent database, then inserting data into it.
There is no CREATE DATABASE statement in MongoDB like there is in SQL. To create a database in MongoDB, simply switch to a non-existent database, then insert data into it.

To switch databases, run the use statement. If the database doesn't already exist, it will be created:
```
$ use test_ivosights
// This results in the following message:
switched to db test_ivosights
```

### Getting Started
First, clone the repo via git:
```
$ git clone https://github.com/rickhysis/test-ivosights-adonis.git
$ cd test-ivosights-adonis
```
and then you need to run 
```
$ npm install
``` 

***change default config in .env file as needed***


### Migrations

Run the following command to run startup migrations.

```js
$ adonis migration:run
```

### Run App
cd to the repo
```
$ adonis serve --dev
```


## Test User API v1
API for application.

### /api/v1/users

#### GET
##### Description:

Returns users as paginated collection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | Limit the number of returned paginations. Defaults to 10. | No | integer |
| page | query | Specify the page of paginated results. | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns users as paginated collection |

### /api/v1/users/{_id}

#### GET
##### Description:

Get users by id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Users ID | YES | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get users by ID |

### /api/v1/users

#### POST
##### Description:

Creates new user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| firstname | formData | First name | Yes | string |
| lastname | formData | lastname | Yes | string |
| email | formData | User Email | Yes | string |
| address | formData | User Address. | Yes | string |
| contact | formData | User Contact. | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Creates new user. |

### /api/v1/users/{_id}

#### PUT
##### Description:

Update user.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Users ID | YES | string |
| firstname | formData | First name | Yes | string |
| lastname | formData | lastname | Yes | string |
| address | formData | User Address. | Yes | string |
| contact | formData | User Contact. | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Update user. |

### /api/v1/users/{_id}

#### DELETE
##### Description:

Delete beneficiary

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | User ID | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | Delete user |
