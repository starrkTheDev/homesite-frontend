import classes from "../Inputs.module.css";
import { useState } from "react";
import { useLanguage } from "../../../files/LanguageContext";

const FacilitiesCheckbox = ({ onGarageChange, onBalconyChange, onLiftChange, onACChange, onBasementChange, onStorageChange }) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const [garageChecked, setGarageChecked] = useState(false);
    const [balconyChecked, setBalconyChecked] = useState(false);
    const [liftChecked, setLiftChecked] = useState(false);
    const [acChecked, setACChecked] = useState(false);
    const [basementChecked, setBasementChecked] = useState(false);
    const [storageChecked, setStorageChecked] = useState(false);

    return (
        <div className={classes.checkbox_2}>
            <p>{translations.facilities}:</p>
            <div className={classes.singleCheckbox}>
                <label>{translations.garage}</label>
                <input type="checkbox" value="garage" id="garage" checked={garageChecked} onChange={() => {
                    const updatedValue = !garageChecked;
                    setGarageChecked(updatedValue);
                    onGarageChange(updatedValue)
                }} />
            </div>
            <div className={classes.singleCheckbox}>
                <label>{translations.balcony}</label>
                <input type="checkbox" value="balcony" id="balcony" checked={balconyChecked} onChange={() => {
                    const updatedValue = !balconyChecked;
                    setBalconyChecked(updatedValue);
                    onBalconyChange(updatedValue);
                }} />
            </div>
            <div className={classes.singleCheckbox}>
                <label>{translations.lift}</label>
                <input type="checkbox" value="lift" id="lift" checked={liftChecked} onChange={() => {
                    const updatedValue = !liftChecked;
                    setLiftChecked(updatedValue);
                    onLiftChange(updatedValue);
                }} />
            </div>
            <div className={classes.singleCheckbox}>
                <label>{translations.ac}</label>
                <input type="checkbox" value="ac" id="ac" checked={acChecked} onChange={() => {
                    const updatedValue = !acChecked;
                    setACChecked(updatedValue);
                    onACChange(updatedValue);
                }} />
            </div>
            <div className={classes.singleCheckbox}>
                <label>{translations.basement}</label>
                <input type="checkbox" value="basement" id="basement" checked={basementChecked} onChange={() => {
                    const updatedValue = !basementChecked;
                    setBasementChecked(updatedValue);
                    onBasementChange(updatedValue);
                }} />
            </div>
            <div className={classes.singleCheckbox}>
                <label>{translations.storage}</label>
                <input type="checkbox" value="storage" id="storage" checked={storageChecked} onChange={() => {
                    const updatedValue = !storageChecked;
                    setStorageChecked(updatedValue);
                    onStorageChange(updatedValue);
                }} />
            </div>
        </div>
    )
};

export default FacilitiesCheckbox;