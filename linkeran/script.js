window.onload = function(){
	dealHeight();
	waterfall('main','box');
	var dataInt = {"data":
				  [{"src": "31.jpg"},{"src": "32.jpg"},{"src": "33.jpg"},{"src": "34.jpg"},{"src": "37.jpg"},{"src": "38.jpg"},{"src": "39.jpg"},{"src": "40.jpg"},
				  {"src": "41.jpg"},{"src": "42.jpg"},{"src": "43.jpg"},{"src": "44.jpg"},{"src": "45.jpg"},{"src": "46.jpg"},{"src": "47.jpg"},{"src": "48.jpg"},{"src": "49.jpg"},{"src": "50.jpg"},
				  {"src": "51.jpg"},{"src": "52.jpg"},{"src": "53.jpg"},{"src": "56.jpg"},{"src": "57.jpg"},{"src": "58.jpg"},{"src": "59.jpg"},{"src": "60.jpg"},
				  {"src": "61.jpg"},{"src": "62.jpg"},{"src": "63.jpg"},{"src": "64.jpg"},{"src": "65.jpg"},{"src": "66.jpg"},{"src": "67.jpg"},{"src": "68.jpg"},{"src": "69.jpg"},{"src": "70.jpg"},
				  {"src": "71.jpg"},{"src": "72.jpg"},{"src": "73.jpg"},{"src": "74.jpg"},{"src": "75.jpg"},{"src": "76.jpg"},{"src": "77.jpg"},{"src": "78.jpg"},{"src": "79.jpg"},{"src": "80.jpg"}
				  ]};
	window.onscroll = function() {
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			for(var i = 0; i < dataInt.data.length;i++){
				// if (i !==35 ||i !==36 ) {
					var oBoxs = document.createElement('div');
					oBoxs.className = 'box';
					oParent.appendChild(oBoxs);
					var oPic = document.createElement('div');
					oPic.className = 'pic';
					oBoxs.appendChild(oPic);
				    var oImg = document.createElement('img');
					oImg.src = 'images/' + dataInt.data[i].src;
					oPic.appendChild(oImg);
				// }

			}
		}
	// dealHeight(31);
	waterfall('main','box');	
	};

};

function waterfall(parent,box) {
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = document.getElementsByClassName(box);
	// var oImg = document.getElementsByTagName('img');
	// for(var j = 0; j < oImg.length; j++){
	// 	var ranNumber = (Math.floor(Math.random() * (40 - 0 + 1)) + 0) * 5 + 200;
	// 	oImg[j].style.cssText = "height:" + ranNumber + 'px';
	// }
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽
	oParent.style.cssText = "width:" + oBoxW*cols + 'px;margin:0 auto;';
	var hArr=[];
	for(var i = 0; i < oBoxs.length; i++){
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = oBoxW*index + 'px';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}

}

function getMinhIndex(arr,val) {
	for(var i in arr){
		if(arr[i] === val){
			return i;
		}
	}
}

function checkScrollSlide() {
	var oParent = document.getElementById('main');
	var oBoxs = document.getElementsByClassName('box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2);
	// var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH < scrollTop + height)? true:false;
}
function dealHeight() {
	//设置照片的高
	var oImg = document.getElementsByTagName('img');
	for(var j = 0; j < oImg.length; j++){
		var ranNumber = (Math.floor(Math.random() * (40 - 0 + 1)) + 0) * 5 + 200;
		oImg[j].style.cssText = "height:" + ranNumber + 'px';
	}
	console.log(oImg.length);
}