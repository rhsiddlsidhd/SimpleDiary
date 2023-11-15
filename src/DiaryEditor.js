import { useRef, useState } from "react";

const DiaryEditor = () => {
  // ================
  const authorInput = useRef();
  const contentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      // alert("작성자는 최소 1글자 이상 입력해주세요.");
      //alert 대신 focus
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      alert("일기 본문은 최소 5글자 이상 입력해주세요.");
      //alert + focus
      contentInput.current.focus();
      return;
    }
    alert("저장 성공");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          // onChange={(e) => {
          //   //아래코드와 비교 기능은 동일 (하지만 ...스프레드 연산자 추천)
          //   setState({ ...state, author: e.target.value });
          // }}
          onChange={handleChangeState}
        />
        <div>
          <textarea
            ref={contentInput}
            name="content"
            value={state.content}
            // onChange={(e) => {
            //   setState({ author: state.author, content: e.target.value });
            // }}
            onChange={handleChangeState}
          />
        </div>
        <div>
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
