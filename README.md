# About

This is an app for a basic task list.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Getting Started

`npm start` starts the development server.

`npm run build` bundles the app into static files for production.

`npm lint` runs the linter.

# SQL Schema

## Creating Schema and Tables

```
CREATE SCHEMA IF NOT EXISTS task_list;
CREATE TABLE tasks (`id` INTEGER PRIMARY KEY, `group` VARCHAR(100), `task` VARCHAR(100), `completed_at` DATETIME);
CREATE TABLE tasks_dependencies (`dependent_task_id` INT NOT NULL, `requires_task_id` INT NOT NULL, PRIMARY KEY(`dependent_task_id`, `requires_task_id`));
```

## Inserting Into Tables

```
INSERT INTO tasks (`id`, `group`, `task`, `completed_at`) VALUES (1, "Purchases", "Go to the bank", "2017-12-31 23:59:59");
INSERT INTO tasks (`id`, `group`, `task`, `completed_at`) VALUES (2, "Purchases", "Buy hammer", "2017-12-31 23:59:59");
INSERT INTO tasks_dependencies (`dependent_task_id`, `requires_task_id`) VALUES (2, 1);
```

# HTTP API Documentation

## URL

Base URL (SSL): ```https://api.example.com/v1/```

Endpoint for checking a task: ```/tasks/check/```

Endpoint un-checking a task: ```/tasks/uncheck/```


## Allowed HTTPs Requests for Specified Endpoints

```POST```

## Description of Server Responses

- 200 ```OK```: request was successful
- 400 ```BAD REQUEST```: request was not understood or was missing required parameters
- 401 ```UNAUTHORIZED```: user doesn't have necessary authentication for operation
- 404 ```NOT FOUND```: resource was not found
- 405 ```METHOD NOT ALLOWED```: the method is not supported

## Request Payload Formats

### Check

```
{
    id: 1,
    group: 'Purchases',
    task: 'Go to the bank',
    dependencyIds: [],
    completedAt: null
}
```

### Uncheck

```
{
    id: 1,
    group: 'Purchases',
    task: 'Go to the bank',
    dependencyIds: [],
    completedAt: null
}
```

## Response Payload Formats

- 200 (check): ```{success: true}```
- 200 (uncheck): ```{success: true}```
- 400: ```{error": "BAD REQUEST"}```
- 401: ```{error": "UNAUTHORIZED"}```
- 404: ```{error": "NOT FOUND"}```
- 405: ```{error": "METHOD NOT ALLOWED"}```
