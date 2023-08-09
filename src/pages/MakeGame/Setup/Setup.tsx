import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import SegmentCell from "../../../components/SegmentCell";
import Stepper from "../../../components/Stepper";
import TitleAsset from "../../../components/TitleAsset";
import { BetMoney } from "../BetMoney";
import { GameInfo, useGameInfo } from "../MakeGame";
import Rule from "../Rule";

export const Setup = () => {
  const navigate = useNavigate();
  const { gameInfo } = useGameInfo();

  //
  const handleOpenChangeGameRule = () => {
    navigate("rule_change");
  };
  return (
    <>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate("/", { replace: true })}
      />
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
              onClick={() => navigate("select_golf_course")}
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
            value={gameInfo.playerCount}
            onChange={(value) => (gameInfo.playerCount = value)}
            unit="명"
          />
        </div>

        {/* ////// 게임규칙 TODO: css */}
        <div>
          <Styled.RuleHeader>
            <h5>게임규칙</h5>
            <img
              src={process.env.PUBLIC_URL + "/assets/svg/ic_edit_rule.svg"}
              alt="no icons"
              onClick={handleOpenChangeGameRule}
            />
          </Styled.RuleHeader>
          <Rule rule={gameInfo.gameRule} />
        </div>
        {/* ////// 내기금액 TODO: css */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h5>내기금액</h5>
          <BetMoney
            value={gameInfo.betAmountPerStroke}
            fixedText="1타당"
            placeHolder="금액을 입력해주세요"
            plusMoneyArr={[1000, 5000, 10000]}
          />
          <BetMoney
            value={gameInfo.bettingLimit}
            fixedText="한도 금액"
            placeHolder="금액을 입력해주세요"
            plusMoneyArr={[10000, 100000, 500000]}
          />
        </div>

        <Button
          style={{ marginTop: "30px", marginBottom: "19.5px" }}
          onClick={() => console.log(gameInfo)}
        >
          다음
        </Button>
      </Styled.Body>
    </>
  );
};

const getDisplayText = (value: string) => {
  if (value === "Stroke") return "스트로크";
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
      height: 25px;

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
