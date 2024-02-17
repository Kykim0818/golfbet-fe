import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useModal } from "../../hooks/useModal";
import { isNumeric } from "../../utils/isNumeric";

type BetMoneyProps = {
  value: number;
  fixedText: string;
  placeHolder: string;
  plusMoneyArr: number[];
  disable?: boolean;
  onChange?: (value: number) => void;
};
export const BetMoney = ({
  value,
  fixedText,
  placeHolder,
  plusMoneyArr,
  disable = false,
  onChange,
}: BetMoneyProps) => {
  const [money, setMoney] = useState(value ?? 0);
  const { openModal } = useModal();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disable) return;
    if (isNumeric(e.target.value)) {
      setMoney(Number(e.target.value) >= 0 ? Number(e.target.value) : 0);
      onChange?.(Number(e.target.value) >= 0 ? Number(e.target.value) : 0);
      return;
    }
    openModal({
      id: "ALERT",
      args: {
        title: "금액 설정",
        msg: "숫자를 입력해주세요",
        okBtnLabel: "확인",
      },
    });
    e.target.value = "";
  };

  const validateMoney = () => {
    if (money === 0) return;
    if (money >= 1000 && money % 1000 === 0) return;
    openModal({
      id: "ALERT",
      args: {
        title: "금액 설정",
        msg: "1000원 단위의 금액만 설정 가능합니다.",
        okBtnLabel: "확인",
      },
    });
    setMoney(0);
  };

  const handlePlusMoneyButtonClick = (plusMoney: number) => {
    if (disable) return;
    setMoney(money + plusMoney);
    onChange?.(money + plusMoney);
  };

  return (
    <Styled.Wrapper>
      <div style={{ position: "relative" }}>
        <Styled.InputFixedText>{fixedText}</Styled.InputFixedText>
        <Styled.Input
          inputMode="numeric"
          onChange={handleOnChange}
          onBlur={validateMoney}
          value={money === 0 ? "" : money}
          placeholder={placeHolder}
        />
      </div>
      <Styled.ButtonGroup>
        {plusMoneyArr.map((plusMoney, index) => (
          <Styled.Button
            key={index + plusMoney}
            variants={"custom"}
            onClick={() => handlePlusMoneyButtonClick(plusMoney)}
          >
            {getDisplayPlusMoney(plusMoney)}
          </Styled.Button>
        ))}
        <Styled.Button
          variants={"custom"}
          onClick={() => {
            if (disable) return;
            setMoney(0);
            onChange?.(0);
          }}
        >
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
