exports.seed = (knex) => {
	// Deletes ALL existing entries
	return knex('users').del().then(function() {
		// Inserts seed entries
		return knex('users').insert([
			{
				id: 1,
				name: 'Samir',
				password:
					'5aa1403f141d5082ef712f8c247783ad4cba741d642d15f7911d6710b7113092f189b0f13235656f9f3772177cb73923f3408c50f71ed8f8dd277f160d88f8e0.6a4b799db3ec2c09',
				email: 'samke@gmail.com',
				bio: 'asadqwdasdqwqd',
				avatar: `http://gravatar.com/avatar/723c8be084bb759b5a68065ed19c2e7f?d=identicon`
			},

			{
				id: 2,
				name: 'Samke',
				password:
					'5aa1403f141d5082ef712f8c247783ad4cba741d642d15f7911d6710b7113092f189b0f13235656f9f3772177cb73923f3408c50f71ed8f8dd277f160d88f8e0.6a4b799db3ec2c09',
				email: 'samke1@gmail.com',
				bio: 'asadqwdasdqwqd',
				avatar: `http://gravatar.com/avatar/ca9132fa64cf5cb890878c202d166605?d=identicon`
			},

			{
				id: 5,
				name: 'samkezzz',
				password:
					'5aa1403f141d5082ef712f8c247783ad4cba741d642d15f7911d6710b7113092f189b0f13235656f9f3772177cb73923f3408c50f71ed8f8dd277f160d88f8e0.6a4b799db3ec2c09',
				email: 'samke2@gmail.com',
				bio: 'asadqwdasdqwqd',
				avatar: `http://gravatar.com/avatar/69291375c2b9a1e3d9deb89b364cc51b?d=identicon`
			}
		]);
	});
};
