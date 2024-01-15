import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #004aad;
  background-size: cover;
  background-position: center;
`;

export const AppCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 1000px;
`;

export const ScrollableList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const Header = styled.header`
  background-color: #ffff;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
`;

export const Title = styled.h2`
  font-weight: 600;
  color: #282a2d;
  font-size: 30px;
  margin: 0;
`;

export const Strong = styled.strong`
  font-weight: 800;
  color: #282a2d;
  font-size: 50px;
  margin: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Input = styled.input`
  margin-bottom: 25px;
  width: 50%;
  height: 45px;
  padding-left: 20px;
  border-radius: 5px;

  border: 1px solid #343a40;
  &::placeholder {
    font-size: 12px;
    font-weight: 500;
    color: #343a40;
  }
`;

export const Button = styled.button`
  width: 50%;
  height: 45px;
  background-color: #6278a5;
  font-size: 16px;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Line = styled.div`
  border: 1px solid #ccc;
  margin: 25px 0;
`;

export const FilterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const FilterButton = styled.button`
  background-color: #6278a5;
  color: #ffff;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 40px;
  width: 100%;
  margin-left: 2px;
  cursor: pointer;
  &.selected {
    background-color: #334465;
    color: white;
    border-color: #334465;
  }
`;
