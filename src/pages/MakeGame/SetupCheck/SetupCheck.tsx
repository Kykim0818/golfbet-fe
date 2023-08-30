import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { deepClone } from "../../../utils/deepClone";
import { FixedGolfCenter } from "../FixedGolfCenter";
import { useGameInfo } from "../MakeGame";
import { ParDetail } from "./ParDetail";

export const SetupCheck = () => {
  const navigate = useNavigate();
  const { gameInfo } = useGameInfo();
  const modifedGameCenterInfo = deepClone(gameInfo.golfCenter);

  const handleModifyGameCenterInfo = (
    courseType: "front" | "back",
    holeIndex: number,
    par: number
  ) => {
    if (courseType === "front") {
      modifedGameCenterInfo.frontNineCourse.pars[holeIndex - 1] = par;
    } else {
      modifedGameCenterInfo.backNineCourse.pars[holeIndex - 1] = par;
    }
  };

  const handleMakeGameRoom = () => {
    // TODO : 게임 생성 요청시에,
    // 방을 만드는 골프장이, 사용자 추가 거나 , 기존 골프장을 수정한 형태면, DB에 다른방식으로 post를 날려야함
    const tmpRet = deepClone(gameInfo);
    tmpRet.golfCenter = modifedGameCenterInfo;
    console.log("make game Info ", tmpRet);

    // TODO : 방생성 요청후(post)방번호 return;
    const gameId = "1";
    navigate(`/game_room/${gameId}`);
    // websocket 연결
    // game_room/:gameId
  };

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
                return (
                  <ParDetail
                    key={index}
                    holeIndex={index + 1}
                    parCount={par}
                    onChange={(holeCount, parCount) =>
                      handleModifyGameCenterInfo("front", holeCount, parCount)
                    }
                  />
                );
              })}
            </Styled.ParSection>
          </Styled.NineCourseSection>
          <Styled.NineCourseSection>
            <Styled.NineCourseLabel>
              {gameInfo.golfCenter.backNineCourse.name}
            </Styled.NineCourseLabel>
            <Styled.ParSection>
              {gameInfo.golfCenter.backNineCourse.pars.map((par, index) => {
                return (
                  <ParDetail
                    key={index}
                    holeIndex={index + 1}
                    parCount={par}
                    onChange={(holeCount, parCount) =>
                      handleModifyGameCenterInfo("back", holeCount, parCount)
                    }
                  />
                );
              })}
            </Styled.ParSection>
          </Styled.NineCourseSection>
        </Styled.CourseDetailWrapper>
      </Styled.Body>
      <Styled.Footer>
        <Button onClick={handleMakeGameRoom}>게임 생성하기</Button>
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
