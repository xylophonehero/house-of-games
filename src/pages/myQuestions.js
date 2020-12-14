import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useIdentityContext } from 'react-netlify-identity-widget';
import Layout from '../components/layout'
import { Link } from 'gatsby';
import { Button } from 'react-bootstrap';

const Question = (props) =>
{
    return (
        <div>

        </div>
    );
}


function MyQuestions(props)
{
    const identity = useIdentityContext()

    const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "No Name"

    const [userQuestions, setUserQuestions] = useState([])

    useEffect(() =>
    {
        const getQuestions = async () =>
        {
            const { data } = await axios.get('/api/get-questions-by-user', { params: { name: name } });
            console.log(data)
            setUserQuestions(data);
        }
        getQuestions();
    }, [name])
    return (
        <Layout>
            {userQuestions.length > 0 &&
                userQuestions.map(question => (
                    <Question key={question._id} question={question} />
                ))}
            <Link to="/createQuestion">
                <Button>Create a new question</Button>
            </Link>
        </Layout>
    );
}

export default MyQuestions;