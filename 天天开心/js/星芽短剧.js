var rule = {
  类型: '影视',
  title: '星芽短剧app',
  host: 'https://app.whjzjx.cn',
  url: '/cloud/v2/theater/home_page?theater_class_id=fyclass&type=fyclass&class2_ids=0&page_num=fypage&page_size=24',
  searchUrl: '/v3/search',
  searchable: 2,
  quickSearch: 0,
  headers: {
    'User-Agent': 'okhttp/4.10.0',
    'Accept-Encoding': 'gzip',
    'x-app-id': '7',
    'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjYxMDc3MTEsIlVzZXJJZCI6NTIwNTExMjksInJlZ2lzdGVyX3RpbWUiOiIyMDI0LTA3LTI0IDIxOjE4OjU0IiwiaXNfbW9iaWxlX2JpbmQiOnRydWV9.VZ1wymjHxCXywCJJwHfp3Sb7iXbsTndlgYKEM0DIieU',
    'platform': '1',
    'manufacturer': 'realme',
    'version_name': '3.1.0.1',
    'user_agent': 'Mozilla/5.0 (Linux; Android 9; RMX1931 Build/PQ3A.190605.05081124; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36',
    'dev_token': 'BFdbZBGOEgG7QDt01ldOQNNfhO2F-rv4QcugZoFZm5_3DlPJEo_bSBeJ6dW2X3eKzxxKKWz3xJCM_u5PppGMqRuYPxcsVg9a-jriWiIoPZvHMSLbcbxTFuasqgTivTY3GabW1yP57LQSsJNQfKoX1BKYGHducrhb0bTwvigfn3gE*',
    'app_version': '3.1.0.1',
    'device_platform': 'android',
    'personalized_recommend_status': '1',
    'device_type': 'RMX1931',
    'device_brand': 'realme',
    'os_version': '9',
    'channel': 'default',
    'raw_channel': 'default',
    'oaid': '',
    'msa_oaid': '',
    'uuid': 'randomUUID_85bdfdc1-e8d4-4464-a9b1-85da24f0c79b',
    'device_id': '24e9f77bb09763da4bc4e80e374f63800',
    'ab_id': '',
    'support_h265': '1'
  },
  timeout: 5000,
  class_name: '剧场&热播剧&会员专享&星选好剧&新剧&阳光剧场',
  class_url: '1&2&8&7&3&5',
  play_parse: true,
  lazy: $js.toString(()=>{
      input = {url: input,parse: 0}
  }),
  double: true,
 一级: $js.toString(()=>{
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.list;
        data.forEach(it => {
            let id = 'https://app.whjzjx.cn/v2/theater_parent/detail?theater_parent_id='+it.theater.id;
            d.push({
            url:id,
            title:it.theater.title,
            img:it.theater.cover_url,
            desc:it.theater.theme,
        })
        })
       setResult(d);
    }),
    二级: $js.toString(()=>{
        let urls = [];
        let html = request(input);
        let data = JSON.parse(html).data;
        data.theaters.forEach(it => {
            urls.push(it.num+'$'+it.son_video_url);
        })
    VOD = {
            vod_name: data.title,
            vod_pic: data.cover_url,
            vod_play_from: '开心软件',
            vod_play_url: urls.join('#')
        };
    }),
  搜索: $js.toString(()=>{
      let html = post(input,{body:{"text":KEY}})
      let list = JSON.parse(html).data.theater.search_data;
      list.forEach(it =>{
        let id = 'https://app.whjzjx.cn/v2/theater_parent/detail?theater_parent_id='+it.id;
        d.push({
            url:id,
            title:it.title,
            img:it.cover_url,
            content:it.introduction,
        })
      })
      setResult(d);
  }),
}