// node
import fs from 'fs';
import path from 'path';

/**
 * 创建目录
 * @param {*} dirPath
 */
export function createDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		// make sure parent exists
		const parent = path.dirname(dirPath);
		createDir(parent);
		fs.mkdirSync(dirPath);
		console.log('创建目录成功', dirPath);
	}
}

/**
 * 删除目录(递归删除子目录)
 * @param {*} parentDir
 */
export function deleteDirRecursive(parentDir) {
	const files = fs.readdirSync(parentDir);
	files.forEach((file) => {
		const currPath = path.join(parentDir, file);
		if (fs.lstatSync(currPath).isDirectory()) {
			// recurse
			deleteDirRecursive(currPath);
		} else {
			// delete file
			fs.unlinkSync(currPath);
		}
	});
	fs.rmdirSync(parentDir);
	console.log('删除目录成功', parentDir);
}
