//����js��������
//ѡ����


//ֻ��byId,��Ϊ�Ͱ汾ie��֧��byClassName
function $(id)
{	return document.getElementById(id);
}
/**By:halfopen
**js�˶�����
**_animate(Ŀ����󣬲�����callback);
**2014-10-09
*/

/*cookie����*/
function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}


/*�ж��ַ��Ƿ�Ϊ��*/
function strEmpty(str)
{	for(var i=0;i<str.length;i++)
	{	if(!(str[i] ==" " || str[i] =='\t' || str[i]== '\n' ))
		return false;
	}
	return true;
}

/*
**��ȡ��ʽ���˶�����
**2014-10-09
*/
function getStyle($, attr)
{	return $.currentStyle?$.currentStyle[attr] : getComputedStyle($, false)[attr];
}


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
			if(func)func();//���ûص�����callback�����json��ʽ�˶�
		}
 	}, 15)
}

//////////////////////////////////////////////////////////////////////////////////
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
	{ 	try 
		{	var ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } 
		catch (e) 
		{	try 
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


/////////////////////////////////////////////////////////////////////////////////////////////
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


//////////////ɾ���ڵ�////////////////////////
function DeleteNode(j) 
{ 
var trnode=document.getElementById("tr"+j); 
trnode.parentNode.removeChild(trnode); 
} 

/////////////////////��ק/////////////////////////
var dialogInstace , onMoveStartId , mousePos = {x:0,y:0};	
	function Dragable( dragId , moveId )
	{	var instace = {} ;
		instace.dragElement  = $(dragId);	
		instace.moveElement  = $(moveId);	
		instace.mouseOffsetLeft = 0;
		instace.mouseOffsetTop = 0;	
		instace.dragElement.addEventListener('mousedown',function(e)
		{	var e = e || window.event;
			dialogInstace = instace;
			instace.mouseOffsetLeft = e.pageX - instace.moveElement.offsetLeft ;
			instace.mouseOffsetTop  = e.pageY - instace.moveElement.offsetTop ;
			onMoveStartId = setInterval(onMoveStart,10);
			return false;
		})
		return instace;
	}
	//	��ҳ�������� ��굯���¼�
	document.onmouseup = function(e)
	{	dialogInstace = false;
		clearInterval(onMoveStartId);
	}
	//��Ӧ����ƶ�
	document.onmousemove = function( e )
	{	var e = window.event || e;
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
		e.stopPropagation && e.stopPropagation();
		e.cancelBubble = true;
		e = this.originalEvent;
        e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );
        document.body.style.MozUserSelect = 'none';
	}	
	//��갴��̸�����
	function onMoveStart()
	{	var instace = dialogInstace;
	    if (instace) 
		{	var maxX = document.documentElement.clientWidth -  instace.moveElement.offsetWidth;
	    	var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight ;
			instace.moveElement.style.left = Math.min( Math.max( ( mousePos.x - instace.mouseOffsetLeft) , 0 ) , maxX) + "px";
			instace.moveElement.style.top  = Math.min( Math.max( ( mousePos.y - instace.mouseOffsetTop ) , 0 ) , maxY) + "px";
	    }
	}