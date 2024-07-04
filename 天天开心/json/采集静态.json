/**
 * 强烈推荐静态分类。可以加快速度!!!
 * 传参 ?type=url&params=../json/采集.json
 * 传参 ?type=url&params=../json/采集静态.json
 * [{"name":"暴风资源","url":"https://bfzyapi.com","parse_url":""},{"name":"飞刀资源","url":"http://www.feidaozy.com","parse_url":""},{"name":"黑木耳资源","url":"https://www.heimuer.tv","parse_url":""}]
 */
var rule = {
    title: '采集之王[合]',
    author: '道长',
    version: '20240621 beta6',
    host: '',
    homeTid: '13', // 首页推荐。一般填写第一个资源站的想要的推荐分类的id.可以空
    homeUrl: '/api.php/provide/vod/?ac=detail&t={{rule.homeTid}}',
    detailUrl: '/api.php/provide/vod/?ac=detail&ids=fyid',
    searchUrl: '/api.php/provide/vod/?wd=**&pg=#TruePage##page=fypage',
    classUrl: '/api.php/provide/vod/',
    url: '/api.php/provide/vod/?ac=detail&pg=fypage&t=fyfilter',
    filter_url: '{{fl.类型}}',
    headers: {'User-Agent': 'MOBILE_UA'},
    timeout: 5000, // class_name: '电影&电视剧&综艺&动漫',
    limit: 20,
    search_limit: 5, // 搜索限制取前5个，可以注释掉，就不限制搜索
    searchable: 1,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    filterable: 1,//是否启用分类筛选,
    play_parse: true,
    parse_url: '', // 这个参数暂时不起作用。聚合类的每个资源应该有自己独立的解析口。单独配置在采集.json里的parse_url有效
    // params: 'http://127.0.0.1:5707/files/json/%E9%87%87%E9%9B%86.json',
    // params: 'http://127.0.0.1:5707/files/json/采集静态.json',
    // hostJs:$js.toString(()=>{
    //
    // }),
    预处理: $js.toString(() => {
        function getClasses(item) {
            let classes = [];
            if (item.class_name && item.class_url) {
                if (!/&|电影|电视剧|综艺|动漫[\u4E00-\u9FA5]+/.test(item.class_name)) {
                    try {
                        item.class_name = ungzip(item.class_name)
                    } catch (e) {
                        log(`不识别的class_name导致gzip解码失败:${e}`)
                        return classes
                    }
                }
                let names = item.class_name.split('&');
                let urls = item.class_url.split('&');
                let cnt = Math.min(names.length, urls.length);
                for (let i = 0; i < cnt; i++) {
                    classes.push({
                        'type_id': urls[i],
                        'type_name': names[i]
                    });
                }
            }
            return classes
        }

        if (typeof (batchFetch) === 'function') {
            // 支持批量请求直接放飞自我。搜索限制最大线程数量16
            rule.search_limit = 16;
            log('当前程序支持批量请求[batchFetch],搜索限制已设置为16');
        }
        let _url = rule.params;
        if (_url && typeof (_url) === 'string' && /^(http|file)/.test(_url)) {
            let html = request(_url);
            let json = JSON.parse(html);
            let _classes = [];
            rule.filter = {};
            rule.filter_def = {};
            json.forEach(it => {
                let _obj = {
                    type_name: it.name,
                    type_id: it.url,
                    parse_url: it.parse_url || '',
                    api: it.api || '',
                    cate_exclude: it.cate_exclude || '',
                    // class_name: it.class_name || '',
                    // class_url: it.class_url || '',
                };
                _classes.push(_obj);
                try {
                    let json1 = [];
                    if (it.class_name && it.class_url) {
                        json1 = getClasses(it);
                    } else {
                        json1 = JSON.parse(request(urljoin(_obj.type_id, _obj.api || rule.classUrl))).class;
                    }
                    if (_obj.cate_exclude) {
                        json1 = json1.filter(cl => !new RegExp(_obj.cate_exclude, 'i').test(cl.type_name));
                    }
                    rule.filter[_obj.type_id] = [{
                        "key": "类型", "name": "类型", "value": json1.map(i => {
                            return {"n": i.type_name, 'v': i.type_id}
                        })
                    }];
                    if (json1.length > 0) {
                        rule.filter_def[it.url] = {"类型": json1[0].type_id};
                    }
                } catch (e) {
                    rule.filter[it.url] = [{"key": "类型", "name": "类型", "value": [{"n": "全部", "v": ""}]}];
                }
            });
            rule.classes = _classes;
        }
    }),
    // class_parse: $js.toString(() => {
    //     let _url = rule.params;
    //     if (_url && typeof (_url) === 'string' && _url.startsWith('http')) {
    //         let html = request(_url);
    //         let json = JSON.parse(html);
    //         let _classes = [];
    //         homeObj.filter = {};
    //         rule.filter_def = {};
    //         json.forEach(it => {
    //             let _obj = {
    //                 type_name: it.name,
    //                 type_id: it.url,
    //                 parse_url: it.parse_url || '',
    //                 cate_exclude: it.cate_exclude || '',
    //             };
    //             _classes.push(_obj);
    //             try {
    //                 let json1 = JSON.parse(request(urljoin(_obj.type_id, rule.classUrl))).class;
    //                 if (_obj.cate_exclude) {
    //                     json1 = json1.filter(cl => !new RegExp(_obj.cate_exclude, 'i').test(cl.type_name));
    //                 }
    //                 homeObj.filter[_obj.type_id] = [{
    //                     "key": "类型", "name": "类型", "value": json1.map(i => {
    //                         return {"n": i.type_name, 'v': i.type_id}
    //                     })
    //                 }];
    //                 if (json1.length > 0) {
    //                     rule.filter_def[it.url] = {"类型": json1[0].type_id};
    //                 }
    //             } catch (e) {
    //                 homeObj.filter[it.url] = [{"key": "类型", "name": "类型", "value": [{"n": "全部", "v": ""}]}];
    //             }
    //         });
    //         rule.classes = _classes;
    //         input = _classes;
    //     }
    // }),
    class_parse: $js.toString(() => {
        input = rule.classes;
    }),
    推荐: $js.toString(() => {
        VODS = [];
        if (rule.classes) {
            let _url = urljoin(rule.classes[0].type_id, input);
            if (rule.classes[0].api) {
                _url = _url.replace('/api.php/provide/vod/', rule.classes[0].api)
            }
            try {
                let html = request(_url);
                let json = JSON.parse(html);
                VODS = json.list;
                VODS.forEach(it => {
                    it.vod_id = rule.classes[0].type_id + '$' + it.vod_id
                });
            } catch (e) {
            }
        }
    }),
    一级: $js.toString(() => {
        VODS = [];
        if (rule.classes) {
            // log(input);
            let _url = urljoin(MY_CATE, input);
            let current_vod = rule.classes.find(item => item.type_id === MY_CATE);
            if (current_vod && current_vod.api) {
                _url = _url.replace('/api.php/provide/vod/', current_vod.api)
            }
            let html = request(_url);
            let json = JSON.parse(html);
            VODS = json.list;
            VODS.forEach(it => {
                it.vod_id = MY_CATE + '$' + it.vod_id
            });
        }
    }),
    // 一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id;vod_play_from',
    二级: $js.toString(() => {
        VOD = [];
        if (rule.classes) {
            let _url = urljoin(fyclass, input);
            let current_vod = rule.classes.find(item => item.type_id === fyclass);
            if (current_vod && current_vod.api) {
                _url = _url.replace('/api.php/provide/vod/', current_vod.api)
            }
            let html = request(_url);
            let json = JSON.parse(html);
            let data = json.list;
            VOD = data[0];
            if (current_vod && current_vod.type_name) {
                VOD.vod_play_from = VOD.vod_play_from.split('$$$').map(it => current_vod.type_name + '|' + it).join('$$$')
            }
        }
    }),
    搜索: $js.toString(() => {
        VODS = [];
        if (rule.classes) {
            let page = Number(MY_PAGE);
            page = (MY_PAGE - 1) % Math.ceil(rule.classes.length / rule.search_limit) + 1;
            let truePage = Math.ceil(MY_PAGE / Math.ceil(rule.classes.length / rule.search_limit));
            if (rule.search_limit) {
                let start = (page - 1) * rule.search_limit;
                let end = page * rule.search_limit;
                let t1 = new Date().getTime();
                let searchMode = typeof (batchFetch) === 'function' ? '批量' : '单个';
                log('start:' + start);
                log('end:' + end);
                log('搜索模式:' + searchMode);
                // log('t1:' + t1);
                if (start < rule.classes.length) {
                    let search_classes = rule.classes.slice(start, end);
                    let urls = [];
                    search_classes.forEach(it => {
                        let _url = urljoin(it.type_id, input);
                        if (it.api) {
                            _url = _url.replace('/api.php/provide/vod/', it.api)
                        }
                        _url = _url.replace("#TruePage#", "" + truePage);
                        urls.push(_url);
                    });
                    let results = [];

                    if (typeof (batchFetch) === 'function') {
                        let reqUrls = urls.map(it => {
                            return {
                                url: it,
                                options: {timeout:rule.timeout}
                            }
                        });
                        let rets = batchFetch(reqUrls);
                        rets.forEach((ret, idx) => {
                            let it = search_classes[idx];
                            if (ret) {
                                try {
                                    let json = JSON.parse(ret);
                                    let data = json.list;
                                    data.forEach(i => {
                                        i.vod_id = it.type_id + '$' + i.vod_id;
                                        i.vod_remarks = i.vod_remarks + '|' + it.type_name;
                                    });
                                    results = results.concat(data);
                                } catch (e) {
                                    log(`请求:${it.type_id}发生错误:${e.message}`)
                                }
                            }
                        });
                    } else {
                        urls.forEach((_url, idx) => {
                            let it = search_classes[idx];
                            try {
                                let html = request(_url);
                                let json = JSON.parse(html);
                                let data = json.list;
                                data.forEach(i => {
                                    i.vod_id = it.type_id + '$' + i.vod_id;
                                    i.vod_remarks = i.vod_remarks + '|' + it.type_name;
                                });
                                results = results.concat(data);
                            } catch (e) {
                                log(`请求:${it.type_id}发生错误:${e.message}`)
                            }
                        });
                    }

                    VODS = results;
                    let t2 = new Date().getTime();
                    // log('t2:'+t2);
                    log(`${searchMode}搜索:${urls.length}个站耗时:${(Number(t2) - Number(t1))}ms`)

                }
            }
        }
    }),
    lazy: $js.toString(() => {
        // lazy想办法用对应的parse_url，但是有难度，暂未实现
        let parse_url = '';
        if (flag && flag.includes('|')) {
            let type_name = flag.split('|')[0];
            let current_vod = rule.classes.find(item => item.type_name === type_name);
            if (current_vod && current_vod.parse_url) {
                parse_url = current_vod.parse_url
            }
        }
        if (/\.(m3u8|mp4)/.test(input)) {
            input = {parse: 0, url: input}
        } else {
            if (parse_url.startsWith('json:')) {
                let purl = parse_url.replace('json:', '') + input;
                let html = request(purl);
                input = {parse: 0, url: JSON.parse(html).url}
            } else {
                input = parse_url + input;
            }
        }
    }),
}