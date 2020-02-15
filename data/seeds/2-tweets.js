exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('tweets').del().then(function() {
		// Inserts seed entries
		return knex('tweets').insert([
			{ id: 1, content: 'PRVI content JEJ', user_id: 1 },
			{ id: 2, content: 'DRUGI JUPIII', user_id: 2 },
			{ id: 3, content: 'DRUGI JUPIII', user_id: 2 },
			{ id: 4, content: 'DRUGI JUPIII', user_id: 2 },
			{ id: 5, content: 'DRUGI JUPIII', user_id: 5 },
			{ id: 6, content: 'DRUGI JUPIII', user_id: 5 }
		]);
	});
};
