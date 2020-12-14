import React, { useState } from 'react';
import { useEffect } from 'react';

const Question = (props) =>
{
    return (
        <div></div>
    );
}


function MyQuestions(props)
{
    const identity = useIdentityContext()

    const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "No Name"

    const [userQuestions, setUserQuestions] = useState([])

    useEffect(() =>
    {
        const { data } = await axios.get('/api/get-questions-by-user', { params: { name: name } });
        console.log(data)
        setUserQuestions(data);
    }, [])
    return (
        <Layout>
            {/* {userQuestions.length > 0 && 
                userQuestions.map(question => (
                    <Question key={question._id} question={ question}/>
            ))} */}
        </Layout>
    );
}

export default MyQuestions;