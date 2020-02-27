const router = require('express').Router();
const knex = require('./../data/knex');
const verify = require('./verifyToken');

router.get('/userProfile', verify, async (req, res) => {
	try {
		const user = await knex
			.select('users.name', 'users.bio', 'users.avatar')
			.count('tweets.content as tweetsCount')
			.from('users')
			.innerJoin('tweets', 'users.id', 'tweets.user_id')
			.where('user_id', req.user.id)
			.first();
		console.log(user);
		res.send(user);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
