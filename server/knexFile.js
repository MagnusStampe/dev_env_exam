const dbCredentials = require('./config/dbcredentials');
const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;

module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: dbCredentials.database,
            user: dbCredentials.user,
            password: dbCredentials.password
        }
    },
    ...knexSnakeCaseMapper()
};