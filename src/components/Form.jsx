import { useState } from 'react';
import './Form.css';

const Form = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <button className="back-btn brutal-box" onClick={onBack}>&larr; BACK</button>
      
      <div className="form-wrapper brutal-box fade-in">
        <h2 className="form-title">REGISTER FOR ID</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>FULL NAME</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. K. YUGAVARDHAN"
            />
          </div>

          <div className="input-group">
            <label>ROLE</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="DEVELOPER">DEVELOPER</option>
              <option value="ORGANISATION">ORGANISATION</option>
              <option value="STARTUP">STARTUP</option>
              <option value="STUDENT">STUDENT</option>
            </select>
          </div>

          <div className="input-group">
            <label>ORGANIZATION</label>
            <input 
              type="text" 
              name="organization" 
              value={formData.organization} 
              onChange={handleChange} 
              required 
              placeholder="e.g. APOLLO UNIVERSITY"
            />
          </div>

          <div className="input-group">
            <label>TEAM NAME</label>
            <input 
              type="text" 
              name="team" 
              value={formData.team} 
              onChange={handleChange} 
              required 
              placeholder="e.g. ALGO SURFERS"
            />
          </div>

          <button type="submit" className="submit-btn brutal-box">
            GENERATE ID CARD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
