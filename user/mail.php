<?php
//mail_to('halfopen@yeah.net',"用户：halfopen,<br/>您好！<br/>心愿墙激活链接为：<a href='http://localhost/user/active.php?active_num=asdfsdfasdff'>点此激活</a>,谢谢！<br/>举办方：***");
/*
参考http://blog.sina.com.cn/s/blog_6dbfc2a901014yqx.html
*/
function mail_to($to, $body) {
	$fp = @fsockopen('smtp.yeah.net', 25);
    $from="halfopen@yeah.net";
    $headers = "Content-Type: text/html; charset=\"utf-8\"\r\nContent-Transfer-Encoding: base64"; //支持html代码 ,utf-8，和数据库的编码相同                    
//发送的命令，1表示需要返回
    $smtp = array(
        array("EHLO halfopen\r\n","1"),
        array("AUTH LOGIN\r\n","334"),
        array('aGFsZm9wZW5AeWVhaC5uZXQ='."\r\n","1"),
        array('YmFua2FpZnVjaw=='."\r\n","1")
    );
    $smtp[] = array("MAIL FROM: <".$from.">\r\n","1");
    $smtp[] = array("RCPT TO: <".$to.">\r\n","1");
    $smtp[] = array("DATA\r\n","1");
    $smtp[] = array("From: ".$from."\r\n","");
    $smtp[] = array("To: ".$to."\r\n","");
    $smtp[] = array("Subject: 心愿墙活动\r\n","");
    foreach(explode("\r\n",$headers) as $h) {$smtp[] = array($h."\r\n","");}
    $smtp[] = array("\r\n","","");
    foreach(preg_replace("/^\./","..",explode("\r\n",$body)) as $b) {$smtp[] = array(base64_encode($b."\r\n")."\r\n","","");}
    $smtp[] = array(".\r\n","1");
    $smtp[] = array("QUIT\r\n","1");
    foreach($smtp as $req){
        @fputs($fp, $req[0]);
        while($req[1] && substr(@fgets($fp, 1024),3,1) != " ");//如果返回正确
    }
    //关闭连接
    @fclose($fp);
    //return $result_str;
}
?>