# Preparation
1. Setup an [auth0.com](https://auth0.com/) account. Auth0 is used for all authentication. A free tier is available.
2. Configure your auth0 instance variables in the client/components/auth/auth0.config.example.js file, and rename it to auth0.config,js
3. Setup an [mlab.com](https://mlab.com/) account. MongoDb is the cloud storage provider. There is a free tier available. Alternatively you could point the server/config at a local instance of mongo db to store the data.
4. Configure your mongodb variables in server/config (using the server/config.example file and renaming to config) 

# Setup #
1. Install / update node.js and npm
2. `npm install`
3. mkvirtualenv `voting-tornado` (assumes you're using virtualenv wrapper)
4. `python server/seeddata.py` to initialize some seed data for development testing
5. `npm start -s`
