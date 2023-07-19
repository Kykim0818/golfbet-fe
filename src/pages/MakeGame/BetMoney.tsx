import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";

type BetMoneyProps = {
  value: number;
  fixedText: string;
  placeHolder: string;
  plusMoneyArr: number[];
};
export const BetMoney = ({
  value,
  fixedText,
  placeHolder,
  plusMoneyArr,
}: BetMoneyProps) => {
  const [money, setMoney] = useState(value ?? 0);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumeric(e.target.value)) {
      setMoney(Number(e.target.value) >= 0 ? Number(e.target.value) : 0);
      return;
    }
    alert("숫자만 입력 가능합니다.");
    e.target.value = "";
  };

  const handlePlusMoneyButtonClick = (plusMoney: number) => {
    setMoney(money + plusMoney);
  };

  return (
    <Styled.Wrapper>
      <div style={{ position: "relative" }}>
        <Styled.InputFixedText>{fixedText}</Styled.InputFixedText>
        <Styled.Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={handleOnChange}
          value={money === 0 ? "" : money}
          placeholder={placeHolder}
        />
      </div>
      <Styled.ButtonGroup>
        {plusMoneyArr.map((plusMoney) => (
          <Styled.Button
            variants={"custom"}
            onClick={() => handlePlusMoneyButtonClick(plusMoney)}
          >
            {getDisplayPlusMoney(plusMoney)}
          </Styled.Button>
        ))}
        <Styled.Button variants={"custom"} onClick={() => setMoney(0)}>
          초기화
        </Styled.Button>
      </Styled.ButtonGroup>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    padding: 12px 15px;
  `,

  Button: styled(Button)`
    background-color: var(--color-bg);
    border: none;
    padding: 10px 15px;

    color: #3b3c40;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
  `,
  Input: styled(Input)`
    width: 100%;
    padding-left: 120px;
    text-align: end;
    background-color: var(--color-bg);
  `,
  InputFixedText: styled.span`
    position: absolute;
    top: 10px;
    left: 20px;
    color: var(--color-main-dark, #008395);
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  `,
  ButtonGroup: styled.div`
    display: flex;
    gap: 12px;
  `,
};

const getDisplayPlusMoney = (money: number) => {
  const moneyUnit = 1000;
  const postFix = "원";
  const preFix = "+";
  const divisionResult = Math.floor(money / moneyUnit);

  if (divisionResult === 0) {
    return preFix + money + postFix;
  }

  if (divisionResult > 0 && divisionResult < 10) {
    return preFix + divisionResult + "천" + postFix;
  }

  if (divisionResult >= 10) {
    return preFix + Math.floor(divisionResult / 10) + "만" + postFix;
  }
};

// TODO: util
function isNumeric(value: string) {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}
