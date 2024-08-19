var rule={
title:'爱你短剧',
//模板:'mxpro',  https://ainidj.com/vodshwo/fenle--time------2---.html
host:'https://ainidj.com', 
url:'/vodshwo/fyfilter',
filterable:1,//是否启用分类筛选,
filter_url:'{{fl.cateId}}--{{fl.sortby}}------fypage---',
class_name:'穿越&战神&重生&爱情&萌娃&神医&古代&玄幻&言情',
class_url:'fenle&fenlei2&fenlei3&fenlei4&guda&shenyi&gudai&xuanhuan&yanqing',

filter: {
"fenle":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],  
  
"fenlei2":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],

"fenlei3":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
"fenlei4":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
"guda":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
"shenyi":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
  
"gudai":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
"xuanhuan":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
"yanqing":[
{
  "key":"sortby",
  "name":"排序",
  "value":[
  {"n":"时间","v":"time"},
  {"n":"人气","v":"hits"},
  {"n":"评分","v":"score"},
  ]
},
],
  
  
},
  
  
filter_def:{
	'fenle':{cateId:'fenle'}, 
	'fenlei2':{cateId:'fenlei2'}, 
	'fenlei3':{cateId:'fenlei3'}, 
	'fenlei4':{cateId:'fenlei4'}, 
	'guda':{cateId:'guda'}, 
	'shenyi':{cateId:'shenyi'}, 
	'gudai':{cateId:'gudai'}, 
	'xuanhuan':{cateId:'xuanhuan'}, 
	'yanqing':{cateId:'yanqing'}, 
},

searchUrl:'/vodsearch/-------------.html?wd=**',	


searchable:2,//是否启用全局搜索,
quickSearch:0,//是否启用快速搜索,
filterable:0,//是否启用分类筛选,
play_parse:true,
lazy:'',
limit:6,
推荐:'.module-items;.module-item;*;*;*',
double:true, // 推荐内容是否双层定位
一级:'.module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href', //列表li对应的样式;标题;图片;描述(更新时间);链接   
二级:{
    "title": "h1&&title",
    "img": "img&&data-src",
    "asc": ";.data:eq(0) a:eq(2)&&Text;.data:eq(0) a:eq(1)&&Text;.data:eq(2)&&Text;.data:eq(3)&&Text",
    "content": "无",
    "tabs": ".module-tab-item",
    "lists": ".sort-item a" 
},
搜索: '.module-search-item;*;*;*;*',
}