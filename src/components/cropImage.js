import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styled from 'styled-components'

const ImageBox = styled.div`
    border: 2px yellow solid;
    background-color: yellow;
    height: 400px;
    width: 400px;
    margin: 1em auto;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

// function getResizedCanvas(canvas, newWidth, newHeight)
// {
//     const tmpCanvas = document.createElement("canvas");
//     tmpCanvas.width = newWidth;
//     tmpCanvas.height = newHeight;

//     const ctx = tmpCanvas.getContext("2d");
//     ctx.drawImage(
//         canvas,
//         0,
//         0,
//         canvas.width,
//         canvas.height,
//         0,
//         0,
//         newWidth,
//         newHeight
//     );

//     return tmpCanvas;
// }

const CropImage = () =>
{
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
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

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
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
        <div className="App">

            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
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
            <div>
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            {/* 
            <button
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
            //     onClick={() =>
            //         generateDownload(previewCanvasRef.current, completedCrop)
            //     }
            >
                Download cropped image
      </button> */}
        </div>
    );
}

export default CropImage;