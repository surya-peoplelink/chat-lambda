const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

exports.handler = async event => {
    console.log('user event', event);
    const {
        userId
    } = event.pathParameters;
    if (!userId) {
        return Responses._400({
            message: 'Missing params!'
        });
    }
    const params = {
        TableName: 'Users',
        Key: {
            userId
        }
    };
    try {
        const user = await Dynamo.get(params).promise();
        if (!user) {
            return Responses._400({
                message: 'Failed to get user or user does not exist!'
            });
        }
        return Responses._200({
            user
        });
    } catch (error) {
        console.log("error", error)
        return Responses._400({
            message: 'Error occurred try again later!'
        });
    }



};