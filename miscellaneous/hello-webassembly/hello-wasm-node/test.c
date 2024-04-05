#include <stdlib.h>
#include <stdint.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add(int a, int b)
{
	return a + b;
}
