// JavaScript Document
// JavaScript Document
/*
秦贤康
2014-09-20
*/

window.onload = function()
{	var skin0 = $('skin0');
	var skin1 = $('skin1');
	skin0.onclick = function()
	{	aj.post(
			'../ajax/skin.php'
			,{'skin':0}
			,function(data)
			{	alert(data);
						$('skin').href = '../css/skin0.css';
			}
		);
	};
	skin1.onclick = function()
	{	aj.post(
			'../ajax/skin.php'
			,{'skin':1}
			,function(data)
			{	alert(data);
				$('skin').href = '../css/skin1.css';
			}
		);
	}

	var id=$('id').value;
	var name=$('name').value;
	//添加评论
	var head_pic;
	var addComment = $("add_comment");
	var comment = $("comment_area");
	addComment.onclick = function()
	{	if($("name").value=='visitor')
		{	alert("请先登录");
			return ;
		}
		aj.post//发送ajax请求到服务器
		(
			'../ajax/post_comment.php'
			,{'c_id':id,'content':comment.value,'c_name':name}
			,function(data)
				{	
				//alert(data);
				head_pic =data;//服务器返回
				var comment_list = $("comment_list");
				comment_list.innerHTML+= "<li><div style='width:100%;  height:50px; position:relative;'><div style='display:inline-block; float:left;'><img src='../user/head/shead"+head_pic+".jpg' /></div><div style=' position:relative; float:left; margin-left:16px;'><div style='position:relative; width:455px; height:50px; overflow:auto;' class='comment_content'>"+comment.value+"</div><div style='position:relative; color:gainsboro; font-size:13px; margin-top:10px;' class='comment_content'>发布时间:-----</div></div></div><div class='a_name'>"+name+"</div></li>";
			alert("评论成功");
				}
		);
		
	}
/*
**我要帮助实现
**2014-11-10
*/	var mark=new Array();
	mark[0]="没什么好说的";
	mark[1]="一般";
	mark[2]="还不错啊";
	mark[3]="完成的非常nice";
	mark[4]="么么哒,完美地完成了心愿";
function wish_score_mark()
	{	if($("volunteer"))//如果还没有人要来实现
		{	var flag=false;//还没有发请求标志，防止用户恶意点击
			var volunteer = $("volunteer");
			volunteer.onclick = function()
			{	if($("name").value=='visitor')
				{	alert("请先登录");
					return ;
				}
				if(flag==false)
					{	if(sex.value != 'male')
							{	alert("男生才能帮忙实现哟");
								return ;
							}
						aj.post//发送ajax请求到服务器
						(	'../ajax/take_wish.php'
							,{'id':id, 'status':'正实现'}
							,function(data)
							{	if(data == 1)
								{	volunteer.innerHTML = "已申请帮助实现";
									flag = true;
									alert("申请成功，已发送邮件到心愿主");
								}
								else{ alert("心愿应该要让别人来实现吧？");}
							}
						);
					}
				}
		}
		var score = $("score");
		var mark_star = new Array(5);
		for(var i=0;i<5;i++)
		{	mark_star[i]=$("mark_star"+(i+1));
			mark_star[i].onmouseover = function()//把前面几个的点亮
			{	var star_num = this.getAttribute("star_num");
				//alert(star_num);
				for(var j=0;j<star_num;j++)
				{	mark_star[j].style.top = "-24px";
				}
			}
		}
		for(var i=0;i<5;i++)
		{	mark_star[i].onmouseout = function()//把前面几个还原
			{	for(var j=0;j<5;j++)
				{	var is_marked = mark_star[j].getAttribute("is_marked");
					if(is_marked==0)mark_star[j].style.top = "0px";
					else if(is_marked==0)mark_star[j].style.top = "24px";
				}
			}
		}
		var mark_wish = $("mark_wish");
		for(var i=0;i<5;i++)
		{	mark_star[i].onclick = function()//
			{	//把前面i个点亮
				var star_num = this.getAttribute("star_num");
				//alert(star_num);
				for(var j=0;j<star_num;j++)
				{	mark_star[j].setAttribute("is_marked",1);
				}
				for(var j=star_num;j<5;j++)
				{	mark_star[j].setAttribute("is_marked",0);
				}
				for(var j=0;j<5;j++)
				{	var is_marked = mark_star[j].getAttribute("is_marked");
					if(is_marked==0)mark_star[j].style.top = "0px";
					else if(is_marked==0)mark_star[j].style.top = "24px";
				}
				$("mark1").innerHTML=(star_num+"分");
				$("mark2").innerHTML=(mark[star_num-1]);
				mark_wish.setAttribute("score",star_num);
			}
		}
		
		//提交打分
		mark_wish.onclick = function()
		{	if($("name").value=='visitor')
			{	alert("请先登录");
				return ;
			}
			var score = this.getAttribute("score");
			if(score==-1)
			{	alert("请先打分");
			}else
			{	var mark=$("mark");
				_animate(mark,{height:0});
				//alert(id);
				var mark_score = mark_wish.getAttribute("score");
				aj.post//发送ajax请求到服务器
				(	'../ajax/mark_wish.php'
					,{'id':id,'mark_score':mark_score}
					,function(data)
						{	
						//data=eval('('+data+')');//转为json格式
						alert("谢谢您的评价");
						}
				);	
			}
		}
	}
	var score_container = $("mark_star_container");
	score = score_container.getAttribute("score");
	if(score == 0)
		wish_score_mark();
	else
	{	//alert(score);
		$("mark2").innerHTML=("心愿主评价："+mark[score-1]);
		$("mark1").innerHTML=(score+"分");
		for(var i=0;i<score;i++)
		{	$("mark_star"+(i+1)).style.top = "-24px";
		}
	}
}	
	
	
/*以前用jquery写的
$(".mark_star_container li").mouseover(function(){
	star_num=$(this).attr("star_num");
	i=$(this).parents(".mark_parent").find(".mark_star_container li").first().attr("star_num");
	now=$(this).parents(".mark_parent").find(".mark_star_container li").first();
	while((star_num--)>0){
		i=now.attr("star_num");
		$(now).css("top","-24px");
		now=now.next();
		//alert(star_num);
	}
})
$(".mark_star_container li").mouseout(function(){
	//alert(1);
	check($(this));
})

$(".mark_star_container li").mousedown(function(){
	var mark=new Array();
	mark[0]="不是很好";
	mark[1]="计划很详细，可以很好地执行";
	mark[2]="比较有创意";
	mark[3]="很实用，这个可以解决一些实际问题";
	mark[4]="值得投资，有一定的回报";
	star_num=$(this).attr("star_num");
	i=$(this).parents(".mark_parent").find(".mark_star_container li").first().attr("star_num");
	$(this).parents(".mark_parent").find(".mark_star_container li").attr("is_marked",0);
	now=$(this).parents(".mark_parent").find(".mark_star_container li").first();
	while((star_num--)>0){
		i=now.attr("star_num");
		//alert("i"+i);
		if($(now).attr("is_marked")==0){
			$(now).addClass("marked_star");
		}
		$(now).attr("is_marked",1);
		now=now.next();
		//alert(star_num);
	}
	$(this).parents(".mark_parent").find(".mark1").text(i+"分");
	$(this).parents(".mark_parent").find(".mark2").text(mark[i-1]);
	check($(this));
})*/

