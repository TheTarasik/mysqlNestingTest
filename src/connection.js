import mysql from 'mysql2';
import nestingMysql from 'node-mysql-nesting';

class Mysql {
	pool;

	createPool (options) {
		this.pool = mysql.createPool(options).promise();
	}
	
	async execute (sql, options, data) {
		try {
			const isNested = options.hasOwnProperty('nestingOptions');
			const [result] = await this.pool.query({ 
				sql, 
				nestTables: isNested
			}, data);
			return isNested ? nestingMysql.convertToNested(result, options.nestingOptions) : result;
		} catch (e) {
			console.log(e);
		}
	}
}

const connectionMain = new Mysql();

connectionMain.createPool({
    host: '127.0.0.1',
    user: 'mysql',
    password: 'mysql',
    database: 'test',
	charset : 'utf8'
});

export {
    connectionMain
};