import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { FixedGolfCenter } from "../FixedGolfCenter";
import { useGameInfo } from "../MakeGame";
import { ParDetail } from "./ParDetail";

export const SetupCheck = () => {
  const navigate = useNavigate();
  const { gameInfo } = useGameInfo();
  return (
    <>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => navigate("/make_game", { replace: true })}
      />
      <Styled.Body>
        <FixedGolfCenter
          centerType={gameInfo.gameType}
          name={gameInfo.golfCenter.name}
          frontNineCourseName={gameInfo.golfCenter.frontNineCourse.name}
          backNineCourseName={gameInfo.golfCenter.backNineCourse.name}
        />
        <Styled.CourseDetailWrapper>
          <Styled.NineCourseSection>
            <Styled.NineCourseLabel>
              {gameInfo.golfCenter.frontNineCourse.name}
            </Styled.NineCourseLabel>
            <Styled.ParSection>
              {gameInfo.golfCenter.frontNineCourse.pars.map((par, index) => {
                return <ParDetail holeIndex={index + 1} parCount={par} />;
              })}
            </Styled.ParSection>
          </Styled.NineCourseSection>
          <Styled.NineCourseSection>
            <Styled.NineCourseLabel>
              {gameInfo.golfCenter.backNineCourse.name}
            </Styled.NineCourseLabel>
            <Styled.ParSection>
              {gameInfo.golfCenter.backNineCourse.pars.map((par, index) => {
                return <ParDetail holeIndex={index + 1} parCount={par} />;
              })}
            </Styled.ParSection>
          </Styled.NineCourseSection>
        </Styled.CourseDetailWrapper>
      </Styled.Body>
      <Styled.Footer>
        <Button onClick={() => console.log("")}>게임 생성하기</Button>
      </Styled.Footer>
    </>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  // body
  Body: styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding: 0px 15px;

    overflow: auto;
  `,

  //
  CourseDetailWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;

    margin-top: 30px;
    margin-bottom: 30px;
  `,

  NineCourseSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  NineCourseLabel: styled.span`
    // todo : typo
    color: var(--color-main-darker, #003d45);
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
  `,
  ParSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  // footer
  Footer: styled.footer`
    display: flex;
    padding: 0px 20px 20px 20px;
  `,
};
