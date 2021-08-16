const uuid = require('uuid').v4;
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

exports.handler = async event => {
    console.log('message event', event);
    const data = JSON.parse(event.body);
    const {
        roomId,
        text,
        from
    } = Object(data);

    if (!roomId || !text || !from) {
        return Responses._400({
            message: 'Missing params!'
        });
    }
    const params = {
        TableName: 'Messages',
        Item: {
            messageId: uuid(),
            roomId,
            from,
            createdAt: new Date().getTime(),
        },
    };
    try {
        const newMessage = await Dynamo.put(params).promise();

        if (!newMessage) {
            return Responses._400({
                message: 'Failed to save message'
            });
        }
        return Responses._200({
            newMessage:params.Item
        });
    } catch (error) {
        return Responses._400({
            message: 'Failed to save message'
        });
    }
   
};