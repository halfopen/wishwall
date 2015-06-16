<?php
	//网页公共文件类
	//2014-11-15
	//By:halfopen
	class PublicHtml
	{	
		public $path;
		public $wish_num;
		function __construct($path, $wish_num){
			$this->path=$path;
			$this->wish_num=$wish_num;
		}
		public function top()//头部导航
		{
			echo "<div class='top' >
			<div class='top_guide'>
			<div id='step0'><a id='next0'></a><span id='close0' title='关闭'></span></div>
			<li style='width:80px'><a href='".$this->path."index.php'><img src='".$this->path."images/home.jpg' width='40' height='40' style='cursor:pointer' />主页</a></li>
		    <li style='width:690px; cursor:default'>心愿墙：贴出你的心愿，大家帮你实现！</li>
			<li style='width:127px; height:40px; float:left; font-size:xx-small'><div><div id='skin0' class='skin'></div><div id='skin1' class='skin'></div></div>换肤</li>
			<script type='text/javascript'>
				
			</script>
			";
			if(!empty($_SESSION['login'])&& $_SESSION['login']=='in')
			{	echo "<input type='hidden' id='name' value='".$_SESSION['name']."' />";
			 	$sex = mysql_fetch_array(mysql_query("select sex from user where name='".$_SESSION['name']."'"));
				echo "<input type='hidden' id='sex' value='".$sex['sex']."' />";
				 echo "<li id='my_head' >
				 			<span style=' width:44px;height:44px; border-bottom:3px;'><img src='".$this->path."user/head/head".$_SESSION['head_pic'].".jpg' width='44' height='44' /></span>";
							if(empty($this->path))
							echo "<span id='my_wish' >我的心愿</span>
							<span id='my_take' >摘下的</span>";
							echo "<a href='".$this->path."user/logout.php'><span>注销登录</span></a>";
				echo "</li>
				 <li style=' font-size:14px; width:54px; line-height:70px; text-align:center;'>
				 <a>".$_SESSION['name']."</a></li>";
			}
			else
			{ echo "<a href='".$this->path."user'>登录</a><a href='".$this->path."user/register.php'>注册</a>"."<input type='hidden' id='name' value='visitor' /><input type='hidden' id='sex' value='male' />";}
			echo "</div>
			<div class='new_home'>
	<div class='show_form' id='show_form' clicked='0'><div id='step4'><a id='next4'></a><span id='close4' title='关闭'></span></div></div>           
</div></div>
			";
		}
		
		
		//底部信息
		public function fooster()
		{
			echo "<div class='fooster'>
			<div style='margin-top:20px;'>
				<span>制作人员：</span><span> 秦贤康</span><span> 程维驰</span><span> 程晓曼</span><span> 张浩喆</span>
			</div>
			<div>
				 <span></span>
			</div>
			</div>";
		}
		
		
		//分页
		public function page()
		{	$size = 12;//每页显示数
			$page_num=ceil($this->wish_num/$size);//总页数
			if(isset($_GET['page']))$page = trim($_GET['page']);//取浏览器传来的值
			else $page=1;
			if(!isset($page) || $page<1) $page = 1;//小于1就等于1
			if($page > $page_num)       $page = $page_num;//大于总页数就等于总页数
			$jump = ($page - 1) * $size;//跳过几条记录开始
			$page = intval($page);//转成整数类型页
		
			echo "<form method='get' action='".$this->path."index.php'><a  href='"."index.php?page=1"."'><span class="."button".">首页</span>  </a>";
			echo "  ";
			echo "<a  href='".$this->path."index.php?page=".($page-1)."'><span class="."button".">前一页</span>  </a>";
			echo "<select name='page' onchange='javascript:document.forms[0].submit();'>";
			for($i=1;$i<=$page_num;$i++){
				if($i==$page)
					 echo "<option selected='selected' value=".$i.">".$i."</option> ";
				else echo "<option value=".$i.">".$i."</option> ";
			}
			echo "</select> / ".$page_num." ";
			echo "<a  href='".$this->path."index.php?page=".($page+1)."'><span class="."button".">下一页</span>  </a>";
			echo "  ";
			echo "<a  href='".$this->path."index.php?page=".$page_num."'><span class="."button".">末页</span>  </a></form>";
		}
		
		
		//公共css抽取，包括皮肤
		public function css()
		{	if( !empty( $_SESSION['name'] ) )
			{	$user = mysql_fetch_array(mysql_query("SELECT skin FROM user WHERE name='".$_SESSION['name']."'"));
				$skin = $user['skin'];
			}else
			{	$skin = 1;
			}
			echo "<link href='".$this->path."css/publicCss.css' rel='stylesheet' type='text/css'/>";
			echo "<link href='".$this->path."css/skin".$skin.".css' id='skin' rel='stylesheet' type='text/css'/>";
		}
	};
?>