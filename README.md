
# Repabs API (Report Absences)

First project with NestJs and typescript for learning purposes. 
API to manage absences during the working days.
This repository contains only the solution for backend.

## Solutions used in the project

- NestJS
- Mongo / Mongoose
- Passport

## Features

- Basic user management (list, create, update and delete)
- Reasons management (list, create, update and delete)
- Absences management (list, create, update, delete)

## API Reference

```
Note: Routes are protected by a guard. So the Bearer token must be provided always, except for route /auth/login
```

#### Get all users

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |

#### Get user

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Post user

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of user |
| `email`      | `string` | **Required**. Email of user |
| `password`      | `string` | **Required**. Password of user |

#### Patch user

```http
  PATCH /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of user |
| `email`      | `string` | **Required**. Email of user |
| `password`      | `string` | **Required**. Password of user |

#### Delete user

```http
  DELETE /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

#### Get all reasons

```http
  GET /reasons
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |

#### Get reasons

```http
  GET /reasons/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of reason to fetch |

#### Post reason

```http
  POST /reasons
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of reason |
| `description`      | `string` | **Required**. Description of reason |

#### Patch reason

```http
  PATCH /reasons/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of reason |
| `description`      | `string` | **Required**. Description of reason |

#### Delete reason

```http
  DELETE /reasons/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

#### Get all absences

```http
  GET /absences
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |

#### Get absences

```http
  GET /absences/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of absence to fetch |

#### Post absence

```http
  POST /absences
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `reasons`      | `string` | **Required**. Id of reason |
| `users`      | `string` | **Required**. Id of user |
| `description`      | `string` | **Required**. Description of absence |
| `date_from`      | `date` | **Required**. Date from of absence |
| `date_to`      | `date` | **Required**. Date to of absence |

#### Patch absence

```http
  PATCH /absences/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `reasons`      | `string` | **Required**. Id of reason |
| `users`      | `string` | **Required**. Id of user |
| `description`      | `string` | **Required**. Description of absence |
| `date_from`      | `date` | **Required**. Date from of absence |
| `date_to`      | `date` | **Required**. Date to of absence |

#### Patch absence (update status)

```http
  PATCH /absences/updateStatus/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `approved`      | `boolean` | **Required**. Approval (true or false) |


#### Patch absence (update approved flag)

```http
  PATCH /absences/updateApproved/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `string` | **Required**. Status of absence (NEW, IN_PROGRESS, FINISHED) |

#### Patch absence (update certificate)

```http
  PATCH /absences/updateCertificate/${id} -- still missing
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `certificate`      | `boolean` | **Required**. Certificate (true or false) |

#### Delete absence

```http
  DELETE /absences/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

#### Post Authentication

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of user |
| `password`      | `string` | **Required**. Password of user |