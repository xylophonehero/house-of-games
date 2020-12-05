const query = require("./utils/query")

const GET_QUESTIONS = `
    query{
        allQuestions{
            data{
                _id
                picture_clue_url
                text_clue
                answer
            }
        }
    }
`;

exports.handler = async () =>
{
    const { data, errors } = await query(GET_QUESTIONS);

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ questions: data.allQuestions.data })
    }
}