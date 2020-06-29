
function setVideo(path)
{	
	let hls = new Hls(
			
	);
	
	let str = ""
	var video = document.getElementById("video");
	
	if(video.canPlayType("application/vnd.apple.mpegurl"))
	{
		video.src = path;
		return;
	}
	if(Hls.isSupported())
	{	
		
		hls.attachMedia(video);

		hls.on(Hls.Events.MANIFEST_LOADING,function(eventt,data){	
			currentFrag.innerHTML = data.url + "\n"
		})

		hls.on(Hls.Events.MEDIA_ATTACHED,function() {
			hls.loadSource(path);

			hls.on(Hls.Events.FRAG_LOADING,function(event,data){
				str = data.frag.url + "\n"
				
				currentFrag.innerHTML += str
			})
			
            hls.on(Hls.Events.MANIFEST_PARSED, function(event,data) {

				generateQualityBtn(data.levels.length)

				let btn = [];
				for(let i = 0; i < data.levels.length; i++){
					btn[i] = document.getElementById("btn" + i);
					btn[i].addEventListener('click',function(){
						console.log("BTN",i)
						hls.currentLevel = i;
						setValue(i,data)
					})
				}
				
				//for default value
				bitrateValue.innerHTML = data.levels[data.levels.length-1].bitrate;
				widthValue.innerHTML = data.levels[data.levels.length-1].width;
				heightValue.innerHTML = data.levels[data.levels.length-1].height;
				videoCodecValue.innerHTML = data.levels[data.levels.length-1].videoCodec;
				audioCodecValue.innerHTML = data.levels[data.levels.length-1].audioCodec;
				
                video.play();
            })
		});		

	}
	
	return;
}

function setValue(index,data){ // basic information about the video
	bitrateValue.innerHTML = data.levels[index].bitrate;
	widthValue.innerHTML = data.levels[index].width;
	heightValue.innerHTML = data.levels[index].height;
	videoCodecValue.innerHTML = data.levels[index].videoCodec;
	audioCodecValue.innerHTML = data.levels[index].audioCodec;
}

function generateQualityBtn(length){//create dynamic button depends on number of video quality
	
	//delete button element if exist and set new one
	if(document.contains(document.getElementById("currentLevelBtns"))){
		document.getElementById("currentLevelBtns").remove()
		var newDiv = document.createElement("div"); 
		newDiv.setAttribute("id","currentLevelBtns")
		document.getElementById("currentLevelBtn").appendChild(newDiv)
	}

	var btn_ = [];

	for(var j = 0; j < length ; j++){
		
		btn_[j] = document.createElement("BUTTON"); 
		btn_[j].setAttribute("id","btn"+j)
		btn_[j].innerHTML = "Button" + j; 
		document.getElementById("currentLevelBtns").appendChild(btn_[j]); 
		
	}
}


function setPlayList(){
	let myList = document.getElementById("myList")
	document.getElementById("setList").value = myList.options[myList.selectedIndex].value
	setVideo(myList.options[myList.selectedIndex].value);
}
function enterCustumUrl(ele) {
	if(event.keyCode === 13) { // ENTER key 
		event.preventDefault();
		setVideo(document.getElementById("setList").value);
	}
}
