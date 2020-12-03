import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

function initNetlifyIdentity()
{
  const script = document.createElement("script");
  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  script.async = true;

  document.body.appendChild(script);
}


function openNetlifyModal()
{
  const netlifyIdentity = window.netlifyIdentity;

  if (netlifyIdentity)
    netlifyIdentity.open();
  else
    console.log("NetlifyIdentity not defined")
}

const IndexPage = () =>
{
  useEffect(() =>
  {

    initNetlifyIdentity();

  }, [])



  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <div onClick={() => { openNetlifyModal() }}>
        Login
    </div>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout >
  )
}
export default IndexPage
