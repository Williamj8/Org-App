import React, { useState } from "react";

export default function form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    announcement: "",
  });

  // Check if all fields are filled
  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.announcement.trim();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Announcement Form</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Announcement:</label>
        <textarea
          name="announcement"
          value={formData.announcement}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}
