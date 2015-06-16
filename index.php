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
	<!--meta name="viewport" content="width=device-width,initial-scale=1"为了保证动画效果，就不写自适应了 /-->
    <link href="css/reset.css" rel="stylesheet" type="text/css"/>
    <link href="css/wall.css" rel="stylesheet" type="text/css"/>
    <link href="css/guide.css" rel="stylesheet" type="text/css"/>
    <?php $publicHtml->css();?>
    <title>心愿墙</title>
</head>
<body>
<div id="mask"></div><!--新手引导蒙版-->
<div class="top"><!--头部导航-->
<?php
	$publicHtml->top();
?>
</div>


<!--网页主体部分-->
<div class="main">
<div class="main_container"><!--主页面容器-->
<div class="musicbox" id="musicbox"><!--播放器-->
	<div class="music_pause" id="music_play" title="播放/暂停" status='0'></div>
    <div class="music_id" id="music_id">00</div>
    <div class="music_name" now='0' id="music_name" title="当前曲目">Let me hear you</div>
    <div class="music_next" id="music_next" title="下一首"></div>
    <div class="music_pre" id="music_pre" title="前一首"></div>
    <div class="music_menu" id="music_menu" title="歌曲列表"><li style="width:31px; background:transparent"></li></div>
    <div id="music_player"><!--播放文件-->
    </div><!--播放音乐的容器-->
</div>
    <div class="main_form">
 
    <div class="column"><!--筛选条件导航-->
        <div class="column_guide">
            <span class='column_guide_li' id='column_guide_li0'>最新<div id="step2"><a id="next2"></a><span id="close2" title="关闭"></span></div></span>
            <span class='column_guide_li' id='column_guide_li1'>最热</span>
            <span class='column_guide_li' id='column_guide_li2'>评分最高</span>
            <span class='column_guide_li' id='column_guide_li3'>正实现</span>
            <span class='column_guide_li' id='column_guide_li4'>已实现</span>	     
        </div>
    </div>
    
    <!--form形式-->
    <div class="note_form" id="note_form" note_num ="2">
    <!--网页说明第五步-->
    <div class="note_form1" id="note_form1">
    	<div id="step5" ><a id="next5" style="width: 90px;height: 30px;position: absolute;"></a><span id="close5"></span></div> 
    </div>
    <!--心愿墙-->
    <div class="note_form2" id="note_form2">
        <div class="note_form2_container">
        	<!--新手引导蒙版-->
            <div class="note_form2_left" id="note_form2_left" item_num="12">
                <!--新手引导一三步-->
                <div id="step3"><a id="next3"></a><span id="close3" title="关闭"></span></div>
                <div id="step1"><a id="next1"></a><span id="close1" title="关闭"></span></div>
                <?php  //输出心愿
                    $i=0;
                    while($row=@mysql_fetch_array($result))
                    {	echo "<li id='n".$i."'>
                                <span class='spin' title='摘下心愿' status='".$row['status']."' id='spin-".$i."'></span>
                                <div class='note_item'>
                                <a href='detail/index.php?id=".$row['id']."'>".($jump+$i+1).".".$row['title']."</a>
                                <div style='color:#090; font-size:xx-small;'>发布者：".$row['username']."</div>
                                <div class='word_s'>".mb_substr($row['content'], 0,30, 'utf-8')."</div>
                                </div>
                                <div id='delete_wish".$i."' n='$i' d_id='".$row['id']."' style='font-size:xx-small; color:red;cursor:pointer'>";
                                    if( !empty($_SESSION['name'])&&($row['username']==$_SESSION['name']||$_SESSION['name']=='admin') )
                                        echo "删除";
                                echo "</div><span style='font-size:x-small'>状态：".$row['status']."</span>
                            </li>";
                        $i++;
                    }
                    while($i<12)//输出心愿空的心愿，保证有12条
                    {	echo "<li id='n".$i."'>
                                <span class='spin' id='spin-".$i."'></span>
                                <div class='note_item'>
                                </div>
                            </li>";
                        $i++;
                    }
                ?>
            </div>
            
            <div class="note_form2_right"><!--写新的心愿-->
                <div class="post_note">
                    <div class="post_note_title">
                    	<input  id="note_title" name="note_title" maxlength="10" placeholder="心愿标题" value="标题" />
                    </div>
                    <textarea maxlength="200" id="note_content" name="note_content" placeholder="我的心愿"></textarea>
                    <div class="post_note_submit" id="post_note_submit" clickable='1' >贴到墙上</div>
                    <div class="note_name">心愿墙</div>
                </div>	
            </div>
        <!--end notefomr2-->
        </div>
      <?php //输出分页
            $publicHtml->page();
      ?>
    </div>
    <!--end noteform-->
    </div>
    <!--end main_form-->
    </div>
<!--end main_container-->
</div>
<!--end main 主体部分结束-->
</div>
<!--js写在body之后，加快页面显示速度-->
<script src="js/jq.js"></script><!--js函数库-->
<script src="js/guide.js"></script><!--新手引导效果-->
<script src="js/wall.js"></script><!--贴心愿动画-->
</body>
</html>
<?php  //关闭数据库
	mysql_close($con);
?>