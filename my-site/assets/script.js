document.addEventListener('DOMContentLoaded',function(){
  var btn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      nav.classList.toggle('show');
    });
  }
var themeBtn = document.getElementById('theme-toggle');
var themeCheckbox = document.getElementById('theme-switch');
var root = document.documentElement;

if (themeBtn && themeCheckbox) {
  var THEME_KEY = 'site-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.remove('theme-dark');
      themeCheckbox.checked = true;
    } else {
      root.classList.add('theme-dark');
      themeCheckbox.checked = false;
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
  themeCheckbox.addEventListener('change', function () {
    const newTheme = themeCheckbox.checked ? 'light' : 'dark';
    applyTheme(newTheme);
    try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) {}
  });

  // ---- RESPOND TO SYSTEM THEME CHANGES ----
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const systemTheme = event.matches ? 'dark' : 'light';
    let saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      applyTheme(systemTheme);
    }
  });
}
});