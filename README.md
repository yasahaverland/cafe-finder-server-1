# __The Perfect Blend__ (cafe-finder-server)

[link-to-site] (< link to deployed site here >)

Welcome to the Perfect Blend! An app that allows a user to search for cafes and coffee shops in a specific area. Using the Yelp.com API to provide search results. Users will be able to sign-up for a user profile, where they can save and comment on their favorite cafes. 

## Installation Instruction

To run The Perfect Blend App locally, follow these steps:

Server steps

1. Fork and clone the Client repository: [github-server-link] (https://github.com/brandon-w1205/cafe-finder-server)

1. Navigate to the Yelp API, and sign up for a unique api key. Save you API_KEY somewhere you can find it easily. [yelp-api-link] (https://www.yelp.com/developers)

1. In the terminal, navigate to the cloned repository for the Server. Run the command:
``` npm install``` 
this will install all of the required dependency packages.

1. In the terminal, create a .gitignore file and a .env.local file. Run the command:
```touch .gitignore .env.local``` and type ```node_modules``` and ```.env.local``` into the .gitignore file.

1. In the .env.local file declare the port that will be used by the Server. ```PORT=8000``` Then, create a unique jwt secret: ```JWT_SECRET='make up your own unique string here.'```

1. In the .env file, type ```API_KEY=``` followed by the key you received from last.Fm.com. (Example: API_KEY=##############) 
Replace the hashes with your API_KEY.

1. Run the command ```nodemon``` in the Server terminal to run the server.

Client steps

1. Fork and clone both the Client repository: [github-client-link] (https://github.com/brandon-w1205/cafe-finder)

1. In terminal, navigate to the cloned repository for the Client. Run the command:
``` npm install``` 
this will install all of the required dependency packages.

1. In the terminal for the Client, create a .gitignore file and a .env file. Run the command:
```touch .gitignore .env.local``` 
and type ```node_modules``` and ```.env``` into the .gitignore file.

1. In the .env file, type ```REACT_APP_SERVER_URL=http://localhost:8000``` 

1. In the Terminal, type: ```npm run start``` which will automatically open a browser window at localhost3000.

## Tech Stack:

- HTML, CSS, Javascript, React, MongoDB, Mongoose, Express, bcrypt, JSON Web Tokens, Axios, Yelp API

## User Stories

- As a user I want to be able to search for coffee shops near me.
- As a user I want to log into a user profile and save things like my favorite coffee shops and my favorite drinks.
- As a user I want to be able to see the details of specific cafes (contact info, location, price, etc.).
- As a user I want to be able to share my comments on cafes to be viewed by other users.

## API and Proof of Concept
The concept is to use the Yelp API to find coffee shops and coffee shop data to be displayed to the user. Here is an example of the data for the Yelp API.

[yelp-api-link] (https://www.yelp.com/developers)

![image](https://user-images.githubusercontent.com/110140349/194468211-7228cb3b-0833-4e93-8a6a-505319800a32.png)

## ERD

![image](https://user-images.githubusercontent.com/110140349/194650996-5cb39019-ced6-4a04-a8a7-d4236244e1a0.png)

## Restful Routing Chart

![image](https://user-images.githubusercontent.com/110140349/194474107-150ce9ca-ce94-4d45-a0dc-09c9d1d263de.png)

![image](https://user-images.githubusercontent.com/110140349/194474138-1760b190-1e70-42c7-abdd-6e100e1e2aa0.png)


## Wire-frame

![image](https://user-images.githubusercontent.com/110140349/194475079-def58914-6e35-4391-85b4-05551eaa3b59.png)

![image](https://user-images.githubusercontent.com/110140349/194477407-23cfa126-06e7-4603-81af-7a07a8f8ef6e.png)

![image](https://user-images.githubusercontent.com/110140349/194476196-622ff715-5fa8-4490-b855-ca6220128991.png)

## Plan Breakdown

Friday - Making sure that user authentication works. Make sure API works.
  Aimee is a driver – everyone works on the project together to set up everything.
Sunday - Make sure all of the routes are working, make sure layout of pages look nice
  Aimee - work on navbar
  Brandon - works on Profile.js
  Tim - works on Results.js
  Yasmin - works on NewUser.js
Monday - Make sure forms are working, users are able to favorite, and add drinks to database
  Aimee and Yasmin - works on adding favorites
  Brandon and Tim - works on creating drinks form
Tuesday - Extra day to stub out routes and forms. Start on CSS
Wednesday - Everybody work on CSS on their own respective pages

## MVP

- Be able to search up cafe shops based on location and/or business name
- Mark cafe shops as visited or not
- Leave favorite drink comments on cafes
- Have user authenticate and login
- Have user be able to logout

## Stretch Goals
- Adding a map feature and using MapBox API
- Have other users see how many times a cafe has been saved/favorited
- CSS
