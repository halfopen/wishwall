<?php
	include 'mysql_connect.php';
	include 'public/PublicHtml.class.php';
	header("X-Powered-By: Halfopen");
	//分布所需要的数据
	$wish_num = mysql_result(mysql_query("SELECT count(id) FROM wish"),0);//总记录数
	$publicHtml = new PublicHtml('',$wish_num);//公共文件
	$size = 12;
	$page_num=ceil($wish_num/$size);//总页数
	if(isset($_GET['page']))$page = trim($_GET['page']);//取浏览器传来的值
	else $page=1;
	if(!isset($page) || $page<1) $page = 1;//小于1就等于1
	if($page > $page_num)       $page = $page_num;//大于总页数就等于总页数
	$jump = ($page - 1) * $size;//跳过几条记录开始
	$page = intval($page);//转成整数类型
	$lq = "SELECT * FROM wish ORDER BY id DESC LIMIT $jump,$size";//最新12条
	$result = mysql_query($lq);
?>
<!DOCTYPE html>     
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="css/reset.css" rel="stylesheet" type="text/css"/>
    <link href="css/wap.css" rel="stylesheet" type="text/css"/>
    <title>心愿墙</title>
</head> 
<body>
<div id="top">
<table width="100%" border="0">
  <tr>
    <td width="23%"><img src="images/C.png" width="20" height="20">首页</td>
    <td width="52%">登录 注册</td>
    <td width="25%">
    <?php 
	
	?>
    </td>
  </tr>
</table>

</div>
<div class="wapmain">
	<div class="wish_list">
    	<?php  //输出心愿
                    $i=0;
                    while($row=@mysql_fetch_array($result))
                    {	echo "<li id='n".$i."'>
                                <div class='word_s'><a href='detail/index.php?id=".$row['id']."'>".($jump+$i+1).".".$row['title']."  发布者：".$row['username']."</a></div>
                                <div class='word_s'>".mb_substr($row['content'], 0,30, 'utf-8')." <span style='font-size:x-small'>状态：".$row['status']."</span></div>
                            </li>";
                        $i++;
                    }
        ?>
    </div>
    <form method="post">
         <div><input style="width:100%"  id="note_title" name="note_title" maxlength="10" placeholder="心愿标题" value="标题" /></div>
         <textarea style="width:100%" maxlength="200" id="note_content" name="note_content" placeholder="我的心愿"></textarea>
         <input class="button" type="submit" value="提交" />
    </form>
</div>
<?php //输出分页
	$size = 12;//每页显示数
			$page_num=ceil($wish_num/$size);//总页数
			if(isset($_GET['page']))$page = trim($_GET['page']);//取浏览器传来的值
			else $page=1;
			if(!isset($page) || $page<1) $page = 1;//小于1就等于1
			if($page > $page_num)       $page = $page_num;//大于总页数就等于总页数
			$jump = ($page - 1) * $size;//跳过几条记录开始
			$page = intval($page);//转成整数类型页
		
			echo "<form method='get' action='index.php'><a  href='"."index.php?page=1"."'><span class="."button".">首页</span>  </a>";
			echo "  ";
			echo "<a  href='index.php?page=".($page-1)."'><span class="."button".">前一页</span>  </a>";
			echo "<select name='page' onchange='javascript:document.forms[0].submit();'>";
			for($i=1;$i<=$page_num;$i++){
				if($i==$page)
					 echo "<option selected='selected' value=".$i.">".$i."</option> ";
				else echo "<option value=".$i.">".$i."</option> ";
			}
			echo "</select> / ".$page_num." ";
			echo "<a  href='index.php?page=".($page+1)."'><span class="."button".">下一页</span>  </a>";
			echo "  ";
			echo "<a  href='index.php?page=".$page_num."'><span class="."button".">末页</span>  </a></form>";
?>
<!--js写在body之后，加快页面显示速度-->
<script src="js/jq.js"></script><!--js函数库-->
</body>
</html>
<?php  //关闭数据库
	mysql_close($con);
?>