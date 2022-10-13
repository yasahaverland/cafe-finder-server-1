# __The Perfect Blend__ (cafe-finder-server)

[link-to-site] (https://magnificent-mousse-4e7cf9.netlify.app/)

Welcome to the Perfect Blend! An app that allows a user to search for cafes and coffee shops in a specific area. Using the Yelp.com API to provide search results. Users will be able to sign-up for a user profile, where they can save and comment on their favorite cafes. 

![image] ()

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

- I'm new to the area, and as a user I want to be able to search for coffee shops near me.
- My favorite drink is an Americano, and as a user I want to log into a user profile and save things like my favorite coffee shops and my favorite drinks.
- I like to travel, and as a user I want to be able to see the details of specific cafes (contact info, location, price, etc.).
- I am a coffee aficionado, and as a user I want to be able to share my comments on cafes to be viewed by other users.

## API and Proof of Concept
The concept is to use the Yelp API to find coffee shops and coffee shop data to be displayed to the user. Here is an example of the data for the Yelp API.

[yelp-api-link] (https://www.yelp.com/developers)

![image](https://user-images.githubusercontent.com/110140349/194468211-7228cb3b-0833-4e93-8a6a-505319800a32.png)

## ERD

![image](https://user-images.githubusercontent.com/110140349/194650996-5cb39019-ced6-4a04-a8a7-d4236244e1a0.png)

## Restful Routing Chart

![image](https://user-images.githubusercontent.com/110140349/194474107-150ce9ca-ce94-4d45-a0dc-09c9d1d263de.png)

![image](https://user-images.githubusercontent.com/110140349/194474138-1760b190-1e70-42c7-abdd-6e100e1e2aa0.png)


| method | path | description |
|--------|------|-------------|
| GET | / | show the home page |
| GET | /api-v1/users | show the users profile page |
| POST | /api-v1/users/register | register a new user |
| POST | /api-v1/users/login | login a registered user |
| GET | /api-v1/users/auth-locked | show page requires authorization |
| GET | /api-v1/cafes/results/:searchId | show the search results |
| GET | /api-v1/cafes/:yelpId | show the details of one cafe |
| POST | /api-v1/cafes/:yelpId | save a cafe as a favorite |
| POST | /api-v1/cafes/:yelpId/:userId/comments | create a comment |
| PUT | /api-v1/cafes/:yelpId/:id/comments | update a comment |
| DELETE | /api-v1/cafes/:yelpId/:id/comments | delete a comment |
| PUT | /api-v1/cafes/:yelpId/:userId | update the user and cafe to the database | 

## Wire-frame

![image](https://user-images.githubusercontent.com/110140349/194475079-def58914-6e35-4391-85b4-05551eaa3b59.png)

![image](https://user-images.githubusercontent.com/110140349/194477407-23cfa126-06e7-4603-81af-7a07a8f8ef6e.png)

![image](https://user-images.githubusercontent.com/110140349/194476196-622ff715-5fa8-4490-b855-ca6220128991.png)

## Plan Breakdown

Friday - Making sure that user authentication works. Make sure API works.
  Aimee is a driver – everyone works on the project together to set up everything. The priority is to set up the mern authorization for user authentication, then split into teams to begin building the Client and the Server.
Monday - Make sure all of the routes are working, make sure layout of pages look nice
  Aimee and Yasmin  - work on the Client building out the front end: navbar, pages and routes. (App.js, Navbar.js, Login.js, Register.js, Welcome.js, Cafe.js, Result.js, Search.js)
  Brandon and Tim - work on the Server connecting to the local database and the api. (cafes.js, users.js, Cafe.js, User.js, index.js)
Tuesday - Make sure forms are working, users are able to favorite, and add drinks to database
  Aimee and Yasmin - work on adding favorites, and comments functionality. (App.js, Navbar.js, Login.js, Register.js, Welcome.js, Cafe.js, Result.js, Search.js)
  Brandon and Tim - work on finalizing RESTFul routing. (cafes.js, users.js, Cafe.js, User.js, index.js)
Wednesday - Work on debugging and problem solving the last issues.
  Team - work together to solve problems and finalize styling.

## MVP

- Be able to search up cafe shops based on location and/or business name.
- Click function that renders a page wit cafe details.
- Save cafes to a list of favorites.
- Comment of cafes.
- User authenticate and login and logout.
- Clickable link to the cafe's Yelp page.

## Stretch Goals
- Styling with CSS.
- Show other users how many times a cafe has been saved as a favorite.
- Add a map feature and using MapBox API.

## Approach Taken

The original planning, organization, and task delegation was managed on [miro-link] (https://miro.com/). Brandon was elected the Git Manager and we split the team between the server and the client sides of the project. As the project evolved the miro board grew in complexity and detail. As soon as any one individual ran into a roadblock the team jumped in a debugged together.

Day one went smoothly stubbing both the server and client projects and making sure everything was working with the user auth setup. At the end of the day we had to do some research to figure out how to structure the models for cafes and comments, settling on the embedding method.

Starting on the second day we spent a lot of time connecting the server to the client. Then we got stuck connecting our back end to the Yelp api.

On the third day we picked up a little momentum, but we spent a lot of time debugging and problem solving that kept us from reaching the functionality we had as a goal. We still needed to finish the comment functionality, favorite cafe functionality, and we still had some bugs stemming from the authorization locked routes.

By midday day four, we had solved most of problems and had everything functioning well enough to deploy. After deployment we split again, one team moved on to styling, and the other team focused on wrapping up the last of the functionality.

## Post Project Reflection

When we started to forecast the project it seemed like we had plenty of time to complete our MVP. The overall concept had been work-shopped to a concise attainable project proposal and we had a very strong team to get it done. The basic challenge of building a full stack web app with separate client and server repositories led to bugs that took much longer to debug. Luckily we worked well as a team and when a bug arose we problem solved as a group. It was impressive how multiple perspectives could simplify the debugging process. 

Overall, this project was a great opportunity to learn from each other and bond as friends as we built something together. Especially at the end when members of other groups rallied to help us finish up some last minute challenges. It seems clear why the industry is mostly built by engineering teams, because the group build process is efficient and effective.


