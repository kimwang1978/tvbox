globalThis.h_ost = 'http://111.229.140.167:8762/';

globalThis.vod1 = function(t, pg) {
    let html1 = request(`${h_ost}apptov5/v1/vod/lists?type_id=${t}&area=&lang=&year=&order=time&type_name=&page=${pg}&pageSize=21`, {
        body: {},
        'method': 'GET'
    }, true);
    return html1;
};
//
globalThis.svod1 = function(ids) {
    let html1 = request(`${h_ost}apptov5/v1/vod/getVod?id=${ids}`, {
        body: {},
        'method': 'GET'
    }, true);
    let bata = JSON.parse(html1).data;
    const data = {
        vod_id: ids,
        vod_name: bata.vod_name,
        vod_remarks: bata.vod_remarks,
        vod_actor: bata.vod_actor,
        vod_director: bata.vod_director,
        vod_content: bata.vod_content,
        vod_play_from: '',
        vod_play_url: ''
    };
    bata.vod_play_list.forEach((value, index) => {
        data.vod_play_from += value.player_info.show + '$$$';
        value.urls.forEach((v) => {
            data.vod_play_url += v.name + '$' + value.player_info.from + '|' + v.url + '#';
        });
        data.vod_play_url += '$$$';
    });
    return data;
};
//
globalThis.ssvod1 = function(wd) {
    let html1 = request(h_ost + 'apptov5/v1/search/lists?wd=' + encodeURIComponent(wd) + '&page=1&type', {
        body: {},
        'method': 'GET'
    }, true);
    return html1;
};

globalThis.jxx = function(bn, url) {
    let html1 = request('http://111.229.140.167:8762/apptov5/v2/parsing/proxy', {
        body: {
            'play_url': url,
            'key': bn
        },
        'method': 'POST'
    }, true);
    return JSON.parse(html1).data.url;
    if ("" == '104847347') {
        return JSON.parse(html1).data.url;
    } else {
        return 'https://mp4.ziyuan.wang/view.php/3c120366111dde9c318be64962b5684f.mp4';
    }

};

var rule = {
    title: '完美[软]',
    host: '',
    //homeTid: '',
    //homeUrl: '/api.php/provide/vod/?ac=detail&t={{rule.homeTid}}',
    detailUrl: 'fyid',
    searchUrl: '**',
    url: 'fyclass',
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    class_name: '电影&电视剧&综艺&动漫',
    class_url: '1&2&3&4',
    timeout: 5000,
    filterable: 1,
    limit: 20,
    multi: 1,
    searchable: 2,
    play_parse: true,
    parse_url: '',
    lazy: $js.toString(() => {
        const parts = input.split('|');
        let murl = jxx(parts[0], parts[1]);
        if (!murl.includes('http')) {
            input = {
                parse: 0,
                url: input,
                jx: 0,
                danmaku: 'http://dm.sds11.top/tdm.php?url=' + parts[1]
            };
        } else {
            input = {
                parse: 0,
                url: murl,
                jx: 0,
                danmaku: 'http://dm.sds11.top/tdm.php?url=' + parts[1]
            };
        }
    }),
    推荐: $js.toString(() => {
        let bata = JSON.parse(vod1(1, 1)).data.data;
        console.log(input);
        bata.forEach(it => {
            d.push({
                url: it.vod_id,
                title: it.vod_name,
                img: it.vod_pic,
                desc: it.vod_remarks
            })
        });
        setResult(d)
    }),
    一级: $js.toString(() => {
        let bata = JSON.parse(vod1(input, MY_PAGE)).data.data;
        console.log(input);
        bata.forEach(it => {
            d.push({
                url: it.vod_id,
                title: it.vod_name,
                img: it.vod_pic,
                desc: it.vod_remarks
            })
        });
        setResult(d)
    }),
    二级: $js.toString(() => {
        VOD = svod1(input);
    }),
    搜索: $js.toString(() => {
        //console.log(input);
        // console.log(ssvod1(input).data.data);
        let bata = JSON.parse(ssvod1(input)).data.data;
        console.log(bata);
        bata.forEach(it => {
            d.push({
                url: it.vod_id,
                title: it.vod_name,
                img: it.vod_pic,
                desc: it.vod_remarks
            })
        });
        setResult(d)
    }),
}