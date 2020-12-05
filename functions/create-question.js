const query = require("./utils/query")

const CREATE_QUESTION = `
    mutation($picture_clue_url: String!, $text_clue: String!, $answer: String!){
        createQuestion(data: {picture_clue_url: $picture_clue_url, text_clue: $text_clue, answer: $answer}){
            _id
            picture_clue_url
            text_clue
            answer
        }
    }
`;

exports.handler = async event =>
{
    const { picture_clue_url, text_clue, answer } = JSON.parse(event.body);
    const { data, errors } = await query(
        CREATE_QUESTION, {
        picture_clue_url, text_clue, answer
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
        body: JSON.stringify({ question: data.createQuestion })
    }
}