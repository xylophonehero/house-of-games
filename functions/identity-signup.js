const query = require("./utils/query")

const CREATE_USER = `
        mutation($name: String!, $email: String!){
            createUser(data:{name: $name, email: $email}){
                _id
                name
                email
            }
        }
`;

exports.handler = async event =>
{
    const payload = JSON.parse(event.body);
    const { user_metadata, email } = payload.user;
    const name = user_metadata.full_name;

    const { data, errors } = await query(
        CREATE_USER, {
        name, email
    });

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ user: data.createUser })
    }
}
