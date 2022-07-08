import { connectionMain } from './connection.js';

(async() => {
    const getUser = await connectionMain.execute(
        `
            SELECT * FROM users 
            LEFT JOIN users_data ON users_data.id_user = users.id_user
            WHERE users.id_user = ?
        `,
        {
            nestingOptions: [
                { tableName: 'users', pkey: 'id_user' },
                { tableName: 'users_data', pkey: 'id_users_data', fkeys: [{ table: 'users', col: 'id_user' }] }
            ]
        },
        [1]
    );

    getUser.forEach((user) => {
        console.log(user);
    });
    
    process.exit(1);
})();