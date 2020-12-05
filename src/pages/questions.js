
import React, { useEffect, useState } from 'react';
// import Img from 'gatsby-image'
import Layout from '../components/layout';
import styled from 'styled-components';
import axios from 'axios';


const ImageBox = styled.div`
    border: 2px yellow solid;
    height: auto;
    width: auto;
    margin: 1em;
`

const TextBox = styled.div`
    border: 2px yellow solid;
    padding: 1em;
    color: white;
    margin: 1em;
    text-align: center;
`


function Questions(props)
{

    const [showAnswer, setShowAnswer] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [questions, setQuestions] = useState([]);
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

    const nextQuestion = () =>
    {
        setShowAnswer(false)
        setQuestionIndex(questionIndex + 1)
    }

    return (
        <Layout>
            {questions.length > 0 &&
                <>
                    <ImageBox>
                        <img src={questions[questionIndex].picture_clue_url} />
                    </ImageBox>
                    <TextBox>
                        <h3>{questions[questionIndex].text_clue}</h3>
                    </TextBox>
                    {showAnswer ?
                        <TextBox>
                            <h3>{questions[questionIndex].answer}</h3>
                        </TextBox> :
                        <button onClick={() => setShowAnswer(true)}>Show Answer</button>
                    }
                    {
                        showAnswer && <button onClick={() => nextQuestion()}>
                            Next Question
                    </button>
                    }

                </>
            }

            {false > 0 &&
                <>
                    <ImageBox>
                        {/* <Img fixed={questionData[questionIndex].node.clue_one.childImageSharp.fixed} alt="" /> */}
                    </ImageBox>
                    <TextBox>
                        <h3>{questions[0].text_clue}</h3>
                    </TextBox>


                    <button onClick={setQuestionIndex(questionIndex + 1)}>
                        Next Question
                    </button>
                </>
            }
        </Layout>

    );
}

export default Questions;