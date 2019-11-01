import React from "react";

type Props = {
  count: number;
  label: string;
  onIncrement?: () => void;
};

const Counter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    if (onIncrement) {
      onIncrement();
    } else {
      // throw new Error("on increment event not defined!");
    }
  };

  return (
    <div>
      <span>
        {label} : {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

export default Counter;
