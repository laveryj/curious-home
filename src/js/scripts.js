document.addEventListener("DOMContentLoaded", function () {
  const sections = [
    "features",
    "footer",
    "contact",
    "pricing",
    "header",
    "hero",
    "about1",
    "about2",
    "about3",
    "about4",
    "about5",
    "screenshots",
    "testemonials",
    "callToAction",
    "blog",
    "clients",
    "faq",
    "howItWorks",
    "views",
  ];

  sections.forEach((section) => {
    fetch(`../partials/section-${section}.html`)
      .then(response => response.text())
      .then(html => {
        document.getElementById(`import-partial-${section}`).innerHTML = html;
      })
      .catch(error => console.error(`Error loading ${section}:`, error));
  });
});

// ==== pricing plan toggler
let togglePlan = document.querySelector("#togglePlan");
const toggle = document.getElementById("togglePlan");

      document.querySelector(".monthly").addEventListener("click", () => {
        togglePlan.checked = true;
      });
      
      document.querySelector(".yearly").addEventListener("click", () => {
        togglePlan.checked = false;
      });

      toggle.addEventListener("change", function () {
        document.querySelectorAll(".price-monthly, .monthly-label").forEach(el => el.classList.toggle("hidden"));
        document.querySelectorAll(".price-annual, .annual-label").forEach(el => el.classList.toggle("hidden"));
      });

      // ==== for menu scroll
      const pageLink = document.querySelectorAll(".menu-scroll");

      pageLink.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(elem.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            offsetTop: 1 - 60,
          });
        });
      });

      // section menu active
      function onScroll(event) {
        const sections = document.querySelectorAll(".menu-scroll");
        const scrollPos =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;

        for (let i = 0; i < sections.length; i++) {
          const currLink = sections[i];
          const val = currLink.getAttribute("href");
          const refElement = document.querySelector(val);
          const scrollTopMinus = scrollPos + 73;
          if (
            refElement.offsetTop <= scrollTopMinus &&
            refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
          ) {
            document.querySelector(".menu-scroll").classList.remove("active");
            currLink.classList.add("active");
          } else {
            currLink.classList.remove("active");
          }
        }
      }

      window.document.addEventListener("scroll", onScroll);

      document.addEventListener("DOMContentLoaded", function () {
        const faqButtons = document.querySelectorAll(".faq-btn");
      
        faqButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".faq-icon");
      
            // Toggle the FAQ content
            content.classList.toggle("hidden");
      
            // Toggle icon between + and -
            icon.textContent = content.classList.contains("hidden") ? "+" : "−";
      
            // Set aria-expanded for accessibility
            const isExpanded = content.classList.contains("hidden") ? "false" : "true";
            this.setAttribute("aria-expanded", isExpanded);
          });
        });
      });