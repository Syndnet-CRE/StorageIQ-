/**
 * StorageIQ Deals Data Layer
 * localStorage-based deal management for the pipeline
 */

var STORAGE_KEY = "storageiq-deals";

var DEAL_STAGES = [
  { id: "prospecting", label: "Prospecting", substages: ["initial_research", "owner_search", "first_contact"] },
  { id: "outreach", label: "Outreach", substages: ["contacted", "follow_up", "engaged"] },
  { id: "under_loi", label: "Under LOI", substages: ["loi_drafting", "loi_submitted", "loi_negotiating", "loi_accepted"] },
  { id: "under_contract", label: "Under Contract", substages: ["contract_executed", "dd_active", "dd_complete", "financing_active"] },
  { id: "closing", label: "Closing", substages: ["clear_to_close", "scheduled", "closed"] },
  { id: "dead", label: "Dead", substages: ["seller_declined", "financing_failed", "dd_killed", "passed"] }
];

var INVESTMENT_TYPES = ["Value-Add", "Core", "Core-Plus", "Development"];
var PRIORITY_LEVELS = ["hot", "warm", "cold"];
var DOCUMENT_TYPES = ["contract", "dd", "financials", "environmental", "title", "other"];
var ACTIVITY_TYPES = ["note", "call", "email", "stage_change", "document", "offer"];

/**
 * Generate UUID v4
 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get all deals from localStorage, sorted by updatedAt desc
 */
function dealsGetAll() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    var deals = JSON.parse(raw);
    deals.sort(function(a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return deals;
  } catch (e) {
    console.error("Failed to parse deals from localStorage:", e);
    return [];
  }
}

/**
 * Get single deal by id, returns null if not found
 */
function dealsGet(id) {
  var deals = dealsGetAll();
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].id === id) {
      return deals[i];
    }
  }
  return null;
}

/**
 * Save deals array to localStorage
 */
function _dealsSaveAll(deals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

/**
 * Upsert deal - if id exists update it, otherwise create
 * Always sets updatedAt to now
 */
function dealsSave(deal) {
  var deals = dealsGetAll();
  var now = new Date().toISOString();
  deal.updatedAt = now;

  var found = false;
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].id === deal.id) {
      deals[i] = deal;
      found = true;
      break;
    }
  }

  if (!found) {
    if (!deal.id) {
      deal.id = generateUUID();
    }
    if (!deal.createdAt) {
      deal.createdAt = now;
    }
    deals.push(deal);
  }

  _dealsSaveAll(deals);
  return deal;
}

/**
 * Delete deal by id
 */
function dealsDelete(id) {
  var deals = dealsGetAll();
  var filtered = deals.filter(function(d) {
    return d.id !== id;
  });
  _dealsSaveAll(filtered);
  return filtered.length < deals.length;
}

/**
 * Create new deal with generated id and timestamps
 * Accepts partial deal object, fills in defaults
 */
function dealsCreate(partial) {
  var now = new Date().toISOString();

  var deal = {
    id: generateUUID(),
    createdAt: now,
    updatedAt: now,

    // Identity
    name: partial.name || "",
    address: partial.address || "",
    city: partial.city || "",
    state: partial.state || "",
    zip: partial.zip || "",
    lat: partial.lat || null,
    lng: partial.lng || null,

    // Property
    totalUnits: partial.totalUnits || 0,
    totalSF: partial.totalSF || 0,
    askingPrice: partial.askingPrice || 0,
    investmentType: partial.investmentType || "",

    // Pipeline status
    stage: partial.stage || "prospecting",
    substage: partial.substage || "initial_research",
    priority: partial.priority || "warm",

    // Timeline
    firstContactDate: partial.firstContactDate || null,
    loiSubmittedDate: partial.loiSubmittedDate || null,
    loiAcceptedDate: partial.loiAcceptedDate || null,
    contractDate: partial.contractDate || null,
    ddStartDate: partial.ddStartDate || null,
    ddEndDate: partial.ddEndDate || null,
    financingDeadline: partial.financingDeadline || null,
    closingDate: partial.closingDate || null,

    // People
    sellerName: partial.sellerName || "",
    sellerPhone: partial.sellerPhone || "",
    sellerEmail: partial.sellerEmail || "",
    brokerName: partial.brokerName || "",
    brokerPhone: partial.brokerPhone || "",
    brokerEmail: partial.brokerEmail || "",

    // Underwriting link
    underwritingData: partial.underwritingData || null,

    // Notes
    notes: partial.notes || "",

    // Documents array
    documents: partial.documents || [],

    // Activity log
    activity: partial.activity || []
  };

  var deals = dealsGetAll();
  deals.push(deal);
  _dealsSaveAll(deals);

  return deal;
}

