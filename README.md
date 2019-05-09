# hoaxGen_server
### hoax sharing app

## endpoints

|no|route|method|request|response|description|
|---|---|---|---|---|---|
1|/register|POST|```body: { email:(string), password: (string)} ```|```status: 201, message: (string), token: jwt, currentUser: { userId(objId), email:(string)} ```|User registration
2|/login|POST|```body: { email:(string), password: (string)} ```| ```status:200, message: (string), token: jwt, currentUser: { userId(objId), email:(string)} ```| User login
3|/hoaxes|POST|```headers: { token: jwt }, multipart/form-data: 'file' ```|```status:201, message: (string), hoax: { _id:(objId), url: (url to gcs), userId:(objId) } ```|Create a hoax
4|/hoaxes|GET|```headers: { token: jwt } ```|```status:200, hoaxes: [{ hoax }, { hoax }, ...] ```| Get all hoaxes by authenticated userId
5|/hoaxes/:id|GET|```headers: { token: jwt } ```|```status: 200, message: (string) hoax: { _id:(objId), url: (url to gcs), userId:(objId) } ```| Get a hoax that belongs to the authenticated user by id
6|/hoaxes/:id|DELETE|```headers: { token: jwt } ```|``` status: 200, message:(string)```|Delete a hoax that belongs to the authenticated user by id
