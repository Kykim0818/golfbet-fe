import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import SegmentCell from "../../../components/SegmentCell";
import Stepper from "../../../components/Stepper";
import TitleAsset from "../../../components/TitleAsset";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { BetMoney } from "../BetMoney";
import { GameInfo, useGameInfo } from "../MakeGame";
import Rule from "../Rule";
import { GameRule } from "../Rule/type";
import { isCompleteMakingGameInfo } from "../util";

export const Setup = () => {
  const { goHome, movePage } = usePageRoute();
  const { gameInfo } = useGameInfo();
  const canGoNext = isCompleteMakingGameInfo(gameInfo);
  const [, setRenderFlag] = useState(false);
  const repaint = () => {
    setRenderFlag((prev) => !prev);
  };

  const handleChangePlayerCount = (playerCount: number) => {
    // #1
    gameInfo.playerCount = playerCount;
    // #2
    gameInfo.gameRule.specialBetRequirements =
      getDefaultSpecialBetRequirements(playerCount);
    // #3
    repaint();
    // console.log(gameInfo);
  };
  //
  const handleChangeBetAmountPerStroke = (money: number) => {
    gameInfo.betAmountPerStroke = money;
    repaint();
  };
  const handleChangeBettingLimit = (money: number) => {
    gameInfo.bettingLimit = money;
    repaint();
  };
  //
  const handleOpenChangeGameRule = () => {
    movePage("rule_change");
  };
  //

  return (
    <>
      <TitleAsset title="게임 만들기" visibleBack handleBack={goHome} />
      <Styled.Body>
        {/* ////// 게임분류  */}
        <div>
          <h5>게임분류</h5>
          <SegmentCell<GameInfo["gameType"]>
            cells={[
              { label: "필드", value: "field" },
              { label: "스크린", value: "screen" },
            ]}
            selectCellValue={"field"}
            handleSelectCell={(cell) => (gameInfo.gameType = cell.value)}
          />
        </div>
        {/* ////// 골프장  */}
        <div>
          <h5>골프장</h5>
          <Styled.GolfCourse>
            <div
              className="golfCenter__input"
              onClick={() => movePage("select_golf_center")}
            >
              <StyledInput
                readOnly
                placeholder="골프장을 검색해주세요"
                value={gameInfo.golfCenter.name}
              />
              <button>
                <img
                  src={process.env.PUBLIC_URL + "/assets/svg/ic_search_btn.svg"}
                  alt="no icons"
                />
              </button>
            </div>
            <div className="golfCourse__section">
              <Styled.CourseInfo>
                <span className="course__label">전반</span>
                <span className="course__value">
                  {gameInfo.golfCenter.frontNineCourse.name === ""
                    ? "선택"
                    : gameInfo.golfCenter.frontNineCourse.name}{" "}
                </span>
              </Styled.CourseInfo>
              <Styled.CourseInfo>
                <span className="course__label">후반</span>
                <span className="course__value">
                  {gameInfo.golfCenter.backNineCourse.name === ""
                    ? "선택"
                    : gameInfo.golfCenter.backNineCourse.name}{" "}
                </span>
              </Styled.CourseInfo>
            </div>
          </Styled.GolfCourse>
        </div>
        {/* ////// 내기종류 TODO: css */}
        <div>
          <h5>내기종류</h5>
          <Styled.BetType>{getDisplayText(gameInfo.betType)}</Styled.BetType>
        </div>

        {/* ////// 참여인원 TODO: css */}
        <div>
          <h5>참여인원</h5>
          <Stepper
            max={4}
            min={2}
            currentValue={gameInfo.playerCount}
            onChange={(value) => {
              handleChangePlayerCount(value);
            }}
            unit="명"
          />
        </div>

        {/* ////// 게임규칙 TODO: css */}
        <div>
          <Styled.RuleHeader>
            <h5>게임규칙</h5>
            <img
              src={process.env.PUBLIC_URL + "/assets/svg/ic_edit_rule.svg"}
              alt="edit rule"
              onClick={handleOpenChangeGameRule}
            />
          </Styled.RuleHeader>
          <Rule
            rule={gameInfo.gameRule}
            nearestAmount={gameInfo.nearestAmount}
          />
        </div>
        {/* ////// 내기금액 TODO: css */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h5>내기금액</h5>
          <BetMoney
            value={gameInfo.betAmountPerStroke}
            fixedText="1타당"
            placeHolder="금액을 입력해주세요"
            plusMoneyArr={[1000, 5000, 10000]}
            onChange={handleChangeBetAmountPerStroke}
          />
          <BetMoney
            value={gameInfo.bettingLimit}
            fixedText="한도 금액"
            placeHolder="금액을 입력해주세요"
            plusMoneyArr={[10000, 100000, 500000]}
            onChange={handleChangeBettingLimit}
          />
        </div>
      </Styled.Body>
      <Styled.Footer>
        <Button
          disabled={canGoNext === false}
          style={{ marginTop: "30px", marginBottom: "19.5px" }}
          onClick={() => movePage("setup_check")}
        >
          다음
        </Button>
      </Styled.Footer>
    </>
  );
};

const getDisplayText = (value: string) => {
  if (value === "stroke") return "스트로크";
};

const getDefaultSpecialBetRequirements = (
  playerCount: number
): GameRule["specialBetRequirements"] => {
  if (playerCount === 4) {
    return ["buddy", "triple", "threeOrMoreTie"];
  }
  if (playerCount === 3) {
    return ["buddy", "triple", "twoOrMoreTie"];
  }

  // 2
  return ["buddy", "triple"];
};

const Styled = {
  Wrapper: styled.div``,
  Body: styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 25px;
    margin-top: 40px;
    padding: 0px 26px;

    overflow: auto;

    h5 {
      color: var(--color-main-darker, #003d45);
      margin-top: 0px;
      margin-bottom: 15px;

      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,

  GolfCourse: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    //TODO
    padding: 12px;
    border-radius: 10px;
    background-color: white;

    .golfCenter__input {
      display: flex;
      gap: 10px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        min-width: 40px;
        min-height: 40px;
        border-radius: 50%;
        border: none;
        background-color: var(--color-main);
      }

      &:hover {
        cursor: pointer;
      }
    }
    .golfCourse__section {
      display: flex;
      gap: 10px;
    }
  `,
  CourseInfo: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 34px;
    background-color: #f6f8fc;
    .course__label {
      //TODO typo
      color: #3b3c40;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .course__value {
      //TODO typo
      color: #acb1c6;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  BetType: styled.div`
    display: flex;
    width: 100%;
    /* height: 40px; */
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 34px;
    background-color: white;

    // typo
    color: #3b3c40;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

  RuleHeader: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    img {
      padding: 5px;
      &:hover {
        cursor: pointer;
      }
    }
  `,
};

const StyledInput = styled(Input)`
  width: 100%;
  padding: 10px 20px;
  color: #acb1c6;
  background-color: #f6f8fc;
`;
