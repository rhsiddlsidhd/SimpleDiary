const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onDelete,
}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
      </div>
      <span className="date">
        {/*  new Date.toLocalDateString() 현재 날짜를 문자열로 변환하고, 사용자의 지역 설정에 따라 날짜 형식을 적용하여 그 값을 반환 */}
        {new Date(created_date).toLocaleDateString()}
      </span>
      <div className="content">{content}</div>
      <button
        onClick={() => {
          if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DiaryItem;