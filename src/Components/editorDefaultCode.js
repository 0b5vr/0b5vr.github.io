import { ClockRealtime, Euler, Matrix4, Vector3 } from '@0b5vr/experimental';

export default ({ divContainer }) => {
  let unmounted = false;

  const vector = new Vector3([1.0, 2.0, 3.0]);

  const euler = new Euler([Math.PI / 4.0, Math.PI / 4.0, Math.PI / 4.0]);
  const quat = euler.quaternion;
  const vectorModel = vector.applyQuaternion(quat);

  // update
  const clock = new ClockRealtime();
  clock.play();

  function update() {
    if (unmounted) {
      return;
    }

    clock.update();
    const { time } = clock;

    const matrixView = Matrix4.lookAtInverse(
      new Vector3([Math.cos(time), 0.0, Math.sin(time)]).scale(5.0),
      Vector3.zero,
    );
    const vectorView = vectorModel.applyMatrix4(matrixView);

    divContainer.textContent = vectorView;

    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);

  // uninit
  return () => {
    unmounted = true;
  };
};
