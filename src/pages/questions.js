
import React, { useEffect, useState } from 'react';
// import Img from 'gatsby-image'
import Layout from '../components/layout';
import styled from 'styled-components';
import axios from 'axios';
import DiamondImage from '../components/diamondImage';
// import Ratings from 'react-ratings-declarative';
import { Button } from 'react-bootstrap';

import { useSpring, animated } from 'react-spring'

const InputBox = styled(animated.input)`
    /* border: 2px yellow solid; */
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    /* padding: 1em; */
    color: white;
    /* margin: 18px; */
    text-align: center;
    /* background-color: red; */
    outline: none;
    width: 100%;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.38316rem;
    line-height: 1.1;
    border: none;
    background-color: rgba(0,0,0,0);
`


const TextBox = styled(animated.div)`
    border: 2px yellow solid;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 1em;
    color: white;
    margin: 1em;
    text-align: center;
`

const QuestionText = styled(animated.h3)`
    margin: 0;
    opacity: 0;
    transform: rotateX(90deg);
`

const AnswerText = styled(animated.h3)`
    margin:0;
    text-transform: uppercase;
    opacity: 0;
`


function Questions({ location })
{
    const [shake, triggerShake] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [questions, setQuestions] = useState([]);
    // const [rating, setRating] = useState(0)
    const [userAnswer, setUserAnswer] = useState("");
    const [resetAnimations, setResetAnimations] = useState(true);
    const [displayText, setDisplayText] = useState(false);

    const [maxImageSize, setMaxImageSize] = useState(400);
    const [error, setError] = useState("")


    const getQuestions = async () =>
    {

        const result = await axios(`/api/get-${location.state.public ? 'public-' : ''}questions`);
        if (result.status === 200)
        {
            const questions = result.data.reverse();
            setQuestions(questions);
            setResetAnimations(true);
            setLoaded(true);
            const input = document.querySelector("input")
            input !== null && input.focus()
        } else
        {
            setError(result.statusText)
        }


    }
    useEffect(() =>
    {
        setMaxImageSize(Math.min(window.innerWidth * 0.9, 400))
        getQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() =>
    {
        const input = document.querySelector("input")
        input !== null && input.focus()

        // questionIndex !== 0 &&
        //     setResetAnimations(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionIndex])


    const { x } = useSpring({
        from: { x: 0 },
        x: shake ? 1 : 0,
        config: { duration: 1000 }
    })

    const rotateIn = useSpring({
        transform: 'rotate(0deg) scale(1)',
        from: { transform: 'rotate(-45deg) scale(0.1)' },
        config: { duration: 1000 },
        reset: resetAnimations,
        onStart: () => { setResetAnimations(false) }
    })

    const scaleX = useSpring({
        transform: 'scaleX(1)',
        from: { transform: 'scaleX(0.1)' },
        config: { duration: 500 },
        reset: resetAnimations,
        onRest: () => { setDisplayText(true) }
    })
    const scaleXAnswer = useSpring({ transform: showAnswer ? 'scaleX(1)' : 'scaleX(0.1)', config: { duration: 500 } })
    // const opacityWithDelay = useSpring({
    //     transform: 'rotateX(0deg)', opacity: 1,
    //     from: { transform: 'rotateX(90deg)', opacity: 0 },
    //     config: { duration: 500 },
    //     delay: 500,
    //     reset: resetAnimations
    // })
    const opacityWithDelay = useSpring({ transform: displayText ? 'rotateX(0deg)' : 'rotateX(90deg)', opacity: 1, config: { duration: 500 } })
    const opacityWithDelayAnswer = useSpring({ transform: showAnswer ? 'rotateX(0deg)' : 'rotateX(90deg)', opacity: 1, delay: 500, config: { duration: 500 } })

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
    const handleGuess = e =>
    {
        e.preventDefault()
        if (userAnswer.toUpperCase() === questions[questionIndex].answer.toUpperCase())
            setShowAnswer(true)
        else
        {
            triggerShake(!shake);
            const input = document.querySelector("input")
            input !== null && input.focus()
        }


    }

    const nextQuestion = () =>
    {
        setShowAnswer(false)

        setUserAnswer("")
        if (questionIndex + 1 === questions.length)
        {
            setLoaded(false)
            getQuestions()
            setQuestionIndex(0)
            setLoaded(true)

        } else
            setQuestionIndex(questionIndex + 1)
        setResetAnimations(true)
    }

    return (
        <Layout>{error !== "" ? <p>Error: {error}</p> :
            <>
                { loaded && questions.length > 0 &&

                    <>
                        <animated.div style={rotateIn}>
                            <DiamondImage size={maxImageSize} pictureUrl={questions[questionIndex].picture_clue_url} reset={resetAnimations} />
                        </animated.div>
                        <TextBox style={scaleX}>
                            <QuestionText style={opacityWithDelay}>{questions[questionIndex].text_clue}</QuestionText>
                        </TextBox>

                        <form onSubmit={handleGuess}>
                            <TextBox
                                style={{
                                    transform: x
                                        .interpolate({
                                            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                            output: [0, 40, -40, 40, -40, 40, -40, 0]
                                        })
                                        .interpolate(x => `translate3d(${x}px, 0px, 0px)`)
                                }}>

                                <InputBox
                                    value={userAnswer}
                                    onChange={e => setUserAnswer(e.target.value)}
                                    maxLength='30'
                                    disabled={showAnswer}
                                />
                            </TextBox>
                            {!showAnswer && <>
                                <Button type="submit" >Submit</Button>
                                <Button style={{ float: 'right' }} onClick={() => setShowAnswer(true)}>Give Up</Button>
                            </>
                            }
                        </form>
                        {
                            showAnswer ?
                                <>
                                    <TextBox style={scaleXAnswer}>
                                        <AnswerText style={opacityWithDelayAnswer}>{questions[questionIndex].answer}</AnswerText>
                                    </TextBox>
                                    <Button onClick={() => nextQuestion()}>
                                        Next Question
                                </Button>
                                    <div style={{ float: 'right' }}>Created by {questions[questionIndex].author.name}</div>
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


                                </>
                        }

                    </>
                }
            </>
        }
        </Layout >

    );
}

export default Questions;