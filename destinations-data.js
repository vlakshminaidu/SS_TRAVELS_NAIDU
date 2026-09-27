/* =====================================================================
   SS Travels Naidu — destinations list
   ---------------------------------------------------------------------
   This one file feeds BOTH pages:
     • the moving cards on index.html
     • the details page destination.html?id=...

   To add a destination: copy one { ... } block and change the values.
   To add places to see: fill in its "spots" list, like this:

     spots: [
       { name: "Mysore Palace", about: "Seat of the Wadiyar kings, lit up on Sunday evenings.",
         photo: "Mysore_Palace_Morning.jpg" },   // photo is optional
       { name: "Chamundi Hills", about: "Hilltop temple with views over the city." }
     ]

   id     = short name used in the page link (lowercase, no spaces)
   photo  = a Wikimedia Commons file name, OR your own file like "images/ooty.webp"
   ===================================================================== */

var SS_WHATSAPP = "917093340050";   // country code + number, no "+" or spaces

var SS_DESTINATIONS = [
  /* ---------------- Andhra Pradesh ---------------- */
  { id: "tirupathi", name: "Tirumala Tirupathi", state: "Andhra Pradesh",
    tag: "Temple & Hills", nights: "2 nights",
    blurb: "Darshan at Sri Venkateswara Temple on the Seven Hills — our home ground, with 22+ years of planning darshan, stay and transport for families.",
    photo: "A_View_of_Tirumala_Venkateswara_Temple.JPG",
    spots: [
      { name: "Sri Venkateswara Temple, Tirumala", about: "The main darshan. We guide you on TTD's Special Entry, Sarva Darshan and seva options." },
      { name: "Akasa Ganga", about: "Sacred waterfall on the Tirumala hills." },
      { name: "Sri Vari Museum", about: "Museum on the history and traditions of the Tirumala temple." },
      { name: "Kanipakam", about: "Varasiddhi Vinayaka Temple, an easy add-on from Tirupati." },
      { name: "Srikalahasti", about: "Ancient Shiva temple, often paired with a Tirupati visit." }
    ] },

  /* ---------------- Kerala ---------------- */
  { id: "alleppey", name: "Alleppey Backwaters", state: "Kerala",
    tag: "Backwaters at their own pace", nights: "5 nights",
    blurb: "Houseboat stays on Vembanad Lake, village canals and a slower pace. Ideal for families.",
    photo: "Kerala_backwaters,_Vembanad_Lake,_Houseboats,_India.jpg",
    spots: [] },

  { id: "munnar", name: "Munnar", state: "Kerala",
    tag: "Kashmir of South India", nights: "3 nights",
    blurb: "Misty tea estates, Eravikulam National Park and cool hill-station air.",
    photo: "Munnar_Tea_Plantations-WUS07343-Pano.jpg",
    spots: [] },

  /* ---------------- Tamil Nadu ---------------- */
  { id: "ooty", name: "Ooty", state: "Tamil Nadu",
    tag: "Queen of Hill Stations", nights: "3 nights",
    blurb: "Botanical gardens, the Nilgiri toy train and lake boating in the cool hills.",
    photo: "Ooty_Lake.jpg",
    spots: [] },

  { id: "kodaikanal", name: "Kodaikanal", state: "Tamil Nadu",
    tag: "Princess of Hill Stations", nights: "3 nights",
    blurb: "Pine forests, Kodai Lake, Coaker's Walk and Pillar Rocks at an easy pace.",
    photo: "Kodaikanal_Lake_(Princess_of_Hill_stations),_Tamil_Nadu,_India.jpg",
    spots: [] },

  { id: "tiruvannamalai", name: "Tiruvannamalai", state: "Tamil Nadu",
    tag: "Arunachala, the sacred hill", nights: "",
    blurb: "The vast Arunachaleswarar Temple at the foot of Arunachala hill, the Girivalam walk around it, and Sri Ramana Ashram.",
    photo: "Arunachalam_temple_from_a_nearby_hill.jpg",
    spots: [] },

  { id: "kanyakumari", name: "Kanyakumari", state: "Tamil Nadu",
    tag: "Where three seas meet", nights: "",
    blurb: "Sunrise and sunset at India's southern tip, the Vivekananda Rock Memorial, the Thiruvalluvar Statue and the Kumari Amman Temple.",
    photo: "Vivekananda-and-Thiruvalluvar-Rock-Memorials-at-Kanyakumari.jpg",
    spots: [] },

  /* ---------------- Karnataka ---------------- */
  { id: "mysore", name: "Mysuru (Mysore)", state: "Karnataka",
    tag: "City of Palaces", nights: "",
    blurb: "The royal city of the Wadiyars: the illuminated Mysore Palace, Chamundi Hills and Brindavan Gardens.",
    photo: "Mysore_Palace_Morning.jpg",
    spots: [] },

  { id: "murdeshwar", name: "Murudeshwar", state: "Karnataka",
    tag: "Shiva by the Arabian Sea", nights: "",
    blurb: "A seaside temple town with one of the world's tallest Shiva statues and a towering gopuram over the shore.",
    photo: "Murudeshwar_Shiva_Statue.jpg",
    spots: [] },

  { id: "gokarna", name: "Gokarna", state: "Karnataka",
    tag: "Temple town & quiet beaches", nights: "",
    blurb: "Darshan at the Mahabaleshwar Temple, then the calm, curving shores of Om Beach and Kudle Beach.",
    photo: "Om_beach_Gokarna.JPG",
    spots: [] },

  { id: "udupi", name: "Udupi", state: "Karnataka",
    tag: "Home of Sri Krishna", nights: "",
    blurb: "The famous Sri Krishna Matha, temple chariots and the coastline around Malpe.",
    photo: "Udupi_Sri_Krishna_Matha_Temple.jpg",
    spots: [] },

  { id: "kukke-dharmasthala", name: "Kukke Subramanya & Dharmasthala", state: "Karnataka",
    tag: "Sacred temples of the Western Ghats", nights: "",
    blurb: "Kukke Subramanya Temple in the forested hills, paired with the Sri Manjunatha Temple at Dharmasthala.",
    photo: "Kukke_subramanya_swamy_temple,_karnataka.JPG",
    spots: [] }
];

