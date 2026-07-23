const flights = {
  SAS482: {
    callsign: "SAS482",
    level: "FL340",
    heading: "087",
    speed: "M .78",
    route: "NARAK - LUXOR",
    clearance: "Maintain FL340",
    state: "Monitoring",
  },
  DLH219: {
    callsign: "DLH219",
    level: "FL320",
    heading: "214",
    speed: "M .76",
    route: "VEBEK - DINAN",
    clearance: "Maintain FL320",
    state: "Coordinated",
  },
  BAW771: {
    callsign: "BAW771",
    level: "FL360",
    heading: "143",
    speed: "M .80",
    route: "ARFOX - TELMO",
    clearance: "Maintain FL360",
    state: "Coordinated",
  },
  AFR108: {
    callsign: "AFR108",
    level: "FL330",
    heading: "302",
    speed: "M .77",
    route: "MERLU - NARAK",
    clearance: "Pending handoff",
    state: "Pending",
  },
};

const flightPlans = {
  SAS482: {
    callsign: "SAS482",
    atyp: "B789",
    frul: "I",
    ftyp: "S",
    nrac: "1",
    assr: "4231",
    eobt: "1406",
    dof: "260723",
    adep: "TJSJ",
    ades: "ESSA",
    state: "ACTIVE",
    comnav: "SDE2E3FGHIJ1J3J5M1RWXYZ",
    surv: "EB1D1",
    eet: "0715",
    altn: "EKCH",
    tas: "N0488",
    rfl: "F340",
    atow: "203.4",
    etd: "1416",
    etb: "",
    pssr: "4231",
    regn: "SE-RSA",
    copn: "MERLU",
    etn: "015",
    pel: "F330",
    copx: "NARAK",
    etx: "1422",
    xfl: "F340",
    route: "MERLU NARAK LUXOR NATX DOGAL BEXET",
    remarks: "PBN/A1B1C1D1O1S2 DOF/260723 REG/SERSA",
  },
  DLH219: {
    callsign: "DLH219",
    atyp: "A359",
    frul: "I",
    ftyp: "S",
    nrac: "1",
    assr: "2740",
    eobt: "1420",
    dof: "260723",
    adep: "TJSJ",
    ades: "EDDF",
    state: "ACTIVE",
    comnav: "SDE2E3FGHIJ1M1RWXYZ",
    surv: "EB1D1",
    eet: "0810",
    altn: "EDDK",
    tas: "N0476",
    rfl: "F320",
    atow: "218.7",
    etd: "1432",
    etb: "",
    pssr: "2740",
    regn: "D-AIXP",
    copn: "VEBEK",
    etn: "020",
    pel: "F320",
    copx: "DINAN",
    etx: "1448",
    xfl: "F320",
    route: "VEBEK DINAN ARFOX OTRON NATY MALOT",
    remarks: "PBN/A1B1C1D1L1O1S2 NAV/RNVD1E2A1",
  },
  BAW771: {
    callsign: "BAW771",
    atyp: "B772",
    frul: "I",
    ftyp: "S",
    nrac: "1",
    assr: "6152",
    eobt: "1455",
    dof: "260723",
    adep: "TJSJ",
    ades: "EGLL",
    state: "ACTIVE",
    comnav: "SDE2E3FGHIJ1J5M1RWXYZ",
    surv: "EB1D1",
    eet: "0740",
    altn: "EGKK",
    tas: "N0482",
    rfl: "F360",
    atow: "236.1",
    etd: "1507",
    etb: "",
    pssr: "6152",
    regn: "G-VIIO",
    copn: "ARFOX",
    etn: "018",
    pel: "F360",
    copx: "TELMO",
    etx: "1521",
    xfl: "F360",
    route: "ARFOX TELMO LAMER NATZ DINIM",
    remarks: "PBN/A1B1C1D1L1O1S2 PER/C",
  },
  AFR108: {
    callsign: "AFR108",
    atyp: "A359",
    frul: "I",
    ftyp: "S",
    nrac: "1",
    assr: "7314",
    eobt: "1505",
    dof: "260723",
    adep: "TJSJ",
    ades: "LFPG",
    state: "PENDING",
    comnav: "SDE2E3FGHIJ1J5M1RWXYZ",
    surv: "EB1D1",
    eet: "0825",
    altn: "LFPO",
    tas: "N0477",
    rfl: "F330",
    atow: "221.8",
    etd: "1518",
    etb: "",
    pssr: "7314",
    regn: "F-HTYO",
    copn: "MERLU",
    etn: "011",
    pel: "F330",
    copx: "NARAK",
    etx: "1530",
    xfl: "F330",
    route: "MERLU NARAK LUXOR NATX TIVLI",
    remarks: "PBN/A1B1C1D1L1O1S2 DOF/260723 RMK/PENDING HANDOFF",
  },
};

