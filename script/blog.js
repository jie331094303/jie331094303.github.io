window.onload = function() {
	//图片自适应屏幕宽度
	function autoPic() {
		var pic = document.getElementById('pic');
		bodyW = document.documentElement.clientWidth || document.body.clientWidth;
		pic.style.width = bodyW + "px";
	}
	autoPic();
	//轮播图展示
	var box = document.getElementById('ps-box');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var spans = buttons.getElementsByTagName('span');
	var index = 1;
	var show1 = false;
	var timer = null;
	//移动函数 
	function move(x){
		show1 = true;
		left = parseInt(list.style.left);
		var aleft = left + x;
		var time = 300;
		var interval = 10;
		var speed = x / (time/interval);
			function go(){
				if((speed < 0 && parseInt(list.style.left) > aleft)||(speed > 0 && parseInt(list.style.left) < aleft)){
					list.style.left = parseInt(list.style.left) + speed + 'px';
					setTimeout(go,interval);
					// console.log(left);
				}else{
						show1 = false;
					   list.style.left = aleft + 'px';
					if(aleft > -620){
						list.style.left = -1860 + 'px'; //让它回到最后一张
					}
					if(aleft < -1860){
						list.style.left = -620 + 'px';
						//让它回到第一张，不然后面会出现空白
					}
				}
			}
	go();
	}
	//自动播放
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},2000);
	}

	function stop(){
		clearInterval(timer);
	}
	play();
	box.onmouseover = function(){
		stop();
		prev.style.display = 'block';
		next.style.display = 'block';
	};
	box.onmouseout = function() {
		play();
		prev.style.display = 'none';
		next.style.display = 'none';
	};
	//显示按钮
	function showButton(){
		for(var i = 0; i < spans.length; i++){
			if(spans[i].className == 'on'){
				spans[i].className = '';
			}
		}
		spans[index - 1].className = 'on';
	}
	//跳转
	for(var j = 0; j< spans.length; j ++){
		spans[j].onclick = function(){
			if(this.className === 'on'){
					return;
			}
			var aindex = parseInt(this.getAttribute('index'));
			var movex = -620*(aindex - index);
			if(show1 === false){
				move(movex);	
			}
			index = aindex;
			showButton();
			// debugger;
		};
	}

	//向前
	prev.onclick = function(){
		if(show1 === false){
			move(620);
		}
		if(index === 1){
			index = 3;
		}else{
			index = index - 1;
		}
		showButton();
	};
	//向后
	next.onclick = function(){
		if(show1 === false){
			move(-620);
		}
		if(index === 3){
			index = 1;
		}else{
			index = index + 1;
		}
		showButton();
	};
	//日历
	var yearPrve = document.getElementById('year-prve');
	var yearNext = document.getElementById('year-next');
	var monthPrve = document.getElementById('month-prve');
	var monthNext = document.getElementById('month-next');
	var showDate = document.getElementById('show-date');
	var show = document.getElementById('show');

	var today = new Date();
	var nowYear = today.getFullYear();	//年
	var nowYear1 = nowYear;		//nowYear副本
	var nowMonth = today.getMonth();	//月从0开始
	var nowMonth1 = nowMonth;	//nowMonth副本
	// var show1 = document.getElementById('show1')
	//是否闰年
	function isLeap(year){
		if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0){
			return 1;
		}else{
			return 0;
		}
	}
	//处理日期
	function dealDate(year,month){
		var day = new Date();
		var d = day.getDate();	//日
		var firstday =  new Date(year,month,1); //某年某月的第一天
		var week = firstday.getDay();	//第一天是星期几
		var monthArray = new Array(31,28 + isLeap(year),31,30,31,30,31,31,30,31,30,31);
		var rows = Math.ceil((week + monthArray[month]) / 7);
		var items = '';
		items += "<table><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
		for(var i = 0; i < rows; i++){
			items += '<tr>';
			for(var k = 0; k < 7; k++){
				var idx = 7 * i + k;    //为每个表格创建索引,从0开始
				var date = idx - week + 1;  //将当月的1号与星期进行匹配
				//小于零或者大于当月的天数的时候用空格表示
				if(date <= 0 || date > monthArray[month]){
					date = ''; 
				}else{
					date = idx - week + 1;
				}
				// 如果date是today用红色显示
				if(year === nowYear1 && nowMonth1 === month && date === d){
					items += '<td class="today">' + date + '</td>';
				}else{
					items += '<td>' + date + '</td>';
				}
			}
			items += '</tr>';
			
		}
		items += "</table>";
		show.innerHTML = items;
	}
	showDate.innerHTML = nowYear + "年" + (nowMonth + 1) + '月';
	dealDate(nowYear,nowMonth);
	yearPrve.onclick = function(){
		nowYear = nowYear - 1;
		dealDate(nowYear,nowMonth);
		showDate.innerHTML = nowYear + "年" + (nowMonth + 1) + '月';
	};
	yearNext.onclick = function(){
		nowYear = nowYear + 1;
		dealDate(nowYear,nowMonth);
		showDate.innerHTML = nowYear + "年" + (nowMonth + 1) + '月';
	};
	monthPrve.onclick = function(){
		nowMonth = nowMonth - 1;
		if(nowMonth === -1){
			nowYear = nowYear - 1;
			nowMonth = 11;
		}
		dealDate(nowYear,nowMonth);
		showDate.innerHTML = nowYear + "年" + (nowMonth+1) + '月';
	};
	monthNext.onclick = function(){
		nowMonth = nowMonth + 1;
		if(nowMonth === 12){
			nowYear = nowYear + 1;
			nowMonth = 0;
		}
		dealDate(nowYear, nowMonth);
		showDate.innerHTML = nowYear + "年" + (nowMonth + 1) + '月';
	};
};