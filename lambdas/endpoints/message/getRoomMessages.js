const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
    console.log('message event', event);
    const {
        roomId
    } = event.pathParameters;
    if(!roomId) {
        return Responses._400({ message: 'Missing params!' });
    }
    const params = {
        TableName: 'Messages',
        ExpressionAttributeNames: {
            '#room': 'roomId',
        },
        ExpressionAttributeValues: {
            ':room': roomId,
        },
    };
    const messages = await Dynamo.scan(params).catch(err => {
        console.log('error in dynamo read', err);
        return null;
    });
    

    if (!messages) {
        return Responses._400({ message: 'Failed to get messages!' });
    }

    return Responses._200({ messages });
};
