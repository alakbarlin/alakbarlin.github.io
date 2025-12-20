document.addEventListener('DOMContentLoaded',function(){
  var btn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      nav.classList.toggle('show');
    });
  }
var themeCheckbox = document.getElementById('theme-switch');
var mobileThemeCheckbox = document.getElementById('mobile-theme-switch');
var root = document.documentElement;

if (themeCheckbox || mobileThemeCheckbox) {
  var THEME_KEY = 'site-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.remove('theme-dark');
      if (themeCheckbox) themeCheckbox.checked = true;
      if (mobileThemeCheckbox) mobileThemeCheckbox.checked = true;
    } else {
      root.classList.add('theme-dark');
      if (themeCheckbox) themeCheckbox.checked = false;
      if (mobileThemeCheckbox) mobileThemeCheckbox.checked = false;
    }
  }

  // ---- INITIALIZATION ----
  let savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}

  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemDark ? 'dark' : 'light');
  }

  // ---- TOGGLE CHECKBOX ----
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', function () {
      const newTheme = themeCheckbox.checked ? 'light' : 'dark';
      applyTheme(newTheme);
      try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) {}
    });
  }

  if (mobileThemeCheckbox) {
    mobileThemeCheckbox.addEventListener('change', function () {
      const newTheme = mobileThemeCheckbox.checked ? 'light' : 'dark';
      applyTheme(newTheme);
      try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) {}
    });
  }

  // ---- RESPOND TO SYSTEM THEME CHANGES ----
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const systemTheme = event.matches ? 'dark' : 'light';
    let saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      applyTheme(systemTheme);
    }
  });
}

// About page dropdown sections
var dropdownBtns = document.querySelectorAll('.dropdown-btn');
dropdownBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var section = this.parentElement;
    section.classList.toggle('active');
  });
});

// Project details dropdown with accessibility support
var projectToggleBtns = document.querySelectorAll('.project-toggle');
projectToggleBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    toggleProjectDetails(this);
  });

  // Keyboard support (Enter/Space)
  btn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleProjectDetails(this);
    }
  });
});

function toggleProjectDetails(btn) {
  var projectId = btn.getAttribute('data-project');
  var projectDetails = document.getElementById(projectId);
  var isExpanded = btn.getAttribute('aria-expanded') === 'true';
  
  if (projectDetails) {
    if (isExpanded) {
      // Close
      projectDetails.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      // Open
      projectDetails.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
    }
  }
}
});