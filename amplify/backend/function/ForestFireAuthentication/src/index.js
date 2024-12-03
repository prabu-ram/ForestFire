/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // Extract userID from path parameters
    const userID = event.pathParameters.userID;

    // Define the parameters to get user data from DynamoDB
    const params = {
        TableName: 'Users', // Replace with your DynamoDB table name
        Key: {
            username: userID
        }
    };

    try {
        // Fetch the user from DynamoDB
        const data = await dynamoDB.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        // Extract the name and role from the DynamoDB data
        const { name, role } = data.Item;

        // Respond with user details
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'User authenticated successfully',
                name: name,
                role: role
            }),
        };
    } catch (error) {
        console.error('Error fetching user: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
