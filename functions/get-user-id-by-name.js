const query = require("./utils/query");
const formattedResponse = require('./utils/formatted-response')

const GET_USER_ID_BY_NAME = `
    query($name: String!){
        getUserByName(name: $name){
            _id
        }
    }
`;

exports.handler = async event =>
{

    const { name } = event.queryStringParameters

    try
    {
        const res = await query(GET_USER_ID_BY_NAME, { name });
        const id = res.data.getUserByName._id
        return formattedResponse(200, id)
    } catch (err)
    {
        console.log(err)
        return (500, { err: 'Something went wrong' })
    }
}