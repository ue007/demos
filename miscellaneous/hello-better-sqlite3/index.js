const Database = require('better-sqlite3');

const db = new Database('./sql.db');
const stmt = db.prepare('select * from employees');

(async () => {
	for (const row of stmt.iterate()) {
		console.log(row);
	}
})();