/**
 * Add activity entry to deal's activity log
 */
function dealsAddActivity(id, entry) {
  var deal = dealsGet(id);
  if (!deal) {
    return null;
  }

  var activityEntry = {
    id: generateUUID(),
    date: entry.date || new Date().toISOString(),
    type: entry.type || "note",
    text: entry.text || "",
    user: entry.user || "system"
  };

  if (!deal.activity) {
    deal.activity = [];
  }
  deal.activity.unshift(activityEntry);

  dealsSave(deal);
  return activityEntry;
}

/**
 * Add document to deal's documents array
 */
function dealsAddDocument(id, doc) {
  var deal = dealsGet(id);
  if (!deal) {
    return null;
  }

  var document = {
    id: generateUUID(),
    name: doc.name || "Untitled",
    type: doc.type || "other",
    uploadedAt: doc.uploadedAt || new Date().toISOString(),
    size: doc.size || 0,
    dataUrl: doc.dataUrl || ""
  };

  if (!deal.documents) {
    deal.documents = [];
  }
  deal.documents.push(document);

  dealsSave(deal);

  // Log activity
  dealsAddActivity(id, {
    type: "document",
    text: "Document added: " + document.name,
    user: "system"
  });

  return document;
}

/**
 * Remove document by docId from deal
 */
function dealsRemoveDocument(id, docId) {
  var deal = dealsGet(id);
  if (!deal || !deal.documents) {
    return false;
  }

  var originalLength = deal.documents.length;
  deal.documents = deal.documents.filter(function(d) {
    return d.id !== docId;
  });

  if (deal.documents.length < originalLength) {
    dealsSave(deal);
    return true;
  }
  return false;
}

/**
 * Update deal stage and substage, logs activity entry
 */
function dealsUpdateStage(id, stage, substage) {
  var deal = dealsGet(id);
  if (!deal) {
    return null;
  }

  var oldStage = deal.stage;
  var oldSubstage = deal.substage;

  deal.stage = stage;
  deal.substage = substage;

  dealsSave(deal);

  // Log activity
  var stageLabel = stage;
  for (var i = 0; i < DEAL_STAGES.length; i++) {
    if (DEAL_STAGES[i].id === stage) {
      stageLabel = DEAL_STAGES[i].label;
      break;
    }
  }

  dealsAddActivity(id, {
    type: "stage_change",
    text: "Stage changed from " + oldStage + "/" + oldSubstage + " to " + stageLabel + "/" + substage,
    user: "system"
  });

  return deal;
}

/**
 * Search deals by name/address/city (case insensitive)
 */
function dealsSearch(query) {
  if (!query || query.trim() === "") {
    return dealsGetAll();
  }

  var q = query.toLowerCase().trim();
  var deals = dealsGetAll();

  return deals.filter(function(deal) {
    var name = (deal.name || "").toLowerCase();
    var address = (deal.address || "").toLowerCase();
    var city = (deal.city || "").toLowerCase();

    return name.indexOf(q) !== -1 ||
           address.indexOf(q) !== -1 ||
           city.indexOf(q) !== -1;
  });
}

/**
 * Filter deals by stage
 */
function dealsByStage(stage) {
  var deals = dealsGetAll();
  return deals.filter(function(deal) {
    return deal.stage === stage;
  });
}

/**
 * Get aggregate stats
 */
function dealsGetStats() {
  var deals = dealsGetAll();

  var byStage = {};
  for (var i = 0; i < DEAL_STAGES.length; i++) {
    byStage[DEAL_STAGES[i].id] = 0;
  }

  var totalValue = 0;

  for (var j = 0; j < deals.length; j++) {
    var deal = deals[j];
    if (byStage.hasOwnProperty(deal.stage)) {
      byStage[deal.stage]++;
    }
    totalValue += deal.askingPrice || 0;
  }

  return {
    total: deals.length,
    byStage: byStage,
    totalValue: totalValue,
    avgPrice: deals.length > 0 ? Math.round(totalValue / deals.length) : 0
  };
}

/**
 * Helper to create date strings relative to today
 */
