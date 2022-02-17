# English-Dictionary-App

<div id="top"></div>


## Assignment

#### Your about to build an english-dictionary app.

- Download [English Dictionary in CSV format](https://www.bragitoff.com/2016/03/english-dictionary-in-csv-format/)
- Set up a DynamoDB with `Dictionary` table.

## DATABASE

- Parse & Insert all words, in a common structure, to `Dictionary` table.


## Server Requirements

- Build a REST API with the following end point(s):

* [x] `GET /:word` - if word has more than one parts of speech will return all words part of speech, else, will return a word + definition + part of speech.
* [x] `GET /:word/:partOfSpeech` - will return a word + definition + part of speech [(noun, verb, adjectives, etc...)](https://www.dictionary.com/e/parts-of-speech/) `{updated: true}` if succeed.
* [x] `GET /part-of-speech/:part` - for example, `/part-of-speech/adjective`, will return a random word + definition + part of speech (`part` is enum).


## Client Requirements

- [x] Build a `create-react-app` english dictionary app (mobile first)
- [x] URL routes:
    - `/:word` - dynamic route - `word` is dynamic URL parameter, used to request backend api.
    - `/:word/:partOfSpeech` - dynamic route - `word` is dynamic URL parameter, used to request backend api.
    - `/part-of-speech/:part` - `part` is enum URL parameter, used to request backend api.
    - Each word in dictionary is clickable and will redirect to a common URL.
    - *BONUS* should be deployed to `S3 bucket`.



- #### Deployment
- [x] [DictionaryApp](https://english-dictionary-shachar.s3.amazonaws.com/index.html)