let selectedFlight = "SAS482";
let selectedFlightPlan = "SAS482";
let messageCounter = 1;
let feedPaused = false;
let lastTrackFrame = Date.now();
let leafletMap = null;
let conflictInjected = false;

const trackStates = {
  SAS482: { x: 58, y: 34, vx: 1.1, vy: 0.55 },
  DLH219: { x: 34, y: 54, vx: 0.75, vy: -0.85 },
  BAW771: { x: 68, y: 62, vx: -0.9, vy: -0.45 },
  AFR108: { x: 44, y: 26, vx: -0.55, vy: 0.95 },
};

const details = {
  title: document.getElementById("detailTitle"),
  status: document.getElementById("trackStatus"),
  callsign: document.getElementById("detailCallsign"),
  level: document.getElementById("detailLevel"),
  heading: document.getElementById("detailHeading"),
  speed: document.getElementById("detailSpeed"),
  route: document.getElementById("detailRoute"),
  clearance: document.getElementById("detailClearance"),
};

const eventLog = document.getElementById("eventLog");
const radarScope = document.getElementById("radarScope");
const connectionStatus = document.getElementById("connectionStatus");
const tracks = [...document.querySelectorAll(".track")];
const flightPlanDialog = document.getElementById("flightPlanDialog");
const flightPlanResults = document.getElementById("flightPlanResults");
const flightPlanDetailForm = document.getElementById("flightPlanDetailForm");
const flightPlanSearchForm = document.getElementById("flightPlanSearchForm");
const flightPlanResultCount = document.getElementById("flightPlanResultCount");
const puertoRicoBoundarySources = [
  "./assets/puerto-rico-boundary.geojson",
  "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/PRI/ADM2/geoBoundaries-PRI-ADM2_simplified.geojson",
];
const defaultMapView = {
  center: [18.4655, -66.1057],
  zoom: 11,
};

