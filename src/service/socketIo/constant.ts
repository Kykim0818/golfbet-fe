export const EVENTS = {
  FROM_SERVER: {
    CONNECTION: "connect",
    CONNECTION_FAIL: "connect_failed",
    CONNECTION_ERROR: "connect_error",
    DISCONNECT: "disconnect",
    BROADCAST_CONNECT_MESSAGE: "connectedMessage",
    BROADCAST_ROOM_MESSAGE: "task",
  },
  TO_SERVER: {
    JOIN_ROOM: "joinRoom",
    SEND_TASK_MESSAGE: "message",
  },
} as const;

export const TASK = {
  JOIN_ROOM: "join",
  SET_READY: "ready",
  EXIT_ROOM: "exit",
  ROOM_UPDATE: "update",
  START_GAME: "start",
  ENTER_SCORE: "insert",
  FIX_SCORE: "next",
} as const;

export const SOCKET_RESPONSE = {
  CODE: {
    RESULT_SUCCESS: 200,
    /** 해당 방에 없는 사람을 exit 요청하는 경우 */
    INVALID_REQUEST: 400,
    PERMISSION_DENIED: 403,
    NO_RESOURCE: 404,
    /** 방에 다찾는데 join  */
    FULL_ROOM_ERROR: 423,
    INTERNAL_SERVER_ERROR: 500,
  },
};
