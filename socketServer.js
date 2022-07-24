const commentService = require("./services/comments");

const UPVOTE_EVENT = "upvote";
const UPVOTE_EMIT_EVENT = "comment-upvote-updated";

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const registerSocketServer = (server) => {
  ioInstance = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  setSocketServerInstance(ioInstance);

  io.on("connection", (socket) => {
    console.log(`user connected with socket id: ${socket.id}`);

    socket.on(UPVOTE_EVENT, async ({ commentId }) => {
      const updatedComment = await commentService.getCommentById(commentId);
      io.emit(UPVOTE_EMIT_EVENT, updatedComment);
    });
  });
};

module.exports = {
  registerSocketServer,
  getSocketServerInstance,
  setSocketServerInstance,
};
