/* Proteinfrukost.se – receptinteraktion
   1) Portionsväljare (+/−) som räknar om ingrediensmängderna.
   2) Kryssrutor på ingredienserna (bocka av i köket, sparas per recept). */
(function () {
  "use strict";

  /* ---------- Svenska pluralformer (plural, singular) ----------
     Matchas längst-först så att "mogen banan" går före "banan". */
  var PAIRS = [
    ["frusna bananer (skivade)", "frusen banan (skivad)"],
    ["frusna bananer", "frusen banan"],
    ["frysta bananer", "fryst banan"],
    ["mogna bananer", "mogen banan"],
    ["kokta ägg", "kokt ägg"],
    ["gula lökar", "gul lök"],
    ["röda paprikor", "röd paprika"],
    ["urkärnade dadlar", "urkärnad dadel"],
    ["färska dadlar", "färsk dadel"],
    ["dadlar utan kärna", "dadel utan kärna"],
    ["laxfiléer", "laxfilé"],
    ["äggvitor", "äggvita"],
    ["äggulor", "äggula"],
    ["oreo-kakor", "oreo-kaka"],
    ["broccolibuketter", "broccolibukett"],
    ["fiskbuljongtärningar", "fiskbuljongtärning"],
    ["vitlöksklyftor", "vitlöksklyfta"],
    ["tonfiskburkar", "tonfiskburk"],
    ["bananer", "banan"],
    ["äpplen", "äpple"],
    ["päron", "päron"],
    ["morötter", "morot"],
    ["rödlökar", "rödlök"],
    ["citroner", "citron"],
    ["tomater", "tomat"],
    ["påsar", "påse"],
    ["nypor", "nypa"],
    ["nävar", "näve"],
    ["burkar", "burk"],
    ["skopor", "skopa"],
    ["skivor", "skiva"],
    ["rutor", "ruta"],
    ["klyftor", "klyfta"],
    ["dadlar", "dadel"],
    ["blad", "blad"],
    ["gelatinblad", "gelatinblad"],
    ["ägg", "ägg"]
  ];
  PAIRS.sort(function (a, b) {
    return Math.max(b[0].length, b[1].length) - Math.max(a[0].length, a[1].length);
  });

  var FRAC = { "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3,
               "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875 };

  function fmtNum(v) {
    if (Math.abs(v - Math.round(v)) < 0.001) return String(Math.round(v));
    var r = Math.round(v * 100) / 100;
    return String(r).replace(".", ",");
  }

  /* Alla tal i en sträng, med parentesdjup. Tal inuti parenteser (per styck,
     t.ex. "(400 g)") skalas aldrig. */
  function allNumbers(s) {
    var res = [], depth = 0, i = 0, m;
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === "(") { depth++; i++; continue; }
      if (c === ")") { depth = Math.max(0, depth - 1); i++; continue; }
      var rest = s.slice(i);
      if ((m = rest.match(/^(\d+)\s*([½¼¾⅓⅔⅛⅜⅝⅞])/))) {
        res.push({ i: i, len: m[0].length, val: parseInt(m[1], 10) + FRAC[m[2]], depth: depth });
      } else if ((m = rest.match(/^([½¼¾⅓⅔⅛⅜⅝⅞])/))) {
        res.push({ i: i, len: 1, val: FRAC[m[1]], depth: depth });
      } else if ((m = rest.match(/^(\d+)\s*\/\s*(\d+)/))) {
        res.push({ i: i, len: m[0].length, val: parseInt(m[1], 10) / parseInt(m[2], 10), depth: depth });
      } else if ((m = rest.match(/^(\d+[.,]\d+)/))) {
        res.push({ i: i, len: m[0].length, val: parseFloat(m[1].replace(",", ".")), depth: depth });
      } else if ((m = rest.match(/^(\d+)/))) {
        res.push({ i: i, len: m[0].length, val: parseInt(m[1], 10), depth: depth });
      } else if ((m = rest.match(/^(en|ett)(?=\s)/)) && (i === 0 || /\s/.test(s.charAt(i - 1)))) {
        res.push({ i: i, len: m[0].length, val: 1, depth: depth });
      } else { i++; continue; }
      i += res[res.length - 1].len;
    }
    return res;
  }

  /* Skala varje tal på djup 0 i en sträng. */
  function scaleDepth0(s, ratio) {
    var toks = allNumbers(s), out = "", last = 0, k;
    for (k = 0; k < toks.length; k++) {
      var t = toks[k];
      if (t.depth !== 0) continue;
      out += s.slice(last, t.i) + fmtNum(t.val * ratio);
      last = t.i + t.len;
    }
    return out + s.slice(last);
  }

  /* Böj "tail" (texten efter talet) rätt efter det nya talet. Tal > 1 ger
     plural, allt annat (även 0,5) singular. */
  function inflect(tail, val) {
    var plural = val > 1;
    for (var i = 0; i < PAIRS.length; i++) {
      var pl = PAIRS[i][0], sg = PAIRS[i][1];
      if (plural) {
        if (tail === sg || tail.indexOf(sg + " ") === 0) return pl + tail.slice(sg.length);
      } else if (tail === pl || tail.indexOf(pl + " ") === 0) {
        return sg + tail.slice(pl.length);
      }
    }
    return tail;
  }

  /* Skala om en hel ingrediensrad med faktorn ratio. */
  function scaleText(orig, ratio) {
    var toks = allNumbers(orig);
    if (!toks.length) return orig;
    var first = toks[0];
    var pre = orig.slice(0, first.i);
    var after = orig.slice(first.i + first.len);
    /* Talet sitter inte fritt (t.ex. "10 %") – skala bara talen på djup 0. */
    if (after.charAt(0) !== " ") return scaleDepth0(orig, ratio);

    var tail = after.slice(1);
    var newVal = first.val * ratio;
    var numStr = fmtNum(newVal);
    var rm = tail.match(/^[–-]\s*(\d+(?:[.,]\d+)?)\s*/);
    if (rm) {
      numStr += "–" + fmtNum(parseFloat(rm[1].replace(",", ".")) * ratio);
      tail = tail.slice(rm[0].length);
    }
    tail = inflect(tail, newVal);
    tail = scaleDepth0(tail, ratio);          /* fler tal i raden, t.ex. "+ 3 msk vatten" */
    var out = pre + numStr + " " + tail;
    /* "1 skopa (30 g) proteinpulver" – skala även grammen inom parentesen */
    out = out.replace(/(skop\w*\s*\()(\d+(?:[.,]\d+)?)(\s*g\))/, function (m0, a, b, c) {
      return a + fmtNum(parseFloat(b.replace(",", ".")) * ratio) + c;
    });
    return out;
  }

  function initServings() {
    var servEl = document.querySelector("[data-serv]");
    var list = document.querySelector(".ing-list");
    if (!servEl || !list) return;
    var base = parseInt(list.getAttribute("data-serv-base"), 10) || 1;
    var current = base;
    var items = [].slice.call(list.querySelectorAll(".ing-txt"));
    items.forEach(function (el) { el.setAttribute("data-orig", el.textContent.trim()); });

    function render() {
      servEl.textContent = current;
      var ratio = current / base;
      items.forEach(function (el) {
        var orig = el.getAttribute("data-orig");
        el.textContent = (Math.abs(ratio - 1) < 1e-9) ? orig : scaleText(orig, ratio);
      });
      [].slice.call(document.querySelectorAll(".serv-btn")).forEach(function (b) {
        b.disabled = (parseInt(b.getAttribute("data-d"), 10) < 0 && current <= 1);
      });
    }
    [].slice.call(document.querySelectorAll(".serv-btn")).forEach(function (b) {
      b.addEventListener("click", function () {
        var next = current + parseInt(b.getAttribute("data-d"), 10);
        if (next < 1 || next > 99) return;
        current = next;
        render();
      });
    });
    render();
  }

  function initCheckboxes(slug) {
    var boxes = [].slice.call(document.querySelectorAll(".ing-list input[type=checkbox]"));
    if (!boxes.length) return;
    var key = "pf-ing-" + (slug || location.pathname);
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { saved = {}; }
    boxes.forEach(function (cb, i) {
      var lab = cb.closest("label");
      if (saved[i]) { cb.checked = true; if (lab) lab.classList.add("done"); }
      cb.addEventListener("change", function () {
        if (lab) lab.classList.toggle("done", cb.checked);
        var state = {};
        boxes.forEach(function (c, j) { if (c.checked) state[j] = 1; });
        try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
      });
    });
  }

  function init() {
    var slug = (location.pathname.match(/\/recept\/([^\/]+)/) || [])[1] || "";
    initServings();
    initCheckboxes(slug);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
