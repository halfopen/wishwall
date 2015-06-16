window.onload = function()
{	function isEmail(str)
	{ 
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		return reg.test(str); 
	} 
	function isPhone(str)
	{ 
		var reg = /^1\d{10}$/; 
		return reg.test(str); 
	} 
	var skin0 = $('skin0');
	var skin1 = $('skin1');
	skin0.onclick = function()
	{	aj.post(
			'../ajax/skin.php'
			,{'skin':0}
			,function(data)
			{	alert(data);
						$('skin').href = '../css/skin0.css';
			}
		);
	};
	skin1.onclick = function()
	{	aj.post(
			'../ajax/skin.php'
			,{'skin':1}
			,function(data)
			{	alert(data);
				$('skin').href = '../css/skin1.css';
			}
		);
	}
	window.onkeyup = function()
	{	var phone = $("phone");
		var email = $("email");
		if(phone.value!='')
		{	$("check_phone").innerHTML =isPhone(phone.value)?"√":"X" ;
		}	
		if(email.value!='')
		{	$("check_email").innerHTML =isEmail(email.value)?"√":"X" ;
		}		
	}

}