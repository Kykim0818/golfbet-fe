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
          <Input
            readOnly
            placeholder="골프장을 검색해주세요"
            value={gameInfo.golfCenter.name}
            onClick={() => navigate("select_golf_course")}
          />
        </div>
        {/* ////// 내기종류 TODO: css */}
        <div>
          <h5>내기종류</h5>
          <div>{gameInfo.betType}</div>
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
        <div onClick={handleOpenChangeGameRule}>
          <h5>게임규칙</h5>
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
  `,
};
