/* eslint-disable @typescript-eslint/no-magic-numbers */
export function playTrueAnswerAnimation(container: HTMLElement): void {
  const positions = ['3%', '20%', '40%', '65%', '95%'];

  positions.forEach((left, index) => {
    const plane = document.createElement('span');

    plane.className = 'true-answer-particle';
    plane.textContent = index % 2 === 0 ? '💡' : '🏆';
    plane.style.left = left;
    plane.style.top = '0';
    plane.style.animationDelay = `${index * 30}ms`;

    container.append(plane);

    globalThis.setTimeout(() => {
      plane.remove();
    }, 1000);
  });
}
