const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;

const auth = require('./routes/auth');
const tweets = require('./routes/tweets');
const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth);
app.use(tweets);
app.use(user);

app.listen(port, () => {
	console.log('Listening on port: ', port);
});
