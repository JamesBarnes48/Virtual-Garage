** Introduction **

Welcome to the JamesBarnes48's virtual car garage repo! This is just a little side project I have been working on to refine and showcase some new web dev skills of mine including:

- Setting up and running a database service for your application
- Some slightly more advanced jQuery and frontend dev
- An opportunity to attempt to create a fuller web application experience closed to what you might find in a real web application

This includes a more fleshed out backend and frontend experience and is also a completely unguided project of mine. All code herein is originally mine and comes together to make a fun little side project which is an opportunity to finally play around with databases in my personal portfolio which is exciting!

First and foremost I must say that I have NO intention of hosting this online. Companies seem to have tightened their purse strings on free web hosting recently and I think there's no need to host this live. My aim is instead to have people host it locally on their machine like I did when I was developing it! Fork the repo (like you may have right now) and follow these instructions to setup your environment and database!

Please be aware that any passwords or things you set up to use this project are completely yours alone so no need to worry about leaking your credentials when using this web app. Everything you setup will be 100% local.

** Database Client **

Firstly you will see I have included a template.env file in the repo. Rename this to simply .env and inside you will find all the key-value pairs you need for setting  your database. We will return to this later.

If you haven't got one already then go download a database client and get it setup locally on your machine. I use postgreSQL personally and this is a completely free and commonly used DB client. This comes with pgAdmin 4, which is a lot like SQL workbench and is an invaluable tool for working with your database so make sure you download it. Go through the setup process it guides you through to set up your environment and open pgAdmin 4 and ensure you are all set up and inside your new database environment.

A few pointers for the setup:
- Set your HOST to be 'localhost'. This allows you to host the db locally on your machine
- You will be prompted to set a MASTER PASSWORD for your database. This can be anything you want
- You will be prompted for a PORT. You can use whatever port you want but I personally recommend using port 5432 when using postgres
- If prompted, ensure your USER and DATABASE are called 'postgres'.

Once you've setup your environment you should see the postgreSQL homescreen. You should have a database already pre-made called 'postgres' and inside that a schema already created called 'public'. These should exist but if they dont then please use the pgAdmin UI to create them.

Also check your dbuser. This is the 'user' you will be logging into the database with. Due to the scale of our project we only need one user, this is completely local to you! Please ensure you have a user and call them 'postgres'. Again, this should already be there but if not use the UI to make him.

** Environment Variables **

Previously we mentioned your .env file. When setting up your database you should have set up a few values which we will need to provide to our node.js server so it knows how to log into and use our database. Below is a list of each key in the file and what they should be:

- PGUSER=postgres (The user we set up earlier)
- PGHOST=localhost (enables us to run the database locally on our machine)
- PGPASSWORD=<--your-master-password-here-->
- PGDATABASE=postgres
- PGPORT=5432

** Database Population **

Once everything is set up all you need to do is populate your DB with the required tables. In this repo is a file called databaseSetup.sql containing myraid SQL queries that will set up your DB for you. Just run these queries using the query tool in pgAdmin (right click on your schema and select Query Tool).

Finally I would like to say have fun! I hope you enjoy having a play around with this project. If you encounter any issues setting up then please let me know by commenting on Github as I am here to help. All the best!

James