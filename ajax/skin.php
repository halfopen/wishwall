<?php //换肤
	include '../mysql_connect.php';
?>
<?php
	$skin= $_POST['skin'];
	if(!empty($_SESSION['name']))
	{	$lq="UPDATE user SET skin='".$skin."' WHERE name='".$_SESSION['name']."' ";
		mysql_query($lq);
		echo "保存皮肤".$skin."成功";
	}
	else echo "未登录，皮肤不会保存";
	mysql_close($con);
?>