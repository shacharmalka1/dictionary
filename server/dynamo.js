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
const getWords = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const words = await dynamoClient.scan(params).promise();
    return words;
    // return words.length;
};

const getWordById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
};

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



const deleteWord = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
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

module.exports = {
    dynamoClient,
    getWords,
    getWordById,
    addOrUpdateWord,
    deleteWord,
    getWord,
    getWordByPart,
};