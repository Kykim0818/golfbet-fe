import styled from "styled-components";

/** modalPage에서 페이지 이탈 처리를 하기 위해서 투명 모달이 필요하여 작성, 단순 페이지의 경우 처리되지만, modal의 경우 modal이 라우팅이 없기때문에 뒤로가기를 할시 modal이 닫혀버림 */
export const Empty = () => {
  return <S.Wrapper />;
};

const S = {
  Wrapper: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 0px;
    height: 0px;
  `,
};
