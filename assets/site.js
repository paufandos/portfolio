// Cursor spotlight and active section in the side navigation.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (!reduceMotion && finePointer) {
    let frame = 0;
    window.addEventListener("pointermove", (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.body.style.setProperty("--x", `${event.clientX}px`);
        document.body.style.setProperty("--y", `${event.clientY}px`);
      });
    });
  }

  const links = [...document.querySelectorAll(".toc a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.setAttribute("aria-current", link.getAttribute("href") === `#${id}` ? "true" : "false");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
  setActive(sections[0].id);
})();
