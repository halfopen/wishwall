// JavaScript Document
//本来是只想把新手引导放这里的，后面把其它的一些函数也放进来了


//音乐播放器
//halfopen
//2014-11-20
function musicbox()
{	var Size = 2;
	var music_list = new Array(Size);
	music_list[2]="Yiruma - On the Way";
	music_list[0]="Little Ballerina";
	music_list[1]="The Show";
	music_list[3]="La Campanella";
	var list='';//保存列表
	for(var i=0;i<Size;i++)
	{	list+="<li id='s"+i+"'>"+i+". "+music_list[i]+"</li>";
	}//生成列表
	$('music_menu').innerHTML +=list;
	
	//////////////////////////////////////////////////////按钮响应
	$("music_play").onmouseover = function()
	{	var s = $('music_play').getAttribute('status');
		if(s==1)//正在播放
		{	_addClass($('music_play'),"music_play_hover");
		}
		else
		{	_removeClass($('music_play'),"music_play");
			_addClass($('music_play'),"music_pause_hover");
		}
	};
	$("music_play").onmouseout = function()
	{	var s = $('music_play').getAttribute('status');
		if(s==1)
		{	_removeClass($('music_play'),"music_play_hover");
		}
		else
		{ 	_removeClass($('music_play'),"music_pause_hover");
		}
	};
	function play()//播放音乐函数
	{	var now = parseInt($('music_name').getAttribute('now'));
		$('music_player').innerHTML ="<audio loop='loop' id='player' autoplay='autoplay' style='visibility:hidden;'><source src='music/"+music_list[now]+".ogg' type='audio/ogg'><source src='music/"+music_list[now]+".mp3' type='audio/mpeg'><embed loop='1' src='music/"+music_list[now]+".mp3' /></audio>";
		$('music_name').innerHTML = '<marquee behavior="scroll" direction="left">'+music_list[now]+'</marquee>';
		$('music_id').innerHTML = '0'+now;
		$('music_play').setAttribute('status',1);
		_removeClass($('music_play'),"music_pause");
		_removeClass($('music_play'),"music_pause_hover");
		_addClass($('music_play'),"music_play");
	}
	
	//点击播放暂停按钮
	$('music_play').onclick =function()
	{	var s = $('music_play').getAttribute('status');
		if(s == 1)//正在播放，转为暂停播放
		{	try{
			  	$('player').pause();//如果浏览器支持暂停
			 }catch(e){
			  $('music_player').innerHTML = '';
			 }
			var now = parseInt($('music_name').getAttribute('now'));
			$('music_name').innerHTML = music_list[now];
			$('music_play').setAttribute('status',0);
			_removeClass($('music_play'),"music_play");
			_removeClass($('music_play'),"music_pause_hover");
			_addClass($('music_play'),"music_pause");
		}
		else
		{	play();
		}
	};
	//前一首
	$("music_pre").onmouseover = function()
	{	_addClass($('music_pre'),"music_pre_hover");
	};
	$("music_pre").onmouseout = function()
	{	_removeClass($('music_pre'),"music_pre_hover");
	};
	//下一首
	$("music_next").onmouseover = function()
	{	_addClass($('music_next'),"music_next_hover");
	};
	$("music_next").onmouseout = function()
	{	_removeClass($('music_next'),"music_next_hover");
	};
	//点击下一首
	$("music_next").onclick= function()
	{	var now = parseInt($('music_name').getAttribute('now'));
		if(now < Size-1)
		{	now = now + 1;
			$('music_name').setAttribute('now',now);
			play();
		}
		else alert('已经是最后一首了');
	};
	//点击前一首
	$("music_pre").onclick= function()
	{	var now = parseInt($('music_name').getAttribute('now'));
		if(now>=1)
		{	now = now - 1;
			$('music_name').setAttribute('now',now);
			play();
		}
		else alert('已经是最前面一首了');
	};
	//歌曲列表
	$("music_menu").onmouseover = function()
	{	_addClass($('music_menu'),"music_menu_hover");
	};
	$("music_menu").onmouseout = function()
	{	_removeClass($('music_menu'),"music_menu_hover");
	};
	//点击列表
	$('s0').onclick = function()
	{	$('music_name').setAttribute('now',0);
		play();
	}
	$('s1').onclick = function()
	{	$('music_name').setAttribute('now',1);
		play();
	}
}	


