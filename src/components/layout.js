/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useIdentityContext } from 'react-netlify-identity-widget'
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS
import styled from 'styled-components'

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Layout = ({ children }) =>
{
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const identity = useIdentityContext()

  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "No Name"
  // console.log(JSON.stringify(identity))
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <Site>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} username={name} isLoggedIn={isLoggedIn} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          flexGrow: 1,
        }}
      >
        <main>{children}</main>

      </div>
      <Footer />
    </Site>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
