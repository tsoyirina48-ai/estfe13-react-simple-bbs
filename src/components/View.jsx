import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router";

export default function View({ handleModify }) {
  const [content, setContent] = useState({
    id: '',
    writer: '',
    title: '',
    content: '',
    date: '',
  });
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/view?id=${id}`)
      .then(response => {
        if (!response.data || response.data.length === 0) {
          setIsError(true);
          return;
        }

        const data = response.data[0];
        setContent({
          id: data.id,
          writer: data.writer,
          title: data.title,
          content: data.content,
          date: data.date,
        });
      })
      .catch(error => {
        console.error(error);
        //setIsError(true);
      });
  }, [id]);

  if (isError) {
    return (
      <div>
        <p>글을 불러오지 못했습니다.</p>
        <p>게시글 번호를 다시 확인해주세요.</p>
        <Link to="/" className="btn btn-primary">
          목록으로 이동
        </Link>
      </div>
    );
  }

  const handleClick = () => {
    handleModify(content.id || id);
  };

  return (
    <>
      <h2>{content.title}</h2>
      <div className="d-flex justify-content-between">
        <p>글쓴이 {content.writer}</p>
        <p>{content.date}</p>
      </div>
      <hr />
      <p>{content.content}</p>
      <hr />
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/" className="btn btn-primary">
          목록
        </Link>
        <Button variant="secondary" onClick={handleClick}>
          수정
        </Button>
        <Button variant="danger">
          삭제
        </Button>
      </div>
    </>
  );
}
