import { useEffect } from "react";
import { history } from "../../..";
import Button from "../../Button";

export const CheckHoleScore = (props: { handleBack: () => void }) => {
  useEffect(() => {
    const event = history.listen((listener) => {
      if (listener.action === "POP") {
        history.back();
        props.handleBack();
      }
    });
    return event;
  }, [props]);

  const handleCloseBtn = () => {
    history.back();
    props.handleBack();
  };

  return (
    <div>
      CheckHoleScore
      <Button onClick={handleCloseBtn}>닫기</Button>
    </div>
  );
};

const S = {};
