<?php 
	session_start();
	$pic_code="";
?>
<?php 
	$image = imagecreatetruecolor(50,20 );
	$bgcolor = imagecolorallocate($image,255,255,255);
	imagefill($image,0,0,$bgcolor);
	
	for($i=0;$i<4;$i++){
		$fontsize = 12;
		$fontcolor = imagecolorallocate( $image,rand(0,120),rand(0,120),rand(0,120) );//Êý×ÖÑÕÉ«
		$data = 'abcdefghihjmnopqrstuvwxy123456789';
		$fontcontent = substr( $data, rand(0,strlen($data)),1 );
		
		$pic_code.=$fontcontent;
		
		$x=($i*50/4) + rand(0,5);
		$y=rand(2,5);
		
		imagestring( $image , $fontsize , $x,$y,$fontcontent,$fontcolor );
	}
	$_SESSION['pic_code']=$pic_code;
	for($i=0;$i<20;$i++){
		$pointcolor = imagecolorallocate( $image,rand(50,200),rand(50,200),rand(50,200));
		imagesetpixel( $image, rand(1,49),rand(1,19) ,$pointcolor);
	}
	
	for($i=0;$i<2;$i++){
		$pointcolor = imagecolorallocate( $image,rand(120,220),rand(120,220),rand(120,220));
		imageline( $image, rand(1,20),rand(1,19),rand(50,49),rand(1,19)  ,$pointcolor);
	}
	
	header( 'content-type:image/png' );
	imagepng( $image );
	
	imagedestroy( $image);
?>