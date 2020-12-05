import React from 'react';

const footer = () =>
{
    return (
        <footer style={{
            marginTop: `2rem`,
            position: 'sticky',
            textAlign: "center"
        }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
    );
};

export default footer;