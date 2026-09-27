/* =====================================================================
   SS Travels Naidu — visitor counter
   ---------------------------------------------------------------------
   Counts each visitor once (per browser) and shows the total in the
   footer: "Visitors so far: 1,234".

   The number is stored in YOUR Firebase project's Firestore database,
   in the document  stats/visits .  One-time setup is described in the
   notes that came with this file (create Firestore + paste the rules).

   Until Firestore is set up, the counter simply stays hidden.
   ===================================================================== */
(function () {
  var PROJECT_ID = "ss-travels-naidu";          // your Firebase project id (from .firebaserc)
  var SHOW_FROM = 0;                             // hide the counter until the total reaches this number

  var box = document.getElementById("visits");
  if (!box || !window.fetch) return;
  var out = document.getElementById("visit-count");
  var base = "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents";
  var docName = "projects/" + PROJECT_ID + "/databases/(default)/documents/stats/visits";

  function seen() { try { return localStorage.getItem("ss_visited") === "1"; } catch (e) { return false; } }
  function markSeen() { try { localStorage.setItem("ss_visited", "1"); } catch (e) {} }

  function show(n) {
    if (!(n >= SHOW_FROM) || !(n > 0)) return;
    box.hidden = false;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { out.textContent = n.toLocaleString("en-IN"); return; }
    var start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - p, 3);
      out.textContent = Math.round(n * eased).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!seen()) {
    // New visitor: add 1 and get the new total back in the same request
    fetch(base + ":commit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ writes: [{ transform: { document: docName,
        fieldTransforms: [{ fieldPath: "count", increment: { integerValue: "1" } }] } }] })
    }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) {
        markSeen();
        show(parseInt(j.writeResults[0].transformResults[0].integerValue, 10));
      })
      .catch(function () { /* Firestore not set up yet: stay hidden */ });
  } else {
    // Returning visitor: just read the total
    fetch(base + "/stats/visits")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) { show(parseInt(j.fields.count.integerValue, 10)); })
      .catch(function () {});
  }
})();
