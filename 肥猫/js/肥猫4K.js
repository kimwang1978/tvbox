var rule = {
   title: '蜡笔盘盘',
   host: 'http://labipan.com',
   homeUrl: '/index.php/vod/show/id/24/page/1.html',
   url: '/index.php/vod/show/id/fyclass/page/fypage.html',
   filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
   searchUrl: '/index.php/vod/search.html?wd=**',
   filter: 'H4sIAAAAAAAAA+3VSUvDQBQH8LN+jDlX0ol20Zu7te77goeoAxY3qFEo0pML7oKIPSheLYiooCJVv00n2m9hYpvX599Lb156nP9veHm8ZDI1myIkmqY3xaJKiSaxpGxbJUVArFjLyl3ru4xzf+yuN6yldfWzccWLd7KFrawXuwuRDhTT5lJgFKsYzSQtIC0krSCtJG0gbSTtIO0kHSAdJJ0gnSRdIF0kMZAYSTdIN0kcJE7SA9JD0gvSS9IH0kfSD9JPMgAyQDIIMkgyBDJEMgwyTDICMkIyCjJKMgYyRjIOMk4yATJBMgkySTIFMkUSrGsE85L0jOfFIzCbKn/+zsmZzp3++fydzEsh8+TXmU0ZdsLd7j8in8s5D+dMFxL2GunX/bbe22W6NreaVF4HM4HaGmE2sNM4Z9kqNl9u5/PxTV8fVngaG+Kf58/649F/VGLeMMNM9f5N4XKXa4TrQdZ5v+Ua/TUlK6ks9pu4etBHuQoby7/e6csPv7RXyChF/g6985J/u/i1oxTxFlLKYn+q8jupoAUz6M65VN4rY/wETOtR67maqCZXiSq5BlGDTGUjqBswjaJGuUZQI1zDqGGuIdQQV5yV5LOSOCvJZyVxVpLPSuKs3IC/4up1VL2OqtfRP11H6W8KE0I2HAoAAA==',
   class_name: '肥猫4K&短剧',
   class_url: '24&5',
   double: true, 
   推荐: '.module-list;.module-items&&.module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
   搜索: '.module-search-item;.video-serial&&title;*;.video-serial&&Text;.video-serial&&href',
   一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
   二级: {
      title: 'h1&&Text;.tag-link&&Text',
      img: '.module-item-pic&&img&&data-src',
      desc: '.video-info-items:eq(3)&&Text;.tag-link:eq(2)&&Text;.tag-link:eq(3)&&Text;.video-info-actor:eq(1)&&Text;.video-info-actor:eq(0)&&Text',
      content: '.sqjj_a--span&&Text',
      tabs: '.module-tab-item',
      tab_text: 'div--small&&Text',
      lists: '.module-row-one:eq(#id)&&a.module-row-text',
      list_text: 'h4&&Text',
      list_url: 'a&&data-clipboard-text',
      list_url_prefix: 'push://'
   }
}