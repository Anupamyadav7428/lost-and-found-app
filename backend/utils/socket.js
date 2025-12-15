let ioInstance = null;

export function initIO(io) {
    ioInstance = io;
}

export function getIO() {
    if (!ioInstance) {
        throw new Error("Socket.io not initialized!");
    }
    return ioInstance;
}
