import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Write({ isModifyMode, boardId, handleCancel }) {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    name: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    if (!isModifyMode || !boardId) return;

    axios
      .get(`http://localhost:3000/view?id=${boardId}`)
      .then(response => {
        if (!response.data || response.data.length === 0) {
          alert("글을 찾을 수 없습니다.");
          navigate("/");
          return;
        }

        const data = response.data[0];
        setContent({
          name: data.writer,
          title: data.title,
          content: data.content,
        });
      })
      .catch(error => {
        console.error(error);
        alert("글을 불러오지 못했습니다.");
        navigate("/");
      });
  }, [isModifyMode, boardId, navigate]);

  const validate = e => {
    const name = e.target.name.value.trim();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();

    if (!name || !title || !content) {
      alert("모든 내용을 작성해주세요.");
      return null;
    }

    return {
      name,
      title,
      content,
    };
  };

  const write = e => {
    e.preventDefault();
    const formData = validate(e);
    if (!formData) return;

    axios
      .post("http://localhost:3000/write", formData)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const update = e => {
    e.preventDefault();
    const formData = validate(e);
    if (!formData) return;

    axios
      .post("http://localhost:3000/update", {
        ...formData,
        id: boardId,
      })
      .then(() => {
        handleCancel();
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleClick = () => {
    handleCancel();
    navigate("/");
  };

  return (
    <>
      <h2 className="mb-3">{isModifyMode ? "글 수정" : "글 쓰기"}</h2>
      <Form onSubmit={isModifyMode ? update : write}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={content.name}
            placeholder="이름을 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            defaultValue={content.title}
            placeholder="제목을 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            defaultValue={content.content}
            rows={3}
          />
        </Form.Group>
        <div className="d-flex gap-1 justify-content-end">
          <Button type="submit" variant="primary">
            {isModifyMode ? "수정" : "입력"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClick}>
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}
