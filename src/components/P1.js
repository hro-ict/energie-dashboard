import React, { useState } from "react";
import gas from "../Img/gs.png";
import elektrik from "../Img/elektrik.png";
// import tarife from "../Img/taife.png";
import return_ from "../Img/return.png";
import pm25 from "../Img/pm25.PNG";
import 'bootstrap/dist/css/bootstrap.min.css';
import CanvasJSReact from "../canvas/canvas"


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UtilityDashboard = React.memo(({ data, electricityData, gasData, returnData, pm25Data }) => {





///timestamp


//timestamp

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
          <span className="badge bg-warning">
 <h2 className="fw-bold text-primary mb-2"> Energy Dashboard</h2>
          </span>
       
  
      </div>
      {!selectedChart ? (
        <div className="row g-3">
          {/* Elektrik */}
          <div className="col-6 col-md-3 ">
            <div
              className="card p-3 shadow-sm text-center  d-flex justify-content-center align-items-center"
              style={{ cursor: "pointer", backgroundColor: 'rgba(200, 230, 201, 0.5)'}}
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
              className="card p-3 shadow-sm text-center d-flex  justify-content-center align-items-center"
              style={{ cursor: "pointer", backgroundColor: 'rgba(245, 221, 39, 0.5)' }}
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
            
              style={{ cursor: "pointer", backgroundColor: 'rgba(39, 245, 39, 0.5)' }}
              onClick={() => setSelectedChart("return_")}
            
            >
              <img src={return_} alt="Açıklama" width={50} height={50} />
              {/* <div className="text-small">Return</div> */}
              <div className="fw-bold h2 mt-4">{data.return}</div>
            </div>
          </div>

          {/* Tarife */}
          <div className="col-6 col-md-3">
            <div className="card p-3 shadow-sm text-center d-flex justify-content-center align-items-center"
                  style={{ cursor: "pointer", backgroundColor: 'rgba(245, 39, 77, 0.5)' }}
            >
            
              <img src={pm25} alt="Açıklama" width={50} height={50} />
              {/* <div className="text-small ">Tarife</div> */}
             <div className="fw-bold h2 mt-4">{pm25Data.value}</div>
            
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

<div className="mt-5 text-center">
<small className="text-muted fst-italic">
  🕐 Last update :{" "}
  <span className="fw-bold">
    {((new Date() - new Date(data.timestamp)) / (1000 * 60)).toFixed(0)}
  </span>{" "}
  minutes ago
</small>

</div>
     
    </div>
  );
});

export default UtilityDashboard;