const formattedResponse = require("./utils/formatted-response");
const query = require("./utils/query")

const GET_QUESTIONS = `
    query{
        allQuestions{
            data{
                _id
                picture_clue_url
                text_clue
                answer
                author{
                    name
                }
            }
        }
    }
`;

exports.handler = async () =>
{
    try
    {
        const res = await query(GET_QUESTIONS);
        const data = res.data.allQuestions.data
        return formattedResponse(200, data)
    } catch (err)
    {
        console.log(err)
        return formattedResponse(500, { err: 'something went wrong' })
    }
}