import styled from "styled-components";

export const Card = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  height: 50px;
  padding: 7px 20px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  border-left: 10px solid
    ${({ completed }) => (completed ? "#80CB27" : "#f1d502")};
  border-radius: 10px;
  margin-top: 20px;

  & + & {
    margin-top: 0; /* Remover a margem superior do segundo e subsequentes */
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #000;
  border-radius: 4px;
  outline: none;
  position: relative;
  transition: 0.2s;

  &:checked::before {
    content: "✔";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: white;
  }

  &:checked {
    background-color: #334465;
    border-color: #334465;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const DeleteButton = styled.span`
  cursor: pointer;
  text-align: center;
  color: #00000;
  background-color: #fff;
  font-size: 14px;
`;

export const TaskText = styled.p`
  font-size: 16px;
  color: #00000;
  font-weight: 600;
`;

export const Line = styled.div`
  border: 1px solid #ededf2;
  margin: 25px 0 0 0;
`;
