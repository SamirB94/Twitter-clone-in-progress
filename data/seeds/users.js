exports.seed = (knex) => {
	// Deletes ALL existing entries
	return knex('users').del().then(function() {
		// Inserts seed entries
		return knex('users').insert([
			{ id: 1, name: 'Samir', password: '12345', email: 'samke@gmail.com', bio: 'asadqwdasdqwqd' },
			{ id: 2, name: 'Isco', password: '12345', email: 'sada@sdasd.com', bio: 'nasndainsd' }
		]);
	});
};
