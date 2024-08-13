import React, { useState } from "react";
import axios from "./utils/axios";
import { useNavigate } from "react-router-dom";

const CreateDriver = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    const errors = {};
    if (!Name.trim()) {
      errors.Name = "Name is required";
    }
    if (!Email.trim()) {
      errors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.Email = "Email address is invalid";
    }
    if (!Phone.trim()) {
      errors.Phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(Phone)) {
      errors.Phone = "Phone number must be 10 digits";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createDriver = async () => {
    try {
      if (!validateForm()) return;
      const { data } = await axios.post('/drivers/create', { name: Name, email: Email, phone: Phone });
    navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDriver();
  };  
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-5 border-white p-10 rounded-xl border-2">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input onChange={(e) => setName(e.target.value)} type="text" className="grow"  />
        </label>
        {errors.Name && <span className="text-red-500">{errors.Name}</span>}
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="grow"  />
        </label>
        {errors.Email && <span className="text-red-500">{errors.Email}</span>}
        <label className="input input-bordered flex items-center  gap-2">
          Phone No.
          <input onChange={(e) => setPhone(e.target.value)} type="tel" className="grow"  />
        </label>
        {errors.Phone && <span className="text-red-500">{errors.Phone}</span>}

        <button className="btn btn-active border-white hover:border-base-300" onClick={handleSubmit}>Create Driver</button>
      </div>
    </div>
  );
};

export default CreateDriver;
