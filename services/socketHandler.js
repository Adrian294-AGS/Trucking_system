import { insertToUserLog } from "../model/sqlQuery.js";

export const socketHandler = (io, socket) => {
    socket.on("user:connect", ({userId}) => {
        socket.userId = userId;
        socket.join(`user:${userId}`);
        console.log(`Socket Connection: user:${userId}`);
    });

    socket.on("update", () => {
       io.emit("update");
    });

    socket.on("send:userLog", async ({info}) => {
        delete info.Created_at
        await insertToUserLog(info);
        io.emit("recieve:userLog", {info});
    });

    socket.on("order:update", ({id, message}) => {
        io.to(`user:${id}`).emit("order:update", {
            message: message
        });
    });
}