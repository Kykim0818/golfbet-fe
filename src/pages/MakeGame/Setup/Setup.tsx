import { useCallback, useRef, useState } from "react";
import { GameInfo } from "../MakeGame";
import SegmentCell from "../../../components/SegmentCell";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import TitleAsset from "../../../components/TitleAsset";
import Stepper from "../../../components/Stepper";
import Rule from "../Rule";
import { RuleChange } from "../Rule/RuleChange";
import { BetMoney } from "../BetMoney";
import Button from "../../../components/Button";
import { GameRule } from "../Rule/type";
import { useNavigate } from "react-router-dom";

const defaultGameRule: GameRule = {
  handiType: ["none"],
  specialBetRequirements: ["buddy", "tripple", "threeOrMorePlayersTied"],
  ddang: ["last"],
  nearestType: ["specified"],
};

export const Setup = () => {
  const navigate = useNavigate();
  const gameType = useRef<GameInfo["gameType"]>("field");
  const [golfCourse, setgolfCourse] = useState<GameInfo["golfCourse"]>("");
  const [betType, setBetType] = useState<GameInfo["betType"]>("Stroke");
  const playerCount = useRef<GameInfo["playerCount"]>(0);
  const [gameRule, setGameRule] =
    useState<GameInfo["gameRule"]>(defaultGameRule);
  const [betAmountPerStroke, setBetAmountPerStroke] =
    useState<GameInfo["betAmountPerStroke"]>(0);
  const [bettingLimit, setBettingLimit] =
    useState<GameInfo["betAmountPerStroke"]>(0);

  const [visibleChangeGameRule, setVisibleChangeGameRule] = useState(false);
  //
  const handleOpenChangeGameRule = () => {
    console.log("gamerule push");
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
            { label: "필드", value: "field" },
            { label: "스크린", value: "screen" },
          ]}
          selectCellValue={"field"}
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
          onClick={() => navigate("select_golf_course")}
        />
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
          unit="명"
        />
      </div>

      {/* ////// 게임규칙 TODO: css */}
      <div onClick={handleOpenChangeGameRule}>
        <h5>게임규칙</h5>
        <Rule rule={gameRule} />
      </div>
      {visibleChangeGameRule && (
        <Modal handleClose={handleCloseChangeGameRule}>
          <RuleChange
            gameRule={gameRule}
            playerCount={playerCount.current}
            handleClose={handleCloseChangeGameRule}
            onChange={(gameRule) => {
              setGameRule(gameRule);
            }}
          />
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
