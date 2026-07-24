function animateNaturalScienceCase() {
  const page = document.getElementById("naturalScienceCasePage") || document.querySelector(".cv-case-study-page");
  if (!page || page.dataset.storyAnimated === "true") return;
  if (!window.anime || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    page.dataset.storyAnimated = "true";
    return;
  }

  const selectors = [
    ".cv-hero-kicker",
    ".cv-hero-statement .eyebrow",
    ".cv-hero-statement h2",
    ".cv-hero-statement p",
    ".cv-hero-actions",
    ".cv-case-study-card",
    ".cv-proof-strip article",
    ".cv-portfolio-section",
    ".cv-testimonial-band"
  ];

  const targets = selectors.flatMap((selector) => Array.from(page.querySelectorAll(selector)));
  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translate3d(0,18px,0)";
  });

  anime.timeline()
    .add({
      targets,
      opacity: [0, 1],
      translateY: [22, 0],
      duration: 620,
      delay: anime.stagger(55),
      easing: "easeOutCubic"
    });

  page.dataset.storyAnimated = "true";
}

window.animateNaturalScienceCase = animateNaturalScienceCase;

document.addEventListener("DOMContentLoaded", () => {
  if (document.body?.classList.contains("cv-story-standalone-body")) {
    animateNaturalScienceCase();
  }
});
