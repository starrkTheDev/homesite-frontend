import classes from './SearchForm.module.css';
import OptionsButton from './buttons/OptionsButton';
import SubmitButton from './buttons/SubmitButton';
import PlaceInput from './inputs/PlaceInput'
import RangeInputs from './inputs/RangeInputs';
import SelectInputs from './inputs/SelectInputs';
import { useState } from 'react';
import AdditionalRangeInputs from './inputs/additional/AdditionalRangeInputs';
import RoomsCheckbox from './inputs/additional/RoomsCheckbox';
import LevelCheckbox from './inputs/additional/LevelCheckbox';
import FacilitiesCheckbox from './inputs/additional/FacilitiesCheckbox';
import HeatingInput from './inputs/HeatingInput';
import BrowseButton from './buttons/BrowseButton';
import MatchingPosts from './MatchingPosts';
import { useEffect } from 'react';
import { useLanguage } from '../files/LanguageContext';



const SearchForm = () => {

    const { language } = useLanguage();
    const translations = require(`../files/${language}.json`);

    const [isSecondForm, setIsSecondForm] = useState(false);
    const [estate, setEstate] = useState("");
    const [purpose, setPurpose] = useState("");
    const [market, setMarket] = useState("");
    const [place, setPlace] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minArea, setMinArea] = useState("");
    const [maxArea, setMaxArea] = useState("");
    const [level, setLevel] = useState(0);
    const [rooms, setRooms] = useState(0);
    const [minYearBuilt, setMinYearBuilt] = useState("");
    const [maxYearBuilt, setMaxYearBuilt] = useState("");
    const [minPricePerSquareMeter, setMinPricePerSquareMeter] = useState('');
    const [maxPricePerSquareMeter, setMaxPricePerSquareMeter] = useState('');
    const [garage, setGarage] = useState(false);
    const [balcony, setBalcony] = useState(false);
    const [lift, setLift] = useState(false);
    const [ac, setAC] = useState(false);
    const [basement, setBasement] = useState(false);
    const [storage, setStorage] = useState(false);
    const [heating, setHeating] = useState("");
    const [matchingPosts, setMatchingPosts] = useState([]);


    const secondFormEnable = (event) => {
        event.preventDefault();
        if (!isSecondForm) {
            setIsSecondForm(true);
        } else {
            setIsSecondForm(false);
        }
    }

    const formHandler = async (event) => {
        event.preventDefault();
    
        const graphqlQuery = {
            query: `
                query SearchPosts($estate: String!, $purpose: String!, $market: String!, $place: String!, $minPrice: Int, $maxPrice: Int, $minArea: Int, $maxArea: Int, $level: Int, $rooms: Int, $minYearBuilt: Int, $maxYearBuilt: Int, $minPricePerSquareMeter: Int, $maxPricePerSquareMeter: Int, $garage: Boolean, $balcony: Boolean, $lift: Boolean, $ac: Boolean, $basement: Boolean, $storage: Boolean, $heating: String!) {
                    getMatchingPosts(searchInput: { estate: $estate, purpose: $purpose, market: $market, place: $place, minPrice: $minPrice, maxPrice: $maxPrice, minArea: $minArea, maxArea: $maxArea, level: $level, rooms: $rooms, minYearBuilt: $minYearBuilt, maxYearBuilt: $maxYearBuilt, minPricePerSquareMeter:$minPricePerSquareMeter, maxPricePerSquareMeter:$maxPricePerSquareMeter, garage: $garage, balcony: $balcony, lift: $lift, ac: $ac, basement: $basement, storage: $storage, heating: $heating }) {
                        _id
                        title
                        price
                        area
                        estate
                        purpose
                        market
                        place
                        imagePath
                        level
                        rooms
                        year
                        pricePerSquareMeter
                        heating
                    }
                }
            `,
            variables: {
                estate,
                purpose,
                market,
                place,
                minPrice: parseInt(minPrice),
                maxPrice: parseInt(maxPrice),
                minArea: parseInt(minArea),
                maxArea: parseInt(maxArea),
                level,
                rooms,
                minYearBuilt: parseInt(minYearBuilt),
                maxYearBuilt: parseInt(maxYearBuilt),
                minPricePerSquareMeter: parseInt(minPricePerSquareMeter),
                maxPricePerSquareMeter: parseInt(maxPricePerSquareMeter),
                garage,
                balcony,
                lift,
                ac,
                basement,
                storage,
                heating
            },
        };
    
        try {
            const response = await fetch('https://homesite-api.onrender.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(graphqlQuery),
            });
    
            const responseData = await response.json();
            const fetchedMatchingPosts = responseData.data?.getMatchingPosts || [];
            setMatchingPosts(fetchedMatchingPosts);
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [matchingPosts]);
    


    return (
        <div>
        <div className={classes.background} >
            <header className={classes.header}>
                <p className={classes.phrase}>{translations.findYourPlace}</p>
            </header>
            <div className={classes.form_container}>
                <form
                    onSubmit={formHandler}
                    className={classes.form}>
                    <SelectInputs
                        onEstateChange={setEstate}
                        onPurposeChange={setPurpose}
                        onMarketChange={setMarket} />
                    <RangeInputs 
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                        onMinAreaChange={setMinArea}
                        onMaxAreaChange={setMaxArea}
                        />
                    <PlaceInput
                        onPlaceChange={setPlace} />
                    <OptionsButton
                        isSecondForm={isSecondForm}
                        onOptionsClick={secondFormEnable} />
                    <SubmitButton />
                </form>
                {isSecondForm &&
                    <form className={classes.form}>
                        <LevelCheckbox 
                            onLevelChange={setLevel}
                        />
                        <RoomsCheckbox 
                            onRoomsChange={setRooms}
                        />
                        <AdditionalRangeInputs 
                            onMinYearChange={setMinYearBuilt}
                            onMaxYearChange={setMaxYearBuilt}
                            onMinPricePerSquareMeterChange={setMinPricePerSquareMeter}
                            onMaxPricePerSquareMeterChange={setMaxPricePerSquareMeter}
                        />
                        <FacilitiesCheckbox 
                               onGarageChange={setGarage}
                               onBalconyChange={setBalcony}
                               onLiftChange={setLift}
                               onACChange={setAC}
                               onBasementChange={setBasement}
                               onStorageChange={setStorage}
                        />
                        <HeatingInput 
                            onHeatingChange={setHeating}
                        />
                    </form>}
            </div>
            <BrowseButton />
        </div>
           { matchingPosts.length > 0 &&
            <div>
                <MatchingPosts posts={matchingPosts} />
            </div> }
        </div>
    )
};

export default SearchForm;