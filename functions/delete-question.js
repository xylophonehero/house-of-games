const query = require("./utils/query")

const DELETE_QUESTION = `
    mutation($id: ID!){
        deleteQuestion(id: $id){
            _id
        }
    }
`;

exports.handler = async event =>
{
    const { id } = JSON.parse(event.body);
    const { data, errors } = await query(
        DELETE_QUESTION, { id }
    )

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ deletedQuestion: data.deleteQuestion })
    }
}