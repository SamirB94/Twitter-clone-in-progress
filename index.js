const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const knex = require('./data/knex');
const util = require('util');
const crypto = require('crypto');
const scrypt = util.promisify(crypto.scrypt);
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users', async (req, res) => {
	await knex.select().from('users').then((users) => {
		res.send(users);
	});
});

comparedPasswords = async (saved, supplied) => {
	const [ hashed, salt ] = saved.split('.');
	const hashedSuppliedBuff = await scrypt(supplied, salt, 64);

	return hashed === hashedSuppliedBuff.toString('hex');
};

app.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const foundUser = await knex('users').select('*').where('email', email).first();

	if (!foundUser) {
		return res.send('Email not found');
	}

	const validPassowrd = await comparedPasswords(foundUser.password, password);
	if (!validPassowrd) return res.send('Invalid password');

	console.log(process.env.TOKEN);
	const envToken = process.env.TOKEN;
	const token = jwt.sign({ id: foundUser.id, envToken });

	res.header('auth-token', token).send(token);
});

app.post('/signup', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.send('not valid email or password');
	}

	const foundUser = await knex('users').select('*').where('email', email).first();

	if (foundUser) {
		res.status(422).send('Already exists');
	}

	const salt = crypto.randomBytes(8).toString('hex');
	const buff = await scrypt(password, salt, 64);

	try {
		await knex('users').insert({
			email,
			password: `${buff.toString('hex')}.${salt}`
		});
		res.send('User Added');
	} catch (err) {
		res.send(err);
	}
});

app.listen(port, () => {
	console.log('Listening on port: ', port);
});
