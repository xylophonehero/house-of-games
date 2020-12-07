import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import Layout from '../components/layout';
import DiamondImage from '../components/diamondImage';
import { useIdentityContext } from 'react-netlify-identity-widget';

const identity = useIdentityContext()

const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "No Name"
// console.log(JSON.stringify(identity))
const isLoggedIn = identity && identity.isLoggedIn

function CreateQuestion(props)
{
    const [message, setMessage] = useState("");
    const [formPictureUrl, setFormPictureUrl] = useState("");

    const handleSubmit = async event =>
    {

        event.preventDefault()
        if (!isLoggedIn)
        {
            setMessage("Please log in to submit a question")
            return;
        }
        const userID = await axios('/api/get-user-id-by-name', name)
        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())

        const result = await axios.post('/api/create-question',
            JSON.stringify({
                picture_clue_url: formDataObj.url,
                text_clue: formDataObj.textclue,
                answer: formDataObj.answer,
                author: { connect: userID.body }
            }))
        result.status === 200 && setMessage("Success")
        result.status === 500 && setMessage("Failed to create question. Please try again")
    }

    return (
        <Layout>
            <h1>Create a Question</h1>
            {message !== "" ? <h3>{message}</h3> :

                <Container>
                    <DiamondImage pictureUrl={formPictureUrl} />
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlID="formPictureUrl">
                            <Form.Label>Picture Clue Url</Form.Label>
                            <Form.Control required name='url' type='text' placeholder='Url' value={formPictureUrl} onChange={e => setFormPictureUrl(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlID="formTextClue">
                            <Form.Label>Text Clue</Form.Label>
                            <Form.Control required name='textclue' type='text' placeholder='Text Clue' />
                        </Form.Group>
                        <Form.Group controlID="formAnswer">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control name='answer' type='text' placeholder='Answer' />
                        </Form.Group>
                        <Button type='submit'>
                            Submit
                    </Button>
                    </Form>
                </Container>
            }
        </Layout>
    );
}

export default CreateQuestion;