import ToggleGroup from "../../../components/ToggleGroup";

type Props = {
  frontNineCourses: string[];
  backNineCourses: string[];
  onChange: (value: {
    selectFrontCourse: string;
    selectBackCourse: string;
  }) => void;
};

export const CoursePicker = ({
  frontNineCourses,
  backNineCourses,
  onChange,
}: Props) => {
  return (
    <div>
      <div>
        <p>전반 코스</p>
        <div>
          <ToggleGroup
            selectedValues={["course1"]}
            group={[
              { label: "코스 이름1", value: "course1" },
              { label: "코스 이름2", value: "course2" },
              { label: "코스 이름3", value: "course3" },
            ]}
          />
        </div>
      </div>
      {/* /////  */}
      <div>
        <p>후반 코스</p>
        <div>
          <ToggleGroup
            selectedValues={["course1"]}
            group={[
              { label: "코스 이름1", value: "course1" },
              { label: "코스 이름2", value: "course2" },
              { label: "코스 이름3", value: "course3" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
