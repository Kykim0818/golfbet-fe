import styled from "styled-components";
import Button from "../../../../components/Button";
import TitleAsset from "../../../../components/TitleAsset";
import { usePageRoute } from "../../../../hooks/usePageRoute";
import { PageStyle } from "../../../../styles/page";
import { deepClone } from "../../../../utils/deepClone";
import { FixedGolfCenter } from "../../../MakeGame/FixedGolfCenter";
import { GameInfo } from "../../../MakeGame/MakeGame";
import { ParDetail } from "../../../MakeGame/SetupCheck/ParDetail";
import { GameRoomInfo } from "../../GameRoom";

export type RoomCenterProps = {
  gameRoomInfo: GameRoomInfo;
  userId: string;
  handleModalResult?: (modifiedCenter: GameInfo["golfCenter"]) => void;
};

export const RoomCenter = ({
  gameRoomInfo,
  userId,
  handleModalResult,
}: RoomCenterProps) => {
  const { moveBack } = usePageRoute();
  const { gameInfo, hostUserId } = gameRoomInfo;
  const isRoomMaker = userId === hostUserId;
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

  const handleUpdateRoomCenter = () => {
    console.log("changed Game Center Info", modifedGameCenterInfo);
    handleModalResult?.(modifedGameCenterInfo);
  };

  return (
    <PageStyle.Wrapper>
      <TitleAsset title="게임 만들기" visibleBack handleBack={moveBack} />
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
                    disable={isRoomMaker === false}
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
                    disable={isRoomMaker === false}
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
        {isRoomMaker && (
          <Button onClick={handleUpdateRoomCenter}>수정 하기</Button>
        )}
      </Styled.Footer>
    </PageStyle.Wrapper>
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
