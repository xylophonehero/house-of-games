const query = require("./utils/query");

const UPDATE_QUESTION = `
    mutation($id: ID!, $picture_clue_url: String!, $text_clue: String!, $answer: String!){
        updateQuestion(id: $id, data: {picture_clue_url: $picture_clue_url, text_clue: $text_clue, answer: $answer}){
            _id
            picture_clue_url
            text_clue
            answer
        }
    }
`;

exports.handler = async event =>
{
    const { id, picture_clue_url, text_clue, answer } = JSON.parse(event.body);
    const { data, errors } = await query(
        UPDATE_QUESTION, {
        id, picture_clue_url, text_clue, answer
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
        body: JSON.stringify({ updatedQuestion: data.updateQuestion })
    }
}