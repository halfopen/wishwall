<?php //给心愿打分
	include '../mysql_connect.php';
?>
<?php
	$id = $_POST['id'];
	$mark_score = $_POST['mark_score'];
	$lq = "SELECT score FROM wish WHERE id='$id'";
	$result = mysql_query($lq);
	$row = mysql_fetch_array($result);
	$score = $row['score'];

	$lq="UPDATE wish SET status='已实现',score='".$mark_score."' WHERE id='".$id."' ";
	mysql_query($lq);
	//echo $lq;
	mysql_close($con);
?>