<?php
//mail_to('halfopen@yeah.net',"�û���halfopen,<br/>���ã�<br/>��Ըǽ��������Ϊ��<a href='http://localhost/user/active.php?active_num=asdfsdfasdff'>��˼���</a>,лл��<br/>�ٰ췽��***");
/*
�ο�http://blog.sina.com.cn/s/blog_6dbfc2a901014yqx.html
*/
function mail_to($to, $body) {
	$fp = @fsockopen('smtp.yeah.net', 25);
    $from="halfopen@yeah.net";
    $headers = "Content-Type: text/html; charset=\"utf-8\"\r\nContent-Transfer-Encoding: base64"; //֧��html���� ,utf-8�������ݿ�ı�����ͬ                    
//���͵����1��ʾ��Ҫ����
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
    $smtp[] = array("Subject: ��Ըǽ�\r\n","");
    foreach(explode("\r\n",$headers) as $h) {$smtp[] = array($h."\r\n","");}
    $smtp[] = array("\r\n","","");
    foreach(preg_replace("/^\./","..",explode("\r\n",$body)) as $b) {$smtp[] = array(base64_encode($b."\r\n")."\r\n","","");}
    $smtp[] = array(".\r\n","1");
    $smtp[] = array("QUIT\r\n","1");
    foreach($smtp as $req){
        @fputs($fp, $req[0]);
        while($req[1] && substr(@fgets($fp, 1024),3,1) != " ");//���������ȷ
    }
    //�ر�����
    @fclose($fp);
    //return $result_str;
}
?>