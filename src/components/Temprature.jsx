import React, { useEffect, useState } from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilEdit,
  UilTrashAlt,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";
import {
  saveNotesToLocalStorage,
  loadNotesFromLocalStorage,
} from "../utils/localStorage";

function Temprature({
  weather: {
    name,
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    dt,
    timezone,
  },
}) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedNotes = loadNotesFromLocalStorage("notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleSaveNote = () => {
    if (newNote) {
      if (editIndex === -1) {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        saveNotesToLocalStorage("notes", updatedNotes);
      } else {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = newNote;
        setNotes(updatedNotes);
        saveNotesToLocalStorage("notes", updatedNotes);
        setEditIndex(-1);
      }
      setNewNote("");
    }
  };

  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setEditIndex(index);
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    saveNotesToLocalStorage("notes", updatedNotes);
    setEditIndex(-1);
  };

  const maxWords = 25;

  const handleNotesChange = (e) => {
    const text = e.target.value;

    const wordCount = text.trim().split(/\s+/).length;

    if (wordCount <= maxWords) {
      setNewNote(text);
    }
  };

  return (
    <div className="px-4 py-2 sm:py-6 text-white text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-5xl mt-4 sm:mt-0">{`${temp.toFixed()}°`}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center text-sm space-y-2">
        <div className="flex font-light items-center justify-center">
          <UilTemperature size={18} className="mr-1" />
          Real feel:
          <span className="font-medium ml-2">{`${feels_like.toFixed()}°`}</span>
        </div>
        <div className="flex font-light items-center justify-center">
          <UilTear size={18} className="mr-1" />
          Humidity:
          <span className="font-medium ml-2">{`${humidity.toFixed()}%`}</span>
        </div>
        <div className="flex font-light items-center justify-center">
          <UilWind size={18} className="mr-1" />
          Wind:
          <span className="font-medium ml-2">{`${speed.toFixed()}km/h`}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center text-sm text-white py-3">
        <UilSun />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light mx-2">|</p>
        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light mx-2">|</p>
        <UilSun />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light mx-2">|</p>
        <UilSun />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>

      {/* Notes section */}
      <div className="mt-4">
        {/* {isEditing ? ( */}
        <div className="flex flex-col items-center">
          <input
            value={newNote}
            onChange={handleNotesChange}
            placeholder="notes..."
            className="text-xl md:text-md font-light text-black p-2 shadow-xl focus:outline-none placeholder:lowercase rounded-md w-full mx-auto max-w-md"
          />
          <button
            onClick={handleSaveNote}
            className=" text-white font-medium rounded-md p-2 transition ease-out hover:scale-125 mt-2"
          >
            {editIndex === -1 ? "Save" : "Update"}
          </button>
        </div>
        <div className="mt-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className="p-4 border-white border text-white rounded-lg mb-2"
            >
              {note}
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleEditNote(index)}
                  className="text-white hover:underline mx-2 hover:scale-125"
                >
                  <UilEdit size={18} />
                </button>
                <button
                  onClick={() => handleRemoveNote(index)}
                  className="text-red-500 hover:underline mx-2 hover:scale-125"
                >
                  <UilTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Temprature;
