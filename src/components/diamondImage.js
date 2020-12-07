import React from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';


const ImageClue = styled(Image)`
    height: 98%; 
    width: 98%;
    margin: 1%;
    object-fit: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`

const ImageBox = styled.div`
    border: 2px yellow solid;
    background-color: yellow;
    height: 400px;
    width: 400px;
    margin: 1em auto;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`

function DiamondImage(props)
{
    return (
        <ImageBox>
            <ImageClue style={{}} src={props.pictureUrl} alt="picture clue" fluid />
        </ImageBox>
    );
}

export default DiamondImage;