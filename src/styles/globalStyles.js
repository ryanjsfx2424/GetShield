import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 0px;
  width: 0px;
`;

export const StyledButton = styled.div`
position: absolute;
bottom: 30px;
`;


// Used for providing a wrapper around a component
//flex: ${({ flex }) => (flex ? flex : 0)};
//display: flex;
//flex-direction: ${({ fd }) => (fd ? fd : "column")};
//justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
//align-items: ${({ ai }) => (ai ? ai : "flex-start")};
export const Container = styled.div`
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const FlexContainer = styled.div`
  flex: ${({ flex }) => (flex ? flex : 0)};
  display: flex;
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  padding-top: 20px;
`;


export const smallCon = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  // background-color: ${({ test }) => (test ? "pink" : "none")};
  background-color: black;
  width: 100%;
  // background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  border: 2px white solid;
  border-radius: 10px;
  padding: 10px;
  max-height: 600px;
  height: 100%;
  position: relative;
  padding-top: 30px;
  padding-top: 0px;
`;

export const Con = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: auto 1fr;
grid-template-areas: "main-box main-box main-box main-box" "box1 box2 box3 box4";
  // display: flex;
  gap:10px;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "row")};
  justify-content: ${({ jc }) => (jc ? jc : "center")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  //width: 75%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  //margin-bottom: 5%;
  // margin: 2.5% 2px;
`;

export const logoCon = styled.div`
  position: relative;
  left: 50%;
  top: 60px;
  transform: translate(-50%, -50%);
`;

export const TextTitle = styled.p`
  color: var(--primary-text);
  font-weight: 500;
  line-height: 1;
  width:100%
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
  line-height: 1.6;
`;

export const TextDescription = styled.p`
  font-size: 21px;
  line-height: 1.6;
`;

export const TextDescriptionSM = styled.p`
  font-size: 18px;
  line-height: 1.6;
`;


export const TextDescriptionSmall = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

export const TextDescription1 = styled.p`
  color: var(--primary-text);
  line-height: 1.5;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 1;
  }
`;
