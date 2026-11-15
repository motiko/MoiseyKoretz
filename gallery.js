// Gallery mode for .gallery: a click on a photograph opens its full scan in
// the dialog.lightbox from base.njk, with previous/next buttons and arrow keys.
// The dialog itself handles Escape, focus and the close button (method="dialog").
// Without this script each photograph is a plain link to its full scan.
(() => {
  const dialog = document.querySelector("dialog.lightbox");
  const links = [...document.querySelectorAll(".gallery figure > a")];
  if (!dialog || !links.length) return;

  const img = dialog.querySelector("img");
  const caption = dialog.querySelector(".lightbox-caption");
  const count = dialog.querySelector(".lightbox-count");
  const rtl = document.dir === "rtl";
  let current = 0;

  function show(n) {
    current = (n + links.length) % links.length;
    const link = links[current];
    const thumb = link.querySelector("img");
    img.src = link.href;
    img.alt = thumb.alt;
    img.width = thumb.width;
    img.height = thumb.height;
    caption.textContent = link.parentElement.querySelector("figcaption")?.textContent ?? "";
    count.textContent = `${current + 1} / ${links.length}`;
    // Fetch the neighbours now, so stepping through does not wait on the network.
    for (const step of [1, -1]) new Image().src = links[(current + step + links.length) % links.length].href;
  }

  links.forEach((link, n) => link.addEventListener("click", (e) => {
    // Let modified clicks open the scan in a new tab or window as usual.
    if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    show(n);
    dialog.showModal();
  }));

  dialog.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
  dialog.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));

  // Arrow keys follow the reading direction: on Hebrew pages ← is "next".
  dialog.addEventListener("keydown", (e) => {
    const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
    if (step) show(current + step);
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(-1);
    else return;
    e.preventDefault();
  });

  // Swipe on touch screens: the photograph follows the finger's direction, so on
  // left-to-right pages a swipe to the left brings the next one, and on Hebrew
  // pages a swipe to the right. Two-finger gestures are left to pinch zoom.
  let touchX = null, touchY = 0;
  dialog.addEventListener("touchstart", (e) => {
    touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < 1.5 * Math.abs(dy)) return;
    show(current + ((dx < 0) !== rtl ? 1 : -1));
  });

  // A click on the empty area around the photograph closes the viewer.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  // Back on the page, focus and scroll to the photograph that was last shown.
  dialog.addEventListener("close", () => links[current].focus());
})();
