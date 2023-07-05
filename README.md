
# Score Keeper By Jinish

I have created the Score Keeping Tool to keep track of score of multiple participants for general purpose. 

Web-App: [Link](https://score-keeper-by-jinish.onrender.com/)

Repo: [Link](https://github.com/Jinish9302/Score-Keeper-Full/tree/main)
## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Deployed On:** Render

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET_KEY`

`MONGO_CONNECTION_STRING`

Here SECRET_KEY is to generate token you can keep any string of your choice
get your MONGO_CONNECTION_STRING from mongodb atlas or Compass
## Run Project Locally

Download Github repository

```bash
git clone https://github.com/Jinish9302/Score-Keeper-Full.git
```

Go to Project

```bash
cd Score-Keeper-Full
```

Start Back End
```bash
cd score-keeper-backend
npm start
```

Start Front End  (Note: Change the baseurl in src/App.js variable value to "http://localhost:3000" and make sure to start back end before front end)
```bash
cd..
cd score
npm start
```
