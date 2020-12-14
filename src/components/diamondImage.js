import React from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
// import { animated, useSpring } from 'react-spring';



const ImageClue = styled(Image)`
    height: 98%; 
    width: 98%;
    margin: 1%;
    object-fit: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`

const ImageBox = styled.div`
    border: 2px lightblue solid;
    background-color: lightblue;
    /* height: 400px;
    width: 400px; */
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    margin: 1em auto;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`

const DiamondImage = (props) =>
{
    // const rotateIn = useSpring({
    //     to: { transform: 'rotate(0deg) scale(1)' },
    //     from: { transform: 'rotate(-45deg) scale(0.1)' },
    //     config: { duration: 1000 },
    //     reset: props.reset
    // })

    return (

        <ImageBox size={props.size}>
            <ImageClue src={props.pictureUrl} alt="picture clue" fluid />
        </ImageBox>

    );
}

export default DiamondImage;