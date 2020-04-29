
import React from 'react';
import {Pie} from 'react-chartjs-2';



export default function PieWorld({nepal})
{
    
var deaths, confirmed, recovered;
nepal.map(nepal=>{
    deaths = nepal.deaths;
    confirmed = nepal.confirmed;
    recovered=nepal.recovered
    return nepal
})
var data = {labels: [
    'Deaths',
    'Recovered',
    'Confirmed'
],
datasets: [{
    data:[deaths,recovered,confirmed],
    backgroundColor: [
    '#FF6384',
    '#23e620',
    '#FFCE56'
    ],
}]}

    return (
      <div>
        <Pie height='40' data= {data} />
      </div>
    );
  }