<?php
	include '../mysql_connect.php';
	include 'mail.php';
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
<title>注册页面</title>
<body>
<?php
	$publicHtml->top();
?>
<div id="main_container">
<div id="container">
    <form  method="post">
         <p>
		 <?php
        if(!empty($_POST['name'])&& !empty($_POST['password'])&&!empty($_POST['email'])&&!empty($_POST['phone'])&&!empty($_POST['captcha']))
        {
            if($_POST['captcha']!==$pic_code)
            {	echo "验证码错误";
            }
            else
            {	$lq="select id from user where name="."'".$_POST['name']."'";
                //echo $lq;
                $name=$_POST['name'];
                $password=$_POST['password'];
                $email=$_POST['email'];
                $phone=$_POST['phone'];
                $result=mysql_query($lq);
                $sex=$_POST['sex'];
				$acticve_num = $name.time().rand(0,1024);
                echo mysql_query("select count(*) from user");
                $lq = "INSERT INTO user(name,password,email,phone,sex,head_pic,active_num) 
                VALUES ('$name','$password','$email','$phone','$sex',".rand(0,7).",'1')";
                //echo $lq;
				$email_content ="用户：".$name.",<br/>您好！<br/>心愿墙激活链接为：<a href='http://wishwall.jd-app.com/user/?name=$name&active_num=".$acticve_num."'>点此激活</a>,谢谢！<br/>举办方：***";
                if(@mysql_result($result,0)==0)
                {	mail_to($email,$email_content);
					mysql_query($lq);				
					header("Location:index.php");
                }
                else {echo "用户已存在";}     
            }
        }
        else{
            echo '请先注册';
            }
    	?></p>
        <p>姓名: <input name="name"  type="text"/><span id="name">*</span></p>
        <p>密码：<input name="password" maxlength="16" placeholder="小于16位" type="password"/><span id="password">*</span></p>
        <p>邮箱：<input id="email" name="email" type="text"/><span id="check_email"></span></p>
        <p>手机：<input id="phone" name="phone" type="text"/><span id="check_phone"></span></p>
        <p><select id="sex" name="sex" >
        <option value="female">女</option>
        <option value="male" selected='selected' >男</option>
        </select></p>
        
        <p>验证：<input name="captcha" type="text"/><a href="javascript:void(0)" onClick="document.getElementById('pic').src='captcha.php?r='+Math.random()">
           <img id="pic" width="100px" height="30px"  src="captcha.php?r=<?php echo rand();?>" />
        </a></p>
        <p><input class="button" type="reset"/><input class="button" id='reg_sub' type="submit" /></p>
    </form>
</div>
</div>
<script src="../js/jq.js"></script>
<script src="js/reg.js"></script>
</body>
</html>