import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: ''});
  const URL = filters.type === '' ? 
  'http://localhost:3001/pets' : 
  `http://localhost:3001/pets?type=${filters.type}`

  const fetchData = async() => {
    try{
      const res = await fetch(URL)
      if(!res.ok) throw new Error(`{error - ${res.status}}`)
      setPets(await res.json())

    }catch(error){
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filters])
  console.log(pets)

  function deletePet(data){
    setPets(pets.filter(pet => pet.id !== data.id))
  }

  
   


  

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters setFilters = {setFilters} filters = {filters}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} deletePet = {deletePet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;