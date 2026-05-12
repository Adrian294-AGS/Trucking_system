export const socketHandler = (io, socket) => {
    socket.on("user:connect", ({userId}) => {
        socket.userId = userId;
        socket.join(`user:${userId}`);
        console.log(`Socket Connection: user:${userId}`);
    });

    socket.on("update", () => {
       io.emit("update");
    })

    socket.on("order:update", ({id, message}) => {
        io.to(`user:${id}`).emit("order:update", {
            message: message
        });
    })
}