import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { Comments } from "../../types/types";
import { CommentsPost } from "../../types/types";
import { CommentsEdit } from "../../types/types";
import { Ingredients } from "../../types/types";
import { RecipeDetail } from "../../types/types";

function CommentForm() {
  const { recipeId } = useParams();

  //데이터 불러오기
  // let data;
  // axios.get(BASE_URL + `recipes/find/${recipeId}`).then(function (res) {
  //   data = [...res.data];
  //   console.log(data);
  // });

  // const userId = data.data.comments.userId;
  // const commentId = data.data.comments.commentId;
  // console.log(userId);
  // console.log(commentId);

  //댓글 조회
  //기존 댓글 불러오기
  const [comments, setComments] = useState<Comments[]>([]);
  const getComments = async () => {
    try {
      const res = await axios.get(BASE_URL + `recipes/find/${recipeId}`);
      console.log(res);
      setComments(res.data.data.comments);
    } catch (error) {
      console.log("에러입니다");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  // 댓글 추가
  const [newComment, setNewComment] = useState("");
  const [commentArray, setCommentArray] = useState([] as any);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment) {
      alert("댓글을 입력해주세요.");
    } else {
      const commentValue = document.getElementsByTagName("input")[0].value;
      setCommentArray((commentArray: any) => [newComment, ...commentArray]);
      setNewComment("");
      const variables = {
        commentContent: newComment,
      };
      try {
        axios
          .post(BASE_URL + `recipes/comment/create/`, {
            // /{recipe-id}/{user-id}
            commentContent: newComment,
          })
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.result);
            } else {
              alert("댓글을 저장하지 못했습니다.");
            }
            console.log(res.data);
            window.location.reload();
          });
      } catch (error) {
        console.log("에러입니다");
      }
    }
  };

  //댓글 수정
  // 기존 댓글
  //   const [editComment, setEditComment] = useState<CommentsEdit>({
  //     commentId: 0,
  //     commentContent: ''
  //   }
  // );

  // const updateComment = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   if (!newComment) {
  //     alert("댓글을 입력해주세요.");
  //   } else {
  //     if(window.confirm('게시글을 수정하시겠습니까?')) {
  //       axios.patch(BASE_URL + `recipes/comment/update/${commentId}`, {
  //         commentId: ,
  //         commentContent: editComment
  //       })
  //     }
  //   }
  // }

  //댓글 삭제
  const deleteComment = async (commentId: any) => {
    const url = BASE_URL + `recipes/comment/delete/${commentId}`;
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios
        .delete("url", {
          headers: {
            // Authoriztion: authorizationToken,
          },
          data: {},
        })
        // .delete(BASE_URL + `recipes/comment/delete/${commentId}`)
        .then((res) => {
          alert("삭제되었습니다.");
        });
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
                      // onClick={updateComment}
                    >
                      수정
                    </span>
                    <span
                      className="deleteCommentButton"
                      onClick={deleteComment}
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
  margin-bottom: 3px;

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
  .inputForm {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 40px;
    width: 85%;
  }

  .commentButton {
    height: 40px;
  }
`;

export default CommentForm;
