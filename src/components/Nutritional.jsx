import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

function Nutritional() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [foodItem, setFoodItem] = useState(null);
    const [calories, setCalories] = useState(null);

    const calorieMap = {
        "adhirasam": "around 200 calories per piece",
        "aloo_gobi": "around 150-200 calories per serving",
        "aloo_matar": "around 150-200 calories per serving",
        "aloo_methi": "around 150-200 calories per serving",
        "aloo_shimla_mirch": "around 150-200 calories per serving",
        "aloo_tikki": "around 100-150 calories per piece",
        "anarsa": "around 150-200 calories per piece",
        "ariselu": "around 150-200 calories per piece",
        "bandar_laddu": "around 200-250 calories per piece",
        "basundi": "around 200-250 calories per serving",
        "bhatura": "around 250-300 calories per piece",
        "bhindi_masala": "around 100-150 calories per serving",
        "biryani": "around 900 calories per serving",
        "boondi": "around 100-150 calories per serving",
        "butter_chicken": "around 300-400 calories per serving",
        "chak_hao_kheer": "around 150-200 calories per serving",
        "cham_cham": "around 150-200 calories per piece",
        "chana_masala": "around 150-200 calories per serving",
        "chapati": "around 70-100 calories per piece",
        "chhena_kheeri": "around 200-250 calories per serving",
        "chicken_razala": "around 300-400 calories per serving",
        "chicken_tikka": "around 150-200 calories per serving",
        "chicken_tikka_masala": "around 300-400 calories per serving",
        "chikki": "around 100-150 calories per piece",
        "daal_baati_churma": "around 300-400 calories per serving",
        "daal_puri": "around 200-250 calories per serving",
        "dal_makhani": "around 250-300 calories per serving",
        "dal_tadka": "around 150-200 calories per serving",
        "dharwad_pedha": "around 200-250 calories per piece",
        "doodhpak": "around 250-300 calories per serving",
        "double_ka_meetha": "around 200-250 calories per serving",
        "dum_aloo": "around 250-300 calories per serving",
        "gajar_ka_halwa": "around 200-250 calories per serving",
        "gavvalu": "around 100-150 calories per piece",
        "ghevar": "around 250-300 calories per piece",
        "gulab_jamun": "around 250-300 calories per piece",
        "imarti": "around 150-200 calories per piece",
        "jalebi": "around 200-250 calories per piece",
        "kachori": "around 150-200 calories per piece",
        "kadai_paneer": "around 300-400 calories per serving",
        "kadhi_pakoda": "around 200-250 calories per serving",
        "kajjikaya": "around 200-250 calories per piece",
        "kakinada_khaja": "around 150-200 calories per piece",
        "kalakand": "around 200-250 calories per piece",
        "karela_bharta": "around 100-150 calories per serving",
        "kofta": "around 200-250 calories per serving",
        "kuzhi_paniyaram": "around 150-200 calories per serving",
        "lassi": "around 100-150 calories per serving",
        "ledikeni": "around 250-300 calories per piece",
        "litti_chokha": "around 200-250 calories per serving",
        "lyangcha": "around 150-200 calories per piece",
        "maach_jhol": "around 300-400 calories per serving",
        "makki_di_roti_sarson_da_saag": "around 100-150 calories per serving",
        "malapua": "around 200-250 calories per piece",
        "misi_roti": "around 150-200 calories per piece",
        "misti_doi": "around 100-150 calories per serving",
        "modak": "around 200-250 calories per serving",
        "mysore_pak": "around 250-300 calories per piece",
        "naan": "around 200-250 calories per piece",
        "navrattan_korma": "around 300-400 calories per serving",
        "palak_paneer": "around 200-250 calories per serving",
        "paneer_butter_masala": "around 300-400 calories per serving",
        "phirni": "around 150-200 calories per serving",
        "pithe": "around 200-250 calories per piece",
        "poha": "around 100-150 calories per serving",
        "poornalu": "around 150-200 calories per piece",
        "pootharekulu": "around 200-250 calories per piece",
        "qubani_ka_meetha": "around 250-300 calories per serving",
        "rabri": "around 200-250 calories per serving",
        "ras_malai": "around 200-250 calories per serving",
        "rasgulla": "around 100-150 calories per piece",
        "sandesh": "around 150-200 calories per piece",
        "shankarpali": "around 200-250 calories per serving",
        "sheer_korma": "around 200-250 calories per serving",
        "sheera": "around 100-150 calories per serving",
        "shrikhand": "around 200-250 calories per serving",
        "sohan_halwa": "around 250-300 calories per serving",
        "sohan_papdi": "around 200-250 calories per piece",
        "sutar_feni": "around 200-250 calories per serving",
        "unni_appam": "around 150-200 calories per piece"
    };
    

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
        reader.readAsArrayBuffer(selectedFile);
        reader.onloadend = () => {
            const data = reader.result;

            axios({
                method: "POST",
                url: "https://api-inference.huggingface.co/models/ashutoshsharma58/indian_food_image_detection",
                data: data,
                headers: {
                    "Authorization": "Bearer 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"
                }
            })
            .then(function(response) {
                console.log(response.data);
                if (response.data && response.data.length > 0) {
                    const detectedLabel = response.data[0].label;
                    if (calorieMap[detectedLabel]) {
                        setFoodItem(detectedLabel);
                        console.log('Food item:', detectedLabel); // Debugging line
                        setCalories(calorieMap[detectedLabel]);
                        console.log('Calories:', calorieMap[detectedLabel]); // Debugging line
                    } else {
                        console.error('Detected label does not exist in calorieMap');
                    }
                } else {
                    console.error('Invalid response format');
                }
            })
            .catch(function(error) {
                console.log(error.message);
            });
        };
    };

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
            {foodItem && calories && (
                <div style={{ marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
                    <h1>Nutrition</h1>
                    <h2>Item: {foodItem}</h2>
                    <p>Calories: {calories}</p>
                </div>
            )}
        </div>
        
    );
}

export default Nutritional;
