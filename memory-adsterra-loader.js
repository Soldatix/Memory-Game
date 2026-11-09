/* Memory Game — Adsterra owner's ORIGINAL desktop/mobile GET CODE.
 * One initial menu advertisement, no requests without active first-party consent,
 * no refresh on returning to the menu and no ads during gameplay.
 * The original provider scripts are only injected at HTML parser time.
 */
(() => {
  "use strict";
  if (location.hostname !== "memory.appsandgames.org") return;
  if (document.readyState !== "loading") return;
  if (navigator.onLine === false) return;
  const current = document.currentScript;
  const slot = current?.parentElement;
  const area = slot?.parentElement;
  if (!slot?.classList.contains("memory-ad-unit") ||
      area?.id !== "memory-ad-area") return;
  if (!document.getElementById("homeScreen")?.classList.contains("active")) return;
  if (!matchMedia("(min-width: 320px)").matches) return;
  const desktop = matchMedia("(min-width: 800px)").matches;
  const unit = current.dataset.unit;
  if ((desktop && unit !== "desktop") || (!desktop && unit !== "mobile")) return;

  let allowed = false;
  try {
    const entry = document.cookie.split(";").map(s => s.trim())
      .find(s => s.startsWith("ag_privacy_choices_v1="));
    const data = entry && JSON.parse(decodeURIComponent(
      entry.slice("ag_privacy_choices_v1=".length)));
    const age = data && Date.now() - data.timestamp;
    allowed = !!data && data.version === 1 &&
      data.partnerRevision === "adsterra-2026-11" &&
      data.advertising === true &&
      Number.isFinite(age) && age >= 0 &&
      age <= 180 * 24 * 60 * 60 * 1000;
  } catch (_) { allowed = false; }
  if (!allowed) return;

  const tags = {
    desktop: "<script>\n  atOptions = {\n    'key' : 'f443329732a4c1509e4df270f19fd1df',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/f443329732a4c1509e4df270f19fd1df\"></script>",
    mobile: "<script>\n  atOptions = {\n    'key' : '2fa9390dba37fceb8d27bdc5a342cd94',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/2fa9390dba37fceb8d27bdc5a342cd94\"></script>"
  };
  area.hidden = false;
  slot.hidden = false;
  const label = document.createElement("span");
  label.className = "memory-ad-label";
  label.textContent = "Advertisement";
  slot.insertBefore(label, current);
  document.write(tags[unit]);
})();
