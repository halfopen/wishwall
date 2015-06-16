<?php //贴心愿
	include '../mysql_connect.php';
?>
<?php
	$username = $_SESSION['name'];
	$title = $_POST['title'];
	$content = $_POST['content'];
	$data = array('title'=>$_POST['title'],'content'=> $_POST['content'],'username'=>$username);
	$time =date('Y-m-d H:i:s',time());
	$lq ="INSERT INTO wish(time,content,title,username)
        VALUES ('$time','$content','$title','$username')";
	$mq = mysql_query($lq);
	$a = mysql_query("SELECT id FROM  `wish` ORDER BY  `wish`.`id` DESC LIMIT 0 , 1");
	$a = mysql_fetch_array($a);
	echo $a['id'];
	mysql_close($con);
?>