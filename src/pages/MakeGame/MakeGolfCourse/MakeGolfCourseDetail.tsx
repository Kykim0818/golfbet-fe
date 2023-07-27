import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";

export const MakeGolfCourseDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <TitleAsset
        title="골프장 상세"
        visibleBack
        handleBack={() => navigate("../make_golf_course")}
      />
      <div>골프장 상세</div>
      <Button onClick={() => navigate("/make_game")}>추가 후 선택하기</Button>
    </div>
  );
};
