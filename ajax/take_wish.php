<?php //摘心愿
	include '../mysql_connect.php';
	include '../user/mail.php';
?>
<?php
	$id = $_POST['id'];
	$status = $_POST['status'];
	$lq ="SELECT title,username FROM wish WHERE id='".$id."'";
	$r = mysql_fetch_array(mysql_query($lq));
	$name = $r['username'];//心愿主的名字
	$lq = "SELECT email,phone,sex FROM user WHERE name='".$_SESSION['name']."'";
	$result = mysql_query($lq);
	//echo $lq.$result;
	$row = mysql_fetch_array($result);
	//print_r($row);
	if($name == $_SESSION['name'])
	echo 0;
	else
	{	$lq="UPDATE wish SET status='".$status."',re_name='".$name."' WHERE id='".$id."' ";
		$content = "
			心愿主人 ".$name.":<br/>您好<br/>
			您的心愿<b>".$r['title']."</b>已经被用户：<b>".$_SESSION['name']."</b>摘下了,<br/>
			现在可以和ta联系了 邮箱".$row['email']." 手机：".$row['phone']."!.<br/>
			谢谢！<br/>发自：心愿墙举办方";
		mysql_query($lq);
		//echo $lq;
		//echo $row['email'];
		$lq = "SELECT name,email,phone,sex FROM user WHERE name='".$name."'";
		$result = mysql_query($lq);
		$owner = mysql_fetch_array($result);
		mail_to($owner['email'],$content);//发给心愿主
		$content2 = "
			志愿者 ".$_SESSION['name'].":<br/>您好<br/>
			您接收实现心愿<b>".$r['title']."</b>的任务</br>
			现在可以和心愿主".$owner['name']."联系了 邮箱".$owner['email']." 手机：".$owner['phone']."!.<br/>
			完成后有丰富的奖励哟<br/>
			谢谢！<br/>发自：心愿墙举办方";
		mail_to($row['email'],$content2);
		echo 1;
	}
	mysql_close($con);
?>