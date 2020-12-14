const query = require("./utils/query")

const GET_QUESTIONS_BY_USER = `
    query($name: String!, $cursor: String){
        getUserByName(name: $name){
            createdQuestions(_size: 2, _cursor: $cursor){
                data{
                    _id
                    picture_clue_url
                    text_clue
                    answer
                }
                before
                after
            }
        }
    }
`;

exports.handler = async event =>
{
    const { name, cursor } = event.queryStringParameters;

    const { data, errors } = await query(GET_QUESTIONS_BY_USER, { name, cursor });

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ questions: data.getUserByName.createdQuestions })
    }
}