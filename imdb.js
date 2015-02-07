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

var imdb_id = get_imdb_id();
//alert(imdb_id);

var xhr = new XMLHttpRequest();
var requestUrl = "http://www.omdbapi.com/?i=" + imdb_id + "&r=json";
xhr.open("get", requestUrl, false);
xhr.send(null);

var jsonText = xhr.responseText;
var imdbObject = JSON.parse(jsonText);

var imdbDiv = document.createElement("div");
imdbDiv.className = "gray_ad";

var imdbNode1 = document.createElement("h2");
imdbNode1.textContent = "IMDb " + imdb_id + " · · · · · ·";
imdbDiv.appendChild(imdbNode1);

var imdbNode2 = document.createElement("p");
imdbNode2.textContent = imdbObject.imdbRating + " (" + imdbObject.imdbVotes +" users)\n";
imdbDiv.appendChild(imdbNode2);

var imdbNode3 = document.createElement("p");
imdbNode3.textContent = function(){
	if(imdbObject.Rated == "R"){
		return "分级 R - 可能是坏了, 没这么多小黄片的 :)";
	}else if(imdbObject.Rated.toLowerCase() == "n/a" || imdbObject.Rated.toLowerCase() == "not rated"){
		return "这货没分级 ಥ_ಥ";
	}else
		return "分级 "+imdbObject.Rated;
	// get more information from http://en.wikipedia.org/wiki/Motion_Picture_Association_of_America_film_rating_system
}();
imdbDiv.appendChild(imdbNode3);

var imdbNode4 = document.createElement("a");
imdbNode4.textContent = "下载 · 字幕组熟肉";
var searchEngineUrl_Google = "https://www.google.com/#q=";
var searchEngineUrl_Baidu = "http://www.baidu.com/s?wd=";
imdbNode4.href = encodeURI(searchEngineUrl_Google + imdbObject.Title + " " + imdbObject.Year + " HR-HDTV");
imdbNode4.target = "_blank";
imdbDiv.appendChild(imdbNode4);

var brNode = document.createElement("p");
imdbDiv.appendChild(brNode);

var imdbNode5 = document.createElement("a");
imdbNode5.textContent = "下载 · kickass.so";
imdbNode5.href = encodeURI("https://kickass.so/usearch/" + imdbObject.Title + " " + imdbObject.Year);
imdbNode5.target = "_blank";
imdbDiv.appendChild(imdbNode5);

node.insertBefore(imdbDiv, node.firstChild);