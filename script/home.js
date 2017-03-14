window.onload = function() {
	function autoPic() {
		var pic = document.getElementById('pic');
		bodyW = document.documentElement.clientWidth || document.body.clientWidth;
		pic.style.width = bodyW + "px";
	}
	autoPic();
};