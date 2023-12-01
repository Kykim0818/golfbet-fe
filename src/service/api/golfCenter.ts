//  리스트 조회

import { getData } from ".";
import { GolfCenterList } from "../../pages/MakeGame/SelectGolfCenter/SelectGolfCenter";
import { API_URL } from "./constant";
import { APIResponse } from "./type";

//  api 주소로 request 요청 후 실패시, 콘솔출력후 , 빈 배열 전달
// TODO type 확인
export async function apiGetAllGolfCenter() {
  try {
    // 응답성공
    const response = await getData<{ centerInfos: GolfCenterList }>(
      API_URL.GET_ALL_GOLF_CENTER,
      { timeout: 2000 }
    );
    console.log(response);
    if (response.statusCode === 404 || response.statusCode === 500)
      throw new Error();
    return response;
  } catch (e) {
    // 응답실패
    // alert 적으면 계속 query 실행됨
    return { data: testCourses1 } as APIResponse<{
      centerInfos: GolfCenterList;
    }>;
  }
}

// TODO 데이터 세팅 부분 로직 필요
const testCourses1: { centerInfos: GolfCenterList } = {
  centerInfos: [
    {
      group: "최근",
      centers: [
        // field1
        {
          id: "1",
          type: "field",
          name: "동원 썬밸리CC",
          region: "강원 안성",
          holeCount: 36,
          courses: [
            {
              id: 0,
              name: "SUN 전반",
              // nameDetail: "전반",
              parsSum: 36,
              pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
            },
            {
              id: 1,
              name: "SUN 후반",
              // nameDetail: "후반",
              parsSum: 36,
              pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
            },
            {
              id: 2,
              name: "VALLY 전반",
              // nameDetail: "전반",
              parsSum: 36,
              pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
            },
            {
              id: 3,
              name: "VALLY 후반",
              // nameDetail: "후반",
              parsSum: 36,
              pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
            },
          ],
        },
        {
          id: "2",
          type: "field",
          name: "버치힐 컨트리 클럽",
          region: "강원 평창",
          holeCount: 18,
          courses: [
            {
              id: 0,
              name: "BIRCH",
              // nameDetail: "",
              parsSum: 36,
              pars: [5, 4, 3, 4, 4, 4, 4, 3, 5],
            },
            {
              id: 1,
              name: "HILL",
              // nameDetail: "",
              parsSum: 36,
              pars: [4, 3, 5, 4, 4, 3, 4, 5, 4],
            },
          ],
        },
      ],
    },
    {
      group: "전체",
      centers: [
        // field1
        {
          id: "1",
          type: "field",
          name: "동원 썬밸리CC",
          region: "강원 안성",
          holeCount: 36,
          courses: [
            {
              id: 0,
              name: "SUN 전반",
              // nameDetail: "전반",
              parsSum: 36,
              pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
            },
            {
              id: 1,
              name: "SUN 후반",
              // nameDetail: "후반",
              parsSum: 36,
              pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
            },
            {
              id: 2,
              name: "VALLY 전반",
              // nameDetail: "전반",
              parsSum: 36,
              pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
            },
            {
              id: 3,
              name: "VALLY 후반",
              // nameDetail: "후반",
              parsSum: 36,
              pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
            },
          ],
        },
        {
          id: "2",
          type: "field",
          name: "버치힐 컨트리 클럽",
          region: "강원 평창",
          holeCount: 18,
          courses: [
            {
              id: 0,
              name: "BIRCH",
              // nameDetail: "",
              parsSum: 36,
              pars: [5, 4, 3, 4, 4, 4, 4, 3, 5],
            },
            {
              id: 1,
              name: "HILL",
              // nameDetail: "",
              parsSum: 36,
              pars: [4, 3, 5, 4, 4, 3, 4, 5, 4],
            },
          ],
        },
      ],
    },
    {
      group: "서울/경기",
      centers: [],
    },
    {
      group: "강원",
      centers: [
        // field1
        {
          id: "1",
          type: "field",
          name: "동원 썬밸리CC",
          region: "강원 안성",
          holeCount: 36,
          courses: [
            {
              id: 0,
              name: "SUN 전반",
              // nameDetail: "전반",
              parsSum: 36,
              pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
            },
            {
              id: 1,
              name: "SUN 후반",
              // nameDetail: "후반",
              parsSum: 36,
              pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
            },
            {
              id: 2,
              name: "VALLY 전반",
              // nameDetail: "전반",
              parsSum: 36,
              pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
            },
            {
              id: 3,
              name: "VALLY 후반",
              // nameDetail: "후반",
              parsSum: 36,
              pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
            },
          ],
        },
        {
          id: "2",
          type: "field",
          name: "버치힐 컨트리 클럽",
          region: "강원 평창",
          holeCount: 18,
          courses: [
            {
              id: 0,
              name: "BIRCH",
              // nameDetail: "",
              parsSum: 36,
              pars: [5, 4, 3, 4, 4, 4, 4, 3, 5],
            },
            {
              id: 1,
              name: "HILL",
              // nameDetail: "",
              parsSum: 36,
              pars: [4, 3, 5, 4, 4, 3, 4, 5, 4],
            },
          ],
        },
      ],
    },
  ],
};
