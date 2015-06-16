<?php //获取心愿，返回到前端
	include '../mysql_connect.php';
	$fun = $_POST['fun'];
	//$fun = $_GET['fun'];
	//echo $fun;
	if($fun=='s0')
		$lq = "SELECT * FROM wish WHERE STATUS ='正实现' ORDER BY id DESC LIMIT 0 , 12";
	else if($fun=='s1')
		$lq = "SELECT * FROM wish WHERE STATUS ='已实现' ORDER BY id DESC LIMIT 0 , 12";
	else if($fun=='my_wish')
		{	$name = $_SESSION['name'];
			$lq = "SELECT * FROM wish WHERE username ='$name' ORDER BY id DESC LIMIT 0 , 12";
		}
	else if($fun=='my_take')
		{	$name = $_SESSION['name'];
			$lq = "SELECT * FROM wish WHERE re_name ='$name' ORDER BY id DESC LIMIT 0 , 12";
		}
	else
		$lq = "SELECT * FROM wish ORDER BY $fun DESC LIMIT 0,12";//最新12条
	//echo $lq;
	$result = mysql_query($lq);
	if($result)
	{
	$data = array(12=>12);
	$i=0;
	while($row = mysql_fetch_array($result))
	{
		$data[$i]=$row;
		$i++;
	}
	echo json_encode($data);
	}
?>