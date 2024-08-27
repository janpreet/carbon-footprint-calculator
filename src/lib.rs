use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[wasm_bindgen]
pub struct Calculator;

#[derive(Deserialize)]
pub struct FootprintInput {
    electricity: f64,
    gas: f64,
    car_miles: f64,
    flights: f64,
}

#[derive(Serialize)]
pub struct FootprintResult {
    footprint: f64,
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Calculator
    }

    pub fn calculate(&self, input: JsValue) -> Result<JsValue, JsValue> {
        let input: FootprintInput = serde_wasm_bindgen::from_value(input)?;
        let footprint = 
            input.electricity * 0.0005 +
            input.gas * 0.005 +
            input.car_miles * 0.000404 +
            input.flights * 0.24;
        
        let result = FootprintResult { footprint };
        Ok(serde_wasm_bindgen::to_value(&result)?)
    }
}

#[wasm_bindgen]
pub fn set_panic_hook() {
    console_error_panic_hook::set_once();
}