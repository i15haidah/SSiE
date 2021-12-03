# SSiE
Specialty Studies in English (SSiE) helps non-native speakers study specialty subject in English
<br><br>
SSiE was built using [Express](https://expressjs.com/en/starter/generator.html) framework on [NodeJS](https://nodejs.org/en/download/) server that comes with many built-in node modules.
It is recommended to install NodeJS in advance.<br>
Some additional modules needed to be installed are <br>
-- body-parser <br>
-- request <br>
-- wink-lemmatizer <br>
-- ssl-root-cas <br>
-- text-summary <br>
-- get-sentences-from-article <br>
<br><br>
Use [npm](https://www.npmjs.com/) to install node modules<br>
<br> For basic modules use
```
npm install
```
<br>for additional modules use
```
npm install <module_name> --save
```
SSiE uses [Oxford Dictionary API](https://developer.oxforddictionaries.com/) services so you need to sign up in order to get the API ID and key. For research purposes you can apply for the free package. Visit their website for more info.<br>

<br>For more explanation please read the Graduation Thesis. SSiE has two features, English-English Dictionary (EED) translator and Simplifier. This is currently EED feature only.<br><br>

#Update
As of 3rd December 2021, the Summarizer/Simplifier function has been updated.<br>
The Simplifier function is based on the [PageRank](https://en.wikipedia.org/wiki/PageRank) algorithm. For more info read the Wikipage.
