import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import IdentityModal from 'react-netlify-identity-widget'
import styled from 'styled-components'
import 'react-netlify-identity-widget/styles.css'
import "@reach/tabs/styles.css"
import { Button } from 'react-bootstrap'

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: auto auto auto;
`

const LogOutButton = styled(Button)`
  /* width: 200px;
  border: 2px solid yellow; */
`

const Header = (props) =>
{
  const [dialog, setDialog] = React.useState(false)
  return (
    <header
      style={{
        background: `lightblue`,
        marginBottom: `1.45rem`,
      }}
    >
      <HeaderContainer
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `black`,
              textDecoration: `none`,
            }}
          >
            {props.siteTitle}
          </Link>
        </h1>
        <h3>
          <Link to="/myQuestions">{props.isLoggedIn && `Hello ${props.username}`}</Link>
        </h3>
        <LogOutButton className="btn" onClick={() => setDialog(true)}>
          {props.isLoggedIn ? "LOG OUT" : "LOG IN"}
        </LogOutButton>

      </HeaderContainer>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
