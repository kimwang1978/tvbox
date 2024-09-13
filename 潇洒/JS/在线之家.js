muban.首图2.二级.desc = '.data:eq(3)&&Text;;;.data:eq(1)&&Text;.data:eq(2)&&Text';
var rule = {
    title: '在线之家',
    模板: '首图2',
    // host:'https://www.zxzj.site',
    host: 'https://www.zxzja.com',
    url: '/vodshow/fyclassfyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by}}-{{fl.class}}-----fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2Y32vaUBTH/5c8+2BitV3/ldGHrARW1nWg3UCK0FbtrHQ2LUXrdHOFVe1QTGkpM5L2n0luzH+xxHvPuRe2hTB8KOy+5fM995x77o9zAndPUZX1l3vKG6OorCub23qhoKSUHf2tEaJ3PCDlasgf9O33xmLcTiRXh0F5GMkhKKUUU5vdcDxTGYDNr92yQBzARg5Mst9kNgYYsz50nS7EpIAxB2fedAYxKaAfJs4B56tduvYxzEcBbPNx3zv5wWwMcL76xHfAxkDI07+Y8TwjQNv1R54nA7QdnQftG7BRKG1EVnoeet7QhePoWt6JnfQ4vg+C9hGEpgC2oN8mPyfMxgD9Ti0yfQQ/Crh1o4H/2ICto4Axezdex4GYFNCvdU26I/CjgLY7i/sxwFw+WZ7dh1wogM19qvhOizRhGZzRu/rgzuBiMRA3t2joeWFzp/fuzEm4uVpaW2Ha4lPQM1zPiLrGdU3UVa6rop7melrQ1Reoh5+Cvsb1NVFf5fqqqOe4nhP1LNezos7Xq4rrVfl6VXG9Kl+vKq5X5esNP8XjeFXkh0Ea5559+tthkNZD0LpnAXa3wqF4G2ybWBfM8nprt8BLelLxalAHhc13eSOadSOlaMvqezG95l97YlzfI4cjv3kGBUMhUS+N6UOkXCeHn8GPQpK+F9eDg96dOzWxISxAlqYszQSlmZGlKUtTluZzLM0VWZqyNGVpPsfSzAqlKa/Cf30Vckvq0uFIUulhh1tAki7ml8fzq32wUcCYjaFvQtIM0GZ+9UfYpSlg9/vTWwlshPll3oA3HQYY89uV1xlDTAqJ/hhdm9QuwY8CzvdkhqNhPgroF/O+5FnhNsEhM1jWe0/HcW38aVLAlOLeX2LedOQPR3aZv3aZ0i+/mY/pOxYAAA==',
    // tab_exclude: '夸克网盘|迅雷云盘|百度网盘',
    tab_remove: ['夸克网盘', '迅雷云盘', '百度网盘'],
    // 搜索:muban.首图2.搜索1,
    搜索: 'ul.stui-vodlist&&li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
    headers: {
        'User-Agent': 'MOBILE_UA',
        // 'Referer': HOST,
    },
    lazy: `js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
		var from = html.from;
		if (html.encrypt == '1') {
			url = unescape(url)
		} else if (html.encrypt == '2') {
			url = unescape(base64Decode(url))
		}
		if (/m3u8|mp4/.test(url)) {
			input = url
		} else if (/line3|line4|line5/.test(from)) {
			var ifrwy = request(url, {
                headers: {
					'User-Agent': MOBILE_UA,
					'Referer': HOST,
					'sec-fetch-mode': 'navigate',
					'sec-fetch-site': 'cross-site',
					'sec-fetch-dest': 'iframe',
					'upgrade-insecure-requests': 1,
                }
			});
			let resultv2 = ifrwy.match(/var result_v2 = {(.*?)};/)[1];
			let data = JSON.parse('{' + resultv2 + '}').data;
			let code = data.split('').reverse();
			let temp = '';
			for (let i = 0x0; i < code.length; i = i + 0x2) {
				temp += String.fromCharCode(parseInt(code[i] + code[i + 0x1], 0x10))
			}
			input = {
				jx: 0,
				url: temp.substring(0x0, (temp.length - 0x7) / 0x2) + temp.substring((temp.length - 0x7) / 0x2 + 0x7),
				parse: 0
			}
		} else{
			input
		}
	`,
}