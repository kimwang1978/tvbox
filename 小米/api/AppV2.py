# -*- coding: utf-8 -*-
# 基于原作者 @嗷呜 版本修改
# 本资源来源于互联网公开渠道，仅可用于个人学习爬虫技术。
# 严禁将其用于任何商业用途，下载后请于 24 小时内删除，搜索结果均来自源站，本人不承担任何责任。

from base.spider import Spider
from urllib.parse import urlparse, urlencode
import re,sys,time,json,urllib3,hashlib,datetime
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
sys.path.append('..')

class Spider(Spider):
    api,apisignkey,datasignkey,detail_type,search_data = '', '' , '','',''

    headers = {
        'User-Agent': 'okhttp/4.12.0',
    }

    def init(self, extend=""):
        ext = extend.rstrip()
        if ext.startswith('http'):
            self.api = ext.rstrip('/')
        else:
            arr = json.loads(ext)
            self.api = arr['api'].rstrip('/')
            if self.api.endswith('v1.vod'):
                self.detail_type = arr.get('detail_type','')
            self.apisignkey = arr.get('apisignkey', '')
            if self.apisignkey:
                self.datasignkey = arr.get('datasignkey', '6QQNUsP3PkD2ajJCPCY8')

    def homeContent(self, filter):
        if self.api.endswith('v1.vod'):
            path = '/types'
            if self.apisignkey and self.datasignkey:
                path = self.datasign(path)
            data = self.fetch(f"{self.api}{path}", headers=self.headers, verify=False).text
            data = json.loads(data[1:] if data.startswith('\ufeff') else data)
            data = data['data']
        else:
            data = self.fetch(f"{self.api}/nav?token=", headers=self.headers, verify=False).json()
        keys = ["class", "area", "lang", "year", "letter", "by", "sort"]
        filters = {}
        classes = []
        for item in data.get('list',data.get('data',[])):
            has_non_empty_field = False
            jsontype_extend = item["type_extend"]
            classes.append({"type_name": item["type_name"], "type_id": item["type_id"]})
            for key in keys:
                if key in jsontype_extend and jsontype_extend[key].strip() != "":
                    has_non_empty_field = True
                    break
            if has_non_empty_field:
                filters[str(item["type_id"])] = []
            for dkey in jsontype_extend:
                if dkey in keys and jsontype_extend[dkey].strip() != "":
                    values = jsontype_extend[dkey].split(",")
                    value_array = [{"n": value.strip(), "v": value.strip()} for value in values if
                                   value.strip() != ""]
                    filters[str(item["type_id"])].append({"key": dkey, "name": dkey, "value": value_array})
        result = {"class": classes, "filters": filters}
        return result

    def homeVideoContent(self):
        if self.api.endswith('v1.vod'):
            path = '/vodPhbAll'
            if self.apisignkey and self.datasignkey:
                keytime = self.keytime()
                path += self.datasign(f'?apikey={self.apikey()}&keytime={keytime}',keytime)
            data = self.fetch(f"{self.api}{path}", headers=self.headers, verify=False).text
            data = json.loads(data[1:] if data.startswith('\ufeff') else data)
            data = data['data']
        else:
            data = self.fetch(f"{self.api}/index_video?token=", headers=self.headers, verify=False).json()
        videos = []
        if self.api.endswith('v1.vod'):
            for item in data['list']: videos.extend(item['vod_list'])
        elif 'list' in data:
            for item in data['list']: videos.extend(item['vlist'])
        elif 'data' in data:
            for item in data['data']: videos.extend(item['vlist'])
        return {'list': videos}

    def categoryContent(self, tid, pg, filter, extend):
        if self.api.endswith('v1.vod'):
            path = f"?type={tid}&class={extend.get('class', '')}&lang={extend.get('lang', '')}&area={extend.get('area', '')}&year={extend.get('year', '')}&by=&page={pg}&limit=9"
            if self.apisignkey and self.datasignkey:
                keytime = self.keytime()
                path = self.datasign(f'{path}&apikey={self.apikey()}&keytime={keytime}' ,keytime)
            data = self.fetch(f"{self.api}{path}", headers=self.headers, verify=False).text
            data = json.loads(data[1:] if data.startswith('\ufeff') else data)
            data = data['data']
        else:
            params = {'tid': tid, 'class': extend.get('class', ''), 'area': extend.get('area', ''), 'lang': extend.get('lang', ''), 'year': extend.get('year', ''), 'limit': '18', 'pg': pg}
            data = self.fetch(f"{self.api}/video", params=params, headers=self.headers, verify=False).json()
            if 'data' in data:
                data = {'list':data['data']}
        return data

    def searchContent(self, key, quick, pg="1"):
        if self.api.endswith('v1.vod'):
            path = f"?page={pg}&limit=10&wd={key}"
            if self.apisignkey and self.datasignkey:
                keytime = self.keytime()
                path = self.datasign(f'{path}&apikey={self.apikey()}&keytime={keytime}',keytime)
        else:
            path = f"/search?text={key}&pg={pg}"
        data = self.fetch(f"{self.api}{path}", headers=self.headers, verify=False).text
        data = json.loads(data[1:] if data.startswith('\ufeff') else data)
        if self.api.endswith('v1.vod') and self.detail_type == 'search':
            self.search_data = data
        data2 = data.get('list',data.get('data',[]))
        if 'type' in data2:
            for item in data2:
                item.pop('type', None)
        if not 'list' in data2:
            data2 = {'list': data2, 'page': pg}
        return data2

    def detailContent(self, ids):
        if self.detail_type == 'search':
            for i in self.search_data['data']['list']:
                if str(i['vod_id']) == str(ids[0]):
                    data = i
                    break
        else:
            if self.api.endswith('v1.vod'):
                path = f'/detail?vod_id={ids[0]}&rel_limit=10'
                if self.apisignkey and self.datasignkey:
                    keytime = self.keytime()
                    path = self.datasign(f'{path}&apikey={self.apikey()}&keytime={keytime}',keytime)
            else:
                path = f'/video_detail?id={ids[0]}'
            data = self.fetch(f"{self.api}{path}", headers=self.headers, verify=False).text
            data = json.loads(data[1:] if data.startswith('\ufeff') else data)
            data = data['data']
        if 'vod_info' in data:
            data = data['vod_info']
        show = []
        vod_play_url = []
        if 'vod_url_with_player' in data:
            for i in data['vod_url_with_player']:
                if i['code'] == i['name']:
                    show.append(i['name'])
                else:
                    show.append(f"{i['name']}\u2005({i['code']})")
                parse_api = i.get('parse_api','')
                if parse_api and parse_api.startswith('http'):
                    url = i.get('url','')
                    if url:
                        url2 = '#'.join([i+ '@' + parse_api  for i in url.split('#')])
                    vod_play_url.append(url2)
                else:
                    vod_play_url.append(i.get('url', ''))
            data.pop('vod_url_with_player')
        if 'vod_play_list' in data:
            vod_play_list = data['vod_play_list']
            for i in vod_play_list.values() if isinstance(vod_play_list, dict) else vod_play_list:
                parses = ''
                player_info = i['player_info']
                if player_info['show'] == i['from']:
                    show.append(player_info['show'])
                else:
                    show.append(f"{player_info['show']}\u2005({i['from']})")
                parse = player_info.get('parse','').strip()
                parse2 = player_info.get('parse2','').strip()
                if 'parse' in player_info and parse.startswith('http'):
                    parses += parse + ','
                if 'parse2' in player_info and parse2.startswith('http') and parse2 != parse:
                    parses += parse2
                parses = parses.rstrip(',')
                url = ''
                urls = i['urls']
                for j in urls.values() if isinstance(urls, dict) else urls:
                    if parse:
                        url += f"{j['name']}${j['url']}@{parses}#"
                    else:
                        url += f"{j['name']}${j['url']}#"
                url = url.rstrip('#')
                vod_play_url.append(url)
        if 'vod_play_list' in data:
            data.pop('vod_play_list')
        if 'rel_vods' in data:
            data.pop('rel_vods')
        if 'type' in data:
            data.pop('type')
        if show:
            data['vod_play_from'] = '$$$'.join(show)
        if vod_play_url:
            data['vod_play_url'] = '$$$'.join(vod_play_url)
        return {'list': [data]}

    def playerContent(self, flag, id, vipFlags):
        video_pattern = re.compile(r'https?:\/\/.*\.(?:m3u8|mp4|flv)')
        jx,url,ua = 0,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        if '@' in id:
            rawurl, jxapi = id.split('@', 1)
            jxapis = jxapi.split(',', 1) if ',' in jxapi else [jxapi]
            for jxapi_ in jxapis:
                try:
                    res = self.fetch(f"{jxapi_}{rawurl}", headers=self.headers, timeout=10, verify=False).text
                    res = json.loads(res[1:] if res.startswith('\ufeff') else res)
                    url = res.get('url', '')
                    if url.startswith('http'):
                        jxua = res.get('ua')
                        if jxua:
                            ua = jxua
                except Exception:
                    url = ''
                    continue
            if url.startswith('http'):
                jx = 0
            else:
                url = rawurl
                jx = 0 if video_pattern.match(rawurl) else 1
        else:
            url = id
            jx = 0 if video_pattern.match(id) else 1
        if url.startswith('NBY'):
            jx, url = 0,''
        return {'jx': jx,'parse': 0,'url': url,'header': {'User-Agent': ua}}

    def keytime(self):
        return str(int(datetime.datetime.now().timestamp()))

    def md5(self, str):
        hash_obj = hashlib.md5()
        hash_obj.update(str.encode('utf-8'))
        return hash_obj.hexdigest()

    def apikey(self):
        date = datetime.datetime.now()
        year = str(date.year)
        hour = str(date.hour)
        minute = str(date.minute)
        if len(hour) < 2:
            hour = "0" + hour
        if len(minute) < 2:
            minute = "0" + minute
        str_value = self.apisignkey
        sign_str = f"{year}:{hour}:{year}:{minute}:{str_value}"
        md5_hash = self.md5(sign_str)
        return md5_hash

    def datasign(self, url='', timestamp=''):
        parsed_url = urlparse(url)
        query_params = self._parse_query_params(parsed_url.query)
        if not timestamp:
            timestamp = str(time.time())
        query_params["timestamp"] = timestamp
        sorted_params = sorted(query_params.items(), key=lambda x: x[0])
        sign = self._generate_signature(sorted_params)
        query_params["datasign"] = sign
        new_query = urlencode(query_params)
        new_url = parsed_url._replace(query=new_query).geturl()
        return new_url

    def _parse_query_params(self, query_str):
        params = {}
        if not query_str:
            return params
        for param in query_str.split('&'):
            if '=' not in param:
                continue
            key, value = param.split('=', 1)
            if value:
                params[key] = value
        return params

    def _generate_signature(self, sorted_params):
        param_str = '&'.join([f"{k}={v}" for k, v in sorted_params])
        raw_sign_str = f"{param_str}{self.datasignkey}"
        md5_hash = hashlib.md5(raw_sign_str.encode('utf-8')).hexdigest()
        return md5_hash

    def localProxy(self, param):
        pass

    def getName(self):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def destroy(self):
        pass
