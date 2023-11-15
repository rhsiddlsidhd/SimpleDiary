import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList, onDelete }) => {
  //프롭 받을때 { } 잊지말자 ^^
  console.log(diaryList);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

//undefined 라는 전달될 것 같은 프롭들을 기본값으로 설정할 수 있는 기능
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
