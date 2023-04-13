import React from 'react';
import { Text } from 'react-native';
import styled, { css } from 'styled-components/native';

const StyledBtnSm = styled.Pressable`
    width: 64px;
    height: 30px;
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background: ${(props) => props.background || 'white'};
    color: ${(props) => props.color || 'black'};

    ${(props) =>
      props.primary &&
      css`
      background: #003C7C;
      border-style: solid;
      border-color: rgba(11, 14, 18, 0.13);
      box-shadow: 2px 3px 3px rgba(137, 189, 218, 0.2);
      border-radius: 5px;
    `}
`;

const StyledText = styled.Text`
    color: ${(props) => props.color || 'black'};
`;

export default function BtnSm({ title, color, ...props }) {
    return (
      <StyledBtnSm {...props} >
        <StyledText color={color}>{title}</StyledText>
      </StyledBtnSm>
    );
}
// border-width: 1px 3px 3px 1px;