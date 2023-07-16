import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import SegmentCell from "../../components/SegmentCell";
import Stepper from "../../components/Stepper";
import TitleAsset from "../../components/TitleAsset";
import { BetMoney } from "./BetMoney";
import { Rule } from "./Rule";
import RuleChange from "./RuleChange";

export const MakeGame = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate(-1)}
      />
      <S.Content>
        <MakeGameContent />
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--color-bg, #f6f8fc);
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 26px;
    overflow: auto;
  `,
};

const defaultGameRule: GameInfo["gameRule"] = {
  handiType: "None",
  spcialBetRequirements: ["버디이상", "3명 이상 동타", "트리플 이상"],
  ddang: "꼴등만",
  nearestType: "별도 지정",
};

const MakeGameContent = () => {
  const gameType = useRef<GameInfo["gameType"]>("Field");
  const [golfCourse, setgolfCourse] = useState<GameInfo["golfCourse"]>("");
  const [betType, setBetType] = useState<GameInfo["betType"]>("Stroke");
  const playerCount = useRef<GameInfo["playerCount"]>(0);
  const [gameRule, setGameRule] =
    useState<GameInfo["gameRule"]>(defaultGameRule);
  const [betAmountPerStroke, setBetAmountPerStroke] =
    useState<GameInfo["betAmountPerStroke"]>(0);
  const [bettingLimit, setBettingLimit] =
    useState<GameInfo["betAmountPerStroke"]>(0);

  const [visibleSearchGolfCourse, setVisibleSarchGolfCourse] = useState(false);
  const [visibleChangeGameRule, setVisibleChangeGameRule] = useState(false);

  // golf course
  const handleOpenGolfCourse = () => {
    setgolfCourse("골프벳 골프장");
    window.history.pushState(null, "", "");
    setVisibleSarchGolfCourse(true);
  };

  const handleCloseGolfCourse = useCallback(() => {
    console.log("handleModalClose");
    setVisibleSarchGolfCourse(false);
  }, []);

  //
  const handleOpenChangeGameRule = () => {
    window.history.pushState(null, "", "");
    setVisibleChangeGameRule(true);
  };

  const handleCloseChangeGameRule = useCallback(() => {
    setVisibleChangeGameRule(false);
  }, []);

  return (
    <div>
      {/* ////// 게임분류  */}
      <div>
        <h5>게임분류</h5>
        <SegmentCell<GameInfo["gameType"]>
          cells={[
            { label: "필드", value: "Field" },
            { label: "스크린", value: "Screen" },
          ]}
          selectCellValue={"Field"}
          handleSelectCell={(cell) => (gameType.current = cell.value)}
        />
      </div>
      {/* ////// 골프장  */}
      <div>
        <h5>골프장</h5>
        <Input
          readOnly
          placeholder="골프장을 검색해주세요"
          value={golfCourse}
          onClick={handleOpenGolfCourse}
        />
        {visibleSearchGolfCourse && (
          <Modal handleClose={handleCloseGolfCourse}>
            <div style={{ backgroundColor: "var(--color-bg)" }}>
              <TitleAsset
                title="골프장 선택"
                visibleBack
                handleBack={() => setVisibleSarchGolfCourse(false)}
              />
              <button onClick={() => setVisibleSarchGolfCourse(false)}>
                close
              </button>
            </div>
          </Modal>
        )}
      </div>
      {/* ////// 내기종류 TODO: css */}
      <div>
        <h5>내기종류</h5>
        <div>{betType}</div>
      </div>

      {/* ////// 참여인원 TODO: css */}
      <div>
        <h5>참여인원</h5>
        <Stepper
          max={4}
          min={0}
          value={playerCount.current}
          onChange={(value) => (playerCount.current = value)}
        />
      </div>

      {/* ////// 게임규칙 TODO: css */}
      <div onClick={handleOpenChangeGameRule}>
        <h5>게임규칙</h5>
        <Rule rule={gameRule} />
      </div>
      {visibleChangeGameRule && (
        <Modal handleClose={handleCloseChangeGameRule}>
          <RuleChange handleClose={handleCloseChangeGameRule} />
        </Modal>
      )}

      {/* ////// 내기금액 TODO: css */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h5>내기금액</h5>
        <BetMoney
          value={betAmountPerStroke}
          fixedText="1타당"
          placeHolder="금액을 입력해주세요"
          plusMoneyArr={[1000, 5000, 10000]}
        />
        <BetMoney
          value={bettingLimit}
          fixedText="한도 금액"
          placeHolder="금액을 입력해주세요"
          plusMoneyArr={[10000, 100000, 500000]}
        />
      </div>
      <Button style={{ marginTop: "30px", marginBottom: "19.5px" }}>
        다음
      </Button>
    </div>
  );
};

export interface GameInfo {
  gameId: string;
  createUser: string;
  gameType: "Field" | "Screen";
  golfCourse: string;
  isFrontNine: boolean;
  isBackNine: boolean;
  betType: "Stroke";
  playerCount: number;
  gameRule: {
    handiType: "None" | "Pre" | "Post";
    spcialBetRequirements: string[];
    ddang: "None" | "꼴등만";
    nearestType: "게임에 포함" | "별도 지정";
  };
  betAmountPerStroke: number;
  bettingLimit: number;
}
