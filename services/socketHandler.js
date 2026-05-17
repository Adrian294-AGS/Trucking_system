import { insertToUserLog, insertToDatabase, fetchNotif } from "../model/sqlQuery.js";

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
    await insertToUserLog(userLogInfo);
    io.emit("recieve:userLog", { userLogInfo });
  });

  socket.on("order:update", async ({ id, message, notifInfo }) => {
    try {
      const result = await insertToDatabase("tbl_notif", notifInfo);
      const info = await fetchNotif(result.insertId);
      io.to(`user:${id}`).emit("order:update", {
        message: message,
        notifInfo: info
      });
    } catch (error) {
      console.log("order:update Socket ERROR: ", error);
    }
  });
};