async function fetchFirstAvailableJson(urls) {
  let lastError;

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`GeoJSON request failed: ${response.status}`);
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function initializeLeafletMap() {
  if (!window.L) {
    addLog("Leaflet map library unavailable.");
    return;
  }

  const mapContainer = document.getElementById("leafletMap");
  if (!mapContainer) return;

  if (leafletMap) {
    leafletMap.invalidateSize();
    return;
  }

  let tilesLoaded = false;
  let boundaryLoaded = false;
  const invalidateAfterLayersLoad = () => {
    if (!leafletMap || !tilesLoaded || !boundaryLoaded) return;
    leafletMap.invalidateSize();
  };

  leafletMap = L.map(mapContainer, {
    zoomControl: false,
    attributionControl: true,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false,
  });
  window.atcPracticeMap = leafletMap;

  const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  });
  tileLayer.on("load", () => {
    tilesLoaded = true;
    invalidateAfterLayersLoad();
  });
  tileLayer.addTo(leafletMap);

  leafletMap.setView(defaultMapView.center, defaultMapView.zoom);

  fetchFirstAvailableJson(puertoRicoBoundarySources)
    .then((geojson) => {
      const boundaryLayer = L.geoJSON(geojson, {
        style: {
          color: "#75d7d8",
          weight: 1.4,
          opacity: 0.95,
          fillColor: "#2f493a",
          fillOpacity: 0.34,
        },
      });
      boundaryLayer.addTo(leafletMap);
      boundaryLoaded = true;
      invalidateAfterLayersLoad();
    })
    .catch(() => addLog("Puerto Rico boundary layer failed to load."));

  [
    { code: "SJU", name: "Luis Munoz Marin Intl", latlng: [18.4394, -66.0018] },
    { code: "PSE", name: "Mercedita", latlng: [18.0083, -66.5630] },
    { code: "VQS", name: "Antonio Rivera Rodriguez", latlng: [18.1348, -65.4936] },
  ].forEach((airport) => {
    L.circleMarker(airport.latlng, {
      radius: 4,
      color: "#83ffff",
      weight: 1,
      fillColor: "#d345cb",
      fillOpacity: 0.9,
    }).bindTooltip(`${airport.code} ${airport.name}`, { direction: "top" }).addTo(leafletMap);

    L.marker(airport.latlng, {
      interactive: false,
      icon: L.divIcon({
        className: "airport-label",
        html: airport.code,
        iconSize: [36, 16],
        iconAnchor: [-8, 8],
      }),
    }).addTo(leafletMap);
  });
}

function initializeLeafletMapWhenReady() {
  const mapContainer = document.getElementById("leafletMap");
  if (!mapContainer) return;

  const containerHasSize = () => mapContainer.clientWidth > 0 && mapContainer.clientHeight > 0;
  const settleMapSize = () => {
    if (!leafletMap) return;
    leafletMap.invalidateSize();
  };
  const startMap = () => {
    initializeLeafletMap();
    requestAnimationFrame(() => requestAnimationFrame(settleMapSize));
  };

  if (containerHasSize()) {
    startMap();
  } else {
    const observer = new ResizeObserver(() => {
      if (!containerHasSize()) return;
      observer.disconnect();
      startMap();
    });
    observer.observe(mapContainer);
  }

  window.addEventListener("resize", settleMapSize);
}

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = `${new Date().toISOString().slice(11, 19)}Z ${message}`;
  eventLog.prepend(item);
}

function selectFlight(callsign) {
  selectedFlight = callsign;
  const flight = flights[callsign];
  details.title.textContent = flight.callsign;
  details.callsign.textContent = flight.callsign;
  details.level.textContent = flight.level;
  details.heading.textContent = flight.heading;
  details.speed.textContent = flight.speed;
  details.route.textContent = flight.route;
  details.clearance.textContent = flight.clearance;
  details.status.textContent = flight.state;
  details.status.className = flight.state === "Coordinated"
    ? "status-pill status-ok"
    : flight.state === "Pending"
      ? "status-pill status-warning"
      : "status-pill status-caution";

  document.querySelectorAll(".track").forEach((track) => {
    track.classList.toggle("track-selected", track.dataset.flight === callsign);
  });
  document.querySelectorAll(".strip").forEach((strip) => {
    strip.classList.toggle("active", strip.textContent.includes(callsign));
  });
  addLog(`${callsign} selected.`);
}

document.querySelectorAll(".track").forEach((track) => {
  track.addEventListener("click", () => selectFlight(track.dataset.flight));
});

document.querySelectorAll(".strip").forEach((strip) => {
  strip.addEventListener("click", () => selectFlight(strip.textContent.trim().split(" ")[0]));
});

function getFlightPlanList() {
  return Object.values(flightPlans);
}

