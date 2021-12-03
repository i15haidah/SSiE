/* Display the summarized result */
function displayer(summarizedText,per,sen){

	/* Clearing the previous summary */
	document.getElementById("hehe").remove();

	/* Create a space to display result */
	var outDIV = document.createElement("DIV");
	outDIV.setAttribute("id","hehe");
	var outINFO = document.createElement("P");
	outINFO.id = "info";

	/* if summarizing by percentage reduction */
	if(per!=0){
		outINFO.innerHTML = "Paragraph reduced to " + per + "%" + "<br><br>";
	}
	/* if summarizing by number of sentences */
	else if(sen!=0){
		outINFO.innerHTML = "Number of sentences: " + sen + "<br><br>";
	}

	/* Appending to HTML file */
	document.getElementById("poutput").appendChild(outDIV);
	document.getElementById("hehe").appendChild(outINFO);
	var outSUM = document.createElement("P");
	outSUM.id = "summary";
	outSUM.innerHTML = summarizedText + "<br><br>";
	document.getElementById("hehe").appendChild(outSUM);

	/* Clear the form input */
	document.getElementById("myform1").reset();
	document.getElementById("myform2").reset();
}

/* Display the Error Message */
function displayErr(code){

	/* Clearing the previous summary */
	document.getElementById("hehe").remove();

	/* Create a space to display result */
	var outDIV = document.createElement("DIV");
	outDIV.setAttribute("id","hehe");
	var outINFO = document.createElement("P");
	outINFO.id = "info";

	/* Which code error (can be updated)*/
	if(code==500){
		outINFO.innerHTML = "Internal Server ERROR (Error:500)<br>PLEASE CHECK YOUR PARAGRAPH INPUT<br><br>";
	}

	/* Display the error message */
	document.getElementById("poutput").appendChild(outDIV);
	document.getElementById("hehe").appendChild(outINFO);
}

/* Getting summary */
function getString(){

	/* Getting input */
	var input = document.getElementById("textinput").value;
	var dataString = JSON.stringify(input); //converts to string
	var sentNo = document.getElementById("sentNo").value;
	var percents = document.getElementsByName("summLength");
	var percents_val = 0;
	for (var i=0; i<percents.length; i++){
		if(percents[i].checked){
			percents_val=percents[i].value;
		}
	}

	//console.log(dataString);
	/* for debugging use */
	if (sentNo.length == 0){
		console.log("no number");
		sentNo=0;
	}
	else console.log(sentNo);

	if(percents_val == 0){
		console.log("no percentage");
	}
	else console.log(percents_val);

	/* Creating JSON object to send to server */
	var data = [];
	data = {data:input, numOfSent:sentNo, percentage:percents_val};

	/* Making request to server */
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		/* If success */
		if(this.readyState == 4 && this.status == 200){
			//what happens after request is done
			var summaryResp = this.responseText; //string
			console.log(summaryResp);
			displayer(summaryResp,percents_val,sentNo);
		}
		/* If error */
		else if(this.status==500){
			console.log("Error:500 (Internal Server Error)");
			var errorCode = this.status;
			displayErr(errorCode);
		}
	};

	xhttp.open("POST",'/textSummarizer/summarize',true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(data));
}
