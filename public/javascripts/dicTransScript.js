function displayer(stringg){  //display data
	//getting wordID
	var wordx = stringg.id;
	var wordUX = wordx.toUpperCase();
	var translateP = document.getElementById("translate");
	var headW = document.createElement("H3");
	var newText = "word: " + wordUX;
	var headWord = document.createTextNode(newText);
	headW.appendChild(headWord);
	translateP.appendChild(headW);
	
	if (stringg.error!=null){
		var translateP = document.getElementById("translate");
		translateP.innerHTML = translate.innerHTML + "ERROR : " + stringg.error + '<br>Please try entering root word<br>';
	}
	else {
		var wordNo = stringg.reqNo; //setting word number
	
		//getting definitions
		var sayy = stringg.definition;
		var num = 1;
		for (x in sayy){
			var deff = sayy[x].definitions;
			var subb = sayy[x].subsenses;
			translateP.innerHTML = translate.innerHTML + "(" + num + ") " + deff + "<br>";
			if (subb!=null){
				for(m in subb){
					var newUL = document.createElement("UL");
					var mynewUL = "ULnewID" + wordNo + num;
					newUL.setAttribute('id', mynewUL);
					translateP.appendChild(newUL);
				
					var newLI = document.createElement("LI");
					var SubText = document.createTextNode(subb[m].definitions);
					newLI.appendChild(SubText);
					document.getElementById(mynewUL).appendChild(newLI);
				}	
			}
			num += 1;
		}
	translateP.innerHTML = translate.innerHTML + "<br><br>";
	}
}

var respArr = [];

function RespManager(APIresp, arrLength){  //putting in new array
	respArr.push(APIresp);
	
	if (respArr.length==arrLength){ //display in order
		var cnt = 1;
		for (j=0; j<arrLength; j++){
			for(i=0; i<arrLength; i++){
				if (respArr[i].reqNo==cnt){
					displayer(respArr[i]);
					break;
				}
			}
			cnt += 1;
		}
	}
}

function getDef(newObj){	//getting definitions from server
	var requestNo = 1;
	
	for (var j=0; j<newObj.length; j++){
		var data = {requestNo: requestNo, TotalReq: newObj.length, wordId: newObj[j].wordID};//format data to pass to server as JSON
		requestNo += 1;
		
		console.log(data);
		var dataa = JSON.stringify(data);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var objectt = this.responseText;
				var stringg = JSON.parse(objectt);
				console.log(stringg);
				var TotalNo = stringg.TotalReq;
				RespManager(stringg,TotalNo);
				//displayer(stringg);
			};
		};
			
		xhttp.open("POST",'/defSearch/entries',true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(dataa);
	}
	
}

function comparer(LemmArray){ //to compare for the same words
	var flag = 0;
	var NewLemmaArray = [];
	var cnt = 0;
	for (var i = 0; i <= LemmArray.length-1; i++) {
		//checking for same words
		for (var j = 0; j <= i-1; j++){
			if(LemmArray[i].wordID==LemmArray[j].wordID){
				flag = 1;
				break;
			}
			else {
				continue;
			}
		}
		
		//if not the same words
		if(flag == 0){
			if(LemmArray[i]!=null | LemmArray[i]!=""){
				NewLemmaArray[cnt]=LemmArray[i];
				cnt += 1;
			}
		}
		
		flag = 0;
	}//for i 
	return NewLemmaArray;
}

function getString(){
	var deet = document.getElementById("textinput").value;
	var words = deet.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
	var data=[]; //initializing an empty array
	
	for (var j=0; j<words.length; j++){
		if (words[j]!=null | words[j]!=""){
			data[j] = {wordId: words[j]};
		}
	}	//format data to pass to server as JSON

	console.log(data);
	var dataa = JSON.stringify(data);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var lemmaResp = this.responseText;
			var lemmaObj = JSON.parse(lemmaResp);
			console.log(lemmaObj);
			var NewArray = comparer(lemmaObj);
			getDef(NewArray);
		};
	};
	
	xhttp.open("POST",'/defSearch/lemmas',true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(dataa);
}
	