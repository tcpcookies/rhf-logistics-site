/* RHF Logistics — main.js */
"use strict";

// TODO: replace with the client's real WhatsApp number (country code + number, digits only)
const WHATSAPP_NUMBER = "8613800000000";

/* Mobile nav toggle */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  /* Scroll reveal */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });

  /* Footer year */
  var year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* Quote form -> WhatsApp deep link */
  var form = document.querySelector("#quote-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var v = function (id) {
        var el = form.querySelector("#" + id);
        return el ? el.value.trim() : "";
      };
      var lines = [
        "Hello RHF Logistics, I would like to request a shipping quote.",
        "",
        "Name: " + v("q-name"),
        "Email: " + v("q-email"),
        "Company: " + v("q-company"),
        "Service: " + v("q-service"),
        "Destination: " + v("q-destination"),
        "Details: " + v("q-message")
      ];
      var url =
        "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }
});
