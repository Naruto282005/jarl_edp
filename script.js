// SIMPLE THROTTLE (para hindi lag sa scroll/resize)
function throttle(func, delay) {
  let canRun = true;

  return function () {
    if (!canRun) return;

    canRun = false;
    func();

    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}

// RESPONSIVE HUD (resize event)
function updateHUD() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // window size
  document.getElementById("sizeText").textContent = width + " x " + height;

  // device label
  let device = "Desktop";
  if (width <= 600) device = "Mobile";
  else if (width <= 900) device = "Tablet";

  document.getElementById("deviceText").textContent = device;
}

// PROGRESS BAR + BOSS WARNING
function updateScrollStuff() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent = scrollTop / scrollHeight;
  document.getElementById("progressBar").style.width = percent * 100 + "%";

  // show warning at 70%
  if (percent >= 0.7) {
    document.getElementById("boss").style.display = "block";
  } else {
    document.getElementById("boss").style.display = "none";
  }
}

// UNLOCK SECTIONS
function unlockSections() {
  const levels = document.querySelectorAll(".level");

  levels.forEach((level) => {
    const box = level.getBoundingClientRect();

    // if section is near the screen, unlock it
    if (box.top < window.innerHeight * 0.8) {
      level.classList.remove("locked");
      level.classList.add("unlocked");
    }
  });
}

// EVENTS
window.addEventListener("load", () => {
  updateHUD();
  updateScrollStuff();
  unlockSections();

  // loading screen mawala after load
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
  }, 500);
});

window.addEventListener(
  "resize",
  throttle(() => {
    updateHUD();
  }, 200),
);

window.addEventListener(
  "scroll",
  throttle(() => {
    updateScrollStuff();
    unlockSections();
  }, 80),
);