function renderFlightPlanResults(results = getFlightPlanList()) {
  flightPlanResults.replaceChildren();

  results.forEach((plan) => {
    const row = document.createElement("tr");
    row.classList.toggle("active", plan.callsign === selectedFlightPlan);
    row.dataset.flightPlan = plan.callsign;
    row.innerHTML = `
      <td><button type="button" data-select-flight-plan="${plan.callsign}">${plan.callsign}</button></td>
      <td>${plan.atyp}</td>
      <td>${plan.frul}</td>
      <td>${plan.assr}</td>
      <td>${plan.eobt}</td>
      <td>${plan.dof}</td>
      <td>${plan.adep}</td>
      <td>${plan.ades}</td>
      <td>${plan.state}</td>
    `;
    flightPlanResults.append(row);
  });

  flightPlanResultCount.textContent = `${results.length} ${results.length === 1 ? "match" : "matches"} found`;
}

function populateFlightPlanDetail(callsign) {
  const plan = flightPlans[callsign];
  if (!plan) return;

  selectedFlightPlan = callsign;
  Object.entries(plan).forEach(([key, value]) => {
    const field = flightPlanDetailForm.elements[key];
    if (field) field.value = value;
  });

  document.getElementById("flightPlanReadTime").textContent = new Date().toISOString().slice(11, 19);
  document.getElementById("flightPlanStatusText").textContent = plan.state;
  document.getElementById("flightPlanCoordination").textContent = plan.state === "PENDING" ? "Coordination pending" : "Coordinated";
  renderFlightPlanResults(applyFlightPlanSearch());
}

function applyFlightPlanSearch() {
  const data = new FormData(flightPlanSearchForm);
  const checkedStates = data.getAll("state");
  const criteria = {
    callsign: data.get("callsign").trim().toUpperCase(),
    adep: data.get("adep").trim().toUpperCase(),
    ades: data.get("ades").trim().toUpperCase(),
    eobt: data.get("eobt").trim(),
    dof: data.get("dof").trim(),
  };

  return getFlightPlanList().filter((plan) => {
    const stateMatches = checkedStates.length === 0 || checkedStates.includes(plan.state);
    return stateMatches
      && plan.callsign.includes(criteria.callsign)
      && plan.adep.includes(criteria.adep)
      && plan.ades.includes(criteria.ades)
      && plan.eobt.includes(criteria.eobt)
      && plan.dof.includes(criteria.dof);
  });
}

function openFlightPlan(callsign = selectedFlight) {
  selectedFlightPlan = flightPlans[callsign] ? callsign : Object.keys(flightPlans)[0];
  renderFlightPlanResults();
  populateFlightPlanDetail(selectedFlightPlan);
  flightPlanDialog.showModal();
}

document.getElementById("openFlightPlan").addEventListener("click", () => openFlightPlan());

flightPlanSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = applyFlightPlanSearch();
  renderFlightPlanResults(results);
  if (results.length > 0) populateFlightPlanDetail(results[0].callsign);
});

document.getElementById("clearFlightPlanSearch").addEventListener("click", () => {
  flightPlanSearchForm.reset();
  flightPlanSearchForm.querySelectorAll('[name="state"]').forEach((checkbox) => {
    checkbox.checked = true;
  });
  renderFlightPlanResults();
  populateFlightPlanDetail(selectedFlightPlan);
});

flightPlanResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select-flight-plan]");
  if (!button) return;
  populateFlightPlanDetail(button.dataset.selectFlightPlan);
  addLog(`${button.dataset.selectFlightPlan} flight plan selected.`);
});

document.getElementById("newFromSelectedTrack").addEventListener("click", () => {
  populateFlightPlanDetail(selectedFlight);
  addLog(`${selectedFlight} flight plan loaded from selected track.`);
});

document.getElementById("modifyFlightPlan").addEventListener("click", () => {
  document.getElementById("fpRoute").focus();
  addLog(`${selectedFlightPlan} flight plan opened for modification.`);
});

document.getElementById("refreshFlightPlan").addEventListener("click", () => {
  populateFlightPlanDetail(selectedFlightPlan);
  addLog(`${selectedFlightPlan} flight plan refreshed.`);
});

flightPlanDetailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(flightPlanDetailForm);
  const callsign = data.get("callsign");
  const plan = flightPlans[callsign];
  if (!plan) return;

  Object.keys(plan).forEach((key) => {
    if (key === "callsign") return;
    if (data.has(key)) plan[key] = data.get(key).trim().toUpperCase();
  });

  if (flights[callsign]) {
    flights[callsign].level = plan.rfl.replace(/^F/, "FL");
    flights[callsign].route = `${plan.adep} - ${plan.ades}`;
    flights[callsign].state = plan.state === "PENDING" ? "Pending" : plan.state === "ACTIVE" ? "Coordinated" : "Monitoring";
    if (selectedFlight === callsign) selectFlight(callsign);
  }

  populateFlightPlanDetail(callsign);
  addLog(`${callsign} flight plan applied.`);
});

const toggleRangeRings = document.getElementById("toggleRangeRings");
if (toggleRangeRings) {
  toggleRangeRings.addEventListener("click", (event) => {
    const pressed = event.currentTarget.getAttribute("aria-pressed") === "true";
    event.currentTarget.setAttribute("aria-pressed", String(!pressed));
    radarScope.classList.toggle("no-rings", pressed);
    addLog(`Range rings ${pressed ? "hidden" : "shown"}.`);
  });
}

document.getElementById("pauseFeed").addEventListener("click", (event) => {
  const pressed = event.currentTarget.getAttribute("aria-pressed") === "true";
  event.currentTarget.setAttribute("aria-pressed", String(!pressed));
  event.currentTarget.textContent = pressed ? "Pause feed" : "Resume feed";
  feedPaused = !pressed;
  radarScope.classList.toggle("paused", !pressed);
  connectionStatus.textContent = pressed ? "Connected" : "Feed paused";
  connectionStatus.className = pressed ? "status-pill status-ok" : "status-pill status-caution";
  addLog(pressed ? "Surveillance feed resumed." : "Surveillance feed paused.");
});

document.getElementById("injectConflict").addEventListener("click", () => {
  conflictInjected = !conflictInjected;
  document.getElementById("injectConflict").textContent = conflictInjected ? "Reset conflict" : "Inject conflict";
  document.querySelector('[data-flight="SAS482"]').classList.toggle("conflict", conflictInjected);
  document.querySelector('[data-flight="AFR108"]').classList.toggle("conflict", conflictInjected);

  const existingAlert = document.querySelector('[data-alert-id="A-1003"]');
  if (!conflictInjected) {
    existingAlert?.remove();
    addLog("Conflict scenario reset.");
    return;
  }

  if (existingAlert) return;

  const item = document.createElement("li");
  item.dataset.alertId = "A-1003";
  item.innerHTML = '<strong>Conflict alert</strong><span>SAS482 / AFR108 separation minimum breached in test scenario</span><button type="button" data-ack-alert="A-1003">Acknowledge</button>';
  document.getElementById("alertList").prepend(item);
  addLog("Conflict scenario injected.");
});

document.getElementById("clearanceForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const type = document.getElementById("clearanceType").value;
  const value = document.getElementById("clearanceValue").value.trim().toUpperCase();
  const message = `${type} ${value}`.replace("maintain", "maintain level");
  flights[selectedFlight].clearance = message;
  details.clearance.textContent = message;
  document.getElementById("clearanceMessage").textContent = `${selectedFlight} clearance issued.`;
  addLog(`${selectedFlight} clearance issued: ${message}.`);
  event.currentTarget.reset();
});

document.getElementById("flightFilter").addEventListener("input", (event) => {
  const term = event.target.value.trim().toUpperCase();
  document.querySelectorAll("#flightTable tr").forEach((row) => {
    row.hidden = !row.textContent.toUpperCase().includes(term);
  });
});

document.getElementById("alertList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-ack-alert]");
  if (!button) return;
  const item = button.closest("li");
  addLog(`${item.dataset.alertId} acknowledged.`);
  item.remove();
});

document.getElementById("ackAll").addEventListener("click", () => {
  const count = document.querySelectorAll("#alertList li").length;
  document.getElementById("alertList").replaceChildren();
  addLog(`${count} alerts acknowledged.`);
});