/* ---------------- helpers (no need to edit) ---------------- */
var SS = {
  isOwnFile: function (p) { return p.indexOf("/") !== -1; },
  photo: function (p, width) {
    if (!p) return "";
    if (SS.isOwnFile(p)) return p;
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(p) + "?width=" + (width || 800);
  },
  credit: function (p) {
    return SS.isOwnFile(p) ? p : "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p);
  },
  page: function (d) { return "destination.html?id=" + encodeURIComponent(d.id); },
  whatsapp: function (d) {
    var msg = "Hi SS Travels Naidu, I'd like details for a " + d.name + " trip.";
    return "https://wa.me/" + SS_WHATSAPP + "?text=" + encodeURIComponent(msg);
  },
  find: function (id) {
    for (var i = 0; i < SS_DESTINATIONS.length; i++) if (SS_DESTINATIONS[i].id === id) return SS_DESTINATIONS[i];
    return null;
  }
};

/* =====================================================================
   CUSTOMER REVIEWS (shown as moving cards on the home page)
   ---------------------------------------------------------------------
   Copy your best reviews from your Google Business Profile and paste
   them here exactly as the customer wrote them. The section stays
   hidden until at least one review is added.

     { name: "Customer's name as shown on Google", place: "Chennai",
       rating: 5, trip: "Tirupati darshan trip", text: "The review text..." },
   ===================================================================== */
var SS_GOOGLE_REVIEWS_LINK = "";   // paste your Google reviews link here (Google Maps > your business > Share)

var SS_REVIEWS = [
  // add reviews here
];
