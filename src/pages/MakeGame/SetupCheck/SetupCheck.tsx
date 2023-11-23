import styled from "styled-components";
import Button from "../../../components/Button";
import TitleAsset from "../../../components/TitleAsset";
import { useModal } from "../../../hooks/useModal";
import { usePageRoute } from "../../../hooks/usePageRoute";
import { apiMakeGame } from "../../../service/api/gameRoom";
import { deepClone } from "../../../utils/deepClone";
import { FixedGolfCenter } from "../FixedGolfCenter";
import { useGameInfo } from "../MakeGame";
import { ParDetail } from "./ParDetail";

export const SetupCheck = () => {
  const { openModal } = useModal();
  const { movePage, movePageWithHome } = usePageRoute();
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

  const handleMakeGameRoom = async () => {
    // TODO : 게임 생성 요청시에,
    // 방을 만드는 골프장이, 사용자 추가 거나 , 기존 골프장을 수정한 형태면, DB에 다른방식으로 post를 날려야함
    const tmpRet = deepClone(gameInfo);
    tmpRet.golfCenter = modifedGameCenterInfo;
    console.log("make game Info ", tmpRet);
    const gameId = await apiMakeGame(tmpRet);
    // TODO: 테스트용 나중엔 실패했을 때랑 예외 처리
    if (gameId === "") {
      const modalRes = await openModal({
        id: "ALERT",
        args: {
          title: "게임 방 생성",
          msg: "게임 방 생성에 실패 했습니다.\n 잠시 후 다시 시도해주세요",
          okBtnLabel: "확인",
        },
      });
      if (modalRes) {
        movePageWithHome(`/game_room/test`);
      }
    } else {
      movePageWithHome(`/game_room/test`);
    }
  };

  return (
    <>
      <TitleAsset
        title="게임 만들기"
        visibleBack
        handleBack={() => movePage("/make_game", { replace: true })}
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
