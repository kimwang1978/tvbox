Object.assign(muban.mxone5.二级, {
   desc: '.video-info-items:eq(3)&&Text;.tag-link:eq(2)&&Text;.tag-link:eq(3)&&Text;.video-info-actor:eq(1)&&Text;.video-info-actor:eq(0)&&Text',
   content: '.sqjj_a--span&&Text',
   lists: '.module-row-one:eq(#id)&&a.module-row-text',
   list_text: 'h4&&Text',
   list_url: 'a&&data-clipboard-text',
   list_url_prefix: 'push://'
});
var rule = {
   title: '蜡笔盘盘',
   模板: 'mxone5',
   host: 'http://labipan.com',
   homeUrl: '/index.php/vod/show/id/24/page/1.html',
   url: '/index.php/vod/show/id/fyclass/page/fypage.html',
   filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
   searchUrl: '/index.php/vod/search.html?wd=**',
   filter: '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',
   //class_parse: '.grid-box&&ul&&li;a&&Text;a&&href;.*/(.*?).html',
   class_parse: '',
   class_name: '肥猫4K&电影&剧集&动漫&综艺&短剧',
   class_url: '24&1&2&3&4&5',
   cate_exclude: '网址|专题|全部影片',
   搜索: '.module-search-item;.video-serial&&title;*;.video-serial&&Text;.video-serial&&href',
   一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href'
}