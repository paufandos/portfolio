// The accreditation follows the pointer a little, like a badge hanging from its lanyard.
(() => {
  const badge = document.querySelector(".badge");
  if (!badge) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduceMotion || !finePointer) return;

  const hero = badge.closest(".hero");
  let frame = 0;

  badge.addEventListener("animationend", () => {
    badge.style.animation = "none";
    badge.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

    hero.addEventListener("pointermove", (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = badge.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) / window.innerWidth;
        const dy = (event.clientY - (box.top + box.height / 2)) / window.innerHeight;
        badge.style.setProperty("--tilt-y", `${(dx * 14).toFixed(2)}deg`);
        badge.style.setProperty("--tilt-x", `${(-dy * 10).toFixed(2)}deg`);
      });
    });

    hero.addEventListener("pointerleave", () => {
      badge.style.setProperty("--tilt-x", "0deg");
      badge.style.setProperty("--tilt-y", "0deg");
    });
  }, { once: true });
})();
