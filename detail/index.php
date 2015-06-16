<?php
	include '../mysql_connect.php';
	include '../public/PublicHtml.class.php';
	header("X-Powered-By: Halfopen");
	$publicHtml = new PublicHtml('../',0);
	if(!empty($_GET['id'])&& isset($_GET['id']))
	{	$wish_id = $_GET['id']; }
	else{
		header("Location:./../index.php");
	}
	$lq = "SELECT * FROM wish WHERE id='$wish_id'";
	$wish = mysql_query($lq);
	$row = @mysql_fetch_array($wish);
	mysql_query("UPDATE wish SET click='".($row['click']+1)."' WHERE id='$wish_id'");
	if(@mysql_result($wish,0)==0)
	{	header("Location:../index.php");
	}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <LINK href="../favicon.ico" type="image/x-icon" rel=icon>
	<LINK href="../favicon.ico" type="image/x-icon" rel="shortcut icon">
    <title>详细心愿</title> 
    <link href="css/2.css" rel="stylesheet" type="text/css" />
    <?php $publicHtml->css();?>
</head>

<body>

<?php
	$publicHtml->top();
  	//用来和js交换数据
	echo "<input type='hidden' id='id' value='$wish_id' />"; 
?>

<div class="main_container">
<div class="main_div">
    <div class="left_container">
    	<div id="wish_detail" >
        		<div id="wish_container">
                <div id="wish_title"><h3><?php echo $row['title']; ?></h3></div>
                <div id="wish_info"><?php echo "发自：".$row['time']."click：".$row['click'];?></div>
                <div id='wish_content'><!--心愿主体内容-->
                  	<p><?php echo $row['content'];?></p>
                </div>
                </div>
        </div>
        <div> <!--评论部分-->
			
            <div class='mark' id='mark' style='border:2px solid #999; overflow:hidden;'>
                <div style='display:inline-block; width:320px; margin: 10px 10px; position:relative;'>
                    <div class='mark_parent' style=' position:relative; overflow:hidden; height:24px;'>
                        <div class='left_title' style='top:-6px;font-weight:lighter;'>&nbsp;&nbsp;&nbsp;&nbsp;心愿完成程度：</div>
                        <div class='mark_star_container' id='mark_star_container' score='<?php echo $row['score']?>' ><!--IE7下无解-->
                            <span class='mark_star' id='mark_star1' star_num='1' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                            <span class='mark_star' id='mark_star2' star_num='2' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                            <span class='mark_star' id='mark_star3' star_num='3' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                            <span class='mark_star' id='mark_star4' star_num='4' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                            <span class='mark_star' id='mark_star5' star_num='5' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                        </div>
                        <div id='mark1' class='mark_num mark1'>*分</div>
                    </div>  
                    <div  id='mark2' class='mark_result mark2'>评价</div>            
               	</div>
                <?php if(!empty($_SESSION['name'])&& $row['status']=="正实现" && $row['username']==$_SESSION['name'])
            				echo "<p style='font-size:smaller'>你的心愿完成了吗？对ta做出评价吧？</p>
									<div style='height:60px;  font-size:12px;'>
								<div style='margin-top:25px;'>
								<div style='float:right; margin-top:-22px;'><input type='button' score='-1' id='mark_wish' value='投票' class='div_button' style='width:73px; height:28px; margin-right:6px;'/></div>
								</div>
								</div>";
						if($row['status']=="未实现")
						{	echo "<div class='div_button_red' id='volunteer'  style='width:340px; margin-top:27px;' >我要摘下</div>";
						};
						if($row['status']=="已实现")
						{	echo "<div class='div_button' style='width:340px; margin-top:27px;'>已实现</div>";
						};
						if($row['status']=='正实现')
						{	echo "<div class='div_button' style='width:340px; margin-top:27px;'>已有人摘下</div>";
						}		 
				?>    
            </div>
            <p style='color:black'>.</p>
        <!--end 评论部分-->
    	</div>
        <!--用户信息部分-->
        <?php
			$result = mysql_query("SELECT head_pic,name,email,phone FROM user WHERE name='".$row['username']."'");
			$owner = mysql_fetch_array($result);
		?>
   		<div class="user_info">
            <div class="user">     	
                <div class="user_head"><img src="../user/head/shead<?php echo $owner['head_pic'];?>.jpg"/></div>
                <div class="user_name">心愿主:<?php echo $owner['name'];?></div>
                <div class="user_phone">手机：<?php echo $owner['phone'];?></div>
                <div class="user_email">邮箱：<?php echo $owner['email'];?></div>
            </div>
            <div class="user">
			<?php 
				if($row['status']!="未实现" )
                {	$re_user = mysql_fetch_array(mysql_query("select head_pic,phone,email from user where name='".$row['re_name']."'"));
                    echo "<div class='../user_head'><img src='../user/head/shead".$re_user['head_pic'].".jpg'/></div>
                <div class='user_name'>志愿者:".$row['re_name']."</div>
                <div class='user_phone'>手机:".$re_user['phone']."</div>
                <div class='user_email'>邮箱：".$re_user['email']."</div>";
                }
				else echo "还没有志愿者，来当一个吧";
			?>
            </div>
        </div>
    <!--end left_container-->
    </div>
    <div class="right_container">
    <div><!--评论部分-->
       	<p>--------我要评论-------------</p>
        <div>
            <textarea name="comment" id="comment_area" maxlength='50' placeholder="----请输入评论内容----">评论</textarea>
            <input type="button" id="add_comment" value="评论" class="div_button" />
       	</div>
        <p style="height:30px">--------最新评论-------------</p>
        <div class="coment_list" id="comment_list">
                <?php 
                    $sql = "SELECT * FROM `comment`  WHERE c_id='$wish_id' ORDER BY  `comment`.`id` DESC  LIMIT 0, 5 ";
                    $result = mysql_query($sql);		
                    while($c_row=mysql_fetch_array($result))
                    {
                    echo "<li>
                        <div style='width:100%;  height:50px; position:relative;'>
                            <div style='display:inline-block; float:left;'><img src='../user/head/shead".$c_row['head_pic'].".jpg' /></div>
                            <div style=' position:relative; float:left; margin-left:16px;'>
                                <div style='position:relative; width:455px; height:50px; overflow:auto;' class='comment_content'>".$c_row['content']."</div>
                                <div style='position:relative; color:gainsboro; font-size:13px; margin-top:10px;' class='comment_content'>发布时间:".$c_row['time']."</div>
                            </div>
                        </div>
                        <div class='a_name'>".$c_row['c_name']."</div>
                    </li>
                    ";
                    }
                ?>
    	<!--end 评论列表部分-->   
    	</div>
     	<p style="height:40px"> </p>
     <!--end 评论部分-->
	 </div>  
    <!--end right_container-->
    </div>

<!--end main_container-->
</div>
<!--end main_div-->
</div>
<script type="text/javascript" src="../js/jq.js"></script>
<script type="text/javascript" src="js/3.js"></script>
</body>
</html>
