export const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const second = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${second < 10 ? '0' : ''}${second}`;
};
