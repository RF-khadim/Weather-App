import React, { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8a3c5809abc84826b3fed4651ee1bc08`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-r from-pink-400 to-pink-700 m-0 p-0 flex justify-center items-center'>
      <div className='h-[520px] w-96 bg-black/40 flex px-3 py-6 rounded-md flex-col'>
        <div className='w-full py-2 flex bg-white rounded-full mt-6'>
          <input
            className='py-2 w-72 border-none outline-none rounded-full pl-3 text-lg'
            type="text"
            placeholder='Enter the city name'
            value={location}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <MdOutlineSearch className='text-3xl w-9 h-9 pt-1' />
          </button>
        </div>
        {data && (
          <div className='flex items-center justify-center flex-col mt-20'>
            <h1 className='text-3xl font-extrabold mt-4 text-white'>{data.name}</h1>
            <h1 className='text-3xl font-extrabold mt-4 text-white'>{data.weather[0].main}</h1>
            <h1 className='text-3xl font-extrabold mt-4 text-white'>Temprature:{data.main.temp} F</h1>
            <div className='flex items-center justify-evenly w-full mt-10 bg-white/10 rounded-md pb-2'>
              <p className='text-xl mt-3 font-semibold text-white'>Humidity:{data.main.humidity}%</p>
              <p className='text-xl mt-3 font-semibold text-white'>WS:{data.wind.speed} KMH</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;