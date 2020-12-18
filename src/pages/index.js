import React from "react"
import { Link } from "gatsby"
import { Button } from 'react-bootstrap'
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'



const StartButton = styled(Button)`
  /* height: auto;
  width: 50vw;
  margin: 1em auto;
  padding: 1em;
  color: black;
  background-color: lightblue;
  font-size: 3em;
  border: 2px solid yellow;
  text-align: center; */
  margin: 2rem;
`

const LinkNoUnderline = styled(Link)`
  text-decoration: none;
`

const IndexPage = () =>
{


  return (

    <Layout>
      <SEO title="Home" />
      <h1>Answer Smash</h1>

      <LinkNoUnderline to='/questions' state={{ public: false }}>
        <StartButton>
          Answer all questions
        </StartButton>
      </LinkNoUnderline>

      <LinkNoUnderline to='/questions' state={{ public: true }}>
        <StartButton>
          Answer public questions
        </StartButton>
      </LinkNoUnderline>

      <LinkNoUnderline to='/myQuestions'>

        <StartButton>My Questions</StartButton>

      </LinkNoUnderline>
    </Layout >

  )
}
export default IndexPage
