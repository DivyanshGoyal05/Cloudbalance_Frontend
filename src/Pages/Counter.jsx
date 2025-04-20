import React from "react";

const Counter = () => {

  const [count, setCount] = useState(0);

  increment(){
    useState(count+1);
  };

  decrement(){
    useState(count-1);
  };


  return <div>

  <button onClick={increment}>
    {count}
  </button>
  <button onClick={decrement}>
    {count}
  </button>
  </div>;
};

export default Counter;
