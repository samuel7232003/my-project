import React, { useState, ChangeEvent } from "react";
import styles from "./price-range-slider.module.css";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  onChange?: (minValue: number, maxValue: number) => void;
}

export default function PriceRangeSlider({
  min,
  max,
  step = 1,
  onChange
}: PriceRangeSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue);
    setMinValue(value);
    onChange?.(value, maxValue); // ✅ gọi trực tiếp khi thay đổi
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue);
    setMaxValue(value);
    onChange?.(minValue, value); // ✅ gọi trực tiếp khi thay đổi
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.priceValues}>
        <span>${minValue}</span> - 
        <span>{maxValue >= max ? `$${max}+` : `$${maxValue}`}</span>
      </div>
      <div className={styles.sliderTrack} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className={`${styles.thumb} ${styles.thumbLeft}`}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
        className={`${styles.thumb} ${styles.thumbRight}`}
      />
    </div>
  );
}
