

////////////////////////////////////////////
//_animate();
///////////////////////////////////////////////
/*
**��ȡ��ʽ
**2014-10-09
*/
function getStyle($, attr)
{	return $.currentStyle?$.currentStyle[attr] : getComputedStyle($, false)[attr];
}
/*
**By:halfopen
**js�˶�����
**_animate(Ŀ����󣬲�����callback);
**2014-10-09
*/
function _animate($, data, func)
{	clearInterval($.timer);
 	$.timer=setInterval(function ()
	{	var flag=true;  //�˶�������־
		for(var attr in data)
		{	var iOpacity=0;	//͸����		
			iOpacity= (attr=='opacity')?parseInt(parseFloat(Math.ceil(getStyle($, attr)*100 ))):parseInt(getStyle($, attr));
			var iSpeed=(data[attr]-iOpacity)/8; 
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iOpacity!=data[attr])	//�ж��˶�����
			{	flag=false;	  }
			if(attr=='opacity')
			{	$.style.filter='alpha(opacity:'+(iOpacity+iSpeed)+')';
				$.style.opacity=(iOpacity+iSpeed)/100;
			}
		  else{	$.style[attr]=iOpacity+iSpeed+'px';	}
		}	
		if(flag)	//���û�н���
		{	clearInterval($.timer);
			if(func)func();//���ûص�����callback
		}
 	}, 15)
}


///////////////////////////
//aj.post(url,json,function(data){});
//////////////////////////
/*
**BY:halfopen
**ajax����
**aj.post(url,json,function(data){});
**aj.get(url,function(data){})
**2014-11-09
*/
var aj=new Object();
//����һ��xmlhttprequest����
aj.request = function()
{	if(window.XMLHttpRequest) 
	{	var ajax = new XMLHttpRequest();
    }
	else if (window.ActiveXObject) 
	{ 	try //�ж�js�汾�ǲ��Ǵ���5
		{	var ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } 
		catch (e) 
		{	try //�����ie
			{	var ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!ajax) 
	{ 	window.alert("�����������");
        return false;
    }
    return ajax;
}
//������
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
//��get����������
aj.get=function(url,callback)
{	aj.req.open('get',url,true);
    aj.req.send(null);
    aj.Handle(callback);
}
//��post����������
aj.post=function(url,content,callback)
{ 	aj.req.open('post',url,true);
    aj.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    content=aj.cl(content);
    aj.req.send(content);
    aj.Handle(callback);
}
/////////////////////////
//addClass removeClass,��������Ϊbyid
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