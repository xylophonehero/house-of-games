import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useIdentityContext } from 'react-netlify-identity-widget';
import Layout from '../components/layout'
import { Link } from 'gatsby';
import { Button, Form, Spinner, ButtonGroup } from 'react-bootstrap';
import DiamondImage from '../components/diamondImage';
import styled from 'styled-components';
import { useAlert } from 'react-alert';


const QuestionCard = styled.div`
    /* display: grid;
    grid-template-columns: 160px 300px 100px; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    
    background-color: white;
    margin: 1rem;
    padding: 1rem;
`
const EmojiButton = styled(Button)`
    margin: 0.5rem;
`



const Question = (props) =>
{
    const [editMode, setEditMode] = useState(false)
    const [deleteConfirm, showDeleteConfirm] = useState(false)
    const alert = useAlert()

    const updateQuestion = async event =>
    {
        event.preventDefault()
        const formDetails = event.target
        const formData = new FormData(formDetails),
            formDataObj = Object.fromEntries(formData.entries())

        const response = await axios.post('/api/update-question', JSON.stringify({
            id: props.question._id,
            picture_clue_url: props.question.picture_clue_url,
            text_clue: formDataObj.textclue,
            answer: formDataObj.answer,
        }))
        setEditMode(false)
        response.status === 200 && alert.success('Question updated successfully')
        response.status === 500 && alert.error("Failed to update question")
    }
    const deleteQuestion = async () =>
    {
        const response = await axios.post('/api/delete-question', JSON.stringify({ id: props.question._id }))
        //TODO show delete animation
        response.status === 200 && alert.success("Question deleted successfully")
        response.status === 500 && alert.error("Failed to delete question")
    }

    return (
        <QuestionCard>
            <DiamondImage size={150} pictureUrl={props.question.picture_clue_url} />
            {editMode ?
                <Form onSubmit={updateQuestion} style={{ flexGrow: 2 }}>
                    <Form.Group>
                        <Form.Label><b>Clue:</b></Form.Label>
                        <Form.Control name='textclue' as='textarea' defaultValue={props.question.text_clue} rows={2} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Answer:</b></Form.Label>
                        <Form.Control name='answer' type='text' defaultValue={props.question.answer} rows={2} />
                    </Form.Group>
                    <ButtonGroup>
                        <Button type='submit'>Submit</Button>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </ButtonGroup>
                </Form>
                :
                <div style={{ flexGrow: 2, maxWidth: '400px', padding: '1rem' }}>
                    <p><b>Clue: </b>{props.question.text_clue}</p>
                    <p style={{ textTransform: 'capitalize' }}><b>Answer: </b>{props.question.answer}</p>
                </div>
            }

            <div style={{ alignSelf: 'center', flexShrink: 3 }}>
                {/* <button><LinkNoUnderline to="/createQuestion" state={{ update: true, picture_clue_url: props.question.picture_clue_url, text_clue: props.question.text_clue, answer: props.question.answer }}>&#x270F;</LinkNoUnderline></button> */}
                <EmojiButton onClick={() => setEditMode(!editMode)}>&#x270F;</EmojiButton>
                <EmojiButton onClick={() => showDeleteConfirm(!deleteConfirm)}>&#x1F5D1;</EmojiButton>
                {//TODO add delete low opacity overlay instead
                    deleteConfirm && <div>
                        Are you sure?
                    <Button variant='success' onClick={deleteQuestion}>Yes</Button>
                        <Button variant='danger' onClick={() => showDeleteConfirm(false)}>No</Button>
                    </div>}
            </div>
        </QuestionCard>
    );
}


function MyQuestions(props)
{
    const identity = useIdentityContext()

    const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "No Name"

    const [userQuestions, setUserQuestions] = useState([])
    const [userCollections, setUserCollections] = useState([])
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("")

    const getQuestions = async cursor =>
    {

        const response = await axios.get('/api/get-questions-by-user', { params: { name: name, cursor: cursor } });
        console.log(response)

        if (response.status === 200)
        {
            setUserQuestions(response.data.createdQuestions.data);
            setUserCollections(response.data.ownedCollections.data);
            setLoaded(true);
        }
        else setError(response.statusText)
    }



    useEffect(() =>
    {
        getQuestions(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Layout>
            <h1>My questions</h1>
            <Link to="/createQuestion" state={{ update: false }}>
                <Button >Create a new question</Button>
            </Link>

            {loaded && userQuestions.length > 0 ?
                <>
                    {userCollections.map(collection => (
                        <p key={collection._id}>{collection.name}</p>
                    ))}
                    {userQuestions.map(question => (
                        <Question key={question._id} question={question} />
                    ))}
                    {userQuestions.before && <Button onClick={() => getQuestions(userQuestions.before)}>&larr;</Button>}
                    {userQuestions.after && <Button style={{ float: 'right' }} onClick={() => getQuestions(userQuestions.after)}>&rarr;</Button>}
                </>
                : <div style={{ margin: '1rem' }}>{error === "" ?
                    <Spinner animation="border" /> :
                    <p>Failed to fetch questions : {error}</p>
                }</div>}

        </Layout>
    );
}

export default MyQuestions;