import HeatingInput from "../inputs/HeatingInput";
import PlaceInput from "../inputs/PlaceInput";
import SelectInputs from "../inputs/SelectInputs";
import FacilitiesCheckbox from "../inputs/additional/FacilitiesCheckbox";
import LevelCheckbox from "../inputs/additional/LevelCheckbox";
import RoomsCheckbox from "../inputs/additional/RoomsCheckbox";
import classes from "./AddEstate.module.css";
import DateInput from "./components/DateInput";
import DescriptionInput from "./components/DescriptionInput";
import TitleInput from "./components/TitileInput";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import PriceInput from "./components/PriceInput";
import { useLanguage } from "../../files/LanguageContext";
import NumberInput from "./components/NumberInput";

const AddEstate = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const [errors, setErrors] = useState('');
    const [title, setTitle] = useState("");
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [estate, setEstate] = useState("");
    const [invalidSelect, setInvalidSelect] = useState(false);
    const [purpose, setPurpose] = useState("");
    const [market, setMarket] = useState("");
    const [heating, setHeating] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [year, setYear] = useState("");
    const [availability, setAvailability] = useState("");
    const [invalidNumberValues, setInvalidNumberValues] = useState("");
    const [place, setPlace] = useState("");
    const [invalidPlace, setInvalidPlace] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [level, setLevel] = useState(1);
    const [garage, setGarage] = useState(false);
    const [balcony, setBalcony] = useState(false);
    const [lift, setLift] = useState(false);
    const [ac, setAC] = useState(false);
    const [basement, setBasement] = useState(false);
    const [storage, setStorage] = useState(false);
    const [description, setDescription] = useState("");
    const [invalidDescription, setInvalidDescription] = useState("");
    const [number, setNumber] = useState("");
    const [invalidNumber, setInvalidNumber] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [file, setFile] = useState();

    const navigate = useNavigate();

    const fileSelected = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        } else {
            setFile(file);
        };
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
                mutation CreatePost($postInput: PostInput) {
                    createPost(postInput: $postInput) {
                        _id
                        title
                        estate
                        purpose
                        market
                        heating
                        price
                        area
                        year
                        availability
                        place
                        rooms
                        level
                        garage
                        balcony
                        lift
                        ac
                        basement
                        storage
                        description
                        imagePath
                        number
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: {
                postInput: {
                    title: title,
                    estate: estate,
                    purpose: purpose,
                    market: market,
                    heating: heating,
                    price: price,
                    area: area,
                    year: year,
                    availability: availability,
                    place: place,
                    rooms: rooms,
                    level: level,
                    garage: garage,
                    balcony: balcony,
                    lift: lift,
                    ac: ac,
                    basement: basement,
                    storage: storage,
                    imagePath: imagePath,
                    number: number,
                    description: description,
                    pricePerSquareMeter: calculatedPricePerSquareMeter
                }
            }
        };

        if (title.length < 10) {
            setInvalidTitle(true);
        } else {
            setInvalidTitle(false);
        };

        if((estate === "") || (purpose === "") || (market === "") || (heating === ""))  {
            setInvalidSelect(true);
        } else {
            setInvalidSelect(false);
        };

        if((price === "" || price === 0) || (area === "" || area === 0) || (year === "" || year === 0))  {
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

        fetch('https://homesite-api.onrender.com/graphql', {
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
                    setCompleted(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
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
                    <div
                        className={classes.form}>
                        <div className={classes.input_container}>
                            <TitleInput 
                                onTitleChange={setTitle}
                            />
                            {invalidTitle && 
                            <p className={classes.error_message}>{translations.titleError}</p>}
                       </div>
                        <div>
                            <SelectInputs
                                onEstateChange={setEstate}
                                onPurposeChange={setPurpose}
                                onMarketChange={setMarket}
                            />
                            <HeatingInput
                                onHeatingChange={setHeating} />
                            {invalidSelect && 
                            <p className={classes.select_error_message}>{translations.selectError}</p>}
                     </div>
                        <DateInput
                            onYearChange={setYear}
                            onAvailabilityChange={setAvailability}
                        />
                        <PriceInput
                        onPriceChange={setPrice}
                        onAreaChange={setArea}
                        />
                        {invalidNumberValues && 
                        <p className={classes.numbers_error_message}>{translations.allNumberValuesError}</p>}
                        <PlaceInput
                            onPlaceChange={setPlace} />
                        {invalidPlace && 
                        <p className={classes.place_error_message}>{translations.placeError}</p>}
                    </div>
                    <div className={classes.form}>
                        <div>
                        <LevelCheckbox onLevelChange={setLevel} />
                        <RoomsCheckbox onRoomsChange={setRooms} />
                        <FacilitiesCheckbox
                            onGarageChange={setGarage}
                            onBalconyChange={setBalcony}
                            onLiftChange={setLift}
                            onACChange={setAC}
                            onBasementChange={setBasement}
                            onStorageChange={setStorage} />
                        </div>
                        <DescriptionInput
                            onDescriptionChange={setDescription} 
                        />
                         {invalidDescription && 
                        <p className={classes.description_error_message}>{translations.descriptionError}</p>}
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
                            accept="image/*"
                            >
                        </input>
                        <NumberInput
                            onNumberChange={setNumber}
                        />
                          {invalidNumber && 
                        <p className={classes.phoneNumber_error_message}>{translations.phoneNumberError}</p>}
                    </div>
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
            </form>
        </div>
    )
};

export default AddEstate;
