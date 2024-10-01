globalThis.getAESjiem = function (word, key) {
	var srcs = word;
	if (word.charCodeAt(0)==65279)
		srcs=word.slice(1);
	var decrypt = CryptoJS.AES.decrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return decrypt.toString(CryptoJS.enc.Utf8);
}
function fn_getxl(){
	let html=post('http://103.88.35.251:8989/shark/api.php?action=configs',
	{
		headers: {
		'User-Agent': 'Dalvik/1.0.3 (Linux; U; Android 11; Redmi Build/M2012K10C)'
		},
		body: {
		'username': '',
		'token': ''
	}
   });
   let hkey=CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
   let htext=getAESjiem(html,hkey);
   return JSON.parse(htext).playerinfos
   
}
/*
globalThis.getxl = JSON.parse(getAESjiem(fetch('http://103.88.35.251:8989/shark/api.php?action=configs', {
	method: 'POST',
	headers: {
		'User-Agent': 'Dalvik/1.0.3 (Linux; U; Android 11; Redmi Build/M2012K10C)'
	},
	body: {
		'username': '',
		'token': ''
	}
}), CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x"))).playerinfos
*/
globalThis.getxl=fn_getxl();
log('getxl:'+getxl);
globalThis.getxlsz = function (name) {
	let xl = []
	getxl.forEach(it => {
		if (it.playername === name) {
			let data = getAESjiem(it.playerjiekou, CryptoJS.enc.Utf8.parse("aassqdwwssllsm1x")).match(/data=([^&]+)/)[1]
			let jx = getAESjiem(data, CryptoJS.enc.Utf8.parse("aassqdbbssllsmhx"))
			xl.push(jx)
		}
	})
	return xl
}
var rule = {
	title: '摘星剧场',
	host: 'http://103.88.35.251:8989',
	url: '/api.php/v1.classify/content?page=fypage',
	homeUrl: '/api.php/v1.home/data?type_id=25',
	searchUrl: '/api.php/v1.search/data?wd=**&type_id=0&page=fypage',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
	},
	searchable: 2,
	quickSearch: 1,
	filterable: 1,
	filter_url: 'fyclass&len=20&style={{fl.类型}}&zone={{fl.地区}}&year={{fl.年份}}&emcee={{fl.明星}}&order={{fl.排序}}&start=fypage&',
	class_name: '电影&电视剧&综艺&动漫&短剧',
	class_url: '21&20&23&22&24',
	filter: 'H4sIAAAAAAAAA+2cW1MaSRTH3/MpUjzvg5jNZferbOXBSrG1qTVxK3GzlUqliks0gIpAGYRwdV0goujgFQbBLzPdM3yLHaY7IAjnlJypKU0NT+j8nL/nzOnT3X8bPzx4aL48v79cfOX59eFv1lf914fBO+v6n7735mWP3mizwprnp9GLrxde+aZffbew+Ldv5N6TNYa369+LpXIsUh271/Ce15AbxMebPwQp6eEGD62AShKhKrHoN62Tg2MSCFWJB+LcnwKVJELOXjXBWm04ewIhxxSK8uBXOCaBkGOKHumdGhyTQMgVUf6MZU8i5OyF05oagbMnELJS8EBPJWAlgdgwnvQtJHsCIceU+mxEVDgmgVCVtMuScaiAShIhx1RfN8IFOCaBkJ/T5n/GLtxhJUJVMuoVtg6PXImQY1o519pwh5XITaWR7zwffHXtN5g8+7KcwtbHq3Aw+06+OuPsu7pi3g6OTiDUPPYqGd48ApUkQq9Chbe6SBVaCDmm4h7LduCYBEIewycKpiQRstJ2mecOYCWBkGffbgyLSSLkbrHWwJQkQp8/FBYtsfwOMoV8p+5ld2qdau3xbA6708Srs3Wn+bn5n8HYLICaQ/MmjzCVR3aozGMq83aoeDEVrx0qc5jKnA0q3l8QFROwQeUZpvLMDpWnmMpTO1SeYCpP7FB5jKk8tkMFG/teO8a+Fxv7XjvGvhcb+1762OfZU769B088ArFvLuCxJFM3p80Fk6/ONhfwnN+4SuihOk/WwRjpebSU+qlKwSvj5ZdmmOS1ydEnrX1havb206Da2xdLbybJTXt01rvn4o6eZd+i76/Fhfd3yvpz0JBzzGTshTqsGYS3BAIhl6lz9otj23oWOGeh8YYxpiQQ8ubDOesvtso2j+GYBEKuCOesv3pF65YQS8lCyO3RMaPHOYPbOTPYUDbMJw5nTyDkmFZzPA93I4mQlVxDzjXkpsXkGnIEJdeQcw0515C7ruIacqMqriHnGnKQimvIXVdxDTnXkJtqyL17+8fSP3fLjssVNVXVq354BTigyMvNrSI/RTbcAiEXULygHyBWmUDIxXN4ZShheGErEPq24JwpyCk5gVCVesUTrRVHNlUWQlbyR7Dykwi59rqx3m4R2+r0EfJzajZ5GLY0JUKOSa2xQ/icl0Totbdi/s5I7VkIWSm0wj/Bz0kiZKXAudkDkJO0FkJVYvE4r8KbX4mQlWJFFs4i1rOFkLPn2BlDc7XBo2VYSSD05dsxehZUIOSRW03wLxnMeu4j5IpwzVNbzFPnLE2+Xe4VkU2EQMhKB1VzzoOVBHIfq5CnYzw9PpMMN0YTr85WhVrnix6E/1wqEXLfiK3p9Ya+G4Vbx4Ci996kcZpnhwGk/X6nyHVyWdLbGywML3OHFFnPXzPiG7CYQMhPbr+kqfC2WSLkHcnZGbvIwzsSgZCVwkm2Cv+hQiLkOmzU+PkZXIQCISvlY7r6L6wkELLSToJnvsFKArFhXcNPa3qlhS1tJEXV6x0HWABesUnEhn6oNVO8sI31Q0mR+8WqX49F2AY8aQ4psp5yyUuXWkvhm/B+fAQkZzXTYcd7PA8vd4aUDWMOHQkCIedTvTC68IEZiZCVwmlzNPFgBRYbUDaue1xDmKjmjCH8YuHN8tLS6zvlCDvnm5pVY+wgxrNA6D072cvA+ymJkGPqxpiSYOUT9ESFoMh6zn1Cu7TDsvAYlwhZKbCmhxuIK2ch5OyVC736Fpw9gdC7l4odypMIOaZslGdgB0siVCVNPWZ1eE0iEfL4jTbYFbzAkwg5e/tl4wjeOUmEvELOJ3kaWSELhJw9xxxh5/4HhuHvYL6VRMjPqb6FdViJkLP3Q/u0zh1pdNDTzHY0FfmIiUDuZW24RwxnU3GPGN5SxT1ieGsV94jhbVXcI4auozRB6QdxlB58/B/LmRTJ7U8AAA==',
	// limit: 6,
	//double: false,
	play_parse: true,
	lazy: $js.toString(() => {
		let fg = input.split('?')
		input = fg[0]
		let jx = getxlsz(fg[1])
		var key = CryptoJS.enc.Utf8.parse("aasshjwwcbllsm1x");
		let data = getAESjiem(input, key).match(/data=([^&]+)/)[1]
		var key1 = CryptoJS.enc.Utf8.parse("bbssqdbbssll25sx");
		let data1 = getAESjiem(data, key1)
		let url
		for (let i = 0; i < jx.length; i++) {
			try {
				const response = fetch(jx[i] + data1);
				const url1 = JSON.parse(response).url;
				if (url1) {
					url = url1;
					break;
				}
			} catch (error) {

			}
		}
		input = {
			url: url,
			parse: 0,
			header: rule.headers
		}
	}),
	推荐: $js.toString(() => {
		let d = [];
		let data = fetch(input, {
			method: 'GET'
		})
		var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
		let data1 = JSON.parse(getAESjiem(data, key)).data
		let data2 = data1.banners
		data1.verLandList.forEach(it => {
			Array.prototype.push.apply(data2, it.vertical_lands)
		})
		data2.forEach(it => {
			let id = `http://103.88.35.251:8989/api.php/v1.player/details?vod_id=${it.vod_id}`;
			d.push({
				url: id,
				title: it.vod_name,
				img: it.vod_pic,
				desc: it.vod_remarks ? it.vod_remarks : it.vod_score,
			})
		});
		setResult(d)
	}),
	一级: $js.toString(() => {
		let d = [];
		let body = { "area": "全部地区", "rank": "按上新", "type": "全部类型", "type_id": parseInt(MY_CATE), "year": "全部年代" }
		let data = fetch(`http://103.88.35.251:8989/api.php/v1.classify/content?page=${MY_PAGE}`, {
			method: 'POST',
			body: body
		})
		var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
		let data1 = JSON.parse(getAESjiem(data, key)).data.video_list
		data1.forEach(it => {
			let id = `http://103.88.35.251:8989/api.php/v1.player/details?vod_id=${it.vod_id}`;
			d.push({
				url: id,
				title: it.vod_name,
				img: it.vod_pic,
				desc: it.vod_remarks ? it.vod_remarks : it.vod_score,
			})
		});
		setResult(d)
	}),
	二级: $js.toString(() => {
		var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
		let data = JSON.parse(getAESjiem(request(input), key)).data.detail
		log(JSON.stringify(data))
		let data1 = data.play_url_list
		let xianlu = []
		let result = []
		data1.forEach(it => {
			xianlu.push(it.show.replace("（广告误信）", ""))
			let lieb = []
			let xlname = it.from
			it.urls.forEach(itt => {
				lieb.push(`${itt.name}$${itt.url}?${xlname}`)
			})
			lieb = lieb.join('#')
			result.push(lieb)
		})
		VOD = {
			vod_name: data.vod_name,
			type_name: data.typeName,
			vod_year: data.vod_year,
			vod_area: data.vod_area,
			vod_remarks: data.vod_remarks,
			vod_actor: data.vod_actor,
			vod_director: data.vod_director,
			vod_content: data.vod_content.replace(/<p[^>]*?>|<\/p>/g, ''),
			vod_play_from: xianlu.join('$$$'),
			vod_play_url: result.join('$$$')
		}

	}),
	搜索: $js.toString(() => {
		let d = [];
		let data = fetch(input, {
			method: 'GET'
		})
		var key = CryptoJS.enc.Utf8.parse("aassddwwxxllsx1x");
		let data1 = JSON.parse(getAESjiem(data, key)).data.search_data
		data1.forEach(it => {
			let id = `http://103.88.35.251:8989/api.php/v1.player/details?vod_id=${it.vod_id}`;
			d.push({
				url: id,
				title: it.vod_name,
				img: it.vod_pic,
				desc: it.vod_remarks ? it.vod_remarks : it.vod_score,
			})
		});
		setResult(d)
	}),
}