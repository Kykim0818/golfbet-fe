export const EVENTS = {
  FROM_SERVER: {
    CONNECTION: "connect",
    CONNECTION_FAIL: "connect_failed",
    CONNECTION_ERROR: "connect_error",
    DISCONNECT: "disconnect",
    BROADCAST_MESSAGE: "",
  },
  TO_SERVER: {
    JOIN_ROOM: "joinRoom",
    SEND_TASK_MESSAGE: "message",
  },
};

export const TASK = {
  JOIN_ROOM: "join",
  SET_READY: "ready",
  EXIT_ROOM: "exit",
};
