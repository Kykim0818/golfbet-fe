import Button from "../../../../components/Button";

export const CheckHoleScore = (props: { handleBack: () => void }) => {
  return (
    <div>
      CheckHoleScore
      <Button onClick={props.handleBack}>닫기</Button>
    </div>
  );
};

const S = {};
