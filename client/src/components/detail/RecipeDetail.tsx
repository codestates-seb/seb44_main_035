import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { useEffect } from "react";
import { LargeNumberLike } from "crypto";

export interface Comments {
  recipeId: number;
  userId: number;
  commentId: number;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
}

export interface Ingredients {
  ingredientId: number;
  ingredientName: string;
  quantity: string;
}

export interface RecipeDetail {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  recipeIntro: string;
  cookStepContent: [];
  cookStepImage: [];
  comments: Comments[];
  ingredients: Ingredients[];
}

function RecipeDetail() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [data, setData] = useState<RecipeDetail>();
  const getData = async () => {
    try {
      const res = await axios.get(BASE_URL + `recipes/find/${recipeId}`);
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log("에러입니다");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const copyClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <DetailWrapper>
      <img className="img" alt="img" src={data.recipeImage} />
      <NumberTag>
        <span>
          <FaCommentAlt className="comment" />
        </span>
        <span className="share">
          <FaShare
            className="link"
            onClick={() => copyClipboard(`${BASE_URL}${location.pathname}`)}
          />
        </span>
      </NumberTag>
      <TitleWrapper>
        <Title>
          <div className="name">{data.recipeName}</div>
          <span
            className="edit"
            onClick={() => {
              navigate(`/edit/${data.recipeId}`);
            }}
          >
            수정
          </span>
        </Title>
        <div className="title">🍱 요리 소개</div>
        <div className="detail">{data.recipeIntro}</div>
        <div className="title">🥦 재료</div>
        <div className="ingredient">
          {data.ingredients.map((ingreName: any, index: number) => (
            <>
              <li key={index}>
                <div className="ingredients">
                  <span className="ingreName">
                    {ingreName[Object.keys(ingreName)[1]]}
                  </span>
                  <span className="ingreQuantity">
                    {ingreName[Object.keys(ingreName)[2]]}
                  </span>
                </div>
              </li>
            </>
          ))}
        </div>
        <CookStep>
          <div className="title">🍳 요리 방법</div>
          {Object.entries(data).map((item: any, index: number) => {
            const getCookStep = Object.values(data.cookStepContent).map(
              (entrie, index) => {
                return console.log(entrie, index);
              }
            );
            const getCookStepImg = Object.values(data.cookStepImage).map(
              (entrie, index) => {
                return console.log(entrie, index);
              }
            );

            return (
              <li key={index}>
                <div className="textBox">
                  <h4>Step {index + 1}</h4>
                  <div className="howto">{item.cookStepContent[index]}</div>
                </div>
                <div className="imgBox">
                  <img src={item.cookStepImage[index]} alt="cookStepImg" />
                </div>
              </li>
            );
          })}

          {/* {data.cookStepImage.map((cookStepImg: any, index: number) => (
            <>
              <img
                className="cookStepImage"
                alt="cookStepImage"
                src={cookStepImg}
              />
            </>
          ))} */}
        </CookStep>
      </TitleWrapper>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.section`
  width: 100%;
  padding: 10px;
  cursor: pointer;

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

const NumberTag = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  span {
    width: 85px;
    height: 40px;
    background-color: #d5d5d5;
    text-align: center;
    border-radius: 30px;
    padding: 10px 0;
    margin-left: auto;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;

  .ingredients {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }

  .edit {
    background-color: #d4f4fa;
    height: 30px;
    width: 60px;
    text-align: center;
    border-radius: 40px;
    padding: 3px 0;
  }

  .title {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 9px;
    background-color: #e6e6e6;
  }
  .name {
    font-size: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CookStep = styled.div`
  .cookStepImage {
    width: 30%;
  }
`;

export default RecipeDetail;
