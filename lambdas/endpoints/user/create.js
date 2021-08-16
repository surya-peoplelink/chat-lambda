const uuid = require('uuid').v4;
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

exports.handler = async event => {
    console.log('user event', event);
    const data = JSON.parse(event.body);
    const {
        userName
    } = Object(data);
    if (!userName) {
        return Responses._400({
            message: 'Missing params!'
        });
    }
    const userId=uuid();
    const params = {
        TableName: 'Users',
        Item: {
            userId,
            userName,
            createdAt: new Date().getTime(),
        },
    };
    try {
        const newUser = await Dynamo.put(params).promise();
        if (!newUser) {
            return Responses._400({
                message: 'Failed to save user'
            });
        }
        return Responses._200({
            userId,
            userName
        });
    } catch (error) {
        console.log("error", error);
        return Responses._400({
            message: 'Failed to save user'
        });

    }




};