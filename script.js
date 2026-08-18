document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  // 2. Year tracker
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Certificates Carousel
  const certTrack = document.querySelector(".cert-carousel-track");
  const certSlides = document.querySelectorAll(".cert-slide");
  const certDots = document.querySelectorAll(".cert-dot");
  const certPrev = document.getElementById("certPrevBtn");
  const certNext = document.getElementById("certNextBtn");
  const certContainer = document.querySelector(".cert-mini-carousel");

  if (certTrack && certSlides.length > 0) {
    let currentCert = 0;
    let certTimer = null;
    const CERT_INTERVAL = 4500;

    const updateCert = (index) => {
      currentCert = (index + certSlides.length) % certSlides.length;
      certTrack.style.transform = `translateX(-${currentCert * 100}%)`;
      certDots.forEach((dot, j) => {
        dot.classList.toggle("active", j === currentCert);
      });
    };

    const startCertAuto = () => {
      stopCertAuto();
      certTimer = setInterval(() => updateCert(currentCert + 1), CERT_INTERVAL);
    };

    const stopCertAuto = () => {
      if (certTimer) {
        clearInterval(certTimer);
        certTimer = null;
      }
    };

    certDots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        updateCert(idx);
        startCertAuto();
      });
    });

    if (certPrev) {
      certPrev.addEventListener("click", () => {
        updateCert(currentCert - 1);
        startCertAuto();
      });
    }
    if (certNext) {
      certNext.addEventListener("click", () => {
        updateCert(currentCert + 1);
        startCertAuto();
      });
    }

    if (certContainer) {
      certContainer.addEventListener("mouseenter", stopCertAuto);
      certContainer.addEventListener("mouseleave", startCertAuto);
    }

    let startX = 0;
    certTrack.addEventListener("touchstart", (e) => {
      stopCertAuto();
      startX = e.touches[0].clientX;
    }, { passive: true });

    certTrack.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) updateCert(currentCert + 1);
        else updateCert(currentCert - 1);
      }
      startCertAuto();
    });

    startCertAuto();
  }

  // 4. Certificate Lightbox Zoom Modal
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const closeBtn = document.getElementById("certModalClose");

  if (modal && modalImg && closeBtn) {
    document.querySelectorAll(".cert-preview-img").forEach((img) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        modalImg.src = img.src;
        modalImg.alt = img.alt || "Certificate View";
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // 5. Projects Data Configuration
  const projectsData = [
    {
      number: "01 / PREDICTION",
      title: "SkyPredict AI",
      desc: "An end-to-end data science application combining passenger satisfaction multi-class classification alongside price optimization analytics.",
      metrics: [{ lbl: "Accuracy", val: "96.8%" }, { lbl: "Records", val: "130K+" }],
      approach: "Exploratory analysis, feature correlation checks, processing outliers.",
      result: "Deployed production model via standalone interface scaling predictions efficiently.",
      stack: "Python · Pandas · Scikit-learn · MLflow · Streamlit",
      link: "https://github.com/Ankitatan/Flights",
      img: "assets/skypredict-dashboard.png",
      alt: "SkyPredict AI metric dashboard preview"
    },
    {
      number: "02 / FORECASTING",
      title: "Rossmann Sales Forecasting",
      desc: "A localized retail execution environment engineered to generate daily upcoming customer demand schedules using enterprise promotional tracks.",
      metrics: [{ lbl: "Algorithm", val: "XGBoost" }, { lbl: "Scope", val: "Multi-Store" }],
      approach: "Time-series engineering, extraction of seasonal trend markers, feature tuning.",
      result: "Engineered actionable forecasts allowing operations managers to control inventory margins.",
      stack: "Python · Pandas · Scikit-learn · XGBoost · Streamlit",
      link: "https://github.com/Ankitatan/SalesForecasting",
      img: "assets/rossmann-dashboard-preview.png",
      alt: "Rossmann sales forecasting application chart"
    },
    {
      number: "03 / BUSINESS INTELLIGENCE",
      title: "Global Vaccination Analysis",
      desc: "A massive multi-source operational metrics aggregator checking pipeline implementation velocity thresholds across several international boundaries.",
      metrics: [{ lbl: "Storage", val: "MySQL" }, { lbl: "Engine", val: "Power BI" }],
      approach: "Relational database schema modeling, staging cross-joins, writing window analytics.",
      result: "Delivered unified clean canvas visualizations mapping complex KPIs clearly to stakeholders.",
      stack: "SQL · Python · Pandas · MySQL · Power BI",
      link: "https://github.com/Ankitatan/VaccinationProject",
      img: "assets/vaccination-dashboard.png",
      alt: "Power BI operational visualization view"
    },
    {
      number: "04 / FINANCIAL ANALYTICS",
      title: "Personal Expenses Analytics",
      desc: "A standalone financial database processing script tracking structural micro-transaction velocity across historical cost domains.",
      metrics: [{ lbl: "Database", val: "SQLite" }, { lbl: "UI Layer", val: "Streamlit" }],
      approach: "Normalization of raw logs, relational ledger configurations, categorizations mapping.",
      result: "Automated recurring balance sheets, reducing weekly classification effort down significantly.",
      stack: "Python · Pandas · SQL · SQLite · Streamlit",
      link: "https://github.com/Ankitatan/Personal_Expenses",
      img: "assets/personal-expenses-dashboard.png",
      alt: "Personal finance ledger dashboard stream interface"
    },
    {
      number: "05 / BEHAVIORAL ANALYTICS",
      title: "Device Screening User Behavior",
      desc: "An optimization analytical project sorting screen-time interactions using classification and user pattern segmentation clusters.",
      metrics: [{ lbl: "Clustering", val: "K-Means" }, { lbl: "Targeting", val: "Multi-Class" }],
      approach: "Exploratory evaluation mapping device triggers, optimization passes, silhouette validation.",
      result: "Identified definitive cohorts matching device usage intensity benchmarks predictably.",
      stack: "Python · Pandas · Scikit-learn · K-Means · Streamlit",
      link: "https://github.com/Ankitatan/PhoneAnalysisUsingML",
      img: "assets/phone-usage-eda.png",
      alt: "Mobile device segmentation analysis plots"
    },
    {
      number: "06 / NLP INSIGHT GENERATOR",
      title: "E-Commerce Reviews Sentiment",
      desc: "An automated processing pipeline converting unstructured text feedback logs into categorical performance values.",
      metrics: [{ lbl: "Text Vector", val: "TF-IDF" }, { lbl: "Core NLP", val: "Scikit-learn" }],
      approach: "Text preprocessing parsing raw reviews strings, word scoring, classification training.",
      result: "Extracted high-frequency feature pain points from reviews accurately, driving product updates.",
      stack: "Python · NLP · TF-IDF · Scikit-learn · LSTM",
      link: "https://github.com/Ankitatan/Capstone2-AmzonReviewsOnSentiments",
      img: "assets/sentiment-analysis.png",
      alt: "E-commerce customer sentiment matrix breakdown"
    }
  ];

  // 6. Dynamic Project Carousel Controller
  const projectContainer = document.getElementById("dynamic-project-container");
  const projectDotsContainer = document.getElementById("projectDots");
  const projectPrev = document.getElementById("projectPrevBtn");
  const projectNext = document.getElementById("projectNextBtn");
  const projectSection = document.querySelector(".project-carousel");

  if (projectContainer) {
    let currentIdx = 0;
    let projectTimer = null;
    const PROJECT_INTERVAL = 5500;

    const renderSlide = (idx) => {
      currentIdx = (idx + projectsData.length) % projectsData.length;
      const proj = projectsData[currentIdx];

      const metricsHTML = proj.metrics.map((m) => `
        <div class="metric-box">
          <label>${m.lbl}</label>
          <value>${m.val}</value>
        </div>
      `).join("");

      projectContainer.innerHTML = `
        <div class="project-copy">
          <span class="project-number">${proj.number}</span>
          <h3>${proj.title}</h3>
          <p>${proj.desc}</p>
          
          <div class="metrics-row">${metricsHTML}</div>
          
          <div class="project-details-grid">
            <div class="details-col">
              <h4>Approach</h4>
              <p>${proj.approach}</p>
            </div>
            <div class="details-col">
              <h4>Business Outcome</h4>
              <p>${proj.result}</p>
            </div>
          </div>
          
          <div class="slide-stack"><strong>Tools:</strong> ${proj.stack}</div>
          <a class="project-link" href="${proj.link}" target="_blank" rel="noopener">View project on GitHub ↗</a>
        </div>
        <div class="project-shot">
          <img src="${proj.img}" alt="${proj.alt}" loading="lazy" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
          <div class="fallback-screenshot-box" style="display:none;">
            <b>${proj.title} Preview</b>
            <span>Real dashboard visualization asset pending launch</span>
          </div>
          <span>Interactive Build Profile</span>
        </div>
      `;

      if (projectDotsContainer) {
        [...projectDotsContainer.children].forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIdx);
        });
      }
    };

    const startProjectAuto = () => {
      stopProjectAuto();
      projectTimer = setInterval(() => renderSlide(currentIdx + 1), PROJECT_INTERVAL);
    };

    const stopProjectAuto = () => {
      if (projectTimer) {
        clearInterval(projectTimer);
        projectTimer = null;
      }
    };

    if (projectDotsContainer) {
      projectDotsContainer.innerHTML = "";
      projectsData.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (i === 0 ? " active" : "");
        dot.type = "button";
        dot.setAttribute("aria-label", `Go to project ${i + 1}`);
        dot.addEventListener("click", () => {
          renderSlide(i);
          startProjectAuto();
        });
        projectDotsContainer.appendChild(dot);
      });
    }

    if (projectPrev) {
      projectPrev.addEventListener("click", () => {
        renderSlide(currentIdx - 1);
        startProjectAuto();
      });
    }

    if (projectNext) {
      projectNext.addEventListener("click", () => {
        renderSlide(currentIdx + 1);
        startProjectAuto();
      });
    }

    if (projectSection) {
      projectSection.addEventListener("mouseenter", stopProjectAuto);
      projectSection.addEventListener("mouseleave", startProjectAuto);
    }

    let startProjX = 0;
    projectContainer.addEventListener("touchstart", (e) => {
      stopProjectAuto();
      startProjX = e.touches[0].clientX;
    }, { passive: true });

    projectContainer.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startProjX - endX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) renderSlide(currentIdx + 1);
        else renderSlide(currentIdx - 1);
      }
      startProjectAuto();
    });

    renderSlide(0);
    startProjectAuto();
  }
});