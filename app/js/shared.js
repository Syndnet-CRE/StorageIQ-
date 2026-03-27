/**
 * Parcyl v2 Theme System & Shared Navigation
 * StorageIQ Beta
 */

var darkTheme = {
  bg: {
    primary:   "#1C1C1E",
    secondary: "#2C2C2E",
    tertiary:  "#3A3A3C",
    elevated:  "#48484A",
  },
  accent: {
    primary:       "#3EAA42",
    primaryHover:  "#359438",
    primaryMuted:  "rgba(62, 170, 66, 0.12)",
    primaryBorder: "rgba(62, 170, 66, 0.30)",
    green:         "#34C759",
    greenHover:    "#2DB84E",
    greenMuted:    "rgba(52, 199, 89, 0.12)",
  },
  text: {
    primary:    "rgba(255, 255, 255, 1.0)",
    secondary:  "rgba(255, 255, 255, 0.80)",
    tertiary:   "rgba(255, 255, 255, 0.55)",
    quaternary: "rgba(255, 255, 255, 0.35)",
  },
  border: {
    subtle:  "rgba(255, 255, 255, 0.08)",
    default: "rgba(255, 255, 255, 0.12)",
    strong:  "rgba(255, 255, 255, 0.20)",
  },
  semantic: {
    success: "#34C759",
    warning: "#FFD60A",
    error:   "#FF453A",
    info:    "#0A84FF",
  },
  font: {
    display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
};

var lightTheme = {
  bg: {
    primary:   "#FFFFFF",
    secondary: "#F2F2F7",
    tertiary:  "#E5E5EA",
    elevated:  "#D1D1D6",
  },
  accent: {
    primary:       "#2D8F32",
    primaryHover:  "#267D2B",
    primaryMuted:  "rgba(45, 143, 50, 0.08)",
    primaryBorder: "rgba(45, 143, 50, 0.20)",
    green:         "#28A745",
    greenHover:    "#218838",
    greenMuted:    "rgba(40, 167, 69, 0.08)",
  },
  text: {
    primary:    "rgba(0, 0, 0, 0.92)",
    secondary:  "rgba(0, 0, 0, 0.75)",
    tertiary:   "rgba(0, 0, 0, 0.55)",
    quaternary: "rgba(0, 0, 0, 0.35)",
  },
  border: {
    subtle:  "rgba(0, 0, 0, 0.06)",
    default: "rgba(0, 0, 0, 0.10)",
    strong:  "rgba(0, 0, 0, 0.18)",
  },
  semantic: {
    success: "#28A745",
    warning: "#F5A623",
    error:   "#DC3545",
    info:    "#007AFF",
  },
  font: {
    display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
};

var _currentMode = "dark";

function getTheme() {
  return _currentMode === "dark" ? darkTheme : lightTheme;
}

function applyTheme(t) {
  var root = document.documentElement.style;

  // Background tokens
  root.setProperty("--bg-primary", t.bg.primary);
  root.setProperty("--bg-secondary", t.bg.secondary);
  root.setProperty("--bg-tertiary", t.bg.tertiary);
  root.setProperty("--bg-elevated", t.bg.elevated);

  // Accent tokens
  root.setProperty("--accent-primary", t.accent.primary);
  root.setProperty("--accent-primary-hover", t.accent.primaryHover);
  root.setProperty("--accent-primary-muted", t.accent.primaryMuted);
  root.setProperty("--accent-primary-border", t.accent.primaryBorder);
  root.setProperty("--accent-green", t.accent.green);
  root.setProperty("--accent-green-hover", t.accent.greenHover);
  root.setProperty("--accent-green-muted", t.accent.greenMuted);

  // Text tokens
  root.setProperty("--text-primary", t.text.primary);
  root.setProperty("--text-secondary", t.text.secondary);
  root.setProperty("--text-tertiary", t.text.tertiary);
  root.setProperty("--text-quaternary", t.text.quaternary);

  // Border tokens
  root.setProperty("--border-subtle", t.border.subtle);
  root.setProperty("--border-default", t.border.default);
  root.setProperty("--border-strong", t.border.strong);

  // Semantic tokens
  root.setProperty("--semantic-success", t.semantic.success);
  root.setProperty("--semantic-warning", t.semantic.warning);
  root.setProperty("--semantic-error", t.semantic.error);
  root.setProperty("--semantic-info", t.semantic.info);

  // Font tokens
  root.setProperty("--font-display", t.font.display);
  root.setProperty("--font-mono", t.font.mono);

  // Update topnav background
  var topnav = document.querySelector(".topnav");
  if (topnav) {
    topnav.style.background = _currentMode === "dark"
      ? "rgba(28,28,30,0.92)"
      : "rgba(255,255,255,0.92)";
  }

  // Update body.light class
  if (_currentMode === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }

  // Set data-theme attribute on html
  document.documentElement.setAttribute("data-theme", _currentMode);
}

function toggleAppTheme() {
  _currentMode = _currentMode === "dark" ? "light" : "dark";
  applyTheme(getTheme());
  updateToggleBtn();
  localStorage.setItem("parcyl-theme", _currentMode);
}

function updateToggleBtn() {
  var themeIcon = document.getElementById("themeIcon");
  var themeLabel = document.getElementById("themeLabel");

  if (themeIcon) {
    // sun for dark mode (showing "Light" option), moon for light mode (showing "Dark" option)
    themeIcon.setAttribute("data-lucide", _currentMode === "dark" ? "sun" : "moon");
  }

  if (themeLabel) {
    themeLabel.textContent = _currentMode === "dark" ? "Light" : "Dark";
  }

  // Re-render Lucide icons
  initLucide();
}

function initLucide() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons({ icons: lucide.icons });
  }
}

function renderNav(activePage, ctaText, ctaOnClick) {
  var appNav = document.getElementById("appNav");
  if (!appNav) return;

  var pages = [
    { step: 1, label: "Dashboard", href: "dashboard.html", id: "dashboard" },
    { step: 2, label: "Underwrite", href: "index.html", id: "underwrite" },
    { step: 3, label: "Deal Room", href: "crm.html", id: "crm" },
    { step: 4, label: "Market Map", href: "market.html", id: "market" },
    { step: 5, label: "AI Agents", href: "agents.html", id: "agents" }
  ];

  // Build nav steps HTML
  var stepsHtml = "";
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    var isActive = page.id === activePage;

    if (isActive) {
      stepsHtml += '<div class="nav-step active">' +
        '<div class="nav-step-num">' + page.step + '</div>' +
        '<span>' + page.label + '</span>' +
      '</div>';
    } else {
      stepsHtml += '<a href="' + page.href + '" class="nav-step">' +
        '<div class="nav-step-num">' + page.step + '</div>' +
        '<span>' + page.label + '</span>' +
      '</a>';
    }

    // Add separator between steps (not after last)
    if (i < pages.length - 1) {
      stepsHtml += '<div class="nav-step-sep"></div>';
    }
  }

  // Build CTA button HTML if provided
  var ctaHtml = "";
  if (ctaText) {
    ctaHtml = '<button class="btn-primary" onclick="' + (ctaOnClick || "") + '">' + ctaText + '</button>';
  }

  // Build complete nav HTML
  var navHtml = '<nav class="topnav">' +
    '<div class="nav-brand">' +
      '<div class="nav-icon">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2">' +
          '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>' +
          '<polyline points="9 22 9 12 15 12 15 22"/>' +
        '</svg>' +
      '</div>' +
      '<span class="nav-wordmark">StorageIQ<sup>beta</sup></span>' +
    '</div>' +
    '<div class="nav-steps">' + stepsHtml + '</div>' +
    '<div style="display:flex;align-items:center;gap:0.75rem;">' +
      '<button class="theme-toggle" onclick="toggleAppTheme()">' +
        '<i id="themeIcon" data-lucide="' + (_currentMode === "dark" ? "sun" : "moon") + '"></i>' +
        '<span id="themeLabel">' + (_currentMode === "dark" ? "Light" : "Dark") + '</span>' +
      '</button>' +
      ctaHtml +
    '</div>' +
  '</nav>';

  appNav.innerHTML = navHtml;

  // Apply current theme to topnav
  var topnav = document.querySelector(".topnav");
  if (topnav) {
    topnav.style.background = _currentMode === "dark"
      ? "rgba(28,28,30,0.92)"
      : "rgba(255,255,255,0.92)";
  }
}

// Theme initialization on load
(function initTheme() {
  var savedTheme = localStorage.getItem("parcyl-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    _currentMode = savedTheme;
  }

  // Apply theme when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      applyTheme(getTheme());
      updateToggleBtn();
    });
  } else {
    applyTheme(getTheme());
    updateToggleBtn();
  }
})();
