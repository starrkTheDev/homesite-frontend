import classes from "../Inputs.module.css";
import { useState } from "react";
import { useLanguage } from "../../../files/LanguageContext";


const RoomsCheckbox = ({ onRoomsChange }) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const [selectedRooms, setSelectedRooms] = useState(null);

    const handleRoomChange = (event) => {
        setSelectedRooms(() => {
            const newSelectedRooms = Number(event.target.value);
            onRoomsChange(newSelectedRooms);
            return newSelectedRooms;
        });
    };

    return (
        <div className={classes.checkbox}>
            <p>{translations.rooms}</p>
            <label>1</label>
            <input type="radio" name="rooms" value={1} checked={selectedRooms === 1} onChange={handleRoomChange} />
            <label>2</label>
            <input type="radio" name="rooms" value={2} checked={selectedRooms === 2} onChange={handleRoomChange} />
            <label>3</label>
            <input type="radio" name="rooms" value={3} checked={selectedRooms === 3} onChange={handleRoomChange} />
            <label>4</label>
            <input type="radio" name="rooms" value={4} checked={selectedRooms === 4} onChange={handleRoomChange} />
            <label>5</label>
            <input type="radio" name="rooms" value={5} checked={selectedRooms === 5} onChange={handleRoomChange} />
        </div>
    )
};

export default RoomsCheckbox;