import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

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

    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  };

  // //API호출확인
  useEffect(() => {
    getDate();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // 아래는 reducer에서 만들어 쓰려고 위에 첨가하지 않음
    // const created_date = new Date().getTime();

    //dispatch로 변형
    // const newItem = {
    //   author,
    //   emotion,
    //   content,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;

    // useCallback 함수형으로 전달
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);
  // memo를 활용하는 이유는 최적화가 풀리지 않게 묶어주어야함
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onEdit, onRemove };
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
