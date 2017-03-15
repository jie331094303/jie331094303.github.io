window.onload = function() {
	var background = document.getElementById('bg');
	function getRandomNumber() {
		var randomNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1);
		return randomNumber;
	}
	var number = getRandomNumber();
	console.log(number);
	background.innerHTML = "<img src='images/" + number + ".jpg'" + "id='pic'>";
	function autoPic() {
		var pic = document.getElementById('pic');
		bodyW= document.documentElement.clientWidth || document.body.clientWidth;
		bodyH= document.documentElement.clientHeight || document.body.clientHeight;
		pic.style.width = bodyW + "px";
		pic.style.height = bodyH+ "px";
		// pic.style.width = (bodyW - 17) + "px";
		// pic.style.height = (bodyH - 17)+ "px";
		console.log(pic.style.width);
		console.log(document.documentElement.clientWidth);
	}
	autoPic();	
};