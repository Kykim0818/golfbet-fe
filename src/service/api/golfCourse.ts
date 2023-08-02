//  리스트 조회

import { getData } from ".";
import { CourseInfo } from "../../pages/MakeGame/SelectGolfCourse/CourseList";
import { API_URL } from "./constant";

//  api 주소로 request 요청 후 실패시, 콘솔출력후 , 빈 배열 전달
// TODO type 확인
export async function apiGetAllGolfCourses() {
  try {
    // 응답성공
    const response = await getData<any>(API_URL.GET_ALL_GOLF_COURSE);
    return response;
  } catch (e) {
    // 응답실패
    alert("데이터 불러오기 실패, 임시데이터 대체");
    return [];
  }
}

// TODO 데이터 세팅 부분 로직 필요
const testCourses: CourseInfo[] = [
  {
    id: "1",
    name: "골프클럽 Q",
    region: "경기 안성",
    holeCount: 36,
    frontNineCourses: ["Q 전반코스 1", "Q 전반코스 2"],
    backNineCourses: ["후반코스 1", "후반코스 2"],
  },
  {
    id: "2",
    name: "포레스트힐",
    region: "경기 포천",
    holeCount: 36,
    frontNineCourses: ["힐 전반코스 1", "힐 전반코스 2"],
    backNineCourses: ["후반코스 1", "후반코스 2"],
  },
  {
    id: "3",
    name: "몽베르",
    region: "경기 안성",
    holeCount: 36,
    frontNineCourses: ["몽 전반코스 1", "몽 전반코스 2"],
    backNineCourses: ["후반코스 1", "후반코스 2"],
  },
];
