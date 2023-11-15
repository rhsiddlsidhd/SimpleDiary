import { useRef, useState } from "react";

const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onRemove,
  onEdit,
}) => {
  const localContentInput = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const [localContent, setLocalContent] = useState(content);

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

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
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>Edit Cancel</button>
          <button onClick={handleEdit}>Edit Complete</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>Remove</button>
          <button onClick={toggleIsEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
