import { useEffect, useState } from "react";

const UnmonutTest = () => {
  useEffect(() => {
    console.log("Mount");

    return () => {
      //Unmount 시점에 실행하게 됨
      console.log("Unmount");
    };
  }, []);
  return <div>Unmount Testing Component</div>;
};

const LifeCycle = () => {
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");
  const [isVisble, setIsVisble] = useState(false);
  const toggle = () => {
    setIsVisble(!isVisble);
  };

  // useEffect(() => {
  //   console.log("mount!");
  // }, []);

  // useEffect(() => {
  //   console.log("update!");
  // });

  // useEffect(() => {
  //   console.log(`count! is update ${count}`);
  //   if (count > 5) {
  //     alert("5를 넘었어!");
  //     setCount(1);
  //   }
  // }, [count]);

  // useEffect(() => {
  //   console.log(`text! is update ${text}`);
  // }, [text]);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <button onClick={toggle}>On/Off</button>
      {/* 단락회로평가 */}
      {isVisble && <UnmonutTest />}
    </div>
  );
};

export default LifeCycle;