function _daysFromNow(days) {
  var d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/**
 * Initialize seed data if localStorage is empty
 */
function dealsInitSeedData() {
  var existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return false;
  }

  var now = new Date().toISOString();

  // Deal 1 - Prospecting stage
  var deal1 = {
    id: generateUUID(),
    createdAt: now,
    updatedAt: now,
    name: "Sunset Self Storage",
    address: "4521 Industrial Blvd",
    city: "Dallas",
    state: "TX",
    zip: "75212",
    lat: 32.7767,
    lng: -96.7970,
    totalUnits: 245,
    totalSF: 32500,
    askingPrice: 4250000,
    investmentType: "Value-Add",
    stage: "prospecting",
    substage: "first_contact",
    priority: "warm",
    firstContactDate: _daysFromNow(-7),
    loiSubmittedDate: null,
    loiAcceptedDate: null,
    contractDate: null,
    ddStartDate: null,
    ddEndDate: null,
    financingDeadline: null,
    closingDate: null,
    sellerName: "Robert Chen",
    sellerPhone: "214-555-0134",
    sellerEmail: "",
    brokerName: "",
    brokerPhone: "",
    brokerEmail: "",
    underwritingData: null,
    notes: "",
    documents: [],
    activity: [
      {
        id: generateUUID(),
        date: _daysFromNow(-7) + "T10:30:00.000Z",
        type: "call",
        text: "Initial call with owner Robert Chen. Property has 85% occupancy, owner motivated to sell within 6 months.",
        user: "system"
      },
      {
        id: generateUUID(),
        date: _daysFromNow(-5) + "T14:00:00.000Z",
        type: "note",
        text: "Requested rent roll and trailing 12 financials. Owner will send by end of week.",
        user: "system"
      }
    ]
  };

  // Deal 2 - Under LOI stage
  var deal2 = {
    id: generateUUID(),
    createdAt: now,
    updatedAt: now,
    name: "Metro Storage Center",
    address: "890 Commerce Dr",
    city: "Fort Worth",
    state: "TX",
    zip: "76102",
    lat: 32.7555,
    lng: -97.3308,
    totalUnits: 312,
    totalSF: 41200,
    askingPrice: 5800000,
    investmentType: "Core-Plus",
    stage: "under_loi",
    substage: "loi_submitted",
    priority: "hot",
    firstContactDate: _daysFromNow(-30),
    loiSubmittedDate: _daysFromNow(-3),
    loiAcceptedDate: null,
    contractDate: null,
    ddStartDate: null,
    ddEndDate: null,
    financingDeadline: null,
    closingDate: null,
    sellerName: "Patricia Williams",
    sellerPhone: "",
    sellerEmail: "",
    brokerName: "Marcus Reed",
    brokerPhone: "",
    brokerEmail: "mreed@cbre.com",
    underwritingData: null,
    notes: "",
    documents: [],
    activity: [
      {
        id: generateUUID(),
        date: _daysFromNow(-3) + "T09:15:00.000Z",
        type: "offer",
        text: "LOI submitted at $5.8M with 60-day DD period. Awaiting seller response.",
        user: "system"
      },
      {
        id: generateUUID(),
        date: _daysFromNow(-10) + "T16:45:00.000Z",
        type: "email",
        text: "Received full financials package from Marcus Reed. NOI at $485K, 8.4% cap rate.",
        user: "system"
      }
    ]
  };

  // Deal 3 - Under Contract stage
  var deal3 = {
    id: generateUUID(),
    createdAt: now,
    updatedAt: now,
    name: "Highway 75 Storage",
    address: "12400 N Central Expy",
    city: "Richardson",
    state: "TX",
    zip: "75080",
    lat: 32.9483,
    lng: -96.7299,
    totalUnits: 428,
    totalSF: 56800,
    askingPrice: 8200000,
    investmentType: "Core",
    stage: "under_contract",
    substage: "dd_active",
    priority: "hot",
    firstContactDate: _daysFromNow(-60),
    loiSubmittedDate: _daysFromNow(-45),
    loiAcceptedDate: _daysFromNow(-40),
    contractDate: _daysFromNow(-21),
    ddStartDate: _daysFromNow(-20),
    ddEndDate: null,
    financingDeadline: null,
    closingDate: _daysFromNow(45),
    sellerName: "James Morrison",
    sellerPhone: "",
    sellerEmail: "",
    brokerName: "Sarah Chen",
    brokerPhone: "",
    brokerEmail: "schen@jll.com",
    underwritingData: null,
    notes: "",
    documents: [],
    activity: [
      {
        id: generateUUID(),
        date: _daysFromNow(-20) + "T08:00:00.000Z",
        type: "stage_change",
        text: "Due diligence period started. Phase I ESA ordered, title work in progress.",
        user: "system"
      },
      {
        id: generateUUID(),
        date: _daysFromNow(-21) + "T11:30:00.000Z",
        type: "stage_change",
        text: "Contract executed at $8.2M. 45-day DD period, closing targeted for " + _daysFromNow(45) + ".",
        user: "system"
      }
    ]
  };

  var seedDeals = [deal1, deal2, deal3];
  _dealsSaveAll(seedDeals);

  console.log("StorageIQ: Initialized with " + seedDeals.length + " seed deals");
  return true;
}

// Auto-initialize seed data on script load
dealsInitSeedData();
