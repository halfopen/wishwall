<?php //发评论
	include '../mysql_connect.php';
?>
<?php
	$content = $_POST['content'];
	$c_id = $_POST['c_id'];
	$c_name =$_POST['c_name']; 
	$lq = "SELECT head_pic FROM user WHERE name='$c_name'";
	$result = mysql_query($lq);
	//echo $lq;
	$row = mysql_fetch_array($result);
	$head_pic = $row['head_pic'];
	echo $head_pic;
	//echo $result;
	$time =date('Y-m-d H:i:s',time());
	//echo $content.$c_id.$c_name.$time;
	$lq = "INSERT INTO comment(c_id,time,content,c_name,head_pic) VALUES ('$c_id','$time','$content','$c_name','$head_pic')";
	mysql_query($lq);
	mysql_close($con);
?>