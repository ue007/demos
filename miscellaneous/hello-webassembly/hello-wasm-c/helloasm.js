function MyAsmModule() { 
	"use asm"; // 告诉浏览器这是一个asm.js模块 
	function add(x, y) { 
		x = x | 0; // x是整数
		y = y | 0; // y也是整数 
		return (x + y) | 0; // 返回值也是整数 
	}
	return { add: add };
 }