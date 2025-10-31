// apps/web/src/pages/Checklist.jsx
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const AUTH_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Checklist() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [general, setGeneral] = useState([
    { id: 1, text: "Did you take a shower?", checked: false },
    { id: 2, text: "Did you have a hot meal?", checked: false },
    { id: 3, text: "Did you clean your room?", checked: false },
    { id: 4, text: "Did you take your medication?", checked: false },
    { id: 5, text: "Did you get some sun?", checked: false },
  ]);

  const handleCheckboxGeneral = (id) => {
    setGeneral(
      general.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  console.log("printing userData:", userData.email);
  // console.log("server/auths/checklist.service display userId:", userData.id);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      userId: userData.id,
      dailyTasks: general // <-- CHANGE 'items' to 'dailyTasks'
    };

    console.log('Sending this payload:', JSON.stringify(payload, null, 2));

    try {
      console.log(`${AUTH_API_BASE_URL}`);
      const response = await fetch(`${AUTH_API_BASE_URL}/api/checklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = response.json();
        console.log('Response saved');
        alert("Your response has been submitted");
      } else {
        console.log('Response failed to save');
      }
    } catch (error) {
      console.error("Error sending checklist response to server:", error);
    }
  };

  return (
    <div>
      <h1>Checklist as needed</h1>
      {console.log("checklist component rendered")}
      <form>
        {general.map((general) => (
          <div key={general.id}>
            <input type="checkbox" checked={general.checked} onChange={() => handleCheckboxGeneral(general.id)} />
            {general.text}
          </div>
        ))}
      </form>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      <button onClick={() => navigate(ROUTES.SETTINGS)}>Settings</button>
    </div>
  );
}
