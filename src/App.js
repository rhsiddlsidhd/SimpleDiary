import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCraete = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      emotion,
      content,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;

    //새로운 일기가 위로 올라오게 하기 위해
    return setData([newItem, ...data]);
  };

  return (
    <div className="App">
      <DiaryEditor onCraete={onCraete} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
