const formattedResponse = require("./utils/formatted-response");
const query = require("./utils/query")

const GET_QUESTIONS_BY_USER = `
    query($name: String!, $cursor: String){
        getUserByName(name: $name){
            createdQuestions(_size: 10, _cursor: $cursor){
                data{
                    _id
                    picture_clue_url
                    text_clue
                    answer
                }
                before
                after
            }
            ownedCollections{
                data{
                    _id
                    name
                }
            }
        }
    }
`;

exports.handler = async event =>
{
    const { name, cursor } = event.queryStringParameters;
    try
    {
        const res = await query(GET_QUESTIONS_BY_USER, { name, cursor });
        const data = res.data.getUserByName
        return formattedResponse(200, data)
    } catch (err)
    {
        console.log(err)
        return formattedResponse(500, { err: "something went wrong" })
    }
}