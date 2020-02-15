const router = require('express').Router();
const knex = require('./../data/knex');
const verify = require('./verifyToken');

router.get('/user', verify, async (req, res) => {
	try {
		// const user = await knex.select('name', 'email', 'bio').from('users').where('id', req.user.id);
		// const tweets = await knex.select('content').from('tweets').where('user_id', req.user.id);

		const user = await knex
			.select('users.id', 'users.name')
			.count('tweets.content as tweetsCount')
			.from('users')
			.innerJoin('tweets', 'users.id', 'tweets.user_id')
			.where('user_id', req.user.id)
			.first();

		res.send(user);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
