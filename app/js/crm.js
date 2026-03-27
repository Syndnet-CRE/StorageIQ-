/**
 * StorageIQ CRM Deal Room
 * State machine and UI logic for deal pipeline management
 */

/* ══════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════ */

var DEAL_STAGES = [
  { id: "prospecting", label: "Prospecting", color: "#0A84FF" },
  { id: "qualifying", label: "Qualifying", color: "#5AC8FA" },
  { id: "loi", label: "LOI", color: "#FFD60A" },
  { id: "under_contract", label: "Under Contract", color: "#FF9F0A" },
  { id: "closed", label: "Closed", color: "#34C759" },
  { id: "dead", label: "Dead", color: "#FF453A" }
];

var SUBSTAGES = {
  prospecting: ["Identified", "Initial Research", "First Contact Attempt"],
  qualifying: ["Qualified Lead", "Info Requested", "Info Received", "Tour Scheduled", "Tour Completed"],
  loi: ["LOI Drafted", "LOI Submitted", "Counter Received", "Negotiating", "LOI Accepted"],
  under_contract: ["DD - Environmental", "DD - Title", "DD - Financials", "DD - Physical", "Financing", "Final Walkthrough"],
  closed: ["Funded", "Transitioned"],
  dead: ["Lost to Competitor", "Seller Withdrew", "Failed DD", "Financing Fell Through", "Price Gap", "Other"]
};

var INVESTMENT_TYPES = [
  "Acquisition",
  "Development",
  "Value-Add",
  "Stabilized",
  "Distressed",
  "Sale-Leaseback"
];

var DD_PHASES = [
  { name: "Environmental", days: 7 },
  { name: "Title", days: 10 },
  { name: "Financials", days: 14 },
  { name: "Physical", days: 7 },
  { name: "Financing", days: 21 }
];

var ACTIVITY_TYPES = [
  { id: "note", label: "Note", icon: "message-square" },
  { id: "call", label: "Call", icon: "phone" },
  { id: "email", label: "Email", icon: "mail" },
  { id: "stage_change", label: "Stage Change", icon: "arrow-right" },
  { id: "document", label: "Document", icon: "paperclip" },
  { id: "offer", label: "Offer", icon: "dollar-sign" }
];

var DOCUMENT_TYPES = [
  "Contract",
  "DD",
  "Financials",
  "Environmental",
  "Title",
  "Other"
];

/* ══════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════ */

var crmState = {
  view: "board",
  selectedDealId: null,
  filterStage: null,
  searchQuery: "",
  activeTab: "overview"
};

var _countdownInterval = null;

/* ══════════════════════════════════════════════════════
   DATA LAYER (deals.js functions)
══════════════════════════════════════════════════════ */

var DEALS_STORAGE_KEY = "storageiq_deals";

function dealsGetAll() {
  try {
    var data = localStorage.getItem(DEALS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("dealsGetAll error:", e);
    return [];
  }
}

function dealsSave(deals) {
  try {
    localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
  } catch (e) {
    console.error("dealsSave error:", e);
  }
}

function dealsGetById(id) {
  var deals = dealsGetAll();
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].id === id) return deals[i];
  }
  return null;
}

function dealsCreate(dealData) {
  var deals = dealsGetAll();
  var newDeal = {
    id: "deal_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
    propertyName: dealData.propertyName || "",
    address: dealData.address || "",
    city: dealData.city || "",
    state: dealData.state || "",
    zip: dealData.zip || "",
    askingPrice: dealData.askingPrice || 0,
    totalUnits: dealData.totalUnits || 0,
    totalSF: dealData.totalSF || 0,
    investmentType: dealData.investmentType || "Acquisition",
    stage: dealData.stage || "prospecting",
    substage: dealData.substage || SUBSTAGES.prospecting[0],
    priority: dealData.priority || "warm",
    seller: {
      name: dealData.sellerName || "",
      phone: dealData.sellerPhone || "",
      email: dealData.sellerEmail || ""
    },
    broker: {
      name: dealData.brokerName || "",
      phone: dealData.brokerPhone || "",
      email: dealData.brokerEmail || ""
    },
    dates: {
      firstContact: dealData.firstContact || new Date().toISOString().split("T")[0],
      loiSubmitted: "",
      loiAccepted: "",
      contractDate: "",
      ddStart: "",
      ddEnd: "",
      financingDeadline: "",
      closingDate: ""
    },
    documents: [],
    activity: [
      {
        id: "act_" + Date.now(),
        type: "stage_change",
        text: "Deal created in Prospecting",
        timestamp: new Date().toISOString()
      }
    ],
    notes: dealData.notes || "",
    underwritingData: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  deals.push(newDeal);
  dealsSave(deals);
  return newDeal;
}

function dealsUpdate(id, updates) {
  var deals = dealsGetAll();
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].id === id) {
      for (var key in updates) {
        if (updates.hasOwnProperty(key)) {
          deals[i][key] = updates[key];
        }
      }
      deals[i].updatedAt = new Date().toISOString();
      dealsSave(deals);
      return deals[i];
    }
  }
  return null;
}

function dealsDelete(id) {
  var deals = dealsGetAll();
  var filtered = [];
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].id !== id) filtered.push(deals[i]);
  }
  dealsSave(filtered);
}

function dealsSearch(query) {
  var deals = dealsGetAll();
  if (!query || query.trim() === "") return deals;
  var q = query.toLowerCase();
  return deals.filter(function(d) {
    return (
      (d.propertyName && d.propertyName.toLowerCase().indexOf(q) !== -1) ||
      (d.city && d.city.toLowerCase().indexOf(q) !== -1) ||
      (d.state && d.state.toLowerCase().indexOf(q) !== -1) ||
      (d.address && d.address.toLowerCase().indexOf(q) !== -1)
    );
  });
}

function dealsGetByStage(stage) {
  var deals = dealsGetAll();
  return deals.filter(function(d) { return d.stage === stage; });
}

function dealsAddActivity(dealId, type, text) {
  var deal = dealsGetById(dealId);
  if (!deal) return null;
  var activity = {
    id: "act_" + Date.now(),
    type: type,
    text: text,
    timestamp: new Date().toISOString()
  };
  deal.activity = deal.activity || [];
  deal.activity.unshift(activity);
  dealsUpdate(dealId, { activity: deal.activity });
  return activity;
}

