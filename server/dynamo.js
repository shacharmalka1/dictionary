const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_REGION, 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,    
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion:'2012-08-10' 
});


const dynamoClient = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = 'english-dictionary';
const TABLE_NAME = 'Dictionary';


const addOrUpdateWord = async (words) => {
    const params = {
        RequestItems: {
            Dictionary: words.map(({ id, word, partOfSpeech, definition }) => {
                return {
                    PutRequest: {
                        Item: {
                            id: {
                                S: id
                            },
                            word: {
                                S: word
                            },
                            partOfSpeech: {
                                S: partOfSpeech
                            },
                            definition: {
                                S: definition
                            }
                        }
                    }
                }
            })
        }
    };
    try {
        console.log(params);
        await dynamoClient.batchWriteItem(params).promise();
    } catch (error) {
        console.log('error in index :');
        setTimeout(async () => {
            await dynamoClient.batchWriteItem(params).promise();
        }, 3000);
        console.log('trying again');
    }
};


const getWord = async (word) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'word-index',
        KeyConditionExpression: 'word = :w',
        ExpressionAttributeValues: { ':w': word }
    };
    return await docClient.query(params).promise();
};

const getWordByPart = async (word) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'word-index',
        KeyConditionExpression: 'word = :w',
        ExpressionAttributeValues: { ':w': word}
    };
    return await docClient.query(params).promise();
};

const getRandomWordByPart = async (partOfSpeech) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'partOfSpeech-index',
        KeyConditionExpression: 'partOfSpeech = :p',
        ExpressionAttributeValues: { ':p': partOfSpeech }
    };
    const { Items } = await docClient2.query(params).promise();
    return [Items[Math.floor(Math.random() * Items.length)]]
};


module.exports = {
    dynamoClient,
    addOrUpdateWord,
    getWord,
    getWordByPart,
    getRandomWordByPart
};