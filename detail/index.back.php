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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <LINK href="../favicon.ico" type="image/x-icon" rel=icon>
	<LINK href="../favicon.ico" type="image/x-icon" rel="shortcut icon">
    <title>详细心愿</title>
    <?php $publicHtml->css();?>
    <link href="css/2.css" rel="stylesheet" type="text/css" />
    <link href="../css/skin0.css" rel="stylesheet" id="skin" type="text/css" />
</head>

<body>

<?php
	$publicHtml->top();
  	//用来和js交换数据
	echo "<input type='hidden' id='id' value='$wish_id' />"; 
?>

<div class="main_container">
<p> .</p>
<div class="main_div">
  <div style="text-align:center; width:700px; color:#000;">
    <h3><?php echo "心愿标题：".$row['title']; ?></h3>
  </div>
    <div style="font-size:13px; width:700px; text-align:center;border-bottom:2px solid #333; height:25px; margin-bottom:6px;">
  <?php echo "发布时间：".$row['time']."总星数：".$row['score']."总点击数：".$row['click'];?></div>
    <div style="width:670px; position:relative; float:left; display:inline-block; overflow:hidden;"><!--左边div-->
      <div style="border:1px solid #999; padding:28px 8px; font-size:16px; font-weight:lighter; color:#000; margin-top:-10px; line-height:25px; position:relative;">
      <article lang="zh"><?php echo $row['content'];?></article>
      </div>
    <div style="height:34px; position:relative;"></div>
    <!--评论部分-->
    <?php
	if(!empty($_SESSION['name'])&& $row['status']=="正实现" && $row['username']==$_SESSION['name'])
    echo "<div class='mark' id='mark' style='border:2px solid #999; overflow:hidden;'>
		<div style='display:inline-block; width:320px; margin: 10px 10px; position:relative;'>
   	 		<div class='mark_parent' style=' position:relative; overflow:hidden; height:24px;'>
            	<div class='left_title' style='top:-6px;font-weight:lighter;'>&nbsp;&nbsp;&nbsp;&nbsp;心愿完成程度：</div>
                <div class='mark_star_container' ><!--IE7下无解-->
                	<span class='mark_star' id='mark_star1' star_num='1' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                    <span class='mark_star' id='mark_star2' star_num='2' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                    <span class='mark_star' id='mark_star3' star_num='3' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                    <span class='mark_star' id='mark_star4' star_num='4' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                    <span class='mark_star' id='mark_star5' star_num='5' is_marked='0'><img src='images/main/star.png' width='25' height='48' /></span>
                </div>
                <div id='mark1' class='mark_num mark1'>*分</div>
                <div  id='mark2' class='mark_result mark2'>评价</div>
            </div>       
            
            </div>
			<p style='font-size:smaller'>心愿完成了吗？对ta做出评价吧？</p>
            <div style='height:60px;  font-size:12px;'>
    	<div style='margin-top:25px;'>
        <div style='float:right; margin-top:2px;'><input type='button' score='-1' id='mark_wish' value='投票' class='div_button' style='width:73px; height:28px; margin-right:6px;'/></div>
        </div>
    </div>
    </div>";  
    ?>
    <div style="height:10px"></div>    
    
    
    <div>
<p>--------我要评论-------------</p>
    <textarea name="comment" id="comment" maxlength='64' style="background:none transparent scroll repeat 0% 0%; border:2px solid #999; width:756px; height:83px;" placeholder="----请输入评论内容----">评论</textarea>
    <div style="float:right; margin-top:2px;"><input type="button" id="add_comment" value="评论" class="div_button" style="width:73px; height:28px; margin-right:6px;"/></div>
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
						<div style='position:relative;' class='comment_content'>".$c_row['content']."</div>
						<div style='position:relative; color:#09C; font-size:13px; margin-top:10px;' class='comment_content'>发布时间:".$c_row['time']."</div>
					</div>
				</div>
				<div class='a_name'>".$c_row['c_name']."</div>
			</li>
			";
			}
		?>
       
    </div>
     <p style="height:40px"> </p>
	 </div>  
<!--左边div end-->    
       
	<div style="float:left; position:relative; margin-left:20px;"><!--右边div-->
    	<?php 
			if($row['status']=='未实现')echo "<div class='div_button_red' id='volunteer' >我要摘下</div>";
			else if($row['status']=='正实现')echo "<div class='div_button'>已有人摘下</div>";
			else if($row['status']=='已实现') echo "<div class='div_button'>已实现</div>";
		?>
   	  <div align="center" style="font-size:12px;margin-top:6px; margin-bottom:6px;">
   	    <p>发心愿用户信息</p>
        <?php
			$result = mysql_query("SELECT * FROM user WHERE name='".$row['username']."'");
			$wish_user = mysql_fetch_array($result);
		?>
   	    <table  width="229" border="0">
   	      <tr>
   	        <td width="60">姓名</td>
   	        <td width="50"><?php echo $wish_user['name']?></td>
            <td width="54">性别</td>
   	        <td width="47"><?php echo $wish_user['sex']?></td>
          </tr>
   	      <tr>
   	        <td>手机</td>
   	        <td colspan="3"><?php echo $wish_user['phone']?></td>
          </tr>
        </table>
        <img src="../user/head/head<?php echo $wish_user['head_pic'];?>.jpg" />
   	    
        <?php 
			echo "<p>状态：</p>";
			if($row['status']!="未实现" )
			{	echo "<p>摘心愿用户".$row['re_name']."</p>";
				$re_user = mysql_fetch_array(mysql_query("select head_pic from user where name='".$row['re_name']."'"));
				echo "<img src='../user/head/head".$re_user['head_pic'].".jpg' />";
			}
		?>
        
   	  </div>
   	  
		<div style="height:30px;"></div>
	</div>
    
   <div style="position:relative; width:1020px;"></div>
	</div>
</div>
<script type="text/javascript" src="js/jq.js"></script>
<script type="text/javascript" src="js/3.js"></script>
</body>
</html>
