export const socketHandler = (io, socket) => {
    socket.on("user:connect", ({userId}) => {
        socket.userId = userId;
        socket.join(`user:${userId}`);
        console.log(`Socket Connection: user:${userId}`);
    });

    socket.on("update", ({changes}) => {
        try {
            if(changes == true){
                socket.broadcast.emit("update", {
                    message: "Updating Pages"
                });
            }
        } catch (error) {
            console.log("Socket update ERROR: ", error);
        }
    })
}