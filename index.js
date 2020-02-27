const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const cors = require('cors');

const auth = require('./routes/auth');
const tweets = require('./routes/tweets');
const user = require('./routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(auth);
app.use(tweets);
app.use(user);

app.listen(port, () => {
	console.log('Listening on port: ', port);
});
