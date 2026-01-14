
import React, { useState, useEffect} from 'react';
import './App.css';
import UtilityDashboard from './components/P1';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {  doc,  onSnapshot } from 'firebase/firestore';

import db from "./components/firestore"

function App() {


  const [p1Data, setP1Data]= useState([])
  const [week_elektrik, setWeekelektrik]= useState([])
  const [week_gaz, setWeekgaz]= useState([])
  const[week_return, setWeekreturn]= useState([])
  const [pm25_data, setPM25Data]= useState([])
   const [sds011_pm25Data, setsds011_pm25Data]= useState([])
   //const [sds011_pm10Data, setsds011_pm10Data]= useState([])


useEffect(() => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formatted = `${day}-${month}-${year}`; // 12-08-2025

  const refToday = doc(db, "p1", formatted);
  const refElektrik = doc(db, "p1", "week_elektrik");
  const refGaz = doc(db, "p1", "week_gaz");
  const refPM25 = doc(db, "p1", "pm2.5");
  const refSDS011PM25= doc(db, "p1", "sds011_pm25");

  const refReturn = doc(db, "p1", "week_return");

  const unsubToday = onSnapshot(refToday, (snapshot) => {
    if (snapshot.exists()) {
      const data = { id: snapshot.id, ...snapshot.data() };
      console.log("Bugünkü veri:", data);
      setP1Data(data);
    } else {
      console.log("Bugünkü veri bulunamadı");
    }
  }, (error) => {
    console.error("Firestore error:", error);
  });

  const unsubElektrik = onSnapshot(refElektrik, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log("Haftalık elektrik:", data.data);
      const updatedData = data.data.map(item => {
  const { usage, day, ...rest } = item;
  return {
    y: usage,
    label: day,
    indexLabel: day,
    ...rest
  };
});

      setWeekelektrik(updatedData);
    } else {
      console.log("Haftalık elektrik verisi bulunamadı");
    }
  });

  const unsubGaz = onSnapshot(refGaz, (snapshot) => {
    if (snapshot.exists()) {
      const data_gas = snapshot.data();
           const updatedData_gas = data_gas.data.map(item => {
  const { usage, day, ...rest } = item;
  return {
    y: usage,
    label: day,
    indexLabel: day,
    ...rest
  };
});

      setWeekgaz(updatedData_gas);
    } else {
      console.log("Haftalık gaz verisi bulunamadı");
    }
  });



   const unsubReturn = onSnapshot(refReturn, (snapshot) => {
    if (snapshot.exists()) {
      const data_return = snapshot.data();
           const updatedData_return = data_return.data.map(item => {
  const { usage, day, ...rest } = item;
  return {
    y: usage,
    label: day,
    indexLabel: day,
    ...rest
  };
});

      setWeekreturn(updatedData_return);
    } else {
      console.log("Haftalık return  verisi bulunamadı");
    }
  });


//pm2.5

 const unsubPM25 = onSnapshot(refPM25, (snapshot) => {
    console.log("PM25 snapshot:", snapshot);
    if (snapshot.exists()) {
      const data_pm25 = snapshot.data()
      console.log("PM25:", data_pm25.value);
      setPM25Data(data_pm25);


    } else {
      console.log("PM25 verisi bulunamadı");
    }
  });


//sds011 pm25

 const unsubSDS011PM25 = onSnapshot(refSDS011PM25, (snapshot) => {
    console.log("PM25 snapshot:", snapshot);
    if (snapshot.exists()) {
      const data_sds011pm25 = snapshot.data()
      console.log("PM25:", data_sds011pm25.value);
      setsds011_pm25Data(data_sds011pm25);


    } else {
      console.log("PM25 verisi bulunamadı");
    }
  });




  // cleanup
  return () => {
    unsubToday();
    unsubElektrik();
    unsubGaz();
    unsubReturn();
    unsubPM25();
    unsubSDS011PM25();
  };
}, []);


  return (
    <div className="App">
        <UtilityDashboard
        data= {p1Data}
        electricityData= {week_elektrik}
        gasData = {week_gaz}
        returnData= {week_return}
         pm25Data={pm25_data}
         sds011_pm25Data= {sds011_pm25Data}
        
        />
    </div>
  );
}

export default App;