var express = require('express');
var router = express.Router();
//var app = express();

//for use of oxford dictionary api
var bodyParser = require('body-parser');
var https = require("https");
var request = require('request');
var lemmatize = require('wink-lemmatizer');

var rootCas = require ('ssl-root-cas/latest').inject();
https.globalAgent.options.cs = rootCas;

var app_id = "*****"; // insert your APP Id
var app_key = "*****"; // insert your APP Key
var fields = "definitions";
var strictMatch = "false";

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/entries',function(searchReq, searchRes){
	console.log("wordId: "+searchReq.body.wordId);
	var searchInputVal= searchReq.body.wordId;
	var postRequest = {
		host: "od-api.oxforddictionaries.com",
		port: "443",
		path: "/api/v2/entries/en-gb/" + searchInputVal + '?fields=' + fields + '&strictMatch=' + strictMatch + '&definitions',
		method: "GET",
		headers: {
			'app_id': app_id,
			'app_key': app_key,
		}
	};
	console.log('searchInputVal: '+searchInputVal);
	console.log(postRequest);
	
	var request = https.request(postRequest, function(response){
		
		var searchData = "";
		response.on( "data", function(data) { searchData += data;} );
		response.on( "end", function(data) {
			var parsed = JSON.parse(searchData);
			if (parsed.error!=null){
				var reqNo = searchReq.body.requestNo;
				var TotalReq = searchReq.body.TotalReq;
				var objErr = { reqNo:reqNo, TotalReq:TotalReq, id:searchInputVal, error:parsed.error };
				searchRes.end(JSON.stringify(objErr));
				console.log(objErr);
			}
			else{
				var sense = parsed.results[0].lexicalEntries[0].entries[0].senses;
				var id =  parsed.word;
				var reqNo = searchReq.body.requestNo;
				var TotalReq = searchReq.body.TotalReq;
				var objectt = { reqNo:reqNo, TotalReq:TotalReq, id:id , definition:sense } 
				var qer = JSON.stringify(objectt);
				console.log(objectt);
				searchRes.end(qer);
			}
		});
	});
	
	request.on('error',function(error){
		console.log('problem with request: ' + error.message);
	});
	
	request.write(JSON.stringify(searchInputVal));
	
});

router.post('/lemmas',function (lemmaReq, lemmaRes){
	console.log(lemmaReq.body);
	var arrList = lemmaReq.body;
	var NewarrList =[];
	for (var i=0; i<arrList.length; i++){
		var word = arrList[i].wordId.toLowerCase();
		var wordV = lemmatize.verb(word);
		var wordN = lemmatize.noun(word);
		var wordA = lemmatize.adjective(word);
		
		if (word!==wordV){
			NewarrList[i] = {wordID:wordV};
			//continue;
		}else if(word!==wordN){
			NewarrList[i] = {wordID:wordN};
			//continue;
		}else if(word!==wordA){
			NewarrList[i] = {wordID:wordA};
			//continue;
		}else{
			NewarrList[i] = {wordID:word};
			//continue;
		}
	}//for
	
	console.log(NewarrList);
	lemmaRes.end(JSON.stringify(NewarrList));
	
});

module.exports = router;
