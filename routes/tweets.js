const router = require('express').Router();
const knex = require('./../data/knex');
const verify = require('./verifyToken');

router.get('/tweets', verify, async (req, res) => {
	const tweets = await knex.select().from('tweets').where('user_id', req.user.id);
	res.send(tweets);
});

router.post('/tweets', verify, async (req, res) => {
	const { content } = req.body;
	const { user } = req;

	try {
		await knex('tweets').insert({
			content,
			user_id: user.id
		});
		res.send('Tweet added');
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
