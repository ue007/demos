var sass = require('node-sass');

sass.renderSync({
	data: '#{headings(2,5)} { color: #08c; }',
	functions: {
		'headings($from: 0, $to: 6)': function (from, to) {
			var i,
				f = from.getValue(),
				t = to.getValue(),
				list = new sass.types.List(t - f + 1);

			for (i = f; i <= t; i++) {
				list.setValue(i - f, new sass.types.String('h' + i));
			}
			console.log(list);
			return list;
		},
	},
});
