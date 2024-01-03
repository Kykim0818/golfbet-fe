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
} as const;
