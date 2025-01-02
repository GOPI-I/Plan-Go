import React, { useState } from 'react';
import "./copassenger.css"
import { useNavigate } from 'react-router-dom';
import ListHeader from './ListHeader';
const CoPassenger = () => {
  const navigate  = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');

  // Handle adding new passenger
  const handleAddPassenger = () => {
    if (name && relation && contact && age) {
      const newPassenger = { name, relation, contact, age };
      const updatedPassengers = [...passengers, newPassenger];
      setPassengers(updatedPassengers);
      setName('');
      setRelation('');
      setContact('');
      setAge('');
    }
  };

  // Handle deleting a passenger
  const handleDeletePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  // Handle storing data to local storage and navigating to the next page
  const handleNextPage = () => {
    if (passengers.length > 0) {
      localStorage.setItem("copassenger", JSON.stringify(passengers));
      alert("Copassenger history has been saved to local storage!");
    } else {
      alert("No copassenger history to save.");
    }
    console.log('Navigating to next page...');
    navigate("/itinearyview")
  };

  return (
    <>
    <ListHeader/>
    <div className="coPassengerContainerUnique">
      <h1 className="coPassengerTitleUnique">Co-Passenger Information</h1>
      <div className="inputFieldsUnique">
        <input
          type="text"
          className="inputFieldUnique"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="inputFieldUnique"
          placeholder="Relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />
        <input
          type="text"
          className="inputFieldUnique"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="number"
          className="inputFieldUnique"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className="addButtonUnique" onClick={handleAddPassenger}>Add Passenger</button>
      </div>

      <div className="passengerListUnique">
        {passengers.map((passenger, index) => (
          <div key={index} className="passengerItemUnique">
            <span>{passenger.name} - {passenger.relation} - {passenger.contact} - {passenger.age}</span>
            <button className="deleteButtonUnique" onClick={() => handleDeletePassenger(index)}>Delete</button>
          </div>
        ))}
      </div>

      <button className="nextPageButtonUnique" onClick={handleNextPage}>Next Page</button>
    </div>
    </>
  );
};

export default CoPassenger;
