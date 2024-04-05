// Generic iterator that stores context for an iterator
export class MessageIterator {
	constructor(start, end, increment = 1) {
		this.start = start;
		this.end = end;
		this.increment = increment;
		this.current = start;
	}

	valid() {
		return this.current <= this.end;
	}

	value() {
		return this.current;
	}

	next() {
		const valid = this.valid();
		if (!valid) {
			return { valid };
		}

		const val = this.current;
		this.current += this.increment;

		return {
			valid,
			data: {
				start: val,
				end: this.current,
			},
		};
	}
}
