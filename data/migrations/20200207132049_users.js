exports.up = (knex) =>
	knex.schema.createTable('users', (tbl) => {
		tbl.increments();
		tbl.string('name').unique();
		tbl.string('email').unique().notNullable();
		tbl.string('password').notNullable();
		tbl.string('bio');
		tbl.string('avatar');
	});

exports.down = (knex) => knex.schema.dropTableIfExists('users');
