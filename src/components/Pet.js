import React, { useState, useEffect } from "react";

function Pet({
  id, 
  type, 
  gender, 
  age, 
  weight, 
  name, 
  isAdopted, 
  deletePet
}) {
  

  const[adopted, setAdopted] = useState(isAdopted)
  console.log(id)
  const URL = 'http://localhost:3001/pets'

  const handleAdopt = async() => {
    try{
      const res = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
      })
      if(!res.ok) throw new Error(`error - ${res.status}`)
      deletePet({id})

    }catch(error){
      console.error(error.message)
    }

  }
  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {gender && gender === 'male' ? '♀' : '♂'}
          {/*'♀' OR '♂' */}
          {name}
        </span>
        <div className="meta">
          <span className="date">{type}</span>
        </div>
        <div className="description">
          <p>Age: {age}</p>
          <p>Weight: {weight}</p>
        </div>
      </div>
      <div className="extra content">
        {adopted ? <button className="ui disabled button" >Already adopted</button> : 
        <button className="ui primary button" onClick={handleAdopt}>Adopt pet</button>}
        
        
      </div>
    </div>
  );
}

export default Pet;