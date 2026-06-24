/* ================================================
   PROJECT DATA
   ================================================ */
const projects = {
  "payload-robot": {
    title: "Payload Robotics Challenge",
    tag: "Robotics · MAE 106",
    dateRange: "September 2025 – December 2025",
    image: "mae_106_robot.jpg",
    imageAlt: "Payload Robotics Challenge robot",
    photos: [
      { src: "mae_106_robot.jpg", alt: "Payload robot overview" },
      { src: null, alt: "Photo 2" },
      { src: null, alt: "Photo 3" },
      { src: null, alt: "Photo 4" }
    ],
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
    tag: "Robotics · Zotbotics @ UCI",
    dateRange: "September 2025 – December 2025",
    image: "Spiderbot_picture.jpg",
    imageAlt: "Spider-Bot quadruped robot",
    photos: [
      { src: "Spiderbot_picture.jpg", alt: "Spider-Bot overview" },
      { src: null, alt: "Photo 2" },
      { src: null, alt: "Photo 3" },
      { src: null, alt: "Photo 4" }
    ],
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
    tag: "CAD Design · ENGR 52 Final",
    dateRange: "September 2025 – December 2025",
    image: "Assembly_Screenshot.png",
    imageAlt: "SolidWorks custom cruiser motorcycle assembly",
    photos: [
      { src: "Assembly_Screenshot.png", alt: "Motorcycle assembly overview" },
      { src: null, alt: "Photo 2" },
      { src: null, alt: "Photo 3" },
      { src: null, alt: "Photo 4" }
    ],
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
   OVERLAY LOGIC
   ================================================ */
const overlay  = document.getElementById("project-overlay");
const content  = document.getElementById("overlay-content");
const closeBtn = document.getElementById("overlay-close");

function buildPhotoGrid(photos) {
  return photos.map((photo, i) => {
    if (photo.src) {
      return `
        <div class="overlay-photo-slot">
          <img src="${photo.src}" alt="${photo.alt}" />
        </div>`;
    } else {
      return `
        <div class="overlay-photo-slot overlay-photo-placeholder">
          <div class="placeholder-inner">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Photo ${i + 1}</span>
          </div>
        </div>`;
    }
  }).join("");
}

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const highlightItems = p.highlights.map(h => `<li>${h}</li>`).join("");
  const linksHTML = (p.links && p.links.length)
    ? `<div class="overlay-links">${p.links.map(l =>
        `<a class="overlay-btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`
      ).join("")}</div>`
    : "";

  content.innerHTML = `
    <div class="overlay-header">
      <div class="overlay-meta">
        <span class="overlay-tag">${p.tag}</span>
        <h3 id="overlay-title">${p.title}</h3>
        <div class="overlay-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${p.dateRange}
        </div>
      </div>
    </div>

    <div class="overlay-photo-grid">
      ${buildPhotoGrid(p.photos)}
    </div>

    <div class="overlay-body">
      <div class="overlay-description">
        ${p.description}
      </div>

      <div class="overlay-highlights">
        <div class="overlay-highlights-title">Tools &amp; Skills</div>
        <ul>${highlightItems}</ul>
      </div>

      ${linksHTML}
    </div>
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

  overlay.addEventListener("transitionend", () => {
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

// Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !overlay.hidden) closeProject();
});

// Handle direct URL with hash
if (window.location.hash.startsWith("#project-")) {
  openProject(window.location.hash.replace("#project-", ""));
}
