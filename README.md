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

## Using the Carbon Footprint Calculator Crate

The Carbon Footprint Calculator is available as a Rust crate that can be easily integrated into your Rust projects, especially those targeting WebAssembly.

### Adding the Crate to Your Project

To use the Carbon Footprint Calculator in your Rust project, add it to your `Cargo.toml`:

```toml
[dependencies]
carbon_footprint_calculator = "0.1.0"
```

### Basic Usage

Here's a basic example of how to use the Carbon Footprint Calculator in your Rust code:

```rust
use carbon_footprint_calculator::Calculator;

fn main() {
    let calculator = Calculator::new();
    
    let input = serde_json::json!({
        "electricity": 500.0,  // kWh per month
        "gas": 50.0,           // therms per month
        "car_miles": 1000.0,   // miles per month
        "flights": 2.0         // flights per year
    });

    match calculator.calculate(input.into()) {
        Ok(result) => {
            let footprint: f64 = result.into_serde().unwrap();
            println!("Your carbon footprint is approximately {} tons CO2e/year", footprint);
        },
        Err(e) => println!("Error calculating footprint: {:?}", e),
    }
}
```

### WebAssembly Usage

This crate is particularly useful in WebAssembly contexts. Here's how you might use it in a web application:

```javascript
import init, { Calculator } from 'carbon_footprint_calculator';

async function calculateFootprint() {
    await init();
    const calculator = new Calculator();
    
    const input = {
        electricity: 500,  // kWh per month
        gas: 50,           // therms per month
        car_miles: 1000,   // miles per month
        flights: 2         // flights per year
    };

    const result = calculator.calculate(input);
    console.log(`Your carbon footprint is approximately ${result.footprint.toFixed(2)} tons CO2e/year`);
}

calculateFootprint();
```

For more detailed usage instructions and API documentation, please refer to the [crate documentation](https://docs.rs/carbon_footprint_calculator).

## Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch.