/*
$(document).ready(function(){
	$(".pic_tab li").first().addClass("pic_tab_hover");
  $(".pic_tab li").mousedown(function(){
	  $(".pic_tab li").removeClass("pic_tab_hover");
	  //alert(1);
	  $(this).addClass("pic_tab_hover");
	  	var num= $(this).attr("num");
		//alert(num);
		$(".pic_tab_container").animate({left:-(num-1)*229+"px"});
		//alert(num);
 });//弹出浮动div

$(".detail_info_switch").mousedown(function(){
	s=parseInt($(".detail_info_switch").attr("s"));
	//alert(s);
	s = s==1?0:1;
	if(s==1){
		$(".detail_info_switch_content").css("top","0px");
		$(".mark").animate({height:"0px"});
	}
	else{
		$(".detail_info_switch_content").css("top","-32px");
		$(".mark").animate({height:"125px"});
	}
	$(".detail_info_switch").attr("s",s);
	
	
})

function check(a){
	
	now=a.parents(".mark_parent").find(".mark_star_container li").first();
	i=5;
	//alert(1);
	while( (i--)>0 ){//遍历所有
		is_marked=parseInt($(now).attr("is_marked"));//如果星星没有被标记，将其还原
		if(is_marked==0){$(now).css("top","0px");}//如果星星被标记，将其点亮
		now=now.next();
	}
};

$(".mark_star_container li").mouseover(function(){
	star_num=$(this).attr("star_num");
	i=$(this).parents(".mark_parent").find(".mark_star_container li").first().attr("star_num");
	now=$(this).parents(".mark_parent").find(".mark_star_container li").first();
	while((star_num--)>0){
		i=now.attr("star_num");
		$(now).css("top","-24px");
		now=now.next();
		//alert(star_num);
	}
})
$(".mark_star_container li").mouseout(function(){
	//alert(1);
	check($(this));
})

$(".mark_star_container li").mousedown(function(){
	var mark=new Array();
	mark[0]="不是很好";
	mark[1]="计划很详细，可以很好地执行";
	mark[2]="比较有创意";
	mark[3]="很实用，这个可以解决一些实际问题";
	mark[4]="值得投资，有一定的回报";
	star_num=$(this).attr("star_num");
	i=$(this).parents(".mark_parent").find(".mark_star_container li").first().attr("star_num");
	$(this).parents(".mark_parent").find(".mark_star_container li").attr("is_marked",0);
	now=$(this).parents(".mark_parent").find(".mark_star_container li").first();
	while((star_num--)>0){
		i=now.attr("star_num");
		//alert("i"+i);
		if($(now).attr("is_marked")==0){
			$(now).addClass("marked_star");
		}
		$(now).attr("is_marked",1);
		now=now.next();
		//alert(star_num);
	}
	$(this).parents(".mark_parent").find(".mark1").text(i+"分");
	$(this).parents(".mark_parent").find(".mark2").text(mark[i-1]);
	check($(this));
})
});
*/
