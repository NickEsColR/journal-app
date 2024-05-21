
# Journal App

Welcome to the Journal app, a web application that allows you to create notes with a title and save the date it was created, also to upload images to each note.

## Demo

A demo video of the web can be found [here](https://journal-app-nickescolr.netlify.app)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_KEY`
`VITE_AUTH_DOMAIN`
`VITE_PROJECT_ID`
`VITE_STORAGE_BUCKET`
`VITE_MESSAGING_SENDER_ID`
`VITE_APP_ID`

An environment template is provided, you just need to rename it from ".env.template" to ".env" and paste your values

## Features

- Register and login
- Create new note
- See all notes
- Update notes
- Delete notes
- Add images to a note


## Run Locally

**Remember to run this first**

Clone the project

```bash
  git clone https://github.com/NickEsColR/journal-app.git
```

Go to the project directory

```bash
  cd journal-app
```

Install dependencies

```bash
  yarn
```

Start the application

```bash
  yarn dev
```


## Tech Stack

**Client:** 

- React 
- React Router
- Redux
- Bootstrap
- Axios
- Fontawesome
- Sweetalert2

**Server:** 

- Firebase


