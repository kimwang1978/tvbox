//初版v2模板，自动分类筛选
//填上这里host即可，其他不用改动

globalThis.gethost = 'http://cmsyttv.lyyytv.cn/'

let data=JSON.parse(fetch(gethost+'/api.php/app/nav?token',{headers:{'User-Agent':'Dart/2.14 (dart:io)'}}));let dy={"class":"类型","area":"地区","lang":"语言","year":"年份","letter":"字母","by":"排序"};let fyurl='';let result={};let getn=[];let getu=[];let jsonData=data.list;for(let k=0;k<jsonData.length;k++){let hasNonEmptyField=false;getn.push(jsonData[k].type_name);getu.push(jsonData[k].type_id);for(let key in dy){if(key in jsonData[k].type_extend&&jsonData[k].type_extend[key].trim()!==""){hasNonEmptyField=true;break}};if(hasNonEmptyField){result[String(jsonData[k].type_id)]=[];for(let dkey in jsonData[k].type_extend){if(dkey in dy&&jsonData[k].type_extend[dkey].trim()!==""){if(k==0){fyurl+=`&${dkey}={{fl.${dkey}}}`}let values=jsonData[k].type_extend[dkey].split(',');let valueArray=values.map(value=>({"n":value.trim(),"v":value.trim()}));result[String(jsonData[k].type_id)].push({"key":dkey,"name":dy[dkey],"value":valueArray})}}}};globalThis.getname=getn.join("&");globalThis.geturl=getu.join("&");globalThis.getfilter=result;globalThis.getfyurl=fyurl;
var rule = {
    author: '嗷呜',
    title: '[V2]模板',
    host: gethost,
    url: '/api.php/app/video?tid=fyclassfyfilter&limit=20&pg=fypage',
    filter_url: getfyurl,
    homeUrl: '/api.php/app/index_video',
    detailUrl: '/api.php/app/video_detail?id=fyid',   
    searchUrl: '/api.php/app/search?text=**&pg=fypage',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    headers: {
        'User-Agent': 'okhttp/4.9.1'
    },   
    class_name: getname,
    class_url: geturl,
    filter: getfilter,
    limit: 20,
    play_parse: true,
     lazy: $js.toString(() => {
  let d = [];

  try {
    // 发起请求并获取响应，添加请求头
    let headers = {
      'User-Agent': 'okhttp/4.12.0'
    };
    let responseText = request("http://qn6z7b.yun.42jx.com/jx/jx.php?url=" + input, { headers: headers });
 
    console.log("响应文本:", responseText); // 查看原始响应内容
//备用http://llyh.xn--yi7aa.top/api/?key=5b317c16d457b31a3150d87c0a362a9e&url=
    // 解析 JSON 数据
    let response = JSON.parse(responseText);

    // 查找以 'url' 开头的字段
    let urlField = Object.keys(response).find(key => key.startsWith('url'));

    // 提取找到的字段值
    let urlValue = urlField ? response[urlField] : null;

    console.log("提取的随机字段值:", urlValue); // 查看提取的值

    if (urlValue) {
      // 处理 urlValue，或将其用于 input
      input = {
        url: urlValue,
        parse: 0,
        header: rule.headers
      };
    } else {
      // 处理没有找到字段的情况
      console.error("没有找到以 'url' 开头的字段");
    }
  } catch (error) {
    console.error("处理请求或数据时发生错误：", error);
  }

  setResult(d);
}),
    推荐: $js.toString(() => {
        let data=JSON.parse(fetch(input)).list;let com=[];data.forEach(item=>{if(Array.isArray(item.vlist)&&item.vlist.length!==0){com=com.concat(item.vlist)}})
        VODS = com
    }),
    一级: $js.toString(() => {
        VODS = JSON.parse(fetch(input)).list
    }),
    二级: $js.toString(() => {
        VOD = JSON.parse(fetch(input)).data
    }),
    搜索: '*',
}