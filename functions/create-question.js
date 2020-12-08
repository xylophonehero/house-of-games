const query = require("./utils/query")

const CREATE_QUESTION = `
    mutation($picture_clue_url: String!, $text_clue: String!, $answer: String!, $userID: ID!){
        createQuestion(data: {
            picture_clue_url: $picture_clue_url, 
            text_clue: $text_clue, 
            answer: $answer
            author: {connect: $userID}
        }){
            _id
            picture_clue_url
            text_clue
            answer
        }
    }
`;

exports.handler = async event =>
{
    console.log(event.body)
    const { picture_clue_url, text_clue, answer, userID } = JSON.parse(event.body);

    const { data, errors } = await query(
        CREATE_QUESTION, {
        picture_clue_url, text_clue, answer, userID
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