import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { IoThumbsUpSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";

export interface RecipeProps {
  recipe_id: number;
  img: string;
  name: string;
  view: number;
  likes: number;
}

interface Props {
  recipes: RecipeProps[];
}

function RecipeDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: {
      recipe: { recipe_id, img, view, likes, name, detail, ingredients, howto },
    },
  } = useLocation();

  const copyClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const baseUrl = "localhost:5173";

  return (
    <>
      <DetailWrapper>
        <img className="img" alt="img" src={img} />
        <NumberTag>
          <span>
            <IoEyeSharp className="view" /> {view}
          </span>
          <span>
            <IoThumbsUpSharp className="likes" /> {likes}
          </span>

          <span>
            <FaCommentAlt className="comment" />
          </span>
          <span className="share">
            <FaShare
              className="link"
              onClick={() => copyClipboard(`${baseUrl}${location.pathname}`)}
            />
          </span>
        </NumberTag>
        <TitleWrapper>
          <Title>
            <div className="name">{name}</div>
            <span
              className="edit"
              onClick={() => {
                navigate(`/create-recipe/${recipe_id}`);
              }}
            >
              수정
            </span>
          </Title>
          <div className="title">요리 소개</div>
          <div className="detail">{detail}</div>
          <div className="title">재료</div>
          <div className="ingredient">{ingredients}</div>
          <div className="title">요리 방법</div>
          <div className="howto">{howto}</div>
        </TitleWrapper>
      </DetailWrapper>
    </>
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
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;

  span {
    width: 85px;
    height: 40px;
    background-color: #d5d5d5;
    text-align: center;
    border-radius: 30px;
    padding: 10px 0;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;

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
  }

  .name {
    font-size: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default RecipeDetail;
