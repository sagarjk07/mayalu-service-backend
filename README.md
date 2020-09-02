## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Run the Tests

You're almost done! Run the tests to make sure everything is working:

    npm test

All tests should pass.

### Start the Server

    nodemon index.js

This will launch the Node server on port 3000. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:3000/api/listings

You should see the list of available products. That confirms that you have set up everything successfully.

