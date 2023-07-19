## Technologies used
- Nest
- Typescript
- MongoDB
- Mongoose
- Docker
- JWT
- Class-validator

## Installation
**Clone the project to your computer:**
```
git clone https://github.com/fiendrsy/seeker-backend.git
```
```
cd seeker
```
## Docker up
**Launch the application:**
```
docker-compose up app
```
**Or launch the testing package:**
```
docker-compose up testing
```
**The server is up, visit url:**
```
localhost:3000
```
## Usage
**The paths:**
```
PRODUCT

POST /product/create
GET /product/:productId
DELETE /product/:productId
PATCH /product/:productId
POST /product/find-product

```

```
REVIEW

POST /review/create
DELETE /review/:reviewId
DELETE /review/remove-all/:productId
GET /review/find-all/:productId

```

```
AUTH

POST /auth/sign-up
POST /auth/sign-in
POST /auth/logout
POST /auth/refresh
PATCH /auth/change-password
PATCH /auth/change-email

```

```
ROLES

PATCH /roles/set/:userId
PATCH /roles/remove/:userId
GET /roles/find-by-role/:role

```

```
USERS

GET /user/profile

```
