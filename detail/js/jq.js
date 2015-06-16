

////////////////////////////////////////////
//_animate();
///////////////////////////////////////////////
/*
**获取样式
**2014-10-09
*/
function getStyle($, attr)
{	return $.currentStyle?$.currentStyle[attr] : getComputedStyle($, false)[attr];
}
/*
**By:halfopen
**js运动函数
**_animate(目标对象，参数，callback);
**2014-10-09
*/
function _animate($, data, func)
{	clearInterval($.timer);
 	$.timer=setInterval(function ()
	{	var flag=true;  //运动结束标志
		for(var attr in data)
		{	var iOpacity=0;	//透明度		
			iOpacity= (attr=='opacity')?parseInt(parseFloat(Math.ceil(getStyle($, attr)*100 ))):parseInt(getStyle($, attr));
			var iSpeed=(data[attr]-iOpacity)/8; 
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iOpacity!=data[attr])	//判断运动结束
			{	flag=false;	  }
			if(attr=='opacity')
			{	$.style.filter='alpha(opacity:'+(iOpacity+iSpeed)+')';
				$.style.opacity=(iOpacity+iSpeed)/100;
			}
		  else{	$.style[attr]=iOpacity+iSpeed+'px';	}
		}	
		if(flag)	//如果没有结束
		{	clearInterval($.timer);
			if(func)func();//调用回调函数callback
		}
 	}, 15)
}


///////////////////////////
//aj.post(url,json,function(data){});
//////////////////////////
/*
**BY:halfopen
**ajax函数
**aj.post(url,json,function(data){});
**aj.get(url,function(data){})
**2014-11-09
*/
var aj=new Object();
//创建一个xmlhttprequest对象
aj.request = function()
{	if(window.XMLHttpRequest) 
	{	var ajax = new XMLHttpRequest();
    }
	else if (window.ActiveXObject) 
	{ 	try //判断js版本是不是大于5
		{	var ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } 
		catch (e) 
		{	try //如果是ie
			{	var ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!ajax) 
	{ 	window.alert("创建对象出错");
        return false;
    }
    return ajax;
}
//发请求
aj.req=aj.request();

aj.Handle=function(callback)
{	aj.req.onreadystatechange=function()
	{	if(aj.req.readyState==4)
		{	if(aj.req.status==200){	callback(aj.req.responseText); }
        }
    }
}
aj.cl=function(o)
{	if(typeof(o)=='object')
	{	var str='';
        for(a in o){ 	str+=a+'='+o[a]+'&';	}
        str=str.substr(0,str.length-1);
        return str;
    }
	else return o;
}
//用get方法发请求
aj.get=function(url,callback)
{	aj.req.open('get',url,true);
    aj.req.send(null);
    aj.Handle(callback);
}
//用post方法发请求
aj.post=function(url,content,callback)
{ 	aj.req.open('post',url,true);
    aj.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    content=aj.cl(content);
    aj.req.send(content);
    aj.Handle(callback);
}
/////////////////////////
//addClass removeClass,操作对象为byid
//////////////////////////
function hasClass(obj, className) 
{	return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function _addClass(obj, className) 
{	if (!this.hasClass(obj, className)) obj.className += " " + className;
}
function _removeClass(obj, className) 
{	if (hasClass(obj, className)) 
	{	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
}