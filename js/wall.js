// JavaScript Document
//页面主js函数
//halfopen
//
window.onload = function(){	
	//音乐
	Dragable('musicbox','musicbox');
	musicbox();
	
	//更改皮肤
	var skin0 = $('skin0');
	var skin1 = $('skin1');
	skin0.onclick = function()
	{	aj.post(
			'ajax/skin.php'
			,{'skin':0}
			,function(data)
			{	alert(data);
						$('skin').href = 'css/skin0.css';
			}
		);
	};
	skin1.onclick = function()
	{	aj.post(
			'ajax/skin.php'
			,{'skin':1}
			,function(data)
			{	alert(data);
				$('skin').href = 'css/skin1.css';
			}
		);
	}
	
	//新手引导cookie
	var cookie = getCookie('mark');
	if(cookie!='halfopen')
	{	guide();	}
	setCookie('mark','halfopen',1);
	
	
	//初始化图钉
	var new_note_num = 0;//新心愿的个数
	function initSpin()
	{	var spin = new Array(12);
		for(var i=0;i<12;i++)
		{	spin[i] = $("spin-"+i);
			spin[i].style.background = "url(./images/spin/pin_"+parseInt(Math.random() * (6) + 1)+".png)";
		}
	}
	initSpin();
	
	
	//筛选条件
	var columnGuideLi = new Array(3);
	for(var i=0; i<3;i++)
	{
		columnGuideLi[i] = $("column_guide_li"+i);
	}
	//ie下不能用getElementByClassName
	
	columnGuideLi[0].onclick = function()
	{	for(var i=0;i<3;i++);
		addClass(this,'clumn_guide_li_lick');
	}
	
	
//右边按钮，是否显示活动说明	
	var showForm = $("show_form");
	showForm.onclick = function()
	{	var click = showForm.getAttribute("clicked");
		if(click == 0)
		{	this.setAttribute('clicked',1);
			_addClass(this,"show_form_click");
			_addClass(this,"show_form_click_hover");
			$("note_form2").style.visibility = 'hidden';
			$("note_form1").style.visibility = 'visible';
		}
		else
		{	this.setAttribute('clicked',0);
			_removeClass(this,"show_form_click");
			_addClass(this,"show_form_hover");
			$("note_form1").style.visibility = 'hidden';
			$("note_form2").style.visibility = 'visible';
		}
	}
	showForm.onmouseover = function()
	{	var click = this.getAttribute("clicked");
		if(click == 0)
		{	_addClass(this,"show_form_hover");
		}
		else
		{	_addClass(this,"show_form_click_hover");
		}
	}
	showForm.onmouseout = function()
	{	_removeClass(this,"show_form_hover");
		_removeClass(this,"show_form_click_hover");
	}


//贴心愿
	var new_note_num=0;
	var id;//返回ajax id
	var postNoteSubmit = $("post_note_submit");
	postNoteSubmit.onclick = function()
	{	var sex = document.getElementById("sex");
		if($("name").value=='visitor')//未登录
		{	window.location.href="user/index.php";
		}
		else{
		if(sex.value == 'male')
		{	alert("女生登录才能发心愿");
			return ;
		}
		var name = $("name").value;
		var clickable = this.getAttribute("clickable");
		if(clickable == 1){//当前可以点击
		this.setAttribute("clickable",0);
		var noteNum = parseInt($("note_form").getAttribute("note_num"));
		$("note_form").setAttribute("note_num", noteNum+1);
		/*var nX = new Array("0","157","314","471");
		var nY = new Array("0","242","484");*/
		var color = parseInt(Math.random() * (6) + 1);//图钉颜色
		var randx = parseInt(Math.random() * (4));//贴的位置
		var randy = parseInt(Math.random() * (3));//y
		var nId =(randx+randy*4);//计算id
		var content = $("note_content").value;//心愿内容
		var title = $("note_title").value;
		//输入为空提示
		if(strEmpty(content) || strEmpty(title) ){alert("不能为空");$("post_note_submit").setAttribute('clickable',1);return ;};
		
		aj.post//发送ajax请求到服务器
		(	'ajax/post_wish.php'
			,{'title':title,'content':content}
			,function(data)
				{	
				id = data;
				var newNote = "<li style='background:black;position:absolute; left:715px; top:43px; z-index:100'  id=newNote"+new_note_num+"><span class='spin' id='spin-10' color='1'></span><div class='note_item'><h3><a href='detail/index.php?id="+id+"'>"+title+"</a></h3><div style='color:#090; font-size:xx-small;'>发布者："+name+"</div><div class='word_s'>"+content+"</div></div></li>";
				//添加新的心愿
				$("note_form2_left").innerHTML +=newNote;
				var nItem = $("newNote"+new_note_num);
				//alert(nItem);
				//nItem.childNodes.item(0).childNodes.item(0).style.background = "url(./images/spin/pin_"+color+".png)";
				//nItem.childNodes.item(0).childNodes.item(0).style.backgroundRepeat = "no-repeat";
				var nx = $("n"+nId).style.left;
				var ny = $("n"+nId).style.top;
				_animate(nItem, {left:nx, top:ny});
				new_note_num++;
				}
		);
		}
		else
		{ 	alert('不要按太快，3秒后重试');		
		}
		setTimeout(function(){
			$("post_note_submit").setAttribute('clickable',1);
			//alert("可以继续了");
			},2000);
		}
	};
	
//向服务器发心愿数据请求，返回json数组12条
	function refreshBy(fun)
	{	aj.post//发送ajax请求到服务器
			(	'ajax/get_wish.php'
				,{'fun':fun}
				,function(data)
					{	
					data=eval( "(" + data + ")" );
					var note;
					for(var i=0;i<(Math.random()*12);i++)//动画
					{	_animate($("n"+i),{'width':0,'height':0});
						$("n"+i).style.overflow = 'hidden';
						$("n"+i).style.display = 'hidden';
						$("n"+i).style.margin = '0';
						$("n"+i).style.padding = '0';
					}
					setTimeout(function(){
					for(var i=0;i<12;i++)//置空所有，防止出错
					{	$("n"+i).innerHTML="<span class='spin' id='spin-"+i+"'></span><div class='note_item'></div>";
						_animate($("n"+i),{'width':135,'height':181});
						$("n"+i).style.overflow = 'visible';
						$("n"+i).style.display = 'visible';
						$("n"+i).style.marginLeft= '20px';
						$("n"+i).style.marginBottom = '40px';
						$("n"+i).style.padding = '0';
					}
					
					for(var i=0;i<new_note_num;i++)//置空新心愿
					{	$("newNote"+i).style.visibility="hidden";
					}
					for(var i=0;i<12;i++)//输出服务器传来的心愿
					{	var noteForm2Left= $("n"+i);
						if(typeof(data[i])!='undefined')
						{	//<span class='spin' title='摘下心愿' status='".$row['status']."' id='spin-".$i."'></span>
							note =" <span title='摘下心愿' status='"+data[i].status+"' style='background:url(./images/spin/pin_"+parseInt(Math.random() * (6) + 1)+".png)' class='spin' id='spin-"+i+"'></span><div class='note_item'><a href='detail/index.php?id="+data[i].id+"'>"+data[i].title+"</a><div style='color:#090; font-size:xx-small;'>发布者："+data[i].username+"</div><div class='word_s'>"+data[i].content+"</div></div><div id='delete_wish"+i+"' d_id='"+data[i].id+"' style='font-size:xx-small; color:red;cursor:pointer'></div><span style='font-size:x-small'>状态："+data[i].status+"</span>";
						}
						else note=" <span style='background:url(./images/spin/pin_"+parseInt(Math.random() * (6) + 1)+".png)' class='spin' id='spin-"+i+"'></span><div class='note_item'><div style='color:#090; font-size:xx-small;'></div><div class='word_s'></div></div><div id='delete_wish"+i+"' d_id='null' style='font-size:xx-small; color:red;cursor:pointer'></div>";
						
						noteForm2Left.innerHTML=note;
						}
					},400);
					
					}
					
			);
			take_wish();//心愿可以摘下
			delete_wish();//心愿可以删除
	};
	
	
	//静态刷新
	
	var f_status='id';//刷新方式
	var byId = $("column_guide_li0");//最新
	var byClick = $("column_guide_li1");//最热
	var byScore = $("column_guide_li2");//评分最高
	var s0 = $("column_guide_li3");//正实现
	var s1 = $("column_guide_li4");//正实现
	var my_wish = $('my_wish');
	var my_take = $('my_take');
	_addClass(byId, 'column_guide_li_click');
	function remove_guide_class()
	{	_removeClass(byId, 'column_guide_li_click');
		_removeClass(byClick, 'column_guide_li_click');
		_removeClass(byScore, 'column_guide_li_click');
		_removeClass(s1, 'column_guide_li_click');
		_removeClass(s0, 'column_guide_li_click');
	}
	
	
	//写这么多句不用for循环是因为ie下不支持getElementsByClassName
	byId.onclick = function()
	{	f_status='id';
		refreshBy('id');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	};
	byClick.onclick=function()
	{	f_status='click';
		refreshBy('click');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	};
	byScore.onclick = function()
	{	f_status='score';
		refreshBy('score');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	};
	s0.onclick = function()
	{	f_status='s0';
		refreshBy('s0');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	}
	s1.onclick = function()
	{	f_status='s1';
		refreshBy('s1');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	}
	my_wish.onclick = function()
	{	f_status='my_wish';
		refreshBy('my_wish');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	}
	my_take.onclick = function()
	{	f_status='my_take';
		refreshBy('my_take');
		remove_guide_class()
		_addClass(this, 'column_guide_li_click');
	}

	//自动获取新心愿，定时15s
	var timer=setInterval(function ()
	{	refreshBy(f_status);
 	}, 15000);
	take_wish();
	delete_wish();
};
