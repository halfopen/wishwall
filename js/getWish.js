// JavaScript Document
/*
**静态刷新心愿
*/
window.onload = function()
{
	aj.post//发送ajax请求到服务器
			(
				'ajax/get_wish.php'
				,{'fun':"title"}
				,function(data)
					{	
					var i=0;
					data=eval( "(" + data + ")" );
					alert(data[i].title);
					//alert(data.i.title);
					}
			);
}