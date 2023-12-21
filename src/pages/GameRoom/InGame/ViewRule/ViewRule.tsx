import styled from "styled-components";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { typo } from "../../../../styles/typo";
import { getSpecialBetRequirementsDiplay } from "../../../MakeGame/Rule/Rule";
import { getDisplayRuleText } from "../../../MakeGame/Rule/getDisplayText";
import { GameRoomInfo } from "../../GameRoom";

export type ViewRuleProps = {
  gameRoomInfo: GameRoomInfo;
};

// TODO: 기획 확정 및 화면 수정 시 수정 필요
export const ViewRule = ({ gameRoomInfo }: ViewRuleProps) => {
  const { moveBack } = usePageRoute();
  return (
    <S.Wrapper>
      <S.Body>
        <S.Title>규칙</S.Title>
        <S.List>
          {/* 1 */}
          <S.ListItem>
            <S.ItemField>기본</S.ItemField>
            <S.ItemValue>
              {getDisplayRuleText(
                "handiType",
                gameRoomInfo.gameInfo.gameRule.handiType[0]
              )}
            </S.ItemValue>
          </S.ListItem>
          {/* 2 */}
          <S.ListItem>
            <S.ItemField>배판</S.ItemField>
            <S.ItemValue>
              {getSpecialBetRequirementsDiplay(
                gameRoomInfo.gameInfo.gameRule.specialBetRequirements
              )}
            </S.ItemValue>
          </S.ListItem>
          {/* 3 */}
          <S.ListItem>
            <S.ItemField>땅</S.ItemField>
            <S.ItemValue>
              {getDisplayRuleText(
                "ddang",
                gameRoomInfo.gameInfo.gameRule.ddang[0]
              )}
            </S.ItemValue>
          </S.ListItem>
          {/* 4 */}
          <S.ListItem>
            <S.ItemField>니어</S.ItemField>
            <S.ItemValue>기본 전체 Par 3</S.ItemValue>
          </S.ListItem>
        </S.List>
      </S.Body>
      <S.CloseBtn
        src={process.env.PUBLIC_URL + "/assets/svg/ic_qr_close.svg"}
        onClick={moveBack}
        alt="closeBtn"
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    width: 77vw;
    min-width: 280px;
  `,
  Body: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 35px;
    border-radius: 15px;
    background-color: #ffffff;
    padding: 20px 10px 36px 10px;
  `,
  List: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 13px;
  `,
  ListItem: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 10px;
  `,
  ItemField: styled.span`
    ${typo.s10w500}
    color : var(--color-sub-blue, '#3181ae');
    border-radius: 12px;
    padding: 0px 11px;
    background-color: var(--color-main-light-hover, "#d9f3f6");
  `,
  ItemValue: styled.span`
    ${typo.s12w500}
    color : var(--color-grey-800, '#3c4043')
  `,

  Title: styled.div`
    display: flex;
    gap: 7px;
  `,

  CloseBtn: styled.img`
    margin-top: 20px;
    width: 50px;
    height: 50px;
    /* position: absolute;
    bottom: -35px;
    left: calc(50% - 35px);
    z-index: 2; */
    //
    &:hover {
      cursor: pointer;
    }
  `,
};
