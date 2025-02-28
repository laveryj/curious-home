document.addEventListener("DOMContentLoaded", function () {
  var sections = ["features", "footer", "contact", "pricing", "header", "hero", "about1", "about2", "about3", "about4", "about5", "screenshots", "testemonials", "callToAction", "blog", "clients", "faq", "howItWorks"];
  sections.forEach(function (section) {
    fetch("../partials/section-".concat(section, ".html")).then(function (response) {
      return response.text();
    }).then(function (html) {
      document.getElementById("import-partial-".concat(section)).innerHTML = html;
    })["catch"](function (error) {
      return console.error("Error loading ".concat(section, ":"), error);
    });
  });
});

// ==== pricing plan toggler
var togglePlan = document.querySelector("#togglePlan");
var toggle = document.getElementById("togglePlan");
document.querySelector(".monthly").addEventListener("click", function () {
  togglePlan.checked = true;
});
document.querySelector(".yearly").addEventListener("click", function () {
  togglePlan.checked = false;
});
toggle.addEventListener("change", function () {
  document.querySelectorAll(".price-monthly, .monthly-label").forEach(function (el) {
    return el.classList.toggle("hidden");
  });
  document.querySelectorAll(".price-annual, .annual-label").forEach(function (el) {
    return el.classList.toggle("hidden");
  });
});

// ==== for menu scroll
var pageLink = document.querySelectorAll(".menu-scroll");
pageLink.forEach(function (elem) {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(elem.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      offsetTop: 1 - 60
    });
  });
});

// section menu active
function onScroll(event) {
  var sections = document.querySelectorAll(".menu-scroll");
  var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  for (var i = 0; i < sections.length; i++) {
    var currLink = sections[i];
    var val = currLink.getAttribute("href");
    var refElement = document.querySelector(val);
    var scrollTopMinus = scrollPos + 73;
    if (refElement.offsetTop <= scrollTopMinus && refElement.offsetTop + refElement.offsetHeight > scrollTopMinus) {
      document.querySelector(".menu-scroll").classList.remove("active");
      currLink.classList.add("active");
    } else {
      currLink.classList.remove("active");
    }
  }
}
window.document.addEventListener("scroll", onScroll);
function initAcc(elem, option) {
  document.addEventListener("click", function (e) {
    if (!e.target.matches(elem + " .faq-btn")) return;else {
      if (!e.target.parentElement.classList.contains("active")) {
        if (option == true) {
          var elementList = document.querySelectorAll(elem + " .faq");
          Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove("active");
          });
        }
        e.target.parentElement.classList.add("active");
      } else {
        e.target.parentElement.classList.remove("active");
      }
    }
  });
}

//activate accordion function
initAcc(".faqs", true);
document.addEventListener("DOMContentLoaded", function () {
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    // Scroll event to show/hide button
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.remove("hidden");
      } else {
        backToTop.classList.add("hidden");
      }
    });

    // Click event to scroll to top smoothly
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});