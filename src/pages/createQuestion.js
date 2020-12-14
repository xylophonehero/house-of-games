import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import Layout from '../components/layout';
// import DiamondImage from '../components/diamondImage';
import { useIdentityContext } from 'react-netlify-identity-widget';
// import CropImage from '../components/cropImage';
import styled from 'styled-components';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageBox = styled.div`
    border: 2px lightblue solid;
    background-color: lightblue;
    height: 400px;
    width: 400px;
    margin: 1em auto;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`

// Increase pixel density for crop preview quality on retina screens.
// const pixelRatio = window.devicePixelRatio || 1;



function CreateQuestion({ location })
{
    //handle create question
    const [message, setMessage] = useState("");
    const [formPictureUrl, setFormPictureUrl] = useState(location.state.update ? location.state.picture_clue_url : "");
    const [progressBarAmount, setProgressBarAmount] = useState(0);


    const identity = useIdentityContext()

    const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "No Name"
    // console.log(JSON.stringify(identity))
    const isLoggedIn = identity && identity.isLoggedIn

    // useEffect(() =>
    // {
    //     console.log(location.state.answer)
    // }, [])

    const blobToDataURL = () => 
    {
        return new Promise(resolve =>
        {
            previewCanvasRef.current.toBlob(
                (blob) =>
                {
                    const reader = new FileReader()
                    reader.readAsDataURL(blob)

                    reader.onloadend = () =>
                    {
                        var dataUrl = reader.result
                        resolve(dataUrl)
                    }

                },
                // "image/png",
                // 1
            )
        })

    }

    const handleSubmit = async event =>
    {

        event.preventDefault()

        const formDetails = event.target

        if (!isLoggedIn)
        {
            setMessage("Please log in to submit a question")
            return;
        }
        setProgressBarAmount(20);


        blobToDataURL().then(async res =>
        {
            setProgressBarAmount(40);
            // return
            const imageData = new FormData()
            imageData.append("file", res)
            // imageData.append("api_key", "329431595111935")
            imageData.append("upload_preset", "reqvuixm")
            // imageData.append("timestamp", (Date.now() / 1000) | 0)

            const response = await axios.post("https://api.cloudinary.com/v1_1/db7psaqjv/upload", imageData)
            setProgressBarAmount(60);

            const imageUrl = response.data.secure_url

            const formData = new FormData(formDetails),
                formDataObj = Object.fromEntries(formData.entries())

            const { data } = await axios.get('/api/get-user-id-by-name', { params: { name: name } })
            setProgressBarAmount(80);
            const result = await axios.post('/api/create-question',
                JSON.stringify({
                    picture_clue_url: imageUrl,
                    text_clue: formDataObj.textclue,
                    answer: formDataObj.answer,
                    userID: data.user
                }))
            result.status === 200 && setMessage("Success")
            result.status === 500 && setMessage("Failed to create question. Please try again")
        })


    }

    //handle crop
    const [upImg, setUpImg] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 / 1 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onSelectFile = (e) =>
    {
        if (e.target.files && e.target.files.length > 0)
        {
            const reader = new FileReader();
            reader.addEventListener("load", () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) =>
    {
        imgRef.current = img;
    }, []);

    useEffect(() =>
    {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current)
        {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        // canvas.width = crop.width * pixelRatio;
        // canvas.height = crop.height * pixelRatio;
        canvas.width = crop.width;
        canvas.height = crop.height;

        // ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <Layout>

            <h1>{location.state.update ? "Update" : "Create"} a Question</h1>
            {message !== "" ? <h3>{message}</h3> :

                <Container>
                    {/* <img src={formPictureUrl} /> */}
                    <ReactCrop
                        src={upImg === null ? `https://cors-anywhere.herokuapp.com/${formPictureUrl}` : upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        crossorigin="Anonymous"

                    // style={{ width: 400, height: 400 }}
                    />
                    <ImageBox>
                        <canvas
                            ref={previewCanvasRef}
                            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                            style={{
                                margin: "1%",
                                width: "98%",
                                height: "98%",
                                // width: Math.round(completedCrop?.width ?? 0),
                                // height: Math.round(completedCrop?.height ?? 0),
                                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                            }}
                        />
                    </ImageBox>
                    {/* <DiamondImage pictureUrl={formPictureUrl} /> */}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formUploadPicture">
                                    <Form.Label>Upload picture</Form.Label>
                                    <Form.File id="custom-file" label="Upload file" custom onChange={onSelectFile} accept="image/*" />
                                </Form.Group>
                            </Col>
                            or
                            <Col>
                                <Form.Group controlId="formPictureUrl">
                                    <Form.Label>Picture URL</Form.Label>
                                    <Form.Control name='url' type='text' placeholder='Url' value={formPictureUrl}
                                        onChange={e => setFormPictureUrl(e.target.value)}
                                    // onChange={e => loadPicturefromUrl(e.target.value)}

                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formTextClue">
                            <Form.Label>Text Clue</Form.Label>
                            <Form.Control defaultValue={location.state.text_clue} required name='textclue' type='text' placeholder='Text Clue' />
                        </Form.Group>
                        <Form.Group controlId="formAnswer">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control defaultValue={location.state.answer} required name='answer' type='text' placeholder='Answer' />
                        </Form.Group>
                        {progressBarAmount === 0 ?
                            <Button type='submit'>Submit</Button> :
                            <ProgressBar now={progressBarAmount} />
                        }

                    </Form>
                </Container>
            }

        </Layout>


    );
}

export default CreateQuestion;