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

      function initAcc(elem, option) {
        document.addEventListener("click", function (e) {
          if (!e.target.matches(elem + " .faq-btn")) return;
          else {
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

      document.addEventListener("DOMContentLoaded", function () {
        const faqs = document.querySelectorAll(".faq-btn");
    
        faqs.forEach((btn) => {
            btn.addEventListener("click", function () {
                // Find the corresponding content div
                const content = this.nextElementSibling;
    
                // Toggle active class
                this.classList.toggle("active");
    
                // Expand or collapse the content
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.style.paddingTop = "0"; // Optional: Adjust spacing
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.paddingTop = "10px"; // Optional: Adjust spacing
                }
    
                // Close other open FAQs (optional)
                faqs.forEach((otherBtn) => {
                    if (otherBtn !== btn) {
                        const otherContent = otherBtn.nextElementSibling;
                        otherBtn.classList.remove("active");
                        otherContent.style.maxHeight = null;
                        otherContent.style.paddingTop = "0";
                    }
                });
            });
        });
    });