require("dotenv").config();

const phantom = require("phantom");
const cheerio = require("cheerio");
const rp = require("request-promise");
let _ph, _page;

phantom
    .create()
    .then(ph => {
        _ph = ph;
        return _ph.createPage();
    })
    .then(page => {
        _page = page;
        return _page.open(process.env.MAIN_URL);
    })
    .then(status => {
        console.log(status);
        return _page.property("content");
    })
    .then(content => {
        let $ = cheerio.load(content);
        let items = $(".widget-module ul")
            .find("a")
            .map(function() {
                let item = {};
                item.title = $(this).text();
                item.url = $(this).attr("href");
                item.description = "";
                return item;
            });

        let arrItems = items.toArray();

        _page.close();
        _ph.exit();
        return arrItems;
    })

    .then(arrItems => {
        let i = 0;
        for (i = 0; i < arrItems.length; i++) {
            /////////////
            if (i === 0) {
                const options = {
                    uri: arrItems[i].url,
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                };

                rp(options)
                    .then($ => {
                        let metaDesc = $("meta[name=description]").attr(
                            "content"
                        );
                        arrItems[0].description = metaDesc;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            //////
            else if (i === 1) {
                const options = {
                    uri: arrItems[i].url,
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                };

                rp(options)
                    .then($ => {
                        let metaDesc = $("meta[name=description]").attr(
                            "content"
                        );
                        arrItems[1].description = metaDesc;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            /////
            else if (i === 2) {
                const options = {
                    uri: arrItems[i].url,
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                };

                rp(options)
                    .then($ => {
                        let metaDesc = $("meta[name=description]").attr(
                            "content"
                        );
                        arrItems[2].description = metaDesc;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            //////
            else if (i === 3) {
                const options = {
                    uri: arrItems[i].url,
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                };

                rp(options)
                    .then($ => {
                        let metaDesc = $("meta[name=description]").attr(
                            "content"
                        );
                        arrItems[3].description = metaDesc;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            ////////
            else if (i === 4) {
                const options = {
                    uri: arrItems[i].url,
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                };

                rp(options)
                    .then($ => {
                        let metaDesc = $("meta[name=description]").attr(
                            "content"
                        );
                        arrItems[4].description = metaDesc;
                        console.log(arrItems);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
        return arrItems;
    })
    .catch(e => console.log(e));
