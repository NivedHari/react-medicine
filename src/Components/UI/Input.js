import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        ref={ref}
        min={props.min}
        max={props.max}
        step={props.step}
        defaultValue={props.defaultValue}
      />
    </div>
  );
});

export default Input;
