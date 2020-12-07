const query = require("./utils/query")

const CREATE_RATING = `
    mutation($question: question!, $user: user!, $rating: int!){
        createRating(data:{question: $question, user: $user, rating: $rating}){
            _id
        }
    }
`

exports.handler = async event =>
{
    const { question, user, rating } = JSON.parse(event.body);

    const { data, errors } = await query(
        CREATE_RATING, { question, user, rating }
    );

    if (errors)
    {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ rating: data.createRating })
    }
}