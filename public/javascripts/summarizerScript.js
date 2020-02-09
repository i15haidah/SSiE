function getString(){
	var input = document.getElementById("textinput").value;
    Algorithmia.client("simt3OyuMtiW4UMZenMG9UlFlXB1")
    .algo("nlp/Summarizer/0.1.8?timeout=300") // timeout is optional
    .pipe(input)
    .then(function(output) {
        outputP = document.getElementById("poutput");
        outputP.innerHTML = outputP.innerHTML + output;
    });
}
