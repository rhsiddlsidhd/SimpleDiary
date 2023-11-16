import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  //API
  const getDate = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments`
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  // //API호출확인
  useEffect(() => {
    getDate();
  }, []);

  const onCraete = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      emotion,
      content,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;

    // useCallback 함수형으로 전달
    return setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;

    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  // useMemo( ()=>{callback},[] ) dependency array
  // 실수 많은 부분
  // useMemo 는 callback 함수가 리턴하는 값을 그냥 리턴을 한다
  // 그러므로 getDiaryAnalysis 값을 리턴 받게 되는 것
  // 함수가 아닌 값을 사용하여야 하여 아래와 같이 사용

  //비구조화 할당
  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); //함수사용
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //값을 사용
  return (
    <div className="App">
      <DiaryEditor onCraete={onCraete} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
