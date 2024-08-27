# Carbon Footprint Calculator

This project is a Carbon Footprint Calculator implemented using Rust WebAssembly and React.

## Project Structure

- `src/`: Rust WASM
- `tests/`: tests
- `www/`: frontend

## Calculator Logic

The carbon footprint is calculated based on four main factors:

1. Electricity Usage
2. Natural Gas Usage
3. Car Miles Driven
4. Number of Flights Taken

### Calculation Formula

The total carbon footprint (in tons of CO2 equivalent per year) is calculated as follows:

```
Carbon Footprint = (Electricity * 0.0005) + (Gas * 0.005) + (CarMiles * 0.000404) + (Flights * 0.24)
```

Where:
- Electricity is in kWh per month
- Gas is in therms per month
- CarMiles is miles driven per month
- Flights is the number of flights per year

### Reasoning behind the coefficients:

1. Electricity (0.0005 tons CO2e/kWh):
   This is based on the average CO2 emissions per kWh in the US. It may vary depending on the energy mix in different regions.

2. Natural Gas (0.005 tons CO2e/therm):
   This coefficient is derived from the CO2 emissions produced by burning natural gas.

3. Car Miles (0.000404 tons CO2e/mile):
   This is based on the average emissions of a passenger vehicle. It may vary depending on the specific vehicle's fuel efficiency.

4. Flights (0.24 tons CO2e/flight):
   This is a rough estimate for an average flight. Long-haul flights would have a higher impact, while short flights would have a lower impact.

Please note that this is a basic approximation and may not reflect the most up-to-date or regionally specific emissions factors. For more accurate calculations, consider using data from reputable sources such as:

- [EPA's Greenhouse Gas Equivalencies Calculator](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator)
- [The Carbon Trust's Conversion Factors](https://www.carbontrust.com/resources/conversion-factors-energy-and-carbon-conversions)
- [IPCC's Emission Factor Database](https://www.ipcc-nggip.iges.or.jp/EFDB/main.php)

Future versions of this calculator aim to incorporate more accurate and region-specific data for improved estimations.

## Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch.
