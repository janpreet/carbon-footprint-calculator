use wasm_bindgen_test::*;
use carbon_footprint_calculator::Calculator;
use wasm_bindgen::JsValue;
use serde_json::json;
use serde_wasm_bindgen;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_calculate_footprint() {
    let calculator = Calculator::new();
    let input = json!({
        "electricity": 100.0,
        "gas": 50.0,
        "car_miles": 1000.0,
        "flights": 2.0,
    });
    let input = serde_wasm_bindgen::to_value(&input).unwrap();

    let result = calculator.calculate(input).unwrap();
    let result: serde_json::Value = serde_wasm_bindgen::from_value(result).unwrap();

    let expected_footprint = 100.0 * 0.0005 + 50.0 * 0.005 + 1000.0 * 0.000404 + 2.0 * 0.24;
    assert!((result["footprint"].as_f64().unwrap() - expected_footprint).abs() < f64::EPSILON);
}
