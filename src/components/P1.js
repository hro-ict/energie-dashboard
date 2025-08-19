import React, { useState } from "react";
import gas from "../Img/gs.png";
import elektrik from "../Img/elektrik.png";
import tarife from "../Img/taife.png";
import return_ from "../Img/return.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import CanvasJSReact from "../canvas/canvas"


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UtilityDashboard = React.memo(({ data, electricityData, gasData, returnData }) => {


  console.log("Elecytrik data:", electricityData)


  const [selectedChart, setSelectedChart] = useState(null);

  const chartMap = {
    electric: { color: "#f59e0b", data: electricityData, unit: "kWh", title: "Haftalik Elektrik Kullanimi" },
    gas: { color: "#ef4444", data: gasData, unit: "m³", title: "Haftalik Gaz Kullanimi" },

    return_: { color: "#444fefff", data: returnData, unit: "kWh", title: "Haftalik Return" },

   
  };

  // options sadece selectedChart varsa oluşturulmalı
  const options = selectedChart
    ? {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {text: chartMap[selectedChart].title},
        axisY: { includeZero: true },
       axisX:{
    gridThickness: 0,
    tickLength: 0,
    lineThickness: 0,
    labelFormatter: function(){
      return " ";
    }
  },
        dataPointWidth: 20,
        // exportEnabled: false,
        toolTip:{
   enabled: false,
 },
        data: [
          {
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
          
            dataPoints: chartMap[selectedChart].data,
          },
        ],
      }
    : null;

  return (
    <div className="container ">

        <div className="text-center mb-4 py-3">
        <h2 className="fw-bold text-primary mb-2">⚡ Enerji Dashboard</h2>
  
      </div>
      {!selectedChart ? (
        <div className="row g-3">
          {/* Elektrik */}
          <div className="col-6 col-md-3">
            <div
              className="card p-3 shadow-sm text-center d-flex justify-content-center align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedChart("electric")}
            >
              <img src={elektrik} alt="Açıklama" width={50} height={50} />
              {/* <div className="text-small">Elektrik</div> */}
              <div className="fw-bold h2 mt-4">{data.elektrik}  </div>
            </div>
          </div>

          {/* Gaz */}
          <div className="col-6 col-md-3">
            <div
              className="card p-3 shadow-sm text-center d-flex justify-content-center align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedChart("gas")}
            >
              <img src={gas} alt="Açıklama" width={50} height={50} />
              {/* <div className="text-small">Gaz</div> */}
              <div className="fw-bold h2 mt-4">{data.gaz} </div>
            </div>
          </div>

          {/* Teruglevering */}
          <div className="col-6 col-md-3">
            <div className="card p-3 shadow-sm text-center d-flex justify-content-center align-items-center"
            
             style={{ cursor: "pointer" }}
              onClick={() => setSelectedChart("return_")}
            
            >
              <img src={return_} alt="Açıklama" width={50} height={50} />
              {/* <div className="text-small">Return</div> */}
              <div className="fw-bold h2 mt-4">{data.return}</div>
            </div>
          </div>

          {/* Tarife */}
          <div className="col-6 col-md-3">
            <div className="card p-3 shadow-sm text-center d-flex justify-content-center align-items-center">
              <img src={tarife} alt="Açıklama" width={50} height={50} />
              {/* <div className="text-small ">Tarife</div> */}
             <div className="fw-bold h2 mt-4">{data.tarife}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
         onClick={() => setSelectedChart(null)}

          style={{ cursor: "pointer"}}
        >
          {options && (
            <CanvasJSChart
              options={options}
              containerProps={{ width: '100%', height: '300px' }}
             
            />
          )}
        </div>
      )}
    </div>
  );
});

export default UtilityDashboard;