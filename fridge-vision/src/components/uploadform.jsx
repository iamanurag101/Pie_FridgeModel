import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import { useDropzone } from 'react-dropzone';
import { FaSquare } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';

function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
        setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = () => {
        if (!selectedFile) {
            console.error('No file selected for upload');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            const base64Image = reader.result.split(',')[1];

            axios({
                method: "POST",
                url: "https://detect.roboflow.com/aicook-lcv4d/3",
                params: {
                    api_key: "THFU6CVXMDuaozeptpA1"
                },
                data: base64Image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response) {
                console.log(response.data);
                if (response.data && Array.isArray(response.data.predictions)) {
                    const classes = response.data.predictions.map(item => item.class);
                    setIngredients(classes);
                } else {
                    console.error('Invalid response format');
                }
            })
            .catch(function(error) {
                console.log(error.message);
            });
        };
    };

    useEffect(() => {
        if (ingredients.length > 0) {
            const data = {
                inputs: ingredients.join(', ')
            };

            fetch("https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation", {
                headers: { 
                    Authorization: "Bearer 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",
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                console.log(result); // Log the entire response object
                if (result && result[0] && result[0].generated_text) {
                    let recipeText = result[0].generated_text;
                    recipeText = recipeText.split('title:').join('\n\n**Title:**');
                    recipeText = recipeText.split('ingredients:').join('\n\n**Ingredients:**');
                    recipeText = recipeText.split('directions:').join('\n\n**Directions:**');
                    setRecipe(recipeText);
                } else {
                    console.error('No data in response');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }, [ingredients]);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ paddingTop: '20px' }}>
                <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '20px', marginBottom: '20px', height: '400px', width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <input {...getInputProps()} />
                    {selectedFile ? 
                        <img src={previewUrl} alt="Uploaded" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> :
                        isDragActive ? 
                            <>
                                <FaUpload size={50} />
                                <p>Drop the files here ...</p>
                            </> : 
                            <>
                                <FaUpload size={50} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </>
                    }
                </div>
                <button onClick={handleUpload} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>Upload</button>
            </div>
            <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
            <h2>Ingredients</h2>
            {ingredients.map((ingredient, index) => (
                <p key={index}>{ingredient}</p>
            ))}
        </div>

        {recipe && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginLeft: '20px', marginTop: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
                    <h2>Recipe</h2>
                    {recipe}
                </div>
            </div>
        )}
    </div>
    );
}

export default UploadForm;