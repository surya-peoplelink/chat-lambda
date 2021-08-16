const uuid=require('uuid').v4;
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

exports.handler = async event => {
    console.log('room event', event);
    const data = JSON.parse(event.body);
    const {
        users
    } = Object(data);
    if(!users) {
        return Responses._400({ message: 'Missing params!' });
    }
    const params = {
        TableName: 'Rooms',
        Item: {
            roomId: uuid(),
            users,
            createdAt: new Date().getTime(),
        },
    };
    try {
        const room = await Dynamo.put(params).promise();
        if (!room) {
            return Responses._400({ message: 'Failed to create room' });
        }
        return Responses._200({ room:params.Item });
    } catch (error) {
        console.log("error",error);
        return Responses._400({ message: 'Failed to create room try again later' });
    }
  

  

  
};
