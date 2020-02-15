exports.up = async (knex) =>
	await knex.schema.createTable('tweets', (tbl) => {
		tbl.increments();
		tbl.string('content').notNullable();
		tbl.integer('user_id').index().unsigned().notNullable();
		tbl.timestamp('created_at').defaultTo(knex.fn.now());

		tbl.foreign('user_id').references('users.id');
	});

exports.down = async (knex) => await knex.schema.dropTableIfExists('tweets');
