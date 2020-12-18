const formattedResponse = require("./utils/formatted-response");
const query = require("./utils/query")

const CREATE_COLLECTION = `
  mutation($name: String!, $userID:ID!){
    createCollection(data:{
      name: $name,
      owner: {connect: $userID}
    }){
      _id
      name
      owner{
        _id
        name
      }
    }
  }
`;

exports.handler = async event =>
{
  const { name, userID } = JSON.parse(event.body)

  const { data, errors } = await query(
    CREATE_COLLECTION, { name, userID }
  )

  if (errors)
  {

    console.log(errors)
    return formattedResponse(500, { err: 'Something went wrong' })
  }
  return formattedResponse(200, data.createCollection)
}