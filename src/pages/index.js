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
`

const LinkNoUnderline = styled(Link)`
  text-decoration: none;
`

const IndexPage = () =>
{


  return (

    <Layout>
      <SEO title="Home" />
      <LinkNoUnderline to='/questions'>
        <StartButton>
          Start
        </StartButton>
      </LinkNoUnderline>
    </Layout >

  )
}
export default IndexPage
