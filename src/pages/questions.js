
import React, { useEffect, useState } from 'react';
// import Img from 'gatsby-image'
import Layout from '../components/layout';
import styled from 'styled-components';
import axios from 'axios';
import DiamondImage from '../components/diamondImage';
// import Ratings from 'react-ratings-declarative';
import { Button } from 'react-bootstrap';

const InputBox = styled.input`
    border: 2px yellow solid;
    padding: 1em;
    color: white;
    margin: 1em;
    text-align: center;
    background-color: red;
    outline: none;
    width: 100%;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.38316rem;
    line-height: 1.1;
`

const TextBox = styled.div`
    border: 2px yellow solid;
    padding: 1em;
    color: white;
    margin: 1em;
    text-align: center;
`

const QuestionText = styled.h3`
    margin: 0;
`

const AnswerText = styled.h3`
    margin:0;
    text-transform: uppercase;
`


function Questions(props)
{

    const [showAnswer, setShowAnswer] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [questions, setQuestions] = useState([]);
    // const [rating, setRating] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    useEffect(() =>
    {
        const getQuestions = async () =>
        {
            const result = await axios("/api/get-questions");
            setQuestions(result.data.questions);
            setLoaded(true);
        }
        getQuestions();

    }, [loaded])


    // const submitRating = async event =>
    // {
    //     setRating(event)
    //     //     const result = await axios.post('/api/submit-rating',
    //     //         JSON.stringify({
    //     //             question: questions[questionIndex],
    //     //             user: "",
    //     //             rating: rating
    //     //         })
    //     //     )
    //     //     console.log(result)
    // }
    const handleGuess = () =>
    {
        if (userAnswer.toUpperCase() === questions[questionIndex].answer.toUpperCase())
            setShowAnswer(true)
        else
            console.log("wrong")
        //trigger box shake
    }

    const nextQuestion = () =>
    {
        setShowAnswer(false)
        // setRating(0)
        setQuestionIndex(questionIndex + 1)
    }

    return (
        <Layout>
            {questions.length > 0 &&
                <>
                    <DiamondImage pictureUrl={questions[questionIndex].picture_clue_url} />
                    <TextBox>
                        <QuestionText>{questions[questionIndex].text_clue}</QuestionText>
                    </TextBox>

                    <InputBox value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
                    {/* <TextBox>
                        <AnswerText>{userAnswer === "" ? "Type your answer here" : userAnswer}</AnswerText>
                    </TextBox> */}
                    {
                        showAnswer ?
                            <>
                                <TextBox>
                                    <AnswerText>{questions[questionIndex].answer}</AnswerText>
                                </TextBox>
                                <Button onClick={() => nextQuestion()}>
                                    Next Question
                            </Button>
                                {/* <Ratings
                                    rating={rating}
                                    widgetRatedColors="yellow"
                                    widgetHoverColors="green"
                                    changeRating={submitRating}
                                >
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                </Ratings> */}
                            </> :
                            <>
                                <Button onClick={handleGuess}>Submit</Button>
                                <Button onClick={() => setShowAnswer(true)}>Give Up</Button>
                            </>
                    }

                </>
            }
        </Layout>

    );
}

export default Questions;