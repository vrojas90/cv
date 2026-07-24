function animateCvProfile() {
  const page = document.getElementById("cvProfilePage") || document.querySelector(".cv-portfolio-page");
  if (!page || page.dataset.cvAnimated === "true") return;
  if (!window.anime || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    page.dataset.cvAnimated = "true";
    return;
  }

  const revealTargets = [
    ".cv-hero-kicker",
    ".cv-hero-statement .eyebrow",
    ".cv-hero-statement h2",
    ".cv-hero-statement p",
    ".cv-hero-actions",
    ".cv-hero-card"
  ];
  const metricTargets = page.querySelectorAll(".cv-proof-strip article");
  const sectionTargets = page.querySelectorAll(".cv-portfolio-section, .cv-testimonial-band, .cv-contact-footer");
  const cardTargets = page.querySelectorAll(".cv-skill-board article, .cv-case-card, .cv-pipeline article, .cv-authority-grid article");

  [...revealTargets.flatMap((selector) => Array.from(page.querySelectorAll(selector))), ...metricTargets, ...sectionTargets, ...cardTargets].forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translate3d(0,18px,0)";
  });

  const timeline = anime.timeline();
  timeline
    .add({
      targets: revealTargets.map((selector) => `#cvProfilePage ${selector}`),
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 720,
      delay: anime.stagger(85),
      easing: "easeOutExpo"
    })
    .add({
      targets: "#cvProfilePage .cv-proof-strip article",
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.98, 1],
      duration: 520,
      delay: anime.stagger(70),
      easing: "easeOutCubic"
    }, 420)
    .add({
      targets: "#cvProfilePage .cv-portfolio-section, #cvProfilePage .cv-testimonial-band, #cvProfilePage .cv-contact-footer",
      opacity: [0, 1],
      translateY: [22, 0],
      duration: 580,
      delay: anime.stagger(90),
      easing: "easeOutCubic"
    }, 760)
    .add({
      targets: "#cvProfilePage .cv-skill-board article, #cvProfilePage .cv-case-card, #cvProfilePage .cv-pipeline article, #cvProfilePage .cv-authority-grid article",
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.985, 1],
      duration: 460,
      delay: anime.stagger(35),
      easing: "easeOutCubic"
    }, 980);

  page.dataset.cvAnimated = "true";
}

window.animateCvProfile = animateCvProfile;

document.addEventListener("DOMContentLoaded", () => {
  if (document.body?.classList.contains("cv-standalone-body")) {
    animateCvProfile();
  }
});
