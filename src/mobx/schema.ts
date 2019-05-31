import { normalize, schema, denormalize } from 'normalizr';

const userSchema = new schema.Entity('users');

const illustSchema = new schema.Entity('illusts', {
	user: userSchema
});

export const illustsSchema = new schema.Array(illustSchema);
