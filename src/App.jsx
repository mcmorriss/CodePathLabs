import { useState } from 'react'
import './App.css'
import APIForm from './Components/APIform';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: ""
  });
  const [currentImage, setCurrentImage] = useState(null);

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };
    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    }else{
      for (const [key, value] of Object.entries(inputs)) {
        if (value == ""){
          inputs[key] = defaultValues[key]
        }
      }
      makeQuery();
    }
  }

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    callAPI(query).catch(console.error)
  }

  let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
  }

  

  return (
    <div className="App">
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />

    </div>

  )
}

export default App
