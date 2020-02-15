const router = require('express').Router();
const knex = require('./../data/knex');
const util = require('util');
const crypto = require('crypto');
const scrypt = util.promisify(crypto.scrypt);
const jwt = require('jsonwebtoken');
const md5 = require('md5');

router.get('/users', async (req, res) => {
	await knex.select().from('users').then((users) => {
		res.send(users);
	});
});

const comparedPasswords = async (saved, supplied) => {
	const [ hashed, salt ] = saved.split('.');
	const hashedSuppliedBuff = await scrypt(supplied, salt, 64);

	return hashed === hashedSuppliedBuff.toString('hex');
};

router.post('/signup', async (req, res) => {
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
			password: `${buff.toString('hex')}.${salt}`,
			avatar: `http://gravatar.com/avatar/${md5(email)}?d=identicon`
		});
		res.send('User Added');
	} catch (err) {
		res.send(err);
	}
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const foundUser = await knex('users').select('*').where('email', email).first();

	if (!foundUser) {
		return res.send('Email not found');
	}

	const validPassword = await comparedPasswords(foundUser.password, password);
	if (!validPassword) return res.send('Invalid password');

	const token = jwt.sign({ id: foundUser.id }, process.env.TOKEN);

	res.header('auth-token', token).send(token);
});

module.exports = router;
