/* ================================================
   PROJECT DATA
   Edit the description, highlights, and links
   for each project here.
   ================================================ */
const projects = {
  "payload-robot": {
    title: "Payload Robotics Challenge",
    tag: "Robotics · MAE 106 · Sept – Dec 2025",
    image: "mae_106_robot.jpg",
    imageAlt: "Payload Robotics Challenge robot",
    description: `
      <p>Designed in CAD and assembled an Arduino-controlled robot built to navigate
      a set obstacle course while carrying a payload under strict size and weight constraints.</p>
      <p>The robot used feedback control in conjunction with servos, solenoids, and pneumatic
      pistons for motion. Circuit design included filtering, voltage control via MOSFETs,
      and sensor integration for real-time adjustments.</p>
    `,
    highlights: ["Arduino", "Feedback Control", "Servos & Solenoids", "Pneumatic Pistons", "MOSFETs", "CAD Design", "Circuit Analysis"]
  },

  "spider-bot": {
    title: "Spider-Bot Quadruped",
    tag: "Robotics · Zotbotics @ UCI · Sept – Dec 2025",
    image: "Spiderbot_picture.jpg",
    imageAlt: "Spider-Bot quadruped robot",
    description: `
      <p>A four-legged walking robot built through Zotbotics, the robotics club at UC Irvine.
      The Spider-Bot uses servo-driven legs and a microcontroller to achieve stable locomotion.</p>
      <p>Responsibilities included assembling and soldering circuits integrating sensors, servos,
      and the microcontroller, as well as designing and 3D printing custom mechanical components in CAD.</p>
    `,
    highlights: ["Servo Control", "Microcontroller", "Circuit Soldering", "3D Printing", "CAD Modeling", "Mechanical Design", "Zotbotics @ UCI"]
  },

  "cruiser-motorcycle": {
    title: "Custom Cruiser Motorcycle",
    tag: "CAD Design · ENGR 52 Final · Sept – Dec 2025",
    image: "Assembly_Screenshot.png",
    imageAlt: "SolidWorks custom cruiser motorcycle assembly",
    description: `
      <p>Final project for ENGR 52 — a fully custom cruiser-style motorcycle modeled from scratch
      in SolidWorks with realistic part-level detail and proper mate constraints throughout the assembly.</p>
      <p>The project demonstrated knowledge of assemblies, sub-assemblies, and advanced SolidWorks
      techniques including custom dimensioning of every component from frame to body panels.</p>
    `,
    highlights: ["SolidWorks", "Full Assembly", "Sub-Assemblies", "Mate Constraints", "Custom Dimensioning", "Advanced CAD"]
  }
};

/* ================================================
   OVERLAY LOGIC — no edits needed below this line
   ================================================ */
const overlay  = document.getElementById("project-overlay");
const panel    = document.getElementById("overlay-panel");
const backdrop = document.getElementById("overlay-backdrop");
const content  = document.getElementById("overlay-content");
const closeBtn = document.getElementById("overlay-close");

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const highlightItems = p.highlights
    .map(h => `<li>${h}</li>`)
    .join("");

  const linksHTML = (p.links && p.links.length)
    ? `<div class="overlay-links">${p.links.map(l =>
        `<a class="overlay-btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`
      ).join("")}</div>`
    : "";

  content.innerHTML = `
    <img src="${p.image}" alt="${p.imageAlt}" />
    <span class="overlay-tag">${p.tag}</span>
    <h3 id="overlay-title">${p.title}</h3>
    ${p.description}
    <div class="overlay-highlights">
      <div class="overlay-highlights-title">Tools & Skills</div>
      <ul>${highlightItems}</ul>
    </div>
    ${linksHTML}
  `;

  overlay.hidden = false;
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("is-open"));
  });

  history.pushState({ project: id }, "", `#project-${id}`);
  closeBtn.focus();
}

function closeProject() {
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";

  panel.addEventListener("transitionend", () => {
    overlay.hidden = true;
  }, { once: true });

  history.pushState(null, "", window.location.pathname);
}

// Card clicks
document.querySelectorAll("[data-project]").forEach(card => {
  card.addEventListener("click", () => openProject(card.dataset.project));
});

// Close button
closeBtn.addEventListener("click", closeProject);

// Backdrop click
backdrop.addEventListener("click", closeProject);

// Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !overlay.hidden) closeProject();
});

// Handle direct URL with hash (e.g. someone shares the link)
if (window.location.hash.startsWith("#project-")) {
  openProject(window.location.hash.replace("#project-", ""));
}
