import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import classes from './Inputs.module.css';
import { useLanguage } from "../../files/LanguageContext";

const PlaceInput = ({ onPlaceChange }) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const place = translations.place;

    const searchOptions = {
        componentRestrictions: { country: 'PL' },
        types: ['(cities)']
    };

    const [adress, setAdress] = useState("");

    const handlePlaceSelect = async (value) => {
        const shortAdress = value.split(',')[0].trim()
        setAdress(shortAdress);
        onPlaceChange(shortAdress);
        console.log(shortAdress);
    }

    return (
        <PlacesAutocomplete
            value={adress}
            onChange={setAdress}
            onSelect={handlePlaceSelect}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                    <input className={classes.input}
                        required
                        {...getInputProps({ placeholder: place, id: "place" })} />
                    <div>
                        {suggestions.map((suggestion) => {

                            const style = {
                                backgroundColor: suggestion.active ? "#cce5ff" : "#fff",
                                margin: "10px auto",
                                padding: "5px",
                                borderRadius: "5px",
                                maxWidth: "200px",
                                cursor: "pointer"
                            }

                            const cityName = suggestion.description.split(',')[0].trim();

                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, { style })}>
                                    {cityName}
                                </div>
                            )
                        })}
                    </div>
                </div>)}
        </PlacesAutocomplete>
    )
};

export default PlaceInput;