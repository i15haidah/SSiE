var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var summarizer = require('text-summary');
var getSentences = require('get-sentences-from-article');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/summarize',function (req, res){
	/* getting data from JSON object */
  var text = JSON.stringify(req.body.data);
  var sentNo = req.body.numOfSent;
  var percents = parseInt(req.body.percentage);
  var result = "";

  /* counting the number of sentences using regex */
  //var cnt = text.match(/[\w|\)][.?!](\s|$)/g).length + 1;

  /* refining the text */
  text = text.replace(/\\n/g,' '); //removing newline character
  //changing titles to avoid confusion as end of sentence
  text = text.replace(/Mr./g,"Mr");
  text = text.replace(/Mrs./g,"Mrs");
  text = text.replace(/Ms./g,"Ms");

  /* splitting text into tokens of sentences */
  var sentences = getSentences(text);
  var cnt = sentences.length; //number of sentences

  /* for debugging use */
  console.log(text);
  console.log(sentences);
  console.log("\nTotal number of sentences: " + cnt);

  var reduction = 0; //how much to reduce the text

  /* Summarizing from percentage reduction */
  if (sentNo==0) {
    //console.log("no number of sentence");
    if(percents==0) console.log("Percentage value: 25% (default)");
    else console.log("Percentage value: " + percents + "%");

    switch(percents){
      case 50:
        reduction = cnt/2;
        break;
      case 30:
        reduction = (cnt*30)/100;
        break;
      default:
        reduction = cnt/4;
        break;
      case 10:
        reduction = cnt/10;
        break;
      case 5:
        reduction = cnt/20;
        break;
    }
    reduction = parseInt(reduction);
    console.log("Summary: Reduced to " + reduction + " sentences\n");
    result = summarizer.summary(text,reduction);
  }

  /* Summarizing from number of sentences */
  else{
    console.log("Summary: Reduced to " + sentNo + " sentences\n");
    result = summarizer.summary(text,sentNo);
  }
  //console.log(result);

  res.send(result);

});

module.exports = router;
