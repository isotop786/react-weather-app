import SearchBox from "../SearchBox";
import Text from "../Text";
import { useState,useEffect } from "react";
import axios from "axios";
import Display from "../Display";
import Error from "../Error";
import Footer from "../Footer";

const Home = ()=>{

  const API_KEY ="c88719ff17eb9c6644f0cf2ae8d9dffd";

  const [temp, setTemp] = useState(0);
  const [name, setName] = useState('');
  const [main, setMain] = useState('');
  const [humidity, setHumidity] = useState(0)
  const [isLoaded,setIsLoaded] = useState(false);
  const [err,setErr] = useState(false);



const getLocation = ()=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getInfo, getErr);
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}
}

 const getInfo = (position)=>{
  const lat =  position.coords.latitude;
  const long =  position.coords.longitude;

  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
  .then(res =>{

    setIsLoaded(true)
    setTemp(res.data.main.temp);
    setName(res.data.name);
    setHumidity(res.data.main.humidity)
    setMain(res.data.weather[0].main)

    // console.log(res);
   
  })
}

const getErr = (err)=>{
    console.log("Error: is: "+err)
    setErr(true)
}

const getTemp =(temp)=>{
    return Math.round(temp - 273.15)
} 

return(
    
  <div className="container">

    {isLoaded && (
        <div className="text-center">
          <Display temp={getTemp(temp)} name={name} humidity={humidity} main={main}/>
            <button className="btn btn-warning" onClick={()=>window.location.reload()}>Check Again</button>
        </div>
      )}

    <div  className="container">
    {!isLoaded && !err && (
        <>
        <Text/>
        <div className="text-center py-4">
            <button onClick={getLocation} className="btn btn-danger btn-lg">Get My Weather Info</button>
        </div>
        </>
    )}

    {err && (
        <>
            <Error/>
        </>
    )}
      
   <Footer path={"about"} name="About"/>
    </div>
  </div>
)

}

export default Home;