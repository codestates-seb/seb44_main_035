import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { useEffect } from "react";

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
  const { id } = useParams();
  const [data, setData] = useState<RecipeDetail>();
  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipes/find/${id}`
      );
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

  // const cookStepData = Object.entries(data);
  // console.log(cookStepData);

  return (
    <DetailWrapper>
      <img className="img" alt="img" src={data.recipeImage} />
      <NumberTag>
        <div className="icon">
          <FaShare
            className="link"
            onClick={() => copyClipboard(`${BASE_URL}${location.pathname}`)}
          />
        </div>
      </NumberTag>
      <TitleWrapper>
        <Title>
          <div className="name">{data.recipeName}</div>
          <span
            className="edit"
            onClick={() => {
              navigate(`/create-recipe/${data.recipeId}`);
            }}
          >
            수정
          </span>
        </Title>
        <Ingredients>
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
        </Ingredients>
        <CookStep>
          <div className="title">🍳 요리 방법</div>
          {data.cookStepContent.map((cookStep: any, index: any) => (
            <>
              <h2 className="step">Step {index + 1}</h2>
              <div key={index}>
                <div className="cookStep">{cookStep}</div>
              </div>
            </>
          ))}
          {data.cookStepImage.map((cookStepImage: any, index: any) => (
            <>
              <div key={index}>
                <img className="cookStepImage" src={cookStepImage} />
              </div>
            </>
          ))}
        </CookStep>
      </TitleWrapper>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.section`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  padding-bottom: 60px;

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 10px;
  }
`;

const NumberTag = styled.div`
  width: 100%;
  display: inline;
  cursor: pointer;

  .icon {
    width: 20%;
    height: 40px;
    background-color: #d5d5d5;
    text-align: center;
    border-radius: 30px;
    padding: 10px 0;
    float: right;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

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
  margin-top: 15px;
`;

const Ingredients = styled.div`
  list-style: none;
  .ingredients {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
`;

const CookStep = styled.div`
  display: inline;
  .step {
    font-size: 18px;
    font-weight: bold;
    color: #626883;
    margin-top: 4px;
  }
  .cookStepImage {
    width: 50%;
    margin-top: 10px;
    display: flex;
    float: left;
  }
`;

export default RecipeDetail;
