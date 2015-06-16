<?php 
//删除心愿
	include '../mysql_connect.php';
	$del_id= $_POST['del_id'];
	$lq = "DELETE FROM wish WHERE id =  '".$del_id."'";
	mysql_query($lq);
	mysql_close($con);
	//echo $lq;
?>