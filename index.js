var fs = require('fs');

var source = 'raw/';

// OLD
fs.readFile(source + 'index.json', 'utf8', function(err, data) {
    var json = JSON.parse(data);

    fs.writeFile('index.json', JSON.stringify(json), function(err) {
        if (err) throw err;
    });
});

fs.readdir(source + 'anime', function(err, files) {
    files.forEach(function(file) {
        fs.readFile(source + 'anime/' + file, 'utf8', function(err, data) {
            var json = JSON.parse(data);

            fs.writeFile('anime/' + file, JSON.stringify(json), function(err) {
                if (err) throw err;
            });
        });
    });
});

fs.readFile(source + 'informasi.json', 'utf8', function(err, data) {
    var json = JSON.parse(data);

    fs.writeFile('informasi.json', JSON.stringify(json), function(err) {
        if (err) throw err;
    });
});

// API V1
var v1 = 'v1/';
var v1Anime = v1 + 'anime/';
var v1Daftar = v1 + 'daftar/';
var v1Link = v1 + 'link/';
var v1Page = v1 + 'page/';
var v1Widget = v1 + 'widget/';

fs.readFile(source + 'index.json', 'utf8', function(err, data) {
    var json = JSON.parse(data).data;

    // anime
    var animeData = json.slice();

    animeData.forEach(function(anime) {
        fs.writeFile(v1Anime + anime.download + '.json', JSON.stringify(anime), function(err) {
            if (err) throw err;
        });
    });
    // end anime

    // daftar
    var daftarData = json.slice();
    var daftar = {
        'semua': [],
    };

    daftarData.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });

    daftarData.forEach(function(anime) {
        var result = {};

        result.title = anime.title;
        result.download = anime.download;

        daftar.semua.push(result);

        if (daftar[anime.type.toLowerCase()]) {
            daftar[anime.type.toLowerCase()].push(result);
        } else {
            daftar[anime.type.toLowerCase()] = [];
            daftar[anime.type.toLowerCase()].push(result);
        }
    });

    for (var key in daftar) {
        fs.writeFile(v1Daftar + key + '.json', JSON.stringify(daftar[key]), function(err) {
            if (err) throw err;
        });
    }
    // end daftar

    // page
    var pageData = json.slice().reverse();
    var page = [];
    var totalPage = 0;

    while (pageData.length) {
        page.push(pageData.splice(0, 5));
    }

    totalPage = page.length;

    page.forEach(function(listAnime, index) {
        index += 1;
        paging = {};

        if (index - 1 <= 0) {
            paging.prev = null;
        } else {
            paging.prev = index - 1;
        }

        if (index + 1 > totalPage) {
            paging.next = null;
        } else {
            paging.next = index + 1;
        }

        paging.data = listAnime;

        fs.writeFile(v1Page + index + '.json', JSON.stringify(paging), function(err) {
            if (err) throw err;
        });
    });
    // end page
});

fs.readdir(source + 'anime', function(err, files) {
    // link
    files.forEach(function(file) {
        fs.readFile(source + 'anime/' + file, 'utf8', function(err, data) {
            var json = JSON.parse(data);

            fs.writeFile(v1Link + file, JSON.stringify(json), function(err) {
                if (err) throw err;
            });
        });
    });
});

// widget

// informasi
fs.readFile(source + 'informasi.json', 'utf8', function(err, data) {
    var json = JSON.parse(data);

    fs.writeFile(v1Widget + 'informasi.json', JSON.stringify(json), function(err) {
        if (err) throw err;
    });
});
// end informasi

// rss
fs.readFile(source + 'index.json', 'utf8', function(err, data) {
    var json = JSON.parse(data).data;
    var rssData = json.slice(-20);
    var rss = [];

    rssData.forEach(function(anime) {
        var result = {};

        result.title = anime.title;
        result.desc = anime.desc;
        result.download = anime.download;

        rss.push(result);
    });

    rss.reverse();

    fs.writeFile(v1Widget + 'rss.json', JSON.stringify(rss), function(err) {
        if (err) throw err;
    });
});
// end rss

// end widget
