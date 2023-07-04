# pdf-assignment
This documentation provides an overview of the APIs implemented in the project. The APIs are designed to handle different functionalities related to posts, comments, and sharing files.

Table of Contents
Get Posts
Get Post
Create Post
Comment Post
Delete Post
Share Post
Get Posts
Description
Retrieves a list of posts based on the provided search parameter.

URL
GET /api/posts/:id/:search

Parameters
id (required): The user ID for retrieving posts.
search (required): The search parameter to filter the posts. Use "2.36" to retrieve all posts, or provide a specific search term.
Responses
200 OK: Returns an array of posts that match the search parameter.
404 Not Found: If an error occurs while retrieving the posts.
Get Post
Description
Retrieves a specific post by its ID.

URL
GET /api/posts/:id

Parameters
id (required): The ID of the post to retrieve.
Responses
200 OK: Returns the post object with the provided ID.
404 Not Found: If the post with the specified ID does not exist.
Create Post
Description
Creates a new post.

URL
POST /api/posts

Request Body
The request body should contain the following properties:

title (required): The title of the post.
content (required): The content of the post.
userId (required): The user ID associated with the post.
createdAt (optional): The date and time when the post was created. If not provided, the current date and time will be used.
Responses
201 Created: Returns the newly created post.
409 Conflict: If an error occurs while creating the post.
Comment Post
Description
Adds a comment to a post.

URL
POST /api/posts/:id/comment

Parameters
id (required): The ID of the post to comment on.
Request Body
The request body should contain the following property:

value (required): The comment to be added to the post.
Responses
200 OK: Returns the post object with the newly added comment.
404 Not Found: If the post with the specified ID does not exist.
Delete Post
Description
Deletes a post.

URL
DELETE /api/posts/:id

Parameters
id (required): The ID of the post to delete.
Responses
200 OK: Returns a success message indicating that the post was deleted successfully.
404 Not Found: If the post with the specified ID does not exist.
Share Post
Description
Shares a post by sending an email to the post owner with a share link.

URL
POST /api/posts/share/:fileId

Parameters
fileId (required): The ID of the file/post to share.
Responses
200 OK: Returns the success status and the file URL.
404 Not Found: If the file/post with the specified ID does not exist.
500 Internal Server Error: If there is a server error while sharing the post.
Please note that these APIs should be accessed using the appropriate HTTP methods (GET, POST, DELETE) and the corresponding URL paths. Ensure that the required parameters are provided and the request bodies are formatted
Additional Information
Environment Variables
The following environment variables are required for the proper functioning of the API:

SERVICE: The service provider for the email functionality.
MAIL: The email address used for sending emails.
PASS: The password associated with the email address.
Dependencies
The project relies on the following dependencies:

mongoose: A MongoDB object modeling tool.
dotenv: A module for loading environment variables from a .env file.
nodemailer: A module for sending emails.
Database Connection
The API connects to a MongoDB database using Mongoose. Ensure that the MongoDB connection string is properly configured in the project's environment.
