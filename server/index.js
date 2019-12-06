require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60}
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
})

//endpoints


app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));