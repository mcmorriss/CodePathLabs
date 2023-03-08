import React, { Component, useEffect, useState } from 'react';

const RecipesChoices = ({ handleChange, label, choices, checked }) => {
  return (
    <div>
        { choices && 
            choices.map((choice) => (
                <li key={choice}>
                    <input
                    id={choice}
                    value={choice}
                    name={label}
                    type="radio"
                    onChange={handleChange}
                    checked={checked == choice}>
                    </input>
                </li>
            ))


        }
        
    </div>
  )
}

export default RecipesChoices