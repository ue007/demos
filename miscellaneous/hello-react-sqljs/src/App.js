import React, { useState, useEffect } from 'react';
import './styles.css';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from '!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm';

export default function App() {
	const [db, setDb] = useState(null);
	const [error, setError] = useState(null);

	useEffect(async () => {
		// sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
		// without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
		// see ../craco.config.js
		try {
			const SQL = await initSqlJs({ locateFile: () => sqlWasm });
			// create database
			const database = new SQL.Database();

			// create table
			let sql = `
			  CREATE TABLE hello (a int, b char);
			  INSERT INTO hello VALUES (0, 'hello');
			  INSERT INTO hello VALUES (1, 'world');
      `;
			database.run(sql);

			function add(a, b) {
				return a + b;
			}
			database.create_function('add_js', add);
			database.run(`INSERT INTO hello VALUES (add_js(7, 3), add_js('Hello ', 'world'));`);

			// database.create_aggregate('json_agg', {
			// 	init: () => [],
			// 	step: (state, val) => [...state, val],
			// 	finalize: (state) => JSON.stringify(state),
			// });
			// database.exec(`SELECT json_agg(column1) FROM (VALUES ('hello'), ('world'))`);
			
      const binaryArray = database.export();
			console.log(binaryArray);

			setDb(database);
		} catch (err) {
			setError(err);
		}
	}, []);

	if (error) {
		return <pre>{error.toString()}</pre>;
	} else if (!db) {
		return <pre>Loading...</pre>;
	} else {
		console.log(db);
		return <SQLRepl db={db} />;
	}
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
function SQLRepl({ db }) {
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);

	function exec(sql) {
		try {
			console.log(sql);
			// The sql is executed synchronously on the UI thread.
			// You may want to use a web worker here instead
			const result = db.exec(sql);
			console.log(result);
			setResults(result); // an array of objects is returned
			setError(null);
		} catch (err) {
			// exec throws an error when the SQL statement is invalid
			setError(err);
			setResults([]);
		}
	}

	return (
		<div className='App'>
			<h1>React SQL interpreter</h1>

			<textarea onChange={(e) => exec(e.target.value)} placeholder='Enter some SQL. No inspiration ? Try “select sqlite_version()”'></textarea>

			<pre className='error'>{(error || '').toString()}</pre>

			<pre>
				{
					// results contains one object per select statement in the query
					results.map(({ columns, values }, i) => (
						<ResultsTable key={i} columns={columns} values={values} />
					))
				}
			</pre>
		</div>
	);
}

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
function ResultsTable({ columns, values }) {
	return (
		<table>
			<thead>
				<tr>
					{columns.map((columnName, i) => (
						<td key={i}>{columnName}</td>
					))}
				</tr>
			</thead>

			<tbody>
				{
					// values is an array of arrays representing the results of the query
					values.map((row, i) => (
						<tr key={i}>
							{row.map((value, i) => (
								<td key={i}>{value}</td>
							))}
						</tr>
					))
				}
			</tbody>
		</table>
	);
}
