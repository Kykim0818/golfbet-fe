export const API_URL = {
  // center
  GET_ALL_GOLF_CENTER: `/v1/centers/all`,
  // AUTH
  START_KAKAO: "/v1/auth/kakao/signup",
  SIGN_UP: "v1/auth/signup",
  CHECK_DUPLICATE: "v1/auth/user/duplication",
  // TODO
  GET_GAME_ROOM_INFO: "",
};

export const UNIQUE_QUERY_KEY = {
  GET_ALL_GOLF_CENTER: "getAllGolfCenter",

  // 게임방 생성 요청
  MAKE_GAME_ROOM: "makeGameRoom",

  // 생성된 게임방 정보 조회
  GET_GAME_ROOM_INFO: "getGameRoomInfo",
};
