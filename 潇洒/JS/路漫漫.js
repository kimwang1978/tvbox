var rule = {
    title: "路漫漫",
    host: "http://www.lmm36.com",
    url: "/vod/show/id/fyclassfyfilter.html",
    searchUrl: '/vod/search/page/fypage/wd/**.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: "H4sIAAAAAAAAAO2Su04CURCG32XqNXu/wKsYitVsAlHRcEs2hISoECuJxqhRYqMFxkIKKFgLXoY9Lm/hHtB1mPqUU87//Tt7kvm6YEN5vwtHUQxlSBez1dcraFAPTyI8d8LjdrQp1mU8mKwvJjLOB+hp29QyLOc30+MobOibAFGbUhtTi1ILU5NSE1ODUgNRs0RoHiAaUBpg6lPqY+pR6mHqUuoWVDzPxMM75c6eWQryp1dkbXsRcX2bJqP/ixTz7kXEuJ8tb+TW++nf1oNYb9Xyj4p/jvvrj8dVkojpHepUa60m6WSfl+nVEHWah6eNnUXp29P3+SKbv6BS+0y+vKKBw0axUUqNctkoNkqpUR4bxUYpNcpno9gopUYFbBQbpdCo3g8SNsur7Q0AAA==",
    filter_url: "{{fl.排序}}{{fl.年代}}/page/fypage",
    filter_def: "",
    headers: {
        "User-Agent": "MOBILE_UA"
    },
    timeout: 5000,
    class_name: "日本动漫&国产动漫&欧美动漫&日本动画电影&国产动画电影&欧美动画电影",
    class_url: "6&7&8&3&4&5",
    class_parse: "",
    cate_exclude: "",
    play_parse: true,
    lazy: $js.toString(() => {
        function getDAesString(token) {
            eval(getCryptoJS());
            var key = CryptoJS.enc.Utf8.parse("ejjooopppqqqrwww");

            var iv = CryptoJS.enc.Utf8.parse("1348987635684651");

            var token = CryptoJS.AES.decrypt(token, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });

            return token.toString(CryptoJS.enc.Utf8);
        }

        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        var from = html.from;
        if (html.encrypt == "1") {
            url = unescape(url);
        } else if (html.encrypt == "2") {
            url = unescape(base64Decode(url));
        }
        if (/\.mp4|\.m3u8|\.flv/.test(url)) {
            input = {
                parse: 0,
                url: url.split("&")[0],
                js: ''
            };
        } else {
            var jsh = request(HOST + "/static/player/" + from + ".js", {
                headers: {
                    Referer: input
                },
            }).match(/\.src\s*=\s*(.*?);/)[1];
            //log(MY_HOME);
            if (/type=/.test(jsh)) {
                jsh = jsh
                    .replace(/[\+\s']/g, "")
                    .replace(/MacPlayer.Parse/, "")
                    .replace(/MacPlayer.PlayUrl/, url)
                    .replace(/window.location.href/, input);
                var playht = fetch(jsh, {
                    headers: {
                        Referer: HOST
                    }
                });
            } else {
                jsh = jsh
                    .replace(/[\+\s']/g, "")
                    .replace(/MacPlayer.Parse/, "")
                    .replace(/MacPlayer.PlayUrl/, url)
                    .replace(/window.location.href/, input);

                jsh = JSON.parse(
                    fetch(jsh, {
                        headers: {
                            Referer: HOST
                        },
                        onlyHeaders: true
                    })
                ).url;
                var playht = fetch(jsh, {
                    headers: {
                        Referer: HOST
                    }
                });
            }

            var postapi = jsh.match(/^(.*?\/\/.*?\/.*?\/)/)[1];

            var posturl = postapi + playht.match(/post\("(.*?)"/)[1];
            if (/act\s*=/.test(playht)) {
                var vid = playht.match(/vid\s*=\s*"(.*?)"/)[1];
                var t = playht.match(/var\s*t\s*=\s*"(.*?)"/)[1];
                var token = playht.match(/token\s*=\s*"(.*?)"/)[1];
                var act = playht.match(/act\s*=\s*"(.*?)"/)[1];
                var play = playht.match(/play\s*=\s*"(.*?)"/)[1];
                token = getDAesString(token);

                var data = JSON.parse(
                    post(posturl, {
                        headers: {
                            Referer: HOST
                        },
                        body: {
                            vid: vid,
                            t: t,
                            token: token,
                            act: act,
                            play: play,
                        },
                        timeout: 5000
                    })
                );
                input = {
                    parse: 0,
                    url: data.url,
                    js: ''
                };
            } else {
                var key = "";

                playht.match(/var (\w+)="(.*?)";/g).forEach(function(list) {
                    key += list.match(/"(.*?)"/)[1];
                });
                const bodys = JSON.parse(
                    playht
                    .match(/post\(.*?,(.*?),\n/)[1]
                    .replace(/"keyyy"\s*:\s*''.*?''/, '"keyyy" : "' + key + '"')
                );
                var data = JSON.parse(
                    post(posturl, {
                        headers: {
                            Referer: HOST
                        },
                        body: bodys
                    })
                );
                if (data.ext == "xgplayer") {
                    var dataurl =
                        "https://yun.366day.site/mp4hls/xgplayer.php?vid=" + data.url;
                    var video = fetch(dataurl, {
                        headers: {
                            Referer: jsh
                        }
                    }).match(
                        /"url": "(.*?)"/
                    )[1];
                    input = {
                        parse: 0,
                        url: video,
                        js: ''
                    };
                } else if (data.ext == "hls" || data.ext == "hls_list") {
                    input = {
                        parse: 0,
                        url: decodeURIComponent(data.url),
                        js: ''
                    };
                } else {
                    input = {
                        parse: 0,
                        url: data.url,
                        js: ''
                    };
                }
            }
        }
    }),
    double: false,
    推荐: "*",
    一级: ".video-img-box;h6.title&&Text;.lazyload&&data-src;.label&&Text;a&&href",
    二级: {
        title: ".page-title&&Text;.tag-link&&Text",
        img: ".module-item-pic&&.lazyload&&src",
        desc: ".video-info-items:eq(3)&&Text;.video-info-items:eq(2)&&Text;;.video-info-items:eq(1)&&Text;.video-info-items:eq(0)&&Text",
        content: ".video-info-content&&Text",
        tabs: ".module-tab-item.tab-item",
        lists: ".module-player-list:eq(#id) a",
        tab_text: "body&&Text",
        list_text: "body&&Text",
        list_url: "a&&href"
    },
    detailUrl: "",
    搜索: "*"
}