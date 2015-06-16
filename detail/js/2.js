// JavaScript Document
// JavaScript Document
/*
秦贤康
2014-09-20
*/
function check(a){
	
	now=a.parents(".mark_parent").find(".mark_star_container li").first();
	i=5;
	while( (i--)>0 ){//遍历所有
		is_marked=parseInt($(now).attr("is_marked"));//如果星星没有被标记，将其还原
		if(is_marked==0){$(now).css("top","0px");}//如果星星被标记，将其点亮
		now=now.next();
	}
};
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