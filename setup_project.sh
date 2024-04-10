#!/bin/bash

# Define project base directory
BASEDIR="Charity-Donation-Platform"

# Create the directory structure for the client
mkdir -p $BASEDIR/client/public
mkdir -p $BASEDIR/client/src/components
mkdir -p $BASEDIR/client/src/pages
mkdir -p $BASEDIR/client/src/utils

# Create the directory structure for the server
mkdir -p $BASEDIR/server/config
mkdir -p $BASEDIR/server/models
mkdir -p $BASEDIR/server/routes
mkdir -p $BASEDIR/server/graphql/schemas
mkdir -p $BASEDIR/server/graphql/resolvers
mkdir -p $BASEDIR/server/middleware
mkdir -p $BASEDIR/server/utils

# Create placeholder files to keep the directories in version control
touch $BASEDIR/client/public/index.html
touch $BASEDIR/client/src/App.js
touch $BASEDIR/client/src/index.js
touch $BASEDIR/client/src/routes.js
touch $BASEDIR/client/package.json
touch $BASEDIR/client/.env

touch $BASEDIR/server/server.js
touch $BASEDIR/server/package.json

# Create .gitignore and README.md at the project root
touch $BASEDIR/.gitignore
touch $BASEDIR/README.md

# Create a root package.json for managing scripts (optional)
touch $BASEDIR/package.json

echo "MERN project directory structure is set up in $BASEDIR."
