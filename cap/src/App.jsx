import { useState } from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import APIForm from '../Components/APIForm';


function App() {
  const [count, setCount] = useState(0)
  const [currentImage, setCurrentImage] = useState(null);

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });


  const submitForm = () => {
    let defaultVals = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url == "" || inputs.url == " "){
      alert("You forgot to submit a URL.")
    } else {
      for (const [key, val] of Object.entries(inputs)) {
        if (val == "") {
          inputs[key] = defaultVals[key]
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
    
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&wait_until=${wait_until}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

    callAPI(query).catch(console.error)
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json)

    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
    }
    else {
      setCurrentImage(json.url);
      reset();
    }
  }

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  }

  return (
    <div className="App">
      <h1>Screenshot Saver! 📸 </h1>

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
      <br></br>

      {currentImage ? (
        <img
          className='screenshot'
          src={currentImage}
          alt="Screenshot returned" 
        />
      ) : (
        <div> </div>
      )}

      <div className='containre'>
        <h3>Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>



    </div>
  )
}

export default App
