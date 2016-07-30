var gm = require('gm');
var fs = require('fs');
var storage = require('node-persist');
storage.initSync();

var getIndex=storage.getItemSync('databaseindex');

var startNumber = parseInt(getIndex);

files = fs.readdirSync(__dirname + '/source');

files.forEach(function(file) {


	gm(__dirname + '/source/' + file)
		.crop(278, 410, 0, 0)
		.write(__dirname + '/destination/' + startNumber.toString() + '-back.jpg', function(err) {
			if (err) {
				console.log(err);
			}
		});

	gm(__dirname + '/source/' + file)
		.crop(278, 410, 315, 0)
		.write(__dirname + '/destination/' + startNumber.toString() + '-front.jpg', function(err) {
			if (err) {
				console.log(err);
			}
		});
	startNumber++;
});

storage.setItemSync('databaseindex', startNumber.toString());