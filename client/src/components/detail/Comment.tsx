import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
}

export interface CommentList {
  id: number;
  name: string;
  content: string;
  date: string;
}

function CommentForm() {
  const [comments, setComments] = useState<CommentList[]>([]);
  //새로 입력하는 댓글
  const [newComment, setNewComment] = useState<string>("");
  const [editComment, setEditComment] = useState<CommentList | null>(null);

  useEffect(() => {
    axios.get("http://localhost:5173/moks/comment.json").then((res) =>
      //   {
      //     console.log(res.data);}
      setComments(res.data)
    );
  }, []);

  const addComment = () => {
    if (newComment !== "") {
      const comment: CommentList = {
        id: Date.now(),
        name: "신영",
        content: newComment,
        date: "2020-10-10",
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const editExistingComment = (comment: CommentList) => {
    setEditComment(comment);
    setNewComment(comment.content);
  };

  const updateComment = () => {
    if (editComment && newComment !== "") {
      const updatedComments = comments.map((comment) => {
        if (comment.id === editComment.id) {
          return {
            ...comment,
            content: newComment,
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setNewComment("");
      setEditComment(null);
    }
  };

  const deleteComment = (comment: CommentList) => {
    const filteredComments = comments.filter(
      (existingComment) => existingComment.id !== comment.id
    );
    setComments(filteredComments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editComment) {
      updateComment();
    } else {
      addComment();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <CommentWrapper>
      <section>
        <div className="content-title">댓글 목록</div>
        <ul>
          <div className="content">
            {comments.map((comment) => (
              <Contents>
                <li key={comment.id}>
                  <div className="comment">{comment.content}</div>
                  <div className="name">{comment.name}</div>
                  <div className="time">{comment.date}</div>
                  <button onClick={() => editExistingComment(comment)}>
                    수정
                  </button>
                  <button onClick={() => deleteComment(comment)}>삭제</button>
                </li>
              </Contents>
            ))}
          </div>
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={handleChange}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit">{editComment ? "수정" : "추가"}</button>
        </form>
      </section>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  width: 100%;
  padding: 8px;
  .content-title {
    font-size: 30px;
    margin-top: 6px;
  }
  .content {
    margin-top: 10px;
    padding-left: 8px;
  }
  .comment {
    margin-top: 10px;
    font-size: 18px;
  }

  .time {
    font-size: 12px;
  }

  .name {
    font-size: 12px;
  }
`;

const Contents = styled.div`
  border-radius: 30px;
  margin-bottom: 2px;
  background-color: #ececec;
`;

export default CommentForm;
