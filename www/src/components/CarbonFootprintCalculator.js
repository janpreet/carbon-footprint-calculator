import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import init, { Calculator } from 'carbon_footprint_calculator';

const CarbonFootprintCalculator = () => {
  const [calculator, setCalculator] = useState(null);
  const [electricity, setElectricity] = useState('');
  const [gas, setGas] = useState('');
  const [carMiles, setCarMiles] = useState('');
  const [flights, setFlights] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const idealFootprint = 2.0;

  useEffect(() => {
    init().then(() => {
      setCalculator(new Calculator());
    });

    const savedHistory = localStorage.getItem('footprintHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const calculateFootprint = () => {
    if (!calculator) return;

    const input = {
      electricity: parseFloat(electricity) || 0,
      gas: parseFloat(gas) || 0,
      car_miles: parseFloat(carMiles) || 0,
      flights: parseFloat(flights) || 0,
    };

    const result = calculator.calculate(input);
    const newFootprint = parseFloat(result.footprint.toFixed(2));
    setResult(newFootprint);
    
    const newHistory = [...history, { date: new Date().toLocaleDateString(), footprint: newFootprint, ideal: idealFootprint }];
    setHistory(newHistory);
    
    localStorage.setItem('footprintHistory', JSON.stringify(newHistory));
  };

  const resetCalculator = () => {
    setElectricity('');
    setGas('');
    setCarMiles('');
    setFlights('');
    setResult(null);
    setHistory([]);
    localStorage.removeItem('footprintHistory');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto" style={{ backgroundColor: '#5e5b80', color: '#dbd1c2' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Carbon Footprint Calculator</h1>
      <div className="mb-6 p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#dbd1c2', color: '#5e5b80' }}>
        <div className="grid gap-4">
          <input 
            type="number" 
            placeholder="Monthly Electricity Usage (kWh)" 
            value={electricity} 
            onChange={(e) => setElectricity(e.target.value)}
            className="w-full p-2 rounded" style={{ backgroundColor: '#5e5b80', color: '#dbd1c2' }}
          />
          <input 
            type="number" 
            placeholder="Monthly Natural Gas Usage (therms)" 
            value={gas} 
            onChange={(e) => setGas(e.target.value)}
            className="w-full p-2 rounded" style={{ backgroundColor: '#5e5b80', color: '#dbd1c2' }}
          />
          <input 
            type="number" 
            placeholder="Monthly Car Miles Driven" 
            value={carMiles} 
            onChange={(e) => setCarMiles(e.target.value)}
            className="w-full p-2 rounded" style={{ backgroundColor: '#5e5b80', color: '#dbd1c2' }}
          />
          <input 
            type="number" 
            placeholder="Number of Flights per Year" 
            value={flights} 
            onChange={(e) => setFlights(e.target.value)}
            className="w-full p-2 rounded" style={{ backgroundColor: '#5e5b80', color: '#dbd1c2' }}
          />
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={calculateFootprint} 
              className="w-full p-2 rounded transition-colors"
              style={{ backgroundColor: '#ff8787', color: '#5e5b80' }}
              disabled={!calculator}
            >
              Calculate
            </button>
            <button 
              onClick={resetCalculator} 
              className="w-full p-2 rounded transition-colors"
              style={{ backgroundColor: '#71cbff', color: '#5e5b80' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {result !== null && (
        <div className="mb-6 p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#dbd1c2', color: '#5e5b80' }}>
          <h2 className="text-2xl font-bold mb-2">Your Carbon Footprint</h2>
          <p className="text-4xl font-bold" style={{ color: result > idealFootprint ? '#ff8787' : '#a3e487' }}>
            {result} tons CO2e/year
          </p>
          <p className="mt-2">Ideal footprint: {idealFootprint} tons CO2e/year</p>
          <p className="mt-2" style={{ color: result > idealFootprint ? '#ff8787' : '#a3e487' }}>
            {result > idealFootprint 
              ? `Your footprint is ${(result - idealFootprint).toFixed(2)} tons above the ideal.` 
              : `Great job! Your footprint is ${(idealFootprint - result).toFixed(2)} tons below the ideal.`}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#dbd1c2', color: '#5e5b80' }}>
          <h2 className="text-2xl font-bold mb-4">Your Footprint History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#5e5b80" />
              <XAxis dataKey="date" stroke="#5e5b80" />
              <YAxis stroke="#5e5b80" />
              <Tooltip contentStyle={{ backgroundColor: '#5e5b80', border: 'none', color: '#dbd1c2' }} />
              <Legend />
              <Line type="monotone" dataKey="footprint" stroke="#ff8787" />
              <Line type="monotone" dataKey="ideal" stroke="#a3e487" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;