# Project's name REST API
## Description

This is a the backend repository for the React application `Sky Pulse`.

---

## Relevant Models
### Drone model:
```js
{
  "name": String,
  "imageUrl": String,
  "description": String,
  "user": ObjectId
}
```
### Post Model:
```js
{
  "title": String,
  "content": String,
  "imageUrl": String,
  "drone": ObjectId,
  "user": ObjectId
}
```
### Review Model:
```js
{
  "title": String,
  "content": String,
  "rating": Number,
  "drone": ObjectId,
  "user": ObjectId
}
```
### Comment Model :
```js
{
  "content": String,
  "post": ObjectId,
  "user": ObjectId
}
```

### User

Users in the database have the following properties:

```js
{
  "username": String,
  "email": String,
  "hashedPassword": String
}
```

---


## API endpoints and usage

| Action                          | Method | Endpoint                        | Req.body                                   | Private/Public |
|---------------------------------|--------|---------------------------------|--------------------------------------------|----------------|
| SIGN UP user                    | POST   | /api/v1/auth/signup             | { username, email, password }              | Public         |
| LOG IN user                     | POST   | /api/v1/auth/login              | { email, password }                        | Public         |
| GET logged in user              | GET    | /api/v1/auth/me                 |                                            | Private        |
| CREATE a drone                  | POST   | /api/v1/drones                  | { name, imageUrl, description }            | Private        |
| GET all drones                  | GET    | /api/v1/drones                  |                                            | Public         |
| GET a single drone by ID        | GET    | /api/v1/drones/:id              |                                            | Public         |
| UPDATE a drone by ID            | PUT    | /api/v1/drones/:id              | { name, imageUrl, description }            | Private        |
| DELETE a drone by ID            | DELETE | /api/v1/drones/:id              |                                            | Private        |
| CREATE a post                   | POST   | /api/v1/posts                   | { title, content, imageUrl, drone }        | Private        |
| GET all posts                   | GET    | /api/v1/posts                   |                                            | Public         |
| GET a single post by ID         | GET    | /api/v1/posts/:id               |                                            | Public         |
| UPDATE a post by ID             | PUT    | /api/v1/posts/:id               | { title, content, imageUrl, drone }        | Private        |
| DELETE a post by ID             | DELETE | /api/v1/posts/:id               |                                            | Private        |
| CREATE a review for a drone      | POST   | /api/v1/drones/:id/reviews      | { title, content, rating }                 | Private        |
| GET all reviews for a drone      | GET    | /api/v1/drones/:id/reviews      |                                            | Public         |
| GET a single review by ID       | GET    | /api/v1/reviews/:id             |                                            | Public         |
| UPDATE a review by ID           | PUT    | /api/v1/reviews/:id             | { title, content, rating }                 | Private        |
| DELETE a review by ID           | DELETE | /api/v1/reviews/:id             |                                            | Private        |
| CREATE a comment for a post      | POST   | /api/v1/posts/:id/comments      | { content }                                | Private        |
| GET all comments for a post      | GET    | /api/v1/posts/:id/comments      |                                            | Public         |
| GET a single comment by ID      | GET    | /api/v1/comments/:id            |                                            | Public         |
| UPDATE a comment by ID          | PUT    | /api/v1/comments/:id            | { content }                                | Private        |
| DELETE a comment by ID          | DELETE | /api/v1/comments/:id            |                                            | Private        |



---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