document.getElementById("loadMessage").addEventListener("click", () => {
  messageCounter += 1;
  const article = document.createElement("article");
  article.innerHTML = `<h3>Coordination request ${messageCounter}</h3><p>Adjacent sector requests release for ${selectedFlight} within 3 minutes.</p><button type="button" data-message-action="accept">Accept</button><button type="button" data-message-action="reject">Reject</button>`;
  document.getElementById("messageQueue").prepend(article);
  addLog(`Coordination request ${messageCounter} loaded.`);
});

document.getElementById("messageQueue").addEventListener("click", (event) => {
  const button = event.target.closest("[data-message-action]");
  if (!button) return;
  const article = button.closest("article");
  const action = button.dataset.messageAction;
  addLog(`Message "${article.querySelector("h3").textContent}" ${action}ed.`);
  article.remove();
});

document.getElementById("exportLog").addEventListener("click", () => {
  const rows = [...eventLog.querySelectorAll("li")].map((item, index) => {
    const text = item.textContent.trim();
    const timeMatch = text.match(/^(\d{2}:\d{2}:\d{2}Z)\s+(.*)$/);
    return [
      index + 1,
      timeMatch?.[1] || "",
      timeMatch?.[2] || text,
    ];
  });
  const csv = [
    ["Sequence", "Time", "Event"],
    ...rows,
  ].map((row) => row.map(formatCsvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `atc-event-log-${new Date().toISOString().slice(0, 10)}.csv`;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  addLog(`${rows.length} events exported to CSV.`);
});

function formatCsvCell(value) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function applyTrackPositions() {
  tracks.forEach((track) => {
    const state = trackStates[track.dataset.flight];
    track.style.setProperty("--x", `${state.x}%`);
    track.style.setProperty("--y", `${state.y}%`);
  });
}

function keepInsideScope(state) {
  const centerX = 50;
  const centerY = 50;
  const radiusX = 38;
  const radiusY = 38;
  const dx = (state.x - centerX) / radiusX;
  const dy = (state.y - centerY) / radiusY;
  const distance = Math.hypot(dx, dy);

  if (distance <= 1) return;

  const scale = 1 / distance;
  state.x = centerX + (state.x - centerX) * scale;
  state.y = centerY + (state.y - centerY) * scale;

  const nx = dx / distance;
  const ny = dy / distance;
  const dot = state.vx * nx + state.vy * ny;
  state.vx -= 2 * dot * nx;
  state.vy -= 2 * dot * ny;
}

function keepTracksSeparated() {
  const callsigns = Object.keys(trackStates);
  const minDistance = 14;

  for (let i = 0; i < callsigns.length; i += 1) {
    for (let j = i + 1; j < callsigns.length; j += 1) {
      const first = trackStates[callsigns[i]];
      const second = trackStates[callsigns[j]];
      const dx = second.x - first.x;
      const dy = second.y - first.y;
      const distance = Math.hypot(dx, dy) || 1;

      if (distance >= minDistance) continue;

      const push = (minDistance - distance) / 2;
      const nx = dx / distance;
      const ny = dy / distance;

      first.x -= nx * push;
      first.y -= ny * push;
      second.x += nx * push;
      second.y += ny * push;

      [first.vx, second.vx] = [second.vx, first.vx];
      [first.vy, second.vy] = [second.vy, first.vy];
      keepInsideScope(first);
      keepInsideScope(second);
    }
  }
}

function advanceTracks() {
  const now = Date.now();
  const elapsedSeconds = Math.min((now - lastTrackFrame) / 1000, 0.25);
  lastTrackFrame = now;

  if (!feedPaused) {
    Object.values(trackStates).forEach((state) => {
      state.x += state.vx * elapsedSeconds;
      state.y += state.vy * elapsedSeconds;
      keepInsideScope(state);
    });
    keepTracksSeparated();
    applyTrackPositions();
  }
}

initializeLeafletMapWhenReady();
applyTrackPositions();
setInterval(advanceTracks, 100);
