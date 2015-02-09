var node = document.getElementById("content").childNodes[3].childNodes[3];

function get_imdb_id(){
	var id = "tt102689";
	var info = document.getElementById("info").childNodes;
	for(var i=0; i < info.length; i++){
		if(info[i].tagName == "A"){
			// catch a link
			if( info[i].getAttribute("href").indexOf("imdb.com") != -1 ){
				id = info[i].textContent;
				break;
			}
		}
	}
return id;
};

function trans2readable(num){
	if(typeof num == "string"){
		if(!(/^[0123456789]*$/.test(num))){
			num = num.replace(",","");
			num = num.trim();
		}
		if(/^[0123456789]*$/.test(num)){
			num = parseInt(num);
		} else {
			return false;
		} 
	}
	
	(num > 10000) && (num = (num/10000).toFixed(1) + "万");
	
	return num;
}

var imdb_id = get_imdb_id();
//alert(imdb_id);

var xhr = new XMLHttpRequest();
var requestUrl = "http://www.omdbapi.com/?i=" + imdb_id + "&r=json";
xhr.open("get", requestUrl, false);
xhr.send(null);

var jsonText = xhr.responseText;
var imdbObject = JSON.parse(jsonText);

var myDiv = document.createElement("div");
myDiv.className = "gray_ad";

myDiv.insertAdjacentHTML("beforeend", "<h2>更多信息 · · · · · ·</h2>");

if(imdbObject.imdbRating != "N/A"){
	myDiv.insertAdjacentHTML("beforeend",
		"<p style='-webkit-filter: hue-rotate(90deg); filter: hue-rotate(90deg)'>" +
			"<span class='ll bigstar" + 5 * Math.round(imdbObject.imdbRating) + "'></span>" +
			"<strong class='ll rating_num'>" + imdbObject.imdbRating + "</strong>&nbsp;&nbsp;(" + trans2readable(imdbObject.imdbVotes) +"人评分)\n" + 
		"</p>"
	);
}

if(imdbObject.Rated.toLowerCase() != "n/a" && imdbObject.Rated.toLowerCase() != "not rated"){
	var ratedImg = "url of the img";
	
	switch(imdbObject.Rated){
	case 'G':
		ratedImg = 'http://i.imgur.com/s7EvKhl.png';break;
	case 'PG-13':
		ratedImg = 'http://i.imgur.com/fSwTQHS.png';break;
	case 'R':
		ratedImg = 'http://i.imgur.com/evNf1Zi.png';break;
	default:
		// 'PG'
		ratedImg = 'http://i.imgur.com/0ax0D3c.png';
	}
	
	myDiv.insertAdjacentHTML("beforeend",
		"<p>" +
		 	"<img src='" + ratedImg + "' height='20'/>" +
		"</p>"
	);
	// get more information from http://en.wikipedia.org/wiki/Motion_Picture_Association_of_America_film_rating_system
	
}

var searchGoogle = "https://www.google.com/#q=";
//var searchBaidu = "http://www.baidu.com/s?wd=";

myDiv.insertAdjacentHTML("beforeend",
	"<p>" +
		"<a href='" + encodeURI(searchGoogle + imdbObject.Title + " " + imdbObject.Year + " HR-HDTV") + "' target='_blank'>下载 · 字幕组熟肉</a>" +
	"</p>"
);

myDiv.insertAdjacentHTML("beforeend",
	"<p>" + 
		"<a href='" + encodeURI("https://kickass.so/usearch/" + imdbObject.Title + " " + imdbObject.Year) + "' target='_blank'>下载 · kickass.so</a>" +
	"</p>"
);

node.insertBefore(myDiv, node.firstChild);