//新手导航
function guide(){
	var oMask=$('mask');
	//读取cookie
	var res=document.cookie;
	//alert("当前cookies="+"("+res+")");
	var step = new Array(5);
	var Close = new Array(5);
	var next = new Array(5);
	for( var i=0; i<6; i++)
	{	step[i] = $("step"+i);
		Close[i] = $("close"+i);
		next[i] = $("next"+i);
		step[i].style.visibility = "hidden";
	}
	{	var flag=true;
		Close[0].onclick = function()
		{	step[0].style.visibility = "hidden";
			oMask.style.visibility = "hidden";
		}
		Close[1].onclick = function()
		{	step[1].style.visibility = "hidden";
			oMask.style.visibility = "hidden";
		}
		Close[2].onclick = function()
		{	step[2].style.visibility = "hidden";
			oMask.style.visibility = "hidden";
		}
		Close[3].onclick = function()
		{	step[3].style.visibility = "hidden";
			oMask.style.visibility = "hidden";
		}
		Close[4].onclick = function()
		{	step[4].style.visibility = "hidden";
			oMask.style.visibility = "hidden";
		}
		Close[5].onclick = function()
		{	step[5].style.visibility = "hidden";
			oMask.style.visibility = "hidden";
		}
	}
	oMask.style.visibility = "visible";
	step[0].style.visibility = "visible";
	next[0].onclick = function(i)
	{	step[0].style.visibility = "hidden";
		step[1].style.visibility = "visible";
	}
	next[1].onclick = function(i)
	{	step[1].style.visibility = "hidden";
		step[2].style.visibility = "visible";
	}
	next[2].onclick = function(i)
	{	step[2].style.visibility = "hidden";
		step[3].style.visibility = "visible";
	}
	next[3].onclick = function(i)
	{	step[3].style.visibility = "hidden";
		step[4].style.visibility = "visible";
	}
	next[4].onclick = function(i)
	{	step[4].style.visibility = "hidden";
		step[5].style.visibility = "visible";
	}
	next[5].onclick = function(i)
	{	step[5].style.visibility = "hidden";
		oMask.style.visibility = "hidden";
	}
}


//摘下心愿的动画
function take_wish()
{
	var take_wish = new Array(12);
	for(var i=0;i<12;i++)
	{	take_wish[i] = $("spin-"+i);
		//alert(take_wish);
	}
	function tk_wish(n)	
	{	var status = $("spin-"+n).getAttribute('status');
		var sex = document.getElementById("sex");
		if(sex.value == 'male')
		{	alert("女生登录才能发心愿");
			return ;
		}
		if(status == "未实现")
		{
			var wish = $("n"+n);
			var t_id = $("delete_wish"+n).getAttribute('d_id');
			
			aj.post//发送ajax请求到服务器
				(	'ajax/take_wish.php'
					,{'id':t_id, 'status':'正实现'}
					,function(data)
						{	if(data == 1)
								{	volunteer.innerHTML = "已申请帮助实现";
									flag = true;
									alert("摘心愿成功，已发送邮件到心愿主");
									wish.style.position = 'absolute';
									_animate(wish,{'width':0,'height':0,'margin-left':960,'margin-top':-20});
									wish.style.overflow = 'hidden';
									wish.style.display = 'hidden';
									wish.style.margin = '0';
									wish.style.padding = '0';
								}
								else{ alert("自己的心愿应该要让别人来实现吧？");}
						}		
				);
		}
		else
		{	alert("不可摘的心愿");}
	}
	take_wish[0].onclick = function()
	{	tk_wish(0);
	}
	take_wish[1].onclick = function()
	{	tk_wish(1);
	}
	take_wish[2].onclick = function()
	{	tk_wish(2);
	}
	take_wish[3].onclick = function()
	{	tk_wish(3);
	}
	take_wish[4].onclick = function()
	{	tk_wish(4);
	}
	take_wish[5].onclick = function()
	{	tk_wish(5);
	}
	take_wish[6].onclick = function()
	{	tk_wish(6);
	}
	take_wish[7].onclick = function()
	{	tk_wish(7);
	}
	take_wish[8].onclick = function()
	{	tk_wish(8);
	}
	take_wish[9].onclick = function()
	{	tk_wish(9);
	}
	take_wish[10].onclick = function()
	{	tk_wish(10);
	}
	take_wish[11].onclick = function()
	{	tk_wish(11);
	}
	
}


//删除心愿的动画
function delete_wish()
{	//删除心愿功能
	function del_wish(n)
	{	var wish = $("n"+n);
		var del_id = $("delete_wish"+n).getAttribute('d_id');
		//alert(del_id);
		_animate(wish,{'width':0,'height':0});
		wish.style.overflow = 'hidden';
		wish.style.display = 'hidden';
		wish.style.margin = '0';
		wish.style.padding = '0';
		aj.post//发送ajax请求到服务器
			(	'ajax/del_wish.php'
				,{'del_id':del_id}
				,function(data)
					{	//alert(data);
					}		
			);
	}
	var delete_wish = new Array(12);
	for(var i=0;i<12;i++)
	{	delete_wish[i] = $("delete_wish"+i);
	}
	//因为ie不支持getElementsByClassName,所以写了很多句
	delete_wish[0].onclick = function()
	{	del_wish(0);
	}
	delete_wish[1].onclick = function()
	{	del_wish(1);
	}
	delete_wish[2].onclick = function()
	{	del_wish(2);
	}
	delete_wish[3].onclick = function()
	{	del_wish(3);
	}
	delete_wish[4].onclick = function()
	{	del_wish(4);
	}
	delete_wish[5].onclick = function()
	{	del_wish(5);
	}
	delete_wish[6].onclick = function()
	{	del_wish(6);
	}
	delete_wish[7].onclick = function()
	{	del_wish(7);
	}
	delete_wish[8].onclick = function()
	{	del_wish(8);
	}
	delete_wish[9].onclick = function()
	{	del_wish(9);
	}
	delete_wish[10].onclick = function()
	{	del_wish(10);
	}
	delete_wish[11].onclick = function()
	{	del_wish(11);
	}
}

