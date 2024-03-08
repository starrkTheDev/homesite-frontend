import PlaceInput from "../inputs/PlaceInput";
import classes from "./AddPlot.module.css";
import DescriptionInput from "./components/DescriptionInput";
import TitleInput from "./components/TitileInput";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import PriceInput from "./components/PriceInput";
import { useLanguage } from "../../files/LanguageContext";
import NumberInput from "./components/NumberInput";

const AddPlot = () => {
    
    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const [title, setTitle] = useState("");
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [invalidNumberValues, setInvalidNumberValues] = useState("");
    const [place, setPlace] = useState("");
    const [invalidPlace, setInvalidPlace] = useState(false);
    const [description, setDescription] = useState("");
    const [invalidDescription, setInvalidDescription] = useState("");
    const [number, setNumber] = useState("");
    const [invalidNumber, setInvalidNumber] = useState(false);
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false);

    const [file, setFile] = useState();

    const navigate = useNavigate();

    const fileSelected = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        } else {
            setFile(file);
        }
    };

    const addPostHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('https://homesite-api.onrender.com/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log("Image uploaded successfully:", response.data);
        const imagePath = response.data.filename;

        const calculatedPricePerSquareMeter = parseInt(price) / parseInt(area);
        console.log(calculatedPricePerSquareMeter);

        const graphqlQuery = {
            query: `
                mutation CreatePlotPost($plotPostInput: PlotPostInput) {
                    createPlotPost(plotPostInput: $plotPostInput) {
                        _id
                        title
                        estate
                        price
                        area
                        place
                        number
                        description
                        imagePath
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: {
                plotPostInput: {
                    title: title,
                    estate: "dzialki",
                    price: price,
                    area: area,
                    place: place,
                    imagePath: imagePath,
                    description: description,
                    number: number,
                    pricePerSquareMeter: calculatedPricePerSquareMeter
                }
            }
        };

        if (title.length < 10) {
            setInvalidTitle(true);
        } else {
            setInvalidTitle(false);
        };

        if((price === "" || price === 0) || (area === "" || area === 0)) {
            setInvalidNumberValues(true);
        } else {
            setInvalidNumberValues(false);
        };

        if(place === "") {
            setInvalidPlace(true) 
        } else {
            setInvalidPlace(false)
        };

        if(description === "") {
            setInvalidDescription(true) 
        } else {
            setInvalidDescription(false)
        };

        if(number.length < 9) {
            setInvalidNumber(true);
        } else {
            setInvalidNumber(false);
        };
        

        fetch('http://homesite-api.onrender.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.log(data.errors);
                    return;
                } else {
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                    setCompleted(true);
                }
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });



    }

    return (
        <div className={classes.background} >
            {completed &&
                <div className={classes.completed_container}>
                    <ul>
                        <li>{translations.successfullPost}</li>
                    </ul>
                </div>
            }
            <form >
                <div className={classes.form_container}>
                    <div className={classes.form}>
                        <div className={classes.title_container}>
                            <TitleInput 
                                onTitleChange={setTitle}
                            />
                            {invalidTitle && 
                            <p className={classes.error_message}>{translations.titleError}</p>}
                       </div>
                        <PriceInput
                            onPriceChange={setPrice}
                            onAreaChange={setArea}
                        />
                         {invalidNumberValues && 
                        <p className={classes.numbers_error_message}>{translations.numberValuesError}</p>}
                        <div>
                            <label 
                                className={classes.file_input}
                                for="fileInput">{translations.choose}
                            </label>
                            <input
                                id="fileInput"
                                onChange={fileSelected}
                                type="file"
                                style={{display:"none"}}
                                name="image"
                                accept="image/*">
                            </input>
                            <NumberInput 
                                onNumberChange={setNumber}
                            />
                         </div>
                         {invalidNumber && 
                        <p className={classes.phoneNumber_error_message}>{translations.phoneNumberError}</p>}
                        <DescriptionInput
                         onDescriptionChange={setDescription}
                         />
                          {invalidDescription && 
                        <p className={classes.description_error_message}>{translations.descriptionError}</p>}
                    
                        <PlaceInput
                            onPlaceChange={setPlace} 
                        />
                        {invalidPlace && 
                        <p className={classes.place_error_message}>{translations.placeError}</p>}
                    </div>
                <div className={classes.submit}>
                    <button
                        className={file ? classes.button : classes.grayButton}
                        onClick={addPostHandler}
                        disabled={!file}
                        >
                             {file ? translations.addPost : translations.loadFile}
                    </button>
                </div>
                </div>
            </form>
        </div>
    )
};

export default AddPlot;