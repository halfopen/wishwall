<?php	//�������ݿ��ļ�
	session_start(); 
	$con = mysql_connect("localhost","3313_admin","ty02491124");
	mysql_select_db("3313_halfopen", $con);
	mysql_query("SET NAMES 'utf8'");//���ݿ����
?>