function dealsAddDocument(dealId, doc) {
  var deal = dealsGetById(dealId);
  if (!deal) return null;
  var document = {
    id: "doc_" + Date.now(),
    name: doc.name,
    type: doc.type || "Other",
    size: doc.size,
    dataUrl: doc.dataUrl,
    uploadedAt: new Date().toISOString()
  };
  deal.documents = deal.documents || [];
  deal.documents.push(document);
  dealsUpdate(dealId, { documents: deal.documents });
  dealsAddActivity(dealId, "document", "Uploaded: " + doc.name);
  return document;
}

function dealsRemoveDocument(dealId, docId) {
  var deal = dealsGetById(dealId);
  if (!deal || !deal.documents) return;
  deal.documents = deal.documents.filter(function(d) { return d.id !== docId; });
  dealsUpdate(dealId, { documents: deal.documents });
}

/* ══════════════════════════════════════════════════════
   HELPER FUNCTIONS
══════════════════════════════════════════════════════ */

function formatCurrency(n) {
  if (n === null || n === undefined || isNaN(n)) return "$0";
  var num = parseFloat(n);
  if (num >= 1000000) {
    return "$" + (num / 1000000).toFixed(2) + "M";
  }
  return "$" + num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatCurrencyFull(n) {
  if (n === null || n === undefined || isNaN(n)) return "$0";
  return "$" + parseFloat(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatDate(iso) {
  if (!iso) return "—";
  var d = new Date(iso);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function daysAgo(iso) {
  if (!iso) return 0;
  var d = new Date(iso);
  var now = new Date();
  var diff = now - d;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function daysUntil(iso) {
  if (!iso) return 0;
  var d = new Date(iso);
  var now = new Date();
  var diff = d - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getDaysInStage(deal) {
  if (!deal || !deal.activity) return 0;
  for (var i = 0; i < deal.activity.length; i++) {
    if (deal.activity[i].type === "stage_change") {
      return daysAgo(deal.activity[i].timestamp);
    }
  }
  return daysAgo(deal.createdAt);
}

function getStageLabel(stageId) {
  for (var i = 0; i < DEAL_STAGES.length; i++) {
    if (DEAL_STAGES[i].id === stageId) return DEAL_STAGES[i].label;
  }
  return stageId;
}

function getStageColor(stageId) {
  for (var i = 0; i < DEAL_STAGES.length; i++) {
    if (DEAL_STAGES[i].id === stageId) return DEAL_STAGES[i].color;
  }
  return "#888";
}

function getPriorityColor(priority) {
  if (priority === "hot") return "#FF453A";
  if (priority === "warm") return "#FFD60A";
  if (priority === "cold") return "#0A84FF";
  return "#888";
}

function getActivityIcon(type) {
  for (var i = 0; i < ACTIVITY_TYPES.length; i++) {
    if (ACTIVITY_TYPES[i].id === type) return ACTIVITY_TYPES[i].icon;
  }
  return "circle";
}

function parseNumber(str) {
  if (!str) return 0;
  return parseFloat(String(str).replace(/[^0-9.-]/g, "")) || 0;
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

/* ══════════════════════════════════════════════════════
   INITIALIZATION
══════════════════════════════════════════════════════ */

function initCRM() {
  renderNav("crm", "New Deal", "renderAddDealModal()");
  renderSidebar();
  renderBoard();
  setupEventListeners();
  initLucide();
}

function setupEventListeners() {
  // Search input
  var searchInput = document.getElementById("crmSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      crmState.searchQuery = e.target.value;
      renderBoard();
    });
  }
}

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */

function renderSidebar() {
  var sidebar = document.getElementById("crmSidebar");
  if (!sidebar) return;

  var deals = dealsGetAll();
  var activeDeals = deals.filter(function(d) { return d.stage !== "dead"; });
  var totalPipeline = 0;
  var avgPrice = 0;

  for (var i = 0; i < activeDeals.length; i++) {
    totalPipeline += parseFloat(activeDeals[i].askingPrice) || 0;
  }
  if (activeDeals.length > 0) {
    avgPrice = totalPipeline / activeDeals.length;
  }

  // Build stats
  var statsHtml = '<div class="crm-stats-grid">' +
    '<div class="crm-stat-card">' +
      '<div class="crm-stat-label">Total Deals</div>' +
      '<div class="crm-stat-value">' + deals.length + '</div>' +
    '</div>' +
    '<div class="crm-stat-card">' +
      '<div class="crm-stat-label">Active</div>' +
      '<div class="crm-stat-value" style="color:var(--semantic-success)">' + activeDeals.length + '</div>' +
    '</div>' +
    '<div class="crm-stat-card">' +
      '<div class="crm-stat-label">Pipeline</div>' +
      '<div class="crm-stat-value" style="color:var(--accent-green)">' + formatCurrency(totalPipeline) + '</div>' +
    '</div>' +
    '<div class="crm-stat-card">' +
      '<div class="crm-stat-label">Avg Price</div>' +
      '<div class="crm-stat-value">' + formatCurrency(avgPrice) + '</div>' +
    '</div>' +
  '</div>';

  // Build funnel
  var funnelHtml = '<div class="crm-funnel">' +
    '<div class="crm-funnel-title">Pipeline Funnel</div>';

  for (var s = 0; s < DEAL_STAGES.length; s++) {
    var stage = DEAL_STAGES[s];
    var stageDeals = deals.filter(function(d) { return d.stage === stage.id; });
    var stageTotal = 0;
    for (var j = 0; j < stageDeals.length; j++) {
      stageTotal += parseFloat(stageDeals[j].askingPrice) || 0;
    }
    var pct = deals.length > 0 ? (stageDeals.length / deals.length * 100) : 0;
    var isActive = crmState.filterStage === stage.id;

    funnelHtml += '<div class="crm-funnel-row' + (isActive ? ' active' : '') + '" onclick="filterByStage(\'' + stage.id + '\')">' +
      '<div class="crm-funnel-row-header">' +
        '<span class="crm-funnel-label">' + stage.label + '</span>' +
        '<span class="crm-funnel-count">' + stageDeals.length + '</span>' +
      '</div>' +
      '<div class="crm-funnel-bar">' +
        '<div class="crm-funnel-bar-fill" style="width:' + pct + '%;background:' + stage.color + '"></div>' +
      '</div>' +
      '<div class="crm-funnel-total">' + formatCurrency(stageTotal) + '</div>' +
    '</div>';
  }

  funnelHtml += '</div>';

  // Build recent activity
  var allActivity = [];
  for (var k = 0; k < deals.length; k++) {
    if (deals[k].activity) {
      for (var a = 0; a < deals[k].activity.length; a++) {
        allActivity.push({
          dealId: deals[k].id,
          dealName: deals[k].propertyName,
          activity: deals[k].activity[a]
        });
      }
    }
  }
  allActivity.sort(function(a, b) {
    return new Date(b.activity.timestamp) - new Date(a.activity.timestamp);
  });
  var recentActivity = allActivity.slice(0, 5);

  var activityHtml = '<div class="crm-recent-activity">' +
    '<div class="crm-recent-title">Recent Activity</div>';

  if (recentActivity.length === 0) {
    activityHtml += '<div class="crm-recent-empty">No activity yet</div>';
  } else {
    for (var r = 0; r < recentActivity.length; r++) {
      var act = recentActivity[r];
      activityHtml += '<div class="crm-recent-item" onclick="openDealDetail(\'' + act.dealId + '\')">' +
        '<div class="crm-recent-icon"><i data-lucide="' + getActivityIcon(act.activity.type) + '"></i></div>' +
        '<div class="crm-recent-content">' +
          '<div class="crm-recent-deal">' + (act.dealName || "Untitled") + '</div>' +
          '<div class="crm-recent-text">' + act.activity.text + '</div>' +
          '<div class="crm-recent-time">' + formatDate(act.activity.timestamp) + '</div>' +
        '</div>' +
      '</div>';
    }
  }

  activityHtml += '</div>';

  // Combine all
  sidebar.innerHTML =
    '<div class="crm-sidebar-search">' +
      '<div class="field">' +
        '<div class="crm-search-wrapper">' +
          '<i data-lucide="search" class="crm-search-icon"></i>' +
          '<input type="text" id="crmSearch" placeholder="Search deals..." value="' + (crmState.searchQuery || '') + '">' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<button class="crm-new-deal-btn" onclick="renderAddDealModal()">' +
      '<i data-lucide="plus"></i> New Deal' +
    '</button>' +
    statsHtml +
    funnelHtml +
    activityHtml;

  // Re-bind search
  var searchInput = document.getElementById("crmSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      crmState.searchQuery = e.target.value;
      renderBoard();
    });
  }

  initLucide();
}

function filterByStage(stageId) {
  if (crmState.filterStage === stageId) {
    crmState.filterStage = null;
  } else {
    crmState.filterStage = stageId;
  }
  renderSidebar();
  renderBoard();
}

/* ══════════════════════════════════════════════════════
   KANBAN BOARD
══════════════════════════════════════════════════════ */

function renderBoard() {
  var board = document.getElementById("crmBoard");
  if (!board) return;

  var deals = crmState.searchQuery ? dealsSearch(crmState.searchQuery) : dealsGetAll();

  if (crmState.filterStage) {
    deals = deals.filter(function(d) { return d.stage === crmState.filterStage; });
  }

  var html = '<div class="crm-board-columns">';

  for (var s = 0; s < DEAL_STAGES.length; s++) {
    var stage = DEAL_STAGES[s];
    var stageDeals = deals.filter(function(d) { return d.stage === stage.id; });
    var stageTotal = 0;
    for (var j = 0; j < stageDeals.length; j++) {
      stageTotal += parseFloat(stageDeals[j].askingPrice) || 0;
    }

    html += '<div class="crm-board-column" data-stage="' + stage.id + '">' +
      '<div class="crm-column-header">' +
        '<div class="crm-column-title">' +
          '<span class="crm-column-dot" style="background:' + stage.color + '"></span>' +
          '<span>' + stage.label + '</span>' +
          '<span class="crm-column-count">' + stageDeals.length + '</span>' +
        '</div>' +
        '<div class="crm-column-total">' + formatCurrency(stageTotal) + '</div>' +
      '</div>' +
      '<div class="crm-column-cards">';

    for (var d = 0; d < stageDeals.length; d++) {
      html += renderDealCard(stageDeals[d]);
    }

    html += '</div>' +
      '<button class="crm-add-deal-btn" onclick="renderAddDealModal(\'' + stage.id + '\')">' +
        '<i data-lucide="plus"></i> Add Deal' +
      '</button>' +
    '</div>';
  }

  html += '</div>';
  board.innerHTML = html;
  initLucide();
}

function renderDealCard(deal) {
  var isSelected = crmState.selectedDealId === deal.id;
  var daysInStage = getDaysInStage(deal);
  var priorityColor = getPriorityColor(deal.priority);

  return '<div class="crm-deal-card' + (isSelected ? ' active' : '') + '" onclick="openDealDetail(\'' + deal.id + '\')">' +
    '<div class="crm-deal-card-header">' +
      '<div class="crm-deal-name">' + (deal.propertyName || "Untitled Deal") + '</div>' +
      '<div class="crm-deal-priority" style="background:' + priorityColor + '" title="' + (deal.priority || 'warm') + '"></div>' +
    '</div>' +
    '<div class="crm-deal-location">' + (deal.city || "") + (deal.city && deal.state ? ", " : "") + (deal.state || "") + '</div>' +
    '<div class="crm-deal-price">' + formatCurrency(deal.askingPrice) + '</div>' +
    '<div class="crm-deal-meta">' +
      '<span class="crm-deal-days">' + daysInStage + 'd in stage</span>' +
      (deal.substage ? '<span class="crm-deal-substage">' + deal.substage + '</span>' : '') +
    '</div>' +
  '</div>';
}

/* ══════════════════════════════════════════════════════
   DEAL DETAIL PANEL
══════════════════════════════════════════════════════ */

function openDealDetail(id) {
  crmState.selectedDealId = id;
  crmState.activeTab = "overview";
  var deal = dealsGetById(id);
  if (!deal) return;

  renderBoard();
  renderDetailPanel(deal);

  var detail = document.getElementById("crmDetail");
  if (detail) {
    detail.classList.add("open");
  }
}

function closeDealDetail() {
  crmState.selectedDealId = null;
  if (_countdownInterval) {
    clearInterval(_countdownInterval);
    _countdownInterval = null;
  }

  var detail = document.getElementById("crmDetail");
  if (detail) {
    detail.classList.remove("open");
  }
  renderBoard();
}

function renderDetailPanel(deal) {
  var detail = document.getElementById("crmDetail");
  if (!detail) return;

  if (_countdownInterval) {
    clearInterval(_countdownInterval);
    _countdownInterval = null;
  }

  var tabs = ["overview", "timeline", "documents", "activity", "financials"];
  var tabLabels = ["Overview", "Timeline", "Documents", "Activity", "Financials"];
  var tabIcons = ["info", "calendar", "folder", "activity", "calculator"];

  var tabsHtml = '<div class="crm-detail-tabs">';
  for (var t = 0; t < tabs.length; t++) {
    var isActive = crmState.activeTab === tabs[t];
    tabsHtml += '<button class="crm-detail-tab' + (isActive ? ' active' : '') + '" onclick="switchTab(\'' + tabs[t] + '\')">' +
      '<i data-lucide="' + tabIcons[t] + '"></i>' +
      '<span>' + tabLabels[t] + '</span>' +
    '</button>';
  }
  tabsHtml += '</div>';

  var contentHtml = '';
  if (crmState.activeTab === "overview") {
    contentHtml = renderOverviewTab(deal);
  } else if (crmState.activeTab === "timeline") {
    contentHtml = renderTimelineTab(deal);
  } else if (crmState.activeTab === "documents") {
    contentHtml = renderDocumentsTab(deal);
  } else if (crmState.activeTab === "activity") {
    contentHtml = renderActivityTab(deal);
  } else if (crmState.activeTab === "financials") {
    contentHtml = renderFinancialsTab(deal);
  }

  detail.innerHTML =
    '<div class="crm-detail-header">' +
      '<div class="crm-detail-title">' +
        '<h2>' + (deal.propertyName || "Untitled Deal") + '</h2>' +
        '<span class="crm-detail-stage" style="background:' + getStageColor(deal.stage) + '">' + getStageLabel(deal.stage) + '</span>' +
      '</div>' +
      '<button class="crm-detail-close" onclick="closeDealDetail()">' +
        '<i data-lucide="x"></i>' +
      '</button>' +
    '</div>' +
    tabsHtml +
    '<div class="crm-detail-content">' + contentHtml + '</div>';

  initLucide();

  // Start countdown if on timeline tab
  if (crmState.activeTab === "timeline" && deal.dates && deal.dates.contractDate && deal.dates.closingDate) {
    startCountdown(deal);
  }
}

function switchTab(tab) {
  crmState.activeTab = tab;
  var deal = dealsGetById(crmState.selectedDealId);
  if (deal) {
    renderDetailPanel(deal);
  }
}

/* ══════════════════════════════════════════════════════
   TAB 1: OVERVIEW
══════════════════════════════════════════════════════ */

function renderOverviewTab(deal) {
  var daysFirst = deal.dates && deal.dates.firstContact ? daysAgo(deal.dates.firstContact) : 0;
  var daysClose = deal.dates && deal.dates.closingDate ? daysUntil(deal.dates.closingDate) : 0;
  var daysStage = getDaysInStage(deal);

  var stageOptions = '';
  for (var s = 0; s < DEAL_STAGES.length; s++) {
    var sel = DEAL_STAGES[s].id === deal.stage ? ' selected' : '';
    stageOptions += '<option value="' + DEAL_STAGES[s].id + '"' + sel + '>' + DEAL_STAGES[s].label + '</option>';
  }

  var substageOptions = '';
  var currentSubstages = SUBSTAGES[deal.stage] || [];
  for (var ss = 0; ss < currentSubstages.length; ss++) {
    var selSub = currentSubstages[ss] === deal.substage ? ' selected' : '';
    substageOptions += '<option value="' + currentSubstages[ss] + '"' + selSub + '>' + currentSubstages[ss] + '</option>';
  }

  var investmentOptions = '';
  for (var i = 0; i < INVESTMENT_TYPES.length; i++) {
    var selInv = INVESTMENT_TYPES[i] === deal.investmentType ? ' selected' : '';
    investmentOptions += '<option value="' + INVESTMENT_TYPES[i] + '"' + selInv + '>' + INVESTMENT_TYPES[i] + '</option>';
  }

  return '<div class="crm-overview-grid">' +
    '<div class="crm-overview-main">' +
      '<div class="crm-section">' +
        '<div class="crm-section-title">Property Information</div>' +
        '<div class="fg2">' +
          '<div class="field">' +
            '<label>Property Name</label>' +
            '<input type="text" id="dealPropertyName" value="' + (deal.propertyName || '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Investment Type</label>' +
            '<select id="dealInvestmentType">' + investmentOptions + '</select>' +
          '</div>' +
        '</div>' +
        '<div class="field">' +
          '<label>Address</label>' +
          '<input type="text" id="dealAddress" value="' + (deal.address || '') + '">' +
        '</div>' +
        '<div class="fg3">' +
          '<div class="field">' +
            '<label>City</label>' +
            '<input type="text" id="dealCity" value="' + (deal.city || '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>State</label>' +
            '<input type="text" id="dealState" value="' + (deal.state || '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Zip</label>' +
            '<input type="text" id="dealZip" value="' + (deal.zip || '') + '">' +
          '</div>' +
        '</div>' +
        '<div class="fg3">' +
          '<div class="field">' +
            '<label>Asking Price</label>' +
            '<input type="text" id="dealAskingPrice" value="' + formatCurrencyFull(deal.askingPrice) + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Total Units</label>' +
            '<input type="number" id="dealTotalUnits" value="' + (deal.totalUnits || '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Total SF</label>' +
            '<input type="number" id="dealTotalSF" value="' + (deal.totalSF || '') + '">' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="crm-section">' +
        '<div class="crm-section-title">Pipeline Status</div>' +
        '<div class="fg3">' +
          '<div class="field">' +
            '<label>Stage</label>' +
            '<select id="dealStage" onchange="handleStageChange()">' + stageOptions + '</select>' +
          '</div>' +
          '<div class="field">' +
            '<label>Substage</label>' +
            '<select id="dealSubstage">' + substageOptions + '</select>' +
          '</div>' +
          '<div class="field">' +
            '<label>Priority</label>' +
            '<select id="dealPriority">' +
              '<option value="hot"' + (deal.priority === 'hot' ? ' selected' : '') + '>Hot</option>' +
              '<option value="warm"' + (deal.priority === 'warm' ? ' selected' : '') + '>Warm</option>' +
              '<option value="cold"' + (deal.priority === 'cold' ? ' selected' : '') + '>Cold</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="crm-section">' +
        '<div class="crm-section-title">Seller Information</div>' +
        '<div class="fg3">' +
          '<div class="field">' +
            '<label>Name</label>' +
            '<input type="text" id="dealSellerName" value="' + (deal.seller ? deal.seller.name : '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Phone</label>' +
            '<input type="tel" id="dealSellerPhone" value="' + (deal.seller ? deal.seller.phone : '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Email</label>' +
            '<input type="email" id="dealSellerEmail" value="' + (deal.seller ? deal.seller.email : '') + '">' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="crm-section">' +
        '<div class="crm-section-title">Broker Information</div>' +
        '<div class="fg3">' +
          '<div class="field">' +
            '<label>Name</label>' +
            '<input type="text" id="dealBrokerName" value="' + (deal.broker ? deal.broker.name : '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Phone</label>' +
            '<input type="tel" id="dealBrokerPhone" value="' + (deal.broker ? deal.broker.phone : '') + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Email</label>' +
            '<input type="email" id="dealBrokerEmail" value="' + (deal.broker ? deal.broker.email : '') + '">' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<button class="btn-run" onclick="saveDealOverview()">' +
        '<i data-lucide="save"></i> Save Changes' +
      '</button>' +
    '</div>' +

    '<div class="crm-overview-side">' +
      '<div class="crm-quick-stats">' +
        '<div class="crm-quick-stat">' +
          '<div class="crm-quick-stat-value">' + daysFirst + '</div>' +
          '<div class="crm-quick-stat-label">Days Since First Contact</div>' +
        '</div>' +
        '<div class="crm-quick-stat">' +
          '<div class="crm-quick-stat-value" style="color:' + (daysClose < 30 ? 'var(--semantic-error)' : 'var(--semantic-success)') + '">' + (daysClose > 0 ? daysClose : '—') + '</div>' +
          '<div class="crm-quick-stat-label">Days Until Closing</div>' +
        '</div>' +
        '<div class="crm-quick-stat">' +
          '<div class="crm-quick-stat-value">' + daysStage + '</div>' +
          '<div class="crm-quick-stat-label">Days in Current Stage</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function handleStageChange() {
  var stageSelect = document.getElementById("dealStage");
  var substageSelect = document.getElementById("dealSubstage");
  if (!stageSelect || !substageSelect) return;

  var newStage = stageSelect.value;
  var substages = SUBSTAGES[newStage] || [];

  substageSelect.innerHTML = '';
  for (var i = 0; i < substages.length; i++) {
    var opt = document.createElement("option");
    opt.value = substages[i];
    opt.textContent = substages[i];
    substageSelect.appendChild(opt);
  }
}

function saveDealOverview() {
  var deal = dealsGetById(crmState.selectedDealId);
  if (!deal) return;

  var oldStage = deal.stage;
  var newStage = document.getElementById("dealStage").value;

  var updates = {
    propertyName: document.getElementById("dealPropertyName").value,
    address: document.getElementById("dealAddress").value,
    city: document.getElementById("dealCity").value,
    state: document.getElementById("dealState").value,
    zip: document.getElementById("dealZip").value,
    askingPrice: parseNumber(document.getElementById("dealAskingPrice").value),
    totalUnits: parseNumber(document.getElementById("dealTotalUnits").value),
    totalSF: parseNumber(document.getElementById("dealTotalSF").value),
    investmentType: document.getElementById("dealInvestmentType").value,
    stage: newStage,
    substage: document.getElementById("dealSubstage").value,
    priority: document.getElementById("dealPriority").value,
    seller: {
      name: document.getElementById("dealSellerName").value,
      phone: document.getElementById("dealSellerPhone").value,
      email: document.getElementById("dealSellerEmail").value
    },
    broker: {
      name: document.getElementById("dealBrokerName").value,
      phone: document.getElementById("dealBrokerPhone").value,
      email: document.getElementById("dealBrokerEmail").value
    }
  };

  dealsUpdate(crmState.selectedDealId, updates);

  if (oldStage !== newStage) {
    dealsAddActivity(crmState.selectedDealId, "stage_change", "Stage changed: " + getStageLabel(oldStage) + " → " + getStageLabel(newStage));
  }

  renderSidebar();
  renderBoard();
  var updatedDeal = dealsGetById(crmState.selectedDealId);
  renderDetailPanel(updatedDeal);
}

/* ══════════════════════════════════════════════════════
   TAB 2: TIMELINE
══════════════════════════════════════════════════════ */

function renderTimelineTab(deal) {
  var milestones = [
    { key: "firstContact", label: "First Contact", icon: "user-plus" },
    { key: "loiSubmitted", label: "LOI Submitted", icon: "file-text" },
    { key: "loiAccepted", label: "LOI Accepted", icon: "check-circle" },
    { key: "contractDate", label: "Contract Executed", icon: "file-signature" },
    { key: "ddStart", label: "DD Start", icon: "search" },
    { key: "ddEnd", label: "DD End", icon: "clipboard-check" },
    { key: "financingDeadline", label: "Financing Deadline", icon: "landmark" },
    { key: "closingDate", label: "Closing Date", icon: "key" }
  ];

  var now = new Date();
  var timelineHtml = '<div class="crm-timeline">';

  for (var i = 0; i < milestones.length; i++) {
    var m = milestones[i];
    var dateVal = deal.dates ? deal.dates[m.key] : "";
    var dateObj = dateVal ? new Date(dateVal) : null;
    var status = "upcoming";

    if (dateObj) {
      if (dateObj < now) {
        status = "completed";
      } else if (dateObj.toDateString() === now.toDateString()) {
        status = "active";
      } else if (dateObj < now) {
        status = "overdue";
      }
    }

    timelineHtml += '<div class="crm-timeline-item ' + status + '">' +
      '<div class="crm-timeline-marker">' +
        '<i data-lucide="' + m.icon + '"></i>' +
      '</div>' +
      '<div class="crm-timeline-content">' +
        '<div class="crm-timeline-label">' + m.label + '</div>' +
        '<input type="date" class="crm-timeline-date" data-key="' + m.key + '" value="' + (dateVal || '') + '" onchange="saveTimelineDate(\'' + m.key + '\', this.value)">' +
      '</div>' +
      '<div class="crm-timeline-status">' +
        (status === 'completed' ? '<i data-lucide="check" style="color:var(--semantic-success)"></i>' :
         status === 'active' ? '<span class="crm-pulse"></span>' :
         status === 'overdue' ? '<i data-lucide="alert-circle" style="color:var(--semantic-error)"></i>' : '') +
      '</div>' +
    '</div>';
  }

  timelineHtml += '</div>';

  // Live countdown
  var countdownHtml = '';
  if (deal.dates && deal.dates.contractDate && deal.dates.closingDate) {
    countdownHtml = '<div class="crm-countdown-section">' +
      '<div class="crm-section-title">Closing Countdown</div>' +
      '<div id="closingCountdown" class="crm-countdown"></div>' +
    '</div>';
  }

  // DD Phase Tracker
  var ddHtml = '';
  if (deal.stage === "under_contract") {
    ddHtml = '<div class="crm-dd-tracker">' +
      '<div class="crm-section-title">Due Diligence Phases</div>' +
      '<div class="crm-dd-phases">';

    for (var p = 0; p < DD_PHASES.length; p++) {
      var phase = DD_PHASES[p];
      ddHtml += '<div class="crm-dd-phase">' +
        '<div class="crm-dd-phase-name">' + phase.name + '</div>' +
        '<div class="crm-dd-phase-days">' + phase.days + 'd</div>' +
      '</div>';
    }

    ddHtml += '</div></div>';
  }

  return countdownHtml + timelineHtml + ddHtml;
}

function saveTimelineDate(key, value) {
  var deal = dealsGetById(crmState.selectedDealId);
  if (!deal) return;

  var dates = deal.dates || {};
  dates[key] = value;
  dealsUpdate(crmState.selectedDealId, { dates: dates });
}

function startCountdown(deal) {
  var countdownEl = document.getElementById("closingCountdown");
  if (!countdownEl || !deal.dates || !deal.dates.closingDate) return;

  function updateCountdown() {
    var now = new Date();
    var closing = new Date(deal.dates.closingDate + "T23:59:59");
    var diff = closing - now;

    if (diff <= 0) {
      countdownEl.innerHTML = '<span style="color:var(--semantic-success)">Closing day has arrived!</span>';
      countdownEl.className = "crm-countdown green";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var colorClass = "green";
    if (days < 10) colorClass = "red";
    else if (days < 30) colorClass = "amber";

    countdownEl.className = "crm-countdown " + colorClass;
    countdownEl.innerHTML =
      '<span class="crm-countdown-num">' + days + '</span><span class="crm-countdown-label">days</span>' +
      '<span class="crm-countdown-num">' + hours + '</span><span class="crm-countdown-label">hours</span>' +
      '<span class="crm-countdown-num">' + minutes + '</span><span class="crm-countdown-label">minutes</span>' +
      '<span class="crm-countdown-num">' + seconds + '</span><span class="crm-countdown-label">seconds</span>' +
      '<span class="crm-countdown-suffix">until closing</span>';
  }

  updateCountdown();
  _countdownInterval = setInterval(updateCountdown, 1000);
}

/* ══════════════════════════════════════════════════════
   TAB 3: DOCUMENTS
══════════════════════════════════════════════════════ */

function renderDocumentsTab(deal) {
  var uploadHtml = '<div class="crm-upload-zone" id="uploadZone" onclick="triggerFileInput()" ondrop="handleFileDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">' +
    '<i data-lucide="upload-cloud"></i>' +
    '<div class="crm-upload-text">Drag & drop files here or click to browse</div>' +
    '<div class="crm-upload-hint">PDF, XLSX, DOCX, JPG, PNG (max 5MB)</div>' +
    '<input type="file" id="fileInput" style="display:none" accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png" onchange="handleFileSelect(event)" multiple>' +
  '</div>';

  // Group documents by type
  var docsByType = {};
  for (var t = 0; t < DOCUMENT_TYPES.length; t++) {
    docsByType[DOCUMENT_TYPES[t]] = [];
  }

  if (deal.documents) {
    for (var d = 0; d < deal.documents.length; d++) {
      var doc = deal.documents[d];
      var type = doc.type || "Other";
      if (!docsByType[type]) docsByType[type] = [];
      docsByType[type].push(doc);
    }
  }

  var docsHtml = '<div class="crm-documents-list">';

  for (var type in docsByType) {
    if (docsByType[type].length === 0) continue;

    docsHtml += '<div class="crm-doc-group">' +
      '<div class="crm-doc-group-title">' + type + '</div>';

    for (var i = 0; i < docsByType[type].length; i++) {
      var doc = docsByType[type][i];
      var icon = getDocIcon(doc.name);

      docsHtml += '<div class="crm-doc-item">' +
        '<div class="crm-doc-icon"><i data-lucide="' + icon + '"></i></div>' +
        '<div class="crm-doc-info">' +
          '<div class="crm-doc-name">' + doc.name + '</div>' +
          '<div class="crm-doc-meta">' + formatFileSize(doc.size) + ' - ' + formatDate(doc.uploadedAt) + '</div>' +
        '</div>' +
        '<div class="crm-doc-actions">' +
          '<button class="crm-doc-btn" onclick="downloadDocument(\'' + doc.id + '\')" title="Download">' +
            '<i data-lucide="download"></i>' +
          '</button>' +
          '<button class="crm-doc-btn delete" onclick="deleteDocument(\'' + doc.id + '\')" title="Delete">' +
            '<i data-lucide="trash-2"></i>' +
          '</button>' +
        '</div>' +
      '</div>';
    }

    docsHtml += '</div>';
  }

  if (!deal.documents || deal.documents.length === 0) {
    docsHtml += '<div class="crm-doc-empty">No documents uploaded yet</div>';
  }

  docsHtml += '</div>';

  return uploadHtml + docsHtml;
}

function getDocIcon(filename) {
  var ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'file-text';
  if (ext === 'xlsx' || ext === 'xls') return 'table';
  if (ext === 'docx' || ext === 'doc') return 'file-text';
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') return 'image';
  return 'file';
}

function triggerFileInput() {
  document.getElementById("fileInput").click();
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("uploadZone").classList.add("dragover");
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("uploadZone").classList.remove("dragover");
}

function handleFileDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("uploadZone").classList.remove("dragover");

  var files = e.dataTransfer.files;
  processFiles(files);
}

function handleFileSelect(e) {
  var files = e.target.files;
  processFiles(files);
}

function processFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    if (file.size > 5 * 1024 * 1024) {
      alert("File " + file.name + " exceeds 5MB limit");
      continue;
    }

    (function(f) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var docType = promptDocType();
        dealsAddDocument(crmState.selectedDealId, {
          name: f.name,
          type: docType,
          size: f.size,
          dataUrl: e.target.result
        });

        var deal = dealsGetById(crmState.selectedDealId);
        renderDetailPanel(deal);
      };
      reader.readAsDataURL(f);
    })(file);
  }
}

function promptDocType() {
  var type = prompt("Document type:\n1. Contract\n2. DD\n3. Financials\n4. Environmental\n5. Title\n6. Other\n\nEnter number or type name:");
  var typeMap = { "1": "Contract", "2": "DD", "3": "Financials", "4": "Environmental", "5": "Title", "6": "Other" };
  return typeMap[type] || type || "Other";
}

function downloadDocument(docId) {
  var deal = dealsGetById(crmState.selectedDealId);
  if (!deal || !deal.documents) return;

  for (var i = 0; i < deal.documents.length; i++) {
    if (deal.documents[i].id === docId) {
      var doc = deal.documents[i];
      var link = document.createElement("a");
      link.href = doc.dataUrl;
      link.download = doc.name;
      link.click();
      break;
    }
  }
}

function deleteDocument(docId) {
  if (!confirm("Delete this document?")) return;
  dealsRemoveDocument(crmState.selectedDealId, docId);
  var deal = dealsGetById(crmState.selectedDealId);
  renderDetailPanel(deal);
}

/* ══════════════════════════════════════════════════════
   TAB 4: ACTIVITY
══════════════════════════════════════════════════════ */

function renderActivityTab(deal) {
  var typeOptions = '';
  for (var i = 0; i < ACTIVITY_TYPES.length; i++) {
    if (ACTIVITY_TYPES[i].id !== 'stage_change' && ACTIVITY_TYPES[i].id !== 'document') {
      typeOptions += '<option value="' + ACTIVITY_TYPES[i].id + '">' + ACTIVITY_TYPES[i].label + '</option>';
    }
  }

  var formHtml = '<div class="crm-activity-form">' +
    '<div class="crm-activity-form-row">' +
      '<select id="activityType" class="crm-activity-select">' + typeOptions + '</select>' +
      '<input type="text" id="activityText" class="crm-activity-input" placeholder="Enter activity note...">' +
      '<button class="crm-activity-btn" onclick="logActivity()">' +
        '<i data-lucide="plus"></i> Log' +
      '</button>' +
    '</div>' +
  '</div>';

  var feedHtml = '<div class="crm-activity-feed">';

  if (!deal.activity || deal.activity.length === 0) {
    feedHtml += '<div class="crm-activity-empty">No activity logged yet</div>';
  } else {
    for (var a = 0; a < deal.activity.length; a++) {
      var act = deal.activity[a];
      var icon = getActivityIcon(act.type);

      feedHtml += '<div class="crm-activity-item">' +
        '<div class="crm-activity-icon"><i data-lucide="' + icon + '"></i></div>' +
        '<div class="crm-activity-content">' +
          '<div class="crm-activity-text">' + act.text + '</div>' +
          '<div class="crm-activity-time">' + formatDate(act.timestamp) + '</div>' +
        '</div>' +
      '</div>';
    }
  }

  feedHtml += '</div>';

  return formHtml + feedHtml;
}

function logActivity() {
  var type = document.getElementById("activityType").value;
  var text = document.getElementById("activityText").value.trim();

  if (!text) {
    alert("Please enter an activity note");
    return;
  }

  dealsAddActivity(crmState.selectedDealId, type, text);

  document.getElementById("activityText").value = "";

  renderSidebar();
  var deal = dealsGetById(crmState.selectedDealId);
  renderDetailPanel(deal);
}

/* ══════════════════════════════════════════════════════
   TAB 5: FINANCIALS
══════════════════════════════════════════════════════ */

function renderFinancialsTab(deal) {
  if (deal.underwritingData) {
    var uw = deal.underwritingData;
    return '<div class="crm-financials-summary">' +
      '<div class="crm-section-title">Underwriting Summary</div>' +
      '<div class="crm-financials-grid">' +
        '<div class="crm-financial-card">' +
          '<div class="crm-financial-label">Purchase Price</div>' +
          '<div class="crm-financial-value">' + formatCurrencyFull(uw.purchasePrice || deal.askingPrice) + '</div>' +
        '</div>' +
        '<div class="crm-financial-card">' +
          '<div class="crm-financial-label">NOI</div>' +
          '<div class="crm-financial-value" style="color:var(--semantic-success)">' + formatCurrencyFull(uw.noi) + '</div>' +
        '</div>' +
        '<div class="crm-financial-card">' +
          '<div class="crm-financial-label">DSCR</div>' +
          '<div class="crm-financial-value">' + (uw.dscr ? uw.dscr.toFixed(2) + 'x' : '—') + '</div>' +
        '</div>' +
        '<div class="crm-financial-card">' +
          '<div class="crm-financial-label">Cash-on-Cash</div>' +
          '<div class="crm-financial-value" style="color:var(--semantic-info)">' + (uw.coc ? uw.coc.toFixed(1) + '%' : '—') + '</div>' +
        '</div>' +
        '<div class="crm-financial-card">' +
          '<div class="crm-financial-label">IRR</div>' +
          '<div class="crm-financial-value" style="color:var(--accent-green)">' + (uw.irr ? uw.irr.toFixed(1) + '%' : '—') + '</div>' +
        '</div>' +
        '<div class="crm-financial-card">' +
          '<div class="crm-financial-label">Equity Multiple</div>' +
          '<div class="crm-financial-value">' + (uw.emx ? uw.emx.toFixed(2) + 'x' : '—') + '</div>' +
        '</div>' +
      '</div>' +
      '<a href="index.html" class="btn-run" style="margin-top:1.5rem;text-decoration:none;display:inline-flex;">' +
        '<i data-lucide="calculator"></i> Open in Underwriter' +
      '</a>' +
    '</div>';
  }

  // Quick entry form
  return '<div class="crm-financials-empty">' +
    '<div class="crm-empty-icon"><i data-lucide="calculator"></i></div>' +
    '<div class="crm-empty-text">No underwriting data linked to this deal</div>' +
    '<div class="crm-section" style="margin-top:1.5rem">' +
      '<div class="crm-section-title">Quick Financials</div>' +
      '<div class="fg3">' +
        '<div class="field">' +
          '<label>Asking Price</label>' +
          '<input type="text" id="quickAskingPrice" value="' + formatCurrencyFull(deal.askingPrice) + '">' +
        '</div>' +
        '<div class="field">' +
          '<label>Est. NOI</label>' +
          '<input type="text" id="quickNOI" placeholder="$0">' +
        '</div>' +
        '<div class="field">' +
          '<label>Est. Cap Rate</label>' +
          '<input type="text" id="quickCapRate" placeholder="0%">' +
        '</div>' +
      '</div>' +
      '<button class="btn-run" onclick="saveQuickFinancials()" style="margin-top:1rem">' +
        '<i data-lucide="save"></i> Save Quick Financials' +
      '</button>' +
    '</div>' +
    '<a href="index.html" class="btn-proceed" style="text-decoration:none;display:inline-flex;">' +
      '<i data-lucide="calculator"></i> Open Full Underwriter' +
    '</a>' +
  '</div>';
}

function saveQuickFinancials() {
  var askingPrice = parseNumber(document.getElementById("quickAskingPrice").value);
  var noi = parseNumber(document.getElementById("quickNOI").value);
  var capRate = parseFloat(document.getElementById("quickCapRate").value.replace('%', '')) || 0;

  var underwritingData = {
    purchasePrice: askingPrice,
    noi: noi,
    capRate: capRate,
    dscr: null,
    coc: null,
    irr: null,
    emx: null
  };

  dealsUpdate(crmState.selectedDealId, {
    askingPrice: askingPrice,
    underwritingData: underwritingData
  });

  var deal = dealsGetById(crmState.selectedDealId);
  renderDetailPanel(deal);
  renderSidebar();
  renderBoard();
}

/* ══════════════════════════════════════════════════════
   ADD DEAL MODAL
══════════════════════════════════════════════════════ */

function renderAddDealModal(defaultStage) {
  var stage = defaultStage || "prospecting";

  var stageOptions = '';
  for (var s = 0; s < DEAL_STAGES.length; s++) {
    var sel = DEAL_STAGES[s].id === stage ? ' selected' : '';
    stageOptions += '<option value="' + DEAL_STAGES[s].id + '"' + sel + '>' + DEAL_STAGES[s].label + '</option>';
  }

  var investmentOptions = '';
  for (var i = 0; i < INVESTMENT_TYPES.length; i++) {
    investmentOptions += '<option value="' + INVESTMENT_TYPES[i] + '">' + INVESTMENT_TYPES[i] + '</option>';
  }

  var stateOptions = '<option value="">Select State</option>';
  var states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  for (var st = 0; st < states.length; st++) {
    stateOptions += '<option value="' + states[st] + '">' + states[st] + '</option>';
  }

  var modalHtml = '<div class="crm-modal-overlay" onclick="closeModal()">' +
    '<div class="crm-modal" onclick="event.stopPropagation()">' +
      '<div class="crm-modal-header">' +
        '<h2>Add New Deal</h2>' +
        '<button class="crm-modal-close" onclick="closeModal()">' +
          '<i data-lucide="x"></i>' +
        '</button>' +
      '</div>' +
      '<div class="crm-modal-body">' +
        '<div class="crm-section">' +
          '<div class="crm-section-title">Property Details</div>' +
          '<div class="field">' +
            '<label>Property Name *</label>' +
            '<input type="text" id="newPropertyName" required>' +
          '</div>' +
          '<div class="field">' +
            '<label>Address *</label>' +
            '<input type="text" id="newAddress" required>' +
          '</div>' +
          '<div class="fg3">' +
            '<div class="field">' +
              '<label>City *</label>' +
              '<input type="text" id="newCity" required>' +
            '</div>' +
            '<div class="field">' +
              '<label>State *</label>' +
              '<select id="newState" required>' + stateOptions + '</select>' +
            '</div>' +
            '<div class="field">' +
              '<label>Zip</label>' +
              '<input type="text" id="newZip">' +
            '</div>' +
          '</div>' +
          '<div class="fg3">' +
            '<div class="field">' +
              '<label>Asking Price *</label>' +
              '<input type="text" id="newAskingPrice" placeholder="$0" required>' +
            '</div>' +
            '<div class="field">' +
              '<label>Total Units</label>' +
              '<input type="number" id="newTotalUnits">' +
            '</div>' +
            '<div class="field">' +
              '<label>Total SF</label>' +
              '<input type="number" id="newTotalSF">' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="crm-section">' +
          '<div class="crm-section-title">Deal Settings</div>' +
          '<div class="fg3">' +
            '<div class="field">' +
              '<label>Investment Type</label>' +
              '<select id="newInvestmentType">' + investmentOptions + '</select>' +
            '</div>' +
            '<div class="field">' +
              '<label>Stage</label>' +
              '<select id="newStage">' + stageOptions + '</select>' +
            '</div>' +
            '<div class="field">' +
              '<label>Priority</label>' +
              '<select id="newPriority">' +
                '<option value="warm" selected>Warm</option>' +
                '<option value="hot">Hot</option>' +
                '<option value="cold">Cold</option>' +
              '</select>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="crm-section">' +
          '<div class="crm-section-title">Seller Information</div>' +
          '<div class="fg3">' +
            '<div class="field">' +
              '<label>Name</label>' +
              '<input type="text" id="newSellerName">' +
            '</div>' +
            '<div class="field">' +
              '<label>Phone</label>' +
              '<input type="tel" id="newSellerPhone">' +
            '</div>' +
            '<div class="field">' +
              '<label>Email</label>' +
              '<input type="email" id="newSellerEmail">' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="crm-section">' +
          '<div class="crm-section-title">Additional Info</div>' +
          '<div class="field">' +
            '<label>First Contact Date</label>' +
            '<input type="date" id="newFirstContact" value="' + new Date().toISOString().split("T")[0] + '">' +
          '</div>' +
          '<div class="field">' +
            '<label>Notes</label>' +
            '<textarea id="newNotes" rows="3" placeholder="Initial notes about this deal..."></textarea>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="crm-modal-footer">' +
        '<button class="crm-modal-cancel" onclick="closeModal()">Cancel</button>' +
        '<button class="btn-run" onclick="createDeal()">' +
          '<i data-lucide="plus"></i> Create Deal' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>';

  var modalContainer = document.getElementById("crmModal");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "crmModal";
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = modalHtml;
  initLucide();
}

function closeModal() {
  var modalContainer = document.getElementById("crmModal");
  if (modalContainer) {
    modalContainer.innerHTML = "";
  }
}

function createDeal() {
  var propertyName = document.getElementById("newPropertyName").value.trim();
  var address = document.getElementById("newAddress").value.trim();
  var city = document.getElementById("newCity").value.trim();
  var state = document.getElementById("newState").value;
  var askingPrice = parseNumber(document.getElementById("newAskingPrice").value);

  if (!propertyName || !address || !city || !state || !askingPrice) {
    alert("Please fill in all required fields (marked with *)");
    return;
  }

  var dealData = {
    propertyName: propertyName,
    address: address,
    city: city,
    state: state,
    zip: document.getElementById("newZip").value.trim(),
    askingPrice: askingPrice,
    totalUnits: parseNumber(document.getElementById("newTotalUnits").value),
    totalSF: parseNumber(document.getElementById("newTotalSF").value),
    investmentType: document.getElementById("newInvestmentType").value,
    stage: document.getElementById("newStage").value,
    priority: document.getElementById("newPriority").value,
    sellerName: document.getElementById("newSellerName").value.trim(),
    sellerPhone: document.getElementById("newSellerPhone").value.trim(),
    sellerEmail: document.getElementById("newSellerEmail").value.trim(),
    firstContact: document.getElementById("newFirstContact").value,
    notes: document.getElementById("newNotes").value.trim()
  };

  var newDeal = dealsCreate(dealData);

  closeModal();
  renderSidebar();
  renderBoard();
  openDealDetail(newDeal.id);
}

/* ══════════════════════════════════════════════════════
   INITIALIZATION TRIGGER
══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("crmBoard")) {
    initCRM();
  }
});
