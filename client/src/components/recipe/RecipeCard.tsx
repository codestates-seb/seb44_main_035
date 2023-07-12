import styled from "styled-components";

export interface RecipeProps {
  name: string;
  view: number;
  likes: number;
  img: string;
}

interface Props {
  recipe: RecipeProps[];
}

function RecipeCard({ recipe }: Props) {
  return (
    <Wrapper>
      {recipe.map((e) => (
        <>
          <Component>
            <img className="img" alt="img" key={e.name} src={e.img}></img>
            <div className="tite" key={e.name}>
              {e.name}
            </div>
            <div className="view" key={e.name}>
              view: {e.view}
            </div>
            <div className="likes" key={e.name}>
              likes: {e.likes}
            </div>
          </Component>
        </>
      ))}
    </Wrapper>
  );
}

// "name": "참치김밥",
//     "view": 200,
//     "likes": 50,
//     "img": "https://cdn.pixabay.com/photo/2017/08/08/09/44/food-photography-2610864_1280.jpg"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(6, 230px);
  justify-content: center;
`;

const Component = styled.div`
  margin: 10px;
  .img {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;

    position: relative;
  }
`;

export default RecipeCard;
