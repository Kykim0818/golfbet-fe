import styled from "styled-components";
import { typo } from "../../styles/typo";
import { usePageRoute } from "../../hooks/usePageRoute";

type Props = {
  currentGameId: string;
};

export const ActiveGameNotifier = ({ currentGameId }: Props) => {
  const { movePage } = usePageRoute();
  const handleJoinGame = () => {
    movePage(`/game_room/${currentGameId}`);
    return;
  };

  return (
    <S.Wrapper>
      <S.BlueMarker
        src={process.env.PUBLIC_URL + "/assets/svg/ic_blue_marker.svg"}
      />
      <S.GolfImg
        src={process.env.PUBLIC_URL + "/assets/svg/img/golf_illust.svg"}
      />
      <S.Section1>
        <S.Txt>참여중인 게임이 있습니다!</S.Txt>
        <S.Btn onClick={handleJoinGame}>
          게임방으로 이동하기
          <img src={process.env.PUBLIC_URL + "assets/svg/ic_right_arrow.svg"} />
        </S.Btn>
      </S.Section1>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: relative;

    display: flex;
    gap: 13px;
    flex-grow: 1;
    background-color: #fff;
    border-radius: 20px;
    padding: 25px 20px;
  `,
  GolfImg: styled.img``,
  BlueMarker: styled.img`
    position: absolute;
    top: -7px;
    right: 11px;
  `,
  Section1: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,
  Txt: styled.span`
    margin-left: 12px;
    ${typo.s12w500}
    color: var(--color-main, #009eb2);
  `,
  Btn: styled.button`
    border-radius: 21px;
    background-color: #e6f7f9;
    padding: 8px 18px;
    border: none;

    ${typo.s12w500}
    color: var(--color-main_dark, #008395);

    img {
      margin-left: 10px;
      width: 5px;
      height: 10px;
    }
  `,
};
