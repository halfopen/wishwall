<?php
	session_start(); 
	header("X-Powered-By: Halfopen");
	session_destroy();
	echo "已注销，正在跳转......";
	header("Location:../index.php");
?>