interface Ref {
  current: null | number;
}

const rafTimeout = (cb: () => void, delay: number, ref: Ref): void => {
  const start = Date.now();
  const animate = (): void => {
    const currentTime = Date.now();
    const timeout = currentTime - start;
    ref.current = requestAnimationFrame(animate);
    if (timeout > delay) {
      cb();
      cancelAnimationFrame(ref.current);
    }
  };
  animate();
};

export default rafTimeout;
