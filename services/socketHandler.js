import { insertToUserLog } from "../model/sqlQuery.js";

export const socketHandler = (io, socket) => {
  socket.on("user:connect", ({ userId }) => {
    socket.userId = userId;
    socket.join(`user:${userId}`);
    console.log(`Socket Connection: user:${userId}`);
  });

  socket.on("update", () => {
    io.emit("update");
  });

  socket.on("send:userLog", async ({ userLogInfo }) => {
    delete userLogInfo.Created_at;
    console.log("Received userLogInfo:", userLogInfo); 
    await insertToUserLog(userLogInfo);
    io.emit("recieve:userLog", { userLogInfo });
  });

  socket.on("order:update", ({ id, message }) => {
    io.to(`user:${id}`).emit("order:update", {
      message: message,
    });
  });
};
