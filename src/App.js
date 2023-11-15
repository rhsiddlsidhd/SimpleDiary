import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "이정환",
    content: "하이 1",
    emotion: 1,
    //getTime = 시간의 값을 받아서 milliseconds로 시간(number)을 돌려주는 함수
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "아무개",
    content: "하이 1",
    emotion: 2,
    //getTime = 시간의 값을 받아서 milliseconds로 시간(number)을 돌려주는 함수
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "강아지",
    content: "하이 1",
    emotion: 3,
    //getTime = 시간의 값을 받아서 milliseconds로 시간(number)을 돌려주는 함수
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "고양이",
    content: "하이 1",
    emotion: 4,
    //getTime = 시간의 값을 받아서 milliseconds로 시간(number)을 돌려주는 함수
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "토끼",
    content: "하이 1",
    emotion: 5,
    //getTime = 시간의 값을 받아서 milliseconds로 시간(number)을 돌려주는 함수
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
