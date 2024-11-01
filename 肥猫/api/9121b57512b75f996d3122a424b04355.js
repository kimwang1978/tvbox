let sourceUrl = "";
let sourceData = {};

function request(url) {
    const resp = req(url, {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        }
    });
    return resp.content;
}

function init(ext) {
    if (ext && ext.indexOf('http') == 0) {
        sourceUrl = ext;
    }
}


function home(filter) {
    console.log('sourceUrl: ' + sourceUrl);
    if (sourceUrl.indexOf('http') < 0) {
        return null;
    }
    
    const classes = [];
    sourceData = {};
    
    let className = '网盘分享⭐不怕墙';
    const text = request(sourceUrl);
    for (let line of text.split('\n')) {
        line = line.trim().replace(/[,\s$]+/g, ',');
        const position = line.indexOf(',');
        if (position < 0 && line.indexOf('##') == 0) {
            className = line.substring(2).trim();
        } else if (position > 1) {
            const name = line.substring(0, position).trim();
            let url = line.substring(position + 1).trim();

            let panName = '';
            switch (url.split('://')[0]) {
                case 'ali':
                    url = 'push://https://www.alipan.com/s/' + url.substring(6);
                    panName = '阿里';
                    break;
                case 'uc':
                    url = 'push://https://drive.uc.cn/s/' + url.substring(5);
                    panName = 'UC';
                    break;
                case 'quark':
                    url = 'push://https://pan.quark.cn/s/' + url.substring(8);
                    panName = '夸克';
                    break;
                case 'https':
                    if (url.indexOf('alipan.com') > 0) {
                        url = 'push://' + url;
                        panName = '阿里';
                    } else if (url.indexOf('uc.cn') > 0) {
                        url = 'push://' + url;
                        panName = 'UC';
                    } else if (url.indexOf('quark.cn') > 0) {
                        url = 'push://' + url;
                        panName = '夸克';
                    } else {
                        continue;
                    }
                    break;
                default:
                    continue;
            }
            
            if (!(className in sourceData)) {
                classes.push({
                    'type_id': className,
                    'type_name': className,
                    "type_flag": "1"
                });
                sourceData[className] = [];
            }
            
            sourceData[className].push({
                'vod_id': url,
                'vod_name': name,
                'vod_pic': '',
                'vod_remarks': panName
            });
        }
    }
    
    return JSON.stringify({
        'class': classes,
        'filters': null,
        'type_flag': '1'
    });
}

function category(tid, pg, filter, extend) {
    return JSON.stringify({
        'page': 1,
        'pagecount': 1,
        'list': sourceData[tid],
        'type_des': ''
    });
}

__JS_SPIDER__ = {
    init: init,
    home: home,
    homeVod: null,
    category: category,
    detail: null,
    play: null,
    search: null
};
