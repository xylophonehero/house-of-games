const query = require("./utils/query")

const GET_QUESTIONS_BY_USER = `
    query($name: !String){
        createdQuestions{
            data{
                _id
                picture_clue_url
                text_clue
                answer
            }
        }
    }
`;

exports.handler = async event => x
{
    const { name } = JSON.parse(event.body);

    const { data, errors } = await query(GET_QUESTIONS_BY_USER, { name });

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ questions: data.getUserByName.createdQuestions.data })
    }
}