window.onload = function()
{	
	var spin0 = document.getElementById("spin-0");
	spin0.style.background = "url(./images/spin/pin_"+parseInt(Math.random() * (6) + 1)+".png)";
	var spin = new Array(12);
	for(var i=0;i<12;i++)
	{	spin[i] = document.getElementById("spin-"+i);
		spin[i].style.background = "url(./images/spin/pin_"+parseInt(Math.random() * (6) + 1)+".png)";
	}
	var columnGuideLi = new Array(3);
	for(var i=0; i<3;i++)
	{
		columnGuideLi[i] = document.getElementById("column_guide_li"+i);
	}
	for(var i=0; i<3;i++)
	{	//_removeClass();
		columnGuideLi[i].onclick = function(){
			for(var j=0; j<3;j++)
			{	_removeClass(columnGuideLi[j],"column_guide_li_click");
			}
			_addClass(this, "column_guide_li_click");
		}
	}
	
	var showForm = document.getElementById("show_form");
	showForm.onclick = function()
	{	var click = showForm.getAttribute("clicked");
		if(click == 0)
		{	this.setAttribute('clicked',1);
			_addClass(this,"show_form_click");
			_addClass(this,"show_form_click_hover");
			document.getElementById("note_form2").style.visibility = 'hidden';
			document.getElementById("note_form1").style.visibility = 'visible';
		}
		else
		{	this.setAttribute('clicked',0);
			_removeClass(this,"show_form_click");
			_addClass(this,"show_form_hover");
			document.getElementById("note_form1").style.visibility = 'hidden';
			document.getElementById("note_form2").style.visibility = 'visible';
		}
	}
	showForm.onmouseover = function()
	{
		var click = this.getAttribute("clicked");
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
	
	var postNoteSubmit = document.getElementById("post_note_submit");
	postNoteSubmit.onclick = function()
	{	var clickable = this.getAttribute("clickable");
		if(clickable == 1){
		this.setAttribute("clickable",0);
		var noteNum = parseInt(document.getElementById("note_form").getAttribute("note_num"));
		document.getElementById("note_form").setAttribute("note_num", noteNum+1);
		var nX = new Array("80","157","314","401");
		var nY = new Array("80","242","414");
		var color = parseInt(Math.random() * (6) + 1);
		var randx = parseInt(Math.random() * (4));//x
		var randy = parseInt(Math.random() * (3));//y
		var nId ="n"+(randx+randy*4);//id
		var content = document.getElementById("note_content").value;
		var title = document.getElementById("note_title").value;
		/*aj.post//发送ajax请求到服务器
		(
			'ajax/post.php'
			,{'title':title,'content':content}
			,function(data)
				{	
				//data=eval('('+data+')');//转为json格式
				alert(data);
				}
		);*/
		var newNote = "<li style='position:absolute; left:715px; top:43px; z-index:100' id='newNote' class='newNote' id="+nId+"><div class='note_item'><span class='spin' id='spin-new' color='1'></span><h3>"+title+"</h3><p>"+content+"</p></div></li>";
		//添加新的心愿
		document.getElementById("note_form2_left").innerHTML +=newNote;
		var nItem = document.getElementById("newNote");
		document.getElementById("spin-new").style.background = "url(./images/spin/pin_"+color+".png)";
		document.getElementById("spin-new").style.backgroundRepeat = "no-repeat";
		_animate(nItem, {left:nX[randx], top:nY[randy]});
		_removeClass(nItem, "newNote");
		nItem.setAttribute("id",'n0');
		document.getElementById("spin-new").setAttribute("id","spin-10");
		}
		else
		{ 	alert('不要按太快，3秒后重试');		
		}
		setTimeout(function(){
			document.getElementById("post_note_submit").setAttribute('clickable',1);
			//alert("可以继续了");
			},2000);
	}
	
	function refreshBy(fun)
	{	//alert(1);
		aj.post//发送ajax请求到服务器
			(
				'ajax/get_wish.php'
				,{'fun':fun}
				,function(data)
					{	
					data=eval( "(" + data + ")" );
					for(var i=0;i<12;i++)
					{
					var noteForm2Left= document.getElementById("n"+i);
					var note =" <div class='note_item'><span class='spin' id='spin-"+i+"'></span><h3><a href='detail/index.php?id="+data[i].id+"'>"+data[i].title+"</a></h3><div class='word_s'>"+data[i].content+"</div></div>";
					noteForm2Left.innerHTML=note;
					//initSpin();
					//alert(data[i].title);
					//alert(data.i.title);
					}
					}
			);
		//alert(2);
	};
	
	var byScore = document.getElementById("column_guide_li2");
	var byId = document.getElementById("column_guide_li0");
	var byClick = document.getElementById("column_guide_li1");
	//var byScore = document.getElementById("score");
	byScore.onclick = function()
	{	//alert(1);
		refreshBy('score');
	};
	byId.onclick = function()
	{	//alert(1);//
		refreshBy('id');
	};
	byClick.onclick=function()
	{	//alert(1);//
		refreshBy('click');
	};
}