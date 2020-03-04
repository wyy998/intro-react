import { useState, ChangeEvent } from "react";
import React from "react";
import styles from "./index.module.css";

enum TemperatureFormat {
  Celsius = "Celsius",
  Fahrenheit = "Fahrenheit"
}

type TemperatureInputProps = {
  temp: string;
  type: TemperatureFormat;
  onTempChange: (temp: string, type: TemperatureFormat) => void;
};

function TemperatureInput(props: TemperatureInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onTempChange(e.target.value, props.type);
  };
  return (
    <fieldset>
      <legend>Temperature in {props.type}:</legend>
      <input value={props.temp} onChange={handleChange} />℃
    </fieldset>
  );
}

function BoilingVerdict() {
  const [temperature, setTemperature] = useState("0");
  const tempNum = parseFloat(temperature);
  const handleChange = (temp: string, type: TemperatureFormat) => {
    if (type === TemperatureFormat.Celsius) {
      setTemperature(temp);
    } else {
      const f = fahrenheitToCelsius(parseFloat(temp));
      setTemperature(f.toString());
    }
  };
  const celsiusToFahrenheit = (celsius: number) => {
    return (celsius * 9) / 5 + 32;
  };
  const fahrenheitToCelsius = (fahrenheit: number) => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  console.log(tempNum);
  return (
    <div className={styles.container}>
      <img
        src="https://img.mp.itc.cn/q_70,c_zoom,w_640/upload/20170407/84a2a06d7c8d4cde904f784200465bce_th.jpg"
        alt=""
        className={styles.imgWater}
      />
      <TemperatureInput
        type={TemperatureFormat.Celsius}
        temp={temperature}
        onTempChange={handleChange}
      />

      <TemperatureInput
        type={TemperatureFormat.Fahrenheit}
        temp={celsiusToFahrenheit(tempNum).toString()}
        onTempChange={handleChange}
      />
      {tempNum >= 100 ? (
        <p className={styles.textBoil}>The water would boil.</p>
      ) : (
        <p>The water would not boil.</p>
      )}
    </div>
  );
}

export default BoilingVerdict;
