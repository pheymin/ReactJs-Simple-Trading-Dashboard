import React, { useState, useEffect } from 'react'
import './index.css'

export default function Profile() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users/2');
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='container profile-container'>
      <img id='profile-cover' src="/src/assets/Mask Group 2.png" alt="cover" />
      <div className='info-container'>
        <h4>{data.first_name} {data.last_name}</h4>
        <h5>{data.email}</h5>
        <div className='flex btn-container'>
          <button id='button1'>Connect</button>
          <button id='button2'>Message</button>
        </div>
      </div>
      <div className='avatar'>
        <img src={data.avatar} alt="avatar" />
      </div>
    </div>
  )
}
