var fs = require('fs');

var folder = 'raw/';

fs.readFile(folder + 'index.json', 'utf8', function(err, data) {
    var json = JSON.parse(data);

    fs.writeFile('index.json', JSON.stringify(json), function(err) {
        if (err) throw err;
        console.log('index.json tersimpan!');
    });
});

fs.readdir(folder + 'anime', function(err, files) {
    files.forEach(function(file) {
        fs.readFile(folder + 'anime/' + file, 'utf8', function(err, data) {
            var json = JSON.parse(data);

            fs.writeFile('anime/' + file, JSON.stringify(json), function(err) {
                if (err) throw err;
                console.log(file + ' tersimpan!');
            });
        });
    });
});

fs.readFile(folder + 'informasi.json', 'utf8', function(err, data) {
    var json = JSON.parse(data);

    fs.writeFile('informasi.json', JSON.stringify(json), function(err) {
        if (err) throw err;
        console.log('informasi.json tersimpan!');
    });
});
