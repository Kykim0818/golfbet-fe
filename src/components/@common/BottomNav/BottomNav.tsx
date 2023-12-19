import React from "react";
import styled, { css } from "styled-components";
import colors from "../../../styles/theme/colors";
import commonStyle from "../../../styles/theme/common";
import sizes, { sizesHeight } from "../../../styles/theme/sizes";

export interface NavItem {
  id: string;
  icon: React.ReactNode | string;
  label?: React.ReactNode | string;
  onClick?: () => void;
}

export interface BottomNavProps {
  navList: NavItem[];
  selectedNav: string;
  customStyle?: React.CSSProperties;
}

const BottomNav = (props: BottomNavProps) => {
  return (
    <S.BottomNav style={props.customStyle}>
      {props.navList.map((item, index: number) => (
        <S.BottomNavItem
          key={index}
          onClick={() => {
            item.onClick?.();
          }}
          selected={props.selectedNav === item.id}
        >
          {item.icon}
          {props.selectedNav === item.id && item.label}
        </S.BottomNavItem>
      ))}
    </S.BottomNav>
  );
};

export { BottomNav };

//
export const S = {
  BottomNav: styled.ul`
    ${commonStyle.flexCenter};
    padding: ${sizesHeight.pixcel10} ${sizes.pixcel7};
    gap: ${sizes.pixcel7};
  `,
  BottomNavItem: styled.li<{ selected: boolean }>`
    ${(props) =>
      props.selected &&
      css`
        color: ${colors.gray.gray50};
        font-weight: 600;
        background-color: ${colors.color.skyblue};

        ${IconRankingStyle}
        ${IconHomeStyle}
      `};

    cursor: pointer;
    ${commonStyle.flexCenter};
    gap: ${sizes.pixcel3};
    width: 33.33333%;
    height: ${sizes.pixcel45};
    border-radius: 20px;
    font-size: ${sizes.pixcel12};
  `,
};

const IconRankingStyle = css`
  .icon-ranking .fill-depth1 {
    fill: #dfe8f4;
  }

  .icon-ranking .fill-depth2 {
    fill: #a3d3f5;
  }

  .icon-ranking .fill-depth3 {
    fill: #48a6db;
  }
`;

const IconHomeStyle = css`
  .icon-home .fill-depth1 {
    fill: #f8f9fa;
  }
`;
