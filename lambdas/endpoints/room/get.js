const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

exports.handler = async event => {
    console.log('room event', event);
    const {
        roomId
    } = event.pathParameters;
    if(!roomId) {
        return Responses._400({ message: 'Missing params!' });
    }
    const params = {
        TableName: 'Rooms',
        Key: {
            roomId,
        }
    };
    try {
        const room = await Dynamo.get(params).promise();
        if (!room) {
            return Responses._400({ message: 'Failed to get room or room does not exist!' });
        }
        return Responses._200({ room });
    } catch (error) {
        return Responses._400({ message: 'Failed to get room or room does not exist!' });

    }
 

 
};
