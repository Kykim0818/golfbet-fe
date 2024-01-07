import styled from "styled-components";
import Button from "../../../../components/Button";
import { typo } from "../../../../styles/typo";
import { usePageRoute } from "../../../../hooks/usePageRoute";

type FixHoleScoreProps = {
  handleModalResult?: (result: any) => void;
};

export const FixHoleScore = ({ handleModalResult }: FixHoleScoreProps) => {
  const { moveBack } = usePageRoute();
  return (
    <S.Wrapper>
      <S.ModalHeader>
        <div className="modalheader__title">스코어 입력하기</div>
        <img
          onClick={() => handleModalResult?.(true)}
          src={process.env.PUBLIC_URL + "/assets/svg/ic_x.svg"}
          alt="close"
        />
      </S.ModalHeader>
      <S.Body>CheckHoleScore</S.Body>
      <S.Footer>
        <Button onClick={moveBack}>확정하기</Button>
        <Button onClick={moveBack}>수정하기</Button>
      </S.Footer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ModalHeader: styled.div`
    display: flex;
    justify-content: center;

    .modalheader__title {
      top: 25px;
      position: absolute;
      ${typo.s16w700}
      color: var(--color-main, #009EB2);
    }
    img {
      top: 25px;
      position: absolute;
      right: 16.5px;
    }
  `,
  Body: styled.main`
    display: flex;
    flex-grow: 1;
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
