import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comments } from "../../types/types";
import { CommentsEdit } from "../../types/types";

function Comment() {
  const { id } = useParams();

  // const commentId = res.data.data.commentId

  //댓글 조회
  //기존 댓글 불러오기
  const [comments, setComments] = useState<Comments[]>([]);
  const getComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipes/find/${id}`
      );
      // console.log(res.data.data);
      setComments(res.data.data.comments);
    } catch (error) {
      console.log("에러입니다");
    }
  };

  useEffect(() => {
    getComments();
  }, [comments]);

  // 댓글 추가
  // 새로 등록한 댓글
  const [newComment, setNewComment] = useState("");
  // 새로 등록한 댓글이 추가된 리스트
  const [commentList, setCommentList] = useState([] as any);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
    access: string;
    refresh: string;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newComment) {
      alert("댓글을 입력해주세요.");
    } else {
      // const commentValue = document.getElementsByTagName("input")[0].value;
      setCommentList((commentList: any) => [newComment, ...commentList]);
      console.log(commentList);
      setNewComment("");

      try {
        const headers = {
          Authorization: `Bearer ${token.access}`,
        };

        const url = `${
          import.meta.env.VITE_API_URL
        }/recipes/comment/create/${id}`;

        const data = {
          commentContent: newComment,
        };

        await axios.post(url, data, { headers });
      } catch (error) {
        console.log("에러입니다", { error });
      }
    }
  };

  // 댓글 수정
  //댓글 수정상태 저장
  const [editComment, setEditComment] = useState("");

  //댓글 수정 버튼 클릭 시
  const handleEditComment = (commentId: number) => {};

  //해당 댓글의 내용을 댓글 수정 상태에 반영

  //댓글 저장(수정) 버튼 클릭 시
  const handleSaveComment = (commentId: number) => {
    //댓글 수정 완료 후 댓글 목록 상태 업데이트
    const updatedComeents = comments.map;
  };

  //Request
  //   {
  //     "commentId": 1,
  //     "commentContent": "맛있다냥냥"
  // }

  //Response
  // {
  //   "data": {
  //     "recipeId": 1,
  //     "userId": 21,
  //     "commentId": 1,
  //     "commentContent": "맛있다냥냥",
  //     "createdAt": "2023-07-24 02:27:28",
  //     "modifiedAt": "2023-07-24 02:29:21"
  //   }
  // }

  const updateComment = async (commentId: number) => {
    console.log(commentId);
    // 수정 버튼을 누르면

    // 입력창이 뜬다

    // 다시 제출 버튼을 눌렀을 때
    if (!newComment) {
      alert("댓글을 입력해주세요.");
    } else {
      if (window.confirm("게시글을 수정하시겠습니까?")) {
        setEditComment(editComment);
        try {
          const headers = {
            Authorization: `Bearer ${token.access}`,
          };

          const url = `${
            import.meta.env.VITE_API_URL
          }/recipes/comment/delete/${commentId}`;

          const data = { commentId: { commentId }, commentContent: newComment };

          await axios.patch(url, data, { headers });
        } catch (error) {
          console.log("에러입니다", { error });
        }
      }
    }
  };

  //댓글 삭제
  const deleteComment = async (commentId: number) => {
    console.log(commentId);

    //  /recipes/comment/update/1

    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        const headers = {
          Authorization: `Bearer ${token.access}`,
        };

        const url = `${
          import.meta.env.VITE_API_URL
        }/recipes/comment/delete/${commentId}`;

        await axios
          .delete(url, { headers })

          .then(() => {
            alert("삭제되었습니다.");
          });
      } catch (error) {
        console.log("에러입니다", { error });
      }
    }
  };

  return (
    <CommentWrapper>
      <section>
        <div className="content-title">댓글 목록</div>

        <ul>
          <div className="content">
            {comments.map((comment: any) => (
              <ContentsWrapper>
                <li key={comment.commentId}>
                  <Contents>
                    <div className="comment">{comment.commentContent}</div>
                    <div className="time">{comment.createdAt}</div>
                  </Contents>
                  <ButtonContainer>
                    <span
                      className="editCommentButton"
                      onClick={() => updateComment(comment.commentId)}
                    >
                      수정
                    </span>
                    <span
                      className="deleteCommentButton"
                      onClick={() => deleteComment(comment.commentId)}
                    >
                      삭제
                    </span>
                  </ButtonContainer>
                </li>
              </ContentsWrapper>
            ))}
            <Input>
              <form onSubmit={onSubmit}>
                <input
                  className="inputForm"
                  type="text"
                  placeholder="댓글을 달아주세요 💬"
                  value={newComment}
                  onChange={onChange}
                ></input>

                <button className="commentButton">등록</button>
              </form>
            </Input>
          </div>
        </ul>
      </section>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  width: 100%;
  padding: 8px;
  padding-bottom: 100px;

  .content-title {
    font-size: 30px;
    margin-top: 6px;
  }
  .name {
    font-size: 12px;
  }
`;

const ContentsWrapper = styled.div`
  border-radius: 30px;
  margin-bottom: 2px;
  background-color: #ececec;
  height: 90px;
  font-size: 14px;
`;

const Contents = styled.div`
  margin-left: 15px;
  .comment {
    margin-top: 10px;
    font-size: 18px;
  }

  .time {
    font-size: 14px;
    color: grey;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-right: 9px;
  text-align: right;
  cursor: pointer;
  span {
    margin-right: 3px;
    background-color: #626883;
    color: #f5f1e9;
    height: 50px;
    width: 80px;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
  }
`;

const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
  }
  .inputForm {
    margin-top: 20px;
    margin-bottom: 10px;
    height: 100px;
    width: 100%;
  }

  .commentButton {
    height: 35px;
    width: 15%;
    float: right;
  }
`;

export default Comment;
