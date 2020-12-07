const query = require("./utils/query");

const GET_USER_ID_BY_NAME = `
    query($name: String!){
        getUserByName(name: $name){
            _id
        }
    }
`;

exports.handler = async event =>
{
    const name = event.body
    const { data, errors } = await query(GET_USER_ID_BY_NAME, name);

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ user: data.getUserByName._id })
    }
}