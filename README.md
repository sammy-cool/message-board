# message-board-api

1. from command prompt / terminal go inside the folder 
2. run `npm install`
3. run `node index.js`

## REST API's

| method | url | action | request | response | auth |
|-----|-------|--------|---------|------| ------|
| GET | /messages | lists all messages | - | empty array or array of objects | no | 
| POST | /messages | create a message | body - string | id - number, body - string, createdAt - date | no |
| GET | /messages/:id | get a message | - | id - number, body - string, createdAt - date | no |
| PUT | /messages/:id | update a message | body - string | id - number, body - string, createdAt - date | no |
| DELETE | /messages/:id | delete a message | - | id - number, body - string, createdAt - date  | no |
