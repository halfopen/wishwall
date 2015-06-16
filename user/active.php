<?php
	include '../mysql_connect.php';
	if(!empty($_GET['name'])&& !empty($_GET['active_num']))
	{	echo $_GET['name'];
		echo " ".$_GET['active_num'];

		$lq="select active_num from user where name='".$_GET['name']."'";
		$result=mysql_query($lq);
		if(!empty($result))
		{	//echo $result;
			$row=mysql_fetch_array($result);
			if($row['active_num'] == $_GET['active_num'])
			{	$lq = "UPDATE  `user` SET  `active_num` =  '1' WHERE  `user`.`name` ='".$_GET['name']."'";
				echo $lq.mysql_error();
				mysql_query($lq);
				echo $lq.mysql_error();
				echo "成功激活;
			}
		}
		else echo '用户不存在';
	}

  ?>
