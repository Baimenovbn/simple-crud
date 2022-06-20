## How to start
1. Clone this repository.

2. Install all modules listed as dependencies in package:

```bash
npm i
```

3. Run the application using one of three options:

* Production mode:

```bash
npm run start:prod
```

* Development mode:

```bash
npm run start:dev
```

* Start multiple instances of the application (equal to the number of CPU cores on the host machine):

```bash
npm run start:multi
```

- Content-Type: application/json

## Implementation details

1. Implemented endpoint `api/users`:

- **GET** `api/users` is used to get all users - Server will answer with `status code` **200** and all users records
- **GET** `api/users/${userId}`
    - Server will answer with `status code` **200** and a record with `id === userId` if it exists
    - Server will answer with `status code` **400** and message **'Invalid User ID (not uuid)'**
      if `userId` is invalid (not `uuid`)
    - Server will answer with `status code` **404** and message **'User not found'** if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server will answer with `status code` **201** and newly created record
    - Server will answer with `status code` **400** and message **'Invalid data in request'** if request `body` does not contain **required** fields
- **PUT** `api/users/${userId}` is used to update existing user
    - Server will answer with` status code` **200** and updated record
    - Server will answer with` status code` **400** and message **'Invalid User ID (not uuid')** if `userId` is invalid (not `uuid`)
    - Server will answer with` status code` **404** and message **'User not found'** if record with `id === userId` doesn't exist
- **DELETE** `api/users/${userId}` is used to delete existing user from database
    - Server will answer with `status code` **204** if the record is found and deleted
    - Server will answer with `status code` **400** and message **'Invalid User ID (not uuid)'** if `userId` is invalid (not `uuid`)
    - Server will answer with `status code` **404** and message **'User not found'** if record with `id === userId` doesn't exist

2. Users are stored as `objects` that have following properties:

- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

## Testing

To test this API you need to run it in one of three modes described above and then run the script in another terminal:

```bash
npm test
```

Hit me up if you have any questions:

- Telegram: @Baimenovbn
