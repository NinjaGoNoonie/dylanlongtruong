/* ================================================
   PROJECT DATA
   ================================================ */
const projects = {
  "payload-robot": {
    title: "MAE 106 Final Project Robot",
    tag: "Robotics · MAE 106",
    dateRange: "September 2025 – December 2025",
    image: "mae_106_robot.jpg",
    imageAlt: "MAE 106 Final Project Robot",
    photos: [
      { src: "MAE_106_GOOD.jpg", alt: "Image of Full Robot" },
      { src: "RACK_PINION_IMAGE.jpg", alt: "Rack and Pinion Steering System" },
      { src: "CAD_MAE106.jpg", alt: "CAD Model of robot" },
      { src: "Wiring_diagram_v2.png", alt: "Robot Wiring Diagram" }
    ],
    description: `
      <p>Worked in a group to design in CAD and assemble an Arduino-controlled, pneumatic piston-powered robot. The robot 
      had to follow specific height and diameter constraints, and had to move forward a certain distance, and then make a turn down an
      opening.</p>
      <p>The robot had a magnetometer for feedback control, and was paired with a digital filter for the 
      robot to travel in its intended direction. The tire on top acted as a "gas tank" for the robot; essentially,
      there was a solenoid that periodically allowed the pressurized tire to trigger a pneumatic piston, which pushed off
      the floor, allowing the robot to move. We created a rack and pinion steering system controlled by a servo to allow
      it to turn.</p>
      <p>The frame of the robot was primarily made by laser cutting wood pieces and then using L-shaped brackets to
      hold the pieces together. The rest of the components, such as the rack and pinion were 3-D printed. This project
      taught me a lot about mechanical design as well as problem-solving, how reaching a goal is not always linear
      and how it takes a lot of trials and adaptations to get to the final goal.</p>
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
      <p> I assembled a four-legged walking robot built through Zotbotics, a robotics club at UC Irvine.
      The Spider-Bot uses servo-driven legs and an Arduino microcontroller to move and detect objects in front
      of it. The robot is powered through rechargeable batteries and uses buck converters to supply enough
      power to servo motors while simultaneously preventing the Arduino from frying.</p>
      <p>This was my first ever introduction to robotics and it introduced me to concepts such as soldering, circuit
      analysis, 3-D printing, and microcontrollers.
      </p>
    `,
    highlights: ["Servo Control", "Microcontroller", "Circuit Soldering", "3D Printing", "Zotbotics @ UCI"]
  },

  "cruiser-motorcycle": {
    title: "Custom Cruiser Motorcycle",
    tag: "CAD Design · ENGR 52 Final",
    dateRange: "September 2025 – December 2025",
    image: "Assembly_Screenshot.png",
    imageAlt: "SolidWorks custom cruiser motorcycle assembly",
     video: "Final_Project_MAE_52.mp4"
    photos: [
      { src: "Assembly_Screenshot.png", alt: "Motorcycle assembly overview" },
      { src: "Assembly_Explode_Screenshot.png", alt: "Exploded Assembly" },
      { src: "Engine_Screenshot.png", alt: "Engine" },
      { src: "Steering_Screenshot.png", alt: "Steering Assembly" }
    ],
    description: `
      <p>Final project for ENGR 52 — I created a fully custom cruiser-style motorcycle modeled from scratch
      in SolidWorks with realistic part-level detail and proper mate constraints throughout the assembly. 
      I got the idea from a motorcycle I saw near campus one time, and I absolutely loved the design, 
      so I wanted to create something similar. I spent 70+ hours creating this project and was 
      relatively new to SolidWorks at the time.</p>
      <p>This project pushed my SolidWorks abilities and helped me learn many new advanced SolidWorks
      techniques, such as 3D sketches and swept bases. I had to do research on a lot of techniques that were not 
      taught in class. This project was very challenging, however, it pushed my SolidWorks skills to get significantly
      better in a short amount of time.</p>
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
        ${p.video ? `
        <div class="overlay-video-wrap">
          <video controls preload="metadata" playsinline>
            <source src="${p.video}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>` : ''}
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
