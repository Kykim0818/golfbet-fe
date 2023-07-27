import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";

export const MakeGolfCourse = () => {
  const navigate = useNavigate();
  return (
    <div>
      <TitleAsset
        title="골프장 추가"
        visibleBack
        handleBack={() => navigate("../select_golf_course")}
      />
      <div>골프장 추가 테스트</div>
      <Button onClick={() => navigate("../make_golf_course_detail")}>
        다음
      </Button>
    </div>
  );
};
