<?php //我要当志愿者
	include '../mysql_connect.php';
?>
<?php
	$id = $_POST['id'];
	$status = $_POST['status'];
	$name = $_SESSION['name'];
	$lq = "SELECT username,score,click FROM wish WHERE id='$id'";
	$result = mysql_query($lq);
	$row = mysql_fetch_array($result);
	if($row['username'] == $name)echo "不能自己给自己实现心愿哟";
	else
	{	$lq="UPDATE wish SET status='".$status."',re_name='".$name."' WHERE id='".$id."' ";
		mysql_query($lq);
		echo "申请成功";
	}
	mysql_close($con);
?>