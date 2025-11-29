#小心儿悠悠
from urllib.parse import quote
from base.spider import Spider
import requests

class Spider(Spider):
    def __init__(self):
        super().__init__()
        
    def getName(self):
        return "喜马拉雅"

    def init(self, extend):
        self.search_api = "https://api.cenguigui.cn/api/music/ximalaya.php"
        
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': 'https://www.ximalaya.com/',
            'Host': 'api.cenguigui.cn'
        }
        
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def homeContent(self, filter):
        categories = [
            {"type_id": "有声书", "type_name": "有声书"},
            {"type_id": "广播剧", "type_name": "广播剧"},
            {"type_id": "娱乐", "type_name": "娱乐"},
            {"type_id": "儿童", "type_name": "儿童"},
            {"type_id": "音乐", "type_name": "音乐"},
            {"type_id": "相声评书", "type_name": "相声评书"},
            {"type_id": "个人成长", "type_name": "个人成长"}
        ]
        
        return {"class": categories}

    def categoryContent(self, cid, pg, filter, ext):
        try:
            page_num = int(pg)
            url = f"{self.search_api}?name={quote(cid)}&page={page_num}"
            
            response = self.session.get(url, timeout=8)
            data = response.json()
            
            if data.get('data'):
                videos = []
                albums = data.get('data', [])
                
                for album in albums:
                    album_id = album.get('albumId', '')
                    videos.append({
                        "vod_id": str(album_id),
                        "vod_name": album.get('title', ''),
                        "vod_pic": album.get('cover', ''),
                        "vod_remarks": f"{album.get('type', '')} | {album.get('Nickname', '')}"
                    })
                
                return {
                    'list': videos,
                    'page': page_num,
                    'pagecount': 999999,
                    'limit': 20,
                    'total': len(albums)
                }
                
        except Exception as e:return {'list': []}

    def detailContent(self, ids):
        try:
            album_id = ids[0]
            url = f"{self.search_api}?name={quote(album_id)}"
            
            response = self.session.get(url, timeout=8)
            data = response.json()
            
            if data.get('data'):
                album_info = data.get('data', [{}])[0]
                
                tracks = self._getAlbumTracks(album_id)
                
                play_urls = []
                for i, track in enumerate(tracks):
                    track_title = track.get('title', f'第{i+1}章')
                    track_id = track.get('trackId', '')
                    play_urls.append(f"{track_title}${album_id}_{track_id}_{i}")
                
                play_from = "喜马拉雅"
                play_url = '#'.join(play_urls)
                
                return {'list': [{
                    "vod_id": album_id,
                    "vod_name": album_info.get('title', ''),
                    "vod_pic": album_info.get('cover', ''),
                    "vod_actor": album_info.get('Nickname', ''),
                    "vod_year": "",
                    "vod_content": album_info.get('intro', ''),
                    "vod_remarks": f"类型：{album_info.get('type', '')}|共{len(tracks)}集",
                    "vod_play_from": play_from,
                    "vod_play_url": play_url
                }]}
                
        except Exception as e:return {'list': []}

    def _getAlbumTracks(self, album_id):
        try:
            url = f"{self.search_api}?albumId={album_id}"
            response = self.session.get(url, timeout=8)
            data = response.json()
            
            if data.get('data'):
                return data.get('data', [])
                
        except Exception as e:return []

    def playerContent(self, flag, id, vipFlags):
        try:
            if '$' in id:
                album_name, album_id = id.split('$', 1)
            else:
                album_id = id
                album_name = "未知专辑"
            
            if '_' in album_id:
                parts = album_id.split('_')
                if len(parts) >= 2:
                    track_id = parts[1]
                else:
                    track_id = album_id
            else:
                track_id = album_id
            
            play_url = self._getPlayUrl(track_id)
            
            pic_url = self._getAlbumCover(album_id.split('_')[0] if '_' in album_id else album_id)
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://www.ximalaya.com/'
            }
            
            return {
                "parse": 0,
                "playUrl": '',
                "url": play_url,
                "header": headers,
                "pic": pic_url
            }
            
        except Exception as e:return {
                "parse": 0, 
                "playUrl": '', 
                "url": '', 
                "header": {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://www.ximalaya.com/'
                }
            }

    def _getPlayUrl(self, track_id):
        try:
            parse_url = f"{self.search_api}?trackId={track_id}"
            response = requests.get(parse_url, headers=self.headers, timeout=8)
            data = response.json()
            
            if data.get('code') == 200:
                return data.get('url', '') or data.get('data', '')
        except Exception as e:return ""

    def _getAlbumCover(self, album_id):
        try:
            url = f"{self.search_api}?name={quote(album_id)}"
            response = self.session.get(url, timeout=3)
            data = response.json()
            
            if data.get('data'):
                info = data.get('data', [{}])[0]
                cover_url = info.get('cover', '')
                if cover_url:
                    return cover_url
        except Exception:
            pass
        
        return ""

    def searchContent(self, key, quick, pg="1"):
        try:
            page_num = int(pg)
            encoded_key = quote(key)
            
            url = f"{self.search_api}?name={encoded_key}&page={page_num}"
            
            response = self.session.get(url, timeout=6)
            data = response.json()
            
            if data.get('data'):
                videos = []
                albums = data.get('data', [])
                
                for album in albums:
                    album_id = album.get('albumId', '')
                    videos.append({
                        "vod_id": str(album_id),
                        "vod_name": album.get('title', ''),
                        "vod_pic": album.get('cover', ''),
                        "vod_remarks": f"{album.get('type', '')} | {album.get('Nickname', '')}"
                    })
                
                return {
                    'list': videos,
                    'page': page_num,
                    'pagecount': 999999,
                    'limit': 20,
                    'total': len(albums)
                }
                
        except Exception as e:return {'list': []}

    def localProxy(self, param):
        return []
