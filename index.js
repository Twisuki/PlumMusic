// 音乐名
var title = [
	"Terrasphere", "R", "Rainbow Chaser", "Timeline", "Mad Piano Patry II",
	"Prominence", "Skyscape", "Indigo Sky", "Sinkhole", "별이 보이지 않는 밤",
	"Kaleidoscope", "Event Horizon", "Vanilla Flavored Soda", "Lunar Dance", "Paragon",
	"The Protester", "황혼의 마을", "변화하는 세계의 바깥에서", "Anti-Sentiment", "For Higher Movement",
	"Cloudstep", "Minute Romance", "Atlas", "VirtualWorld Diary", "Crystal Eye",
	"Sagittarius", "Tempest"
];
// 备注
var note = [
	"地球圈", "小雪花", "彩虹追逐者 (2021 Remark)", "时间线", "疯狂钢琴派对2",
	"日冕层", "天空景观", "靛蓝天空", "", "看不见星星的夜晚 (2021 Remark)",
	"万花筒", "事件视界 (2020 Ver.)", "香草苏打", "月舞", "典范",
	"(With HyuN)", "暮光镇", "在变化的世界之外", "", "",
	"云中漫步", "分秒浪漫", "", "", "水晶之眼",
	"(Extended Ver.)", ""
];
// 音乐id
var id = [
	1876939087, 1877154230, 1882625817, 1877150616, 1877153876,
	1876939145, 1876939921, 1877154652, 1877153935, 1882625816,
	1966149345, 1877903106, 1877154641, 1991282195, 1876939925,
	2005524138, 2005520286, 2005520287, 2005520288, 2005520290,
	2005524139, 2005520293, 2002646118, 2002646120, 2002646121,
	2002646122, 1876939920
];
var num = title.length;
var p;
var main;
var list = [];
var current;
var autoMode;

// 加载列表并初始化
function load(){
	p = document.getElementById("audio");
	main = document.getElementById("main");
	
	for(let i = 0; i < num; i ++){
		main.innerHTML += "<div class='music' id='song-" + i + "' onclick='doPlay(" + i + ")'>";
		main.innerHTML += "</div>";
		list[i] = document.getElementById("song-" + i);

		list[i].innerHTML += "<div class='name'>" + title[i] + "</div>";
		list[i].innerHTML += "<div class='note'>" + note[i] + "</div>";
		list[i].innerHTML += "<div class='link'><a href='https://music.163.com/#/song?id=" + id[i] + "'>网易云音乐id：" + id[i] + "</a></div>";
	}
	
	mode(0);
}

// 播放并显示
function doPlay(index){
	current = index;
	
	let url = "http://music.163.com/song/media/outer/url?id=" + id[index] + ".mp3";
	p.src = url;
	
	// 音乐列表高亮
	main.innerHTML = "<div class='music'><div class='name'>音乐名</div>"
		+ "<div class='note'>备注</div>"
		+ "<div class='link'>相关链接</div></div>";
	for(let i = 0; i < num; i ++){
		if(i != index){
			main.innerHTML += "<div class='music' id='song-" + i + "' onclick='doPlay(" + i + ")'>";
		}else{
			main.innerHTML += "<div class='music' id='song-" + i + "' onclick='doPlay(" + i + ")' style='background-color: #777b83'>";
		}
		main.innerHTML += "</div>";
		list[i] = document.getElementById("song-" + i);
			
		list[i].innerHTML += "<div class='name'>" + title[i] + "</div>";
		list[i].innerHTML += "<div class='note'>" + note[i] + "</div>";
		list[i].innerHTML += "<div class='link'><a href='https://music.163.com/#/song?id=" + id[i] + "'>网易云音乐id：" + id[i] + "</a></div>";
	}
	
	// 音乐信息显示
	document.getElementById("name").innerHTML = title[index];
	document.getElementById("link-a").innerHTML = "https://music.163.com/#/song?id=" + id[index];
	document.getElementById("link-a").href = "https://music.163.com/#/song?id=" + id[index];
	// 实时信息显示
	window.setInterval("time()", 1000);
}

// 实时信息
function time(){
	let totle = Math.trunc(p.duration);
	let now = Math.trunc(p.currentTime);
	let k = now / totle;
	
	document.getElementById("time").innerHTML = now + "/" + totle;
	document.getElementById("axis-inner").style.width = 600*k + "px";
}

// 播放模式
function mode(index){
	for(let i = 0; i < 3; i ++){
		document.getElementById("playMode-" + i).style.backgroundColor = "rgba(10, 10, 10, 0.2)";
	}
	document.getElementById("playMode-" + index).style.backgroundColor = "rgba(10, 10, 10, 0.5)";
	switch (index){
		case 0:
			p.loop = false;
			autoMode = false;
			break;
		case 1:
			p.loop = true;
			autoMode = false;
			break;
		case 2:
			p.loop = false;
			autoMode = true;
			window.setInterval("auto(1);", 1000);
			break;
	}
}

// 播放控制
function ctrl(index){
	switch (index){
		case "pause":
			if(p.paused){
				p.play();
			}else{
				p.pause();
			}
			break;
		case "stop":
			window.location.href = "index.html";
			break;
		case "last":
			if(current > 0){
				doPlay(current -1);
			}else{
				window.location.href = "index.html";
			}
			break;
		case "next":
			if(current + 1 < num){
				doPlay(current + 1);
			}else{
				doPlay(current + 1 - num);
			}
			break;
		case "time":
			var time = document.getElementById("timeset-range").value;
			if(time >= 0 && time <= p.duration){
				p.currentTime = time;
			}else{
				p.pause();
				window.alert("您键入的时间无效！！");
				p.play();
			}
			break;
	}
}

// 实时音量控制
window.setInterval("volume()", 1000)
function volume(){
	p.volume = document.getElementById("volume-range").value * 0.01;
}

// 自动播放模式
function auto(add){
	let i = current;
	if(i + add < num){
		i += add;
	}else{
		i = i + add - num;
	}
	if(p.ended && autoMode){
		doPlay(i);
	}
}
