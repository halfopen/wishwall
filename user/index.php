<?php
	include '../mysql_connect.php';
	header("X-Powered-By: Halfopen");
	if(!empty($_SESSION['pic_code']))$pic_code=$_SESSION['pic_code'];
	else $pic_code='';
	include '../public/PublicHtml.class.php';
	$publicHtml = new PublicHtml('../',0);	
?>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">     
<html xmlns="http://www.w3.org/1999/xhtml">
<meta charset="utf-8"/>
<head>
	<?php $publicHtml->css();?>
    <LINK href="../favicon.ico" type="image/x-icon" rel=icon>
	<LINK href="../favicon.ico" type="image/x-icon" rel="shortcut icon">
	<link href="css/user.css" rel="stylesheet" type="text/css"/>
    <link href="../css/skin0.css" rel="stylesheet" id="skin" type="text/css" />
</head>
<title>创意墙</title>
<body>
<?php
	$publicHtml->top();
?>
<div id="main_container">
<div id="container">
<form  method="post">
<?php
	if(!empty($_POST['name'])&& !empty($_POST['password'])&&!empty($_POST['captcha']))
	{
		if($_POST['captcha']!==$pic_code)
		{
			echo "验证码错误，请重试";
		}
		$lq="select password,head_pic,active_num from user where name="."'".$_POST['name']."'";
		//echo $lq;
		//echo $lq;
		$result=mysql_query($lq);
		if(!empty($result))
		{	//echo $result;
			$row=mysql_fetch_array($result);
				$password=$row['password'];
				//echo $password;
				if($password==$_POST['password'])
				{	echo "Logged in!";
					$_SESSION['login']='in';
					$_SESSION['name']=$_POST['name'];
					$_SESSION['head_pic']=$row['head_pic'];
					header("Location:../index.php");
				}
				else echo "Wrong password!";
			}
		else echo '不存在该用户，请先注册!';
	}
	else echo "请先登录";
  ?>
<p>姓名: <input name="name"  type="text"/></p>
<p>密码：<input name="password" type="password"/></p>
<p>验证：<input name="captcha" type="text"/>
  </p>
<p><a href="javascript:void(0)" onClick="document.getElementById('pic').src='captcha.php?r='+Math.random()"><img id="pic" width="100px" height="30px"  src="captcha.php?r=<?php echo rand();?>" /></a></p>
<p><center><input class="button" value="清除" type="reset"/><input class="button" value="登录" id='reg_sub' type="submit" /></center></p>
</form>
</div>
</div>
<script src="js/reg.js"></script>
</body>
</html>
</body>
</html>
