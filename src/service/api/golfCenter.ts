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
    const response = await getData<GolfCenterList>(API_URL.GET_ALL_GOLF_CENTER);
    return response;
  } catch (e) {
    // 응답실패
    // alert 적으면 계속 query 실행됨
    return { result: testCourses1 } as APIResponse<GolfCenterList>;
  }
}

// TODO 데이터 세팅 부분 로직 필요
const testCourses1: GolfCenterList = [
  {
    group: "최근",
    centers: [
      // field1
      {
        id: "1",
        type: "field",
        name: "동원 썬밸리CC",
        region1: "강원",
        region2: "강원 안성",
        holeCount: 36,
        courses: [
          {
            id: "1-1",
            name: "SUN",
            nameDetail: "전반",
            parsSum: 36,
            pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
          },
          {
            id: "1-2",
            name: "SUN",
            nameDetail: "후반",
            parsSum: 36,
            pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
          },
          {
            id: "1-3",
            name: "VALLY",
            nameDetail: "전반",
            parsSum: 36,
            pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
          },
          {
            id: "1-4",
            name: "VALLY",
            nameDetail: "후반",
            parsSum: 36,
            pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
          },
        ],
      },
      {
        id: "2",
        type: "field",
        name: "버치힐 컨트리 클럽",
        region1: "강원",
        region2: "강원 평창",
        holeCount: 18,
        courses: [
          {
            id: "2-1",
            name: "BIRCH",
            nameDetail: "",
            parsSum: 36,
            pars: [5, 4, 3, 4, 4, 4, 4, 3, 5],
          },
          {
            id: "2-2",
            name: "HILL",
            nameDetail: "",
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
        region1: "강원",
        region2: "강원 안성",
        holeCount: 36,
        courses: [
          {
            id: "1-1",
            name: "SUN",
            nameDetail: "전반",
            parsSum: 36,
            pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
          },
          {
            id: "1-2",
            name: "SUN",
            nameDetail: "후반",
            parsSum: 36,
            pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
          },
          {
            id: "1-3",
            name: "VALLY",
            nameDetail: "전반",
            parsSum: 36,
            pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
          },
          {
            id: "1-4",
            name: "VALLY",
            nameDetail: "후반",
            parsSum: 36,
            pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
          },
        ],
      },
      {
        id: "2",
        type: "field",
        name: "버치힐 컨트리 클럽",
        region1: "강원",
        region2: "강원 평창",
        holeCount: 18,
        courses: [
          {
            id: "2-1",
            name: "BIRCH",
            nameDetail: "",
            parsSum: 36,
            pars: [5, 4, 3, 4, 4, 4, 4, 3, 5],
          },
          {
            id: "2-2",
            name: "HILL",
            nameDetail: "",
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
        region1: "강원",
        region2: "강원 안성",
        holeCount: 36,
        courses: [
          {
            id: "1-1",
            name: "SUN",
            nameDetail: "전반",
            parsSum: 36,
            pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
          },
          {
            id: "1-2",
            name: "SUN",
            nameDetail: "후반",
            parsSum: 36,
            pars: [4, 5, 3, 4, 4, 5, 3, 4, 4],
          },
          {
            id: "1-3",
            name: "VALLY",
            nameDetail: "전반",
            parsSum: 36,
            pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
          },
          {
            id: "1-4",
            name: "VALLY",
            nameDetail: "후반",
            parsSum: 36,
            pars: [4, 4, 3, 5, 4, 4, 3, 4, 5],
          },
        ],
      },
      {
        id: "2",
        type: "field",
        name: "버치힐 컨트리 클럽",
        region1: "강원",
        region2: "강원 평창",
        holeCount: 18,
        courses: [
          {
            id: "2-1",
            name: "BIRCH",
            nameDetail: "",
            parsSum: 36,
            pars: [5, 4, 3, 4, 4, 4, 4, 3, 5],
          },
          {
            id: "2-2",
            name: "HILL",
            nameDetail: "",
            parsSum: 36,
            pars: [4, 3, 5, 4, 4, 3, 4, 5, 4],
          },
        ],
      },
    ],
  },
];
