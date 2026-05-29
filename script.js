/**
 * Malta Properties - Dynamic Property Advisory Engine
 * Pure vanilla ESNext JavaScript with no external dependencies other than Chart.js and Bootstrap.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR SCROLL ADJUSTMENTS
     ========================================== */
  const navbar = document.querySelector('.custom-navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();


  /* ==========================================
     2. REVEAL ELEMENTS ON SCROLL
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================
     3. STICKY BOTTOM BAR TRIGGER
     ========================================== */
  const stickyBar = document.getElementById('stickyBar');
  const handleStickyBarScroll = () => {
    if (window.scrollY > 450) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleStickyBarScroll);


  /* ==========================================
     4. CHART.JS - LIGHTWEIGHT MEDITERRANEAN STYLE
     ========================================== */
  const ctx = document.getElementById('priceChart');
  if (ctx) {
    const canvasContext = ctx.getContext('2d');
    const gradient = canvasContext.createLinearGradient(0, 0, 0, 320);
    // Use deep sea blue with elegant light opacity transitions
    gradient.addColorStop(0, 'rgba(47, 111, 126, 0.16)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2026 (Est.)'],
        datasets: [{
          label: 'Prezzo Medio Residenziale Malta (€/mq)',
          data: [2900, 3100, 3550, 4100, 4450, 4850],
          borderColor: '#2F6F7E',
          borderWidth: 2.5,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2F6F7E',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#C6A15B',
          pointHoverBorderColor: '#ffffff',
          tension: 0.35,
          fill: true,
          backgroundColor: gradient
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1C1F24',
            titleColor: '#C6A15B',
            bodyColor: '#ffffff',
            borderColor: 'rgba(198, 161, 91, 0.2)',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Prezzo: €${context.parsed.y.toLocaleString('it-IT')}/mq`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(198, 161, 91, 0.08)',
              drawTicks: false
            },
            ticks: {
              color: '#68707C',
              font: {
                family: 'Inter',
                size: 11
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(198, 161, 91, 0.08)'
            },
            ticks: {
              color: '#68707C',
              font: {
                family: 'Inter',
                size: 11
              },
              callback: function(value) {
                return '€' + value.toLocaleString('it-IT');
              }
            }
          }
        }
      }
    });
  }


  /* ==========================================
     5. PREMIUM VALUATION ADVISOR (8-STEP LOGIC)
     ========================================== */
  const quizState = {
    step: 1,
    totalSteps: 8,
    answers: {},
    mq: 120
  };

  const startQuizBtn = document.getElementById('startQuizBtn');
  const quizEntryScreen = document.getElementById('quizEntryScreen');
  const quizActiveSteps = document.getElementById('quizActiveSteps');
  const quizFormContainer = document.getElementById('quizFormContainer');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizStepLabel = document.getElementById('quizStepLabel');
  const rangeM2 = document.getElementById('rangeM2');
  const m2Display = document.getElementById('m2Display');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizLoadingScreen = document.getElementById('quizLoadingScreen');
  const quizResultsArea = document.getElementById('quizResultsArea');

  // Start the Quiz Advisor
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      quizEntryScreen.classList.add('d-none');
      quizActiveSteps.classList.remove('d-none');
      updateProgress();
    });
  }

  // Handle progress updates
  const updateProgress = () => {
    if (quizProgressBar && quizStepLabel) {
      const percentage = (quizState.step / quizState.totalSteps) * 100;
      quizProgressBar.style.width = `${percentage}%`;
      quizStepLabel.textContent = `Passo ${quizState.step} di ${quizState.totalSteps}`;
    }
  };

  // Render proper step
  const showStep = (num) => {
    document.querySelectorAll('.quiz-step').forEach(stepDiv => {
      stepDiv.classList.remove('active');
    });

    const activeStepDiv = document.querySelector(`.quiz-step[data-step="${num}"]`);
    if (activeStepDiv) {
      activeStepDiv.classList.add('active');
    }
    updateProgress();
  };

  const handleNextStep = () => {
    if (quizState.step < quizState.totalSteps) {
      quizState.step++;
      showStep(quizState.step);
    } else {
      showLoadingAndResults();
    }
  };

  // Bind click handlers to standard buttons step lists (excluding Step 4 slider)
  document.querySelectorAll('.quiz-step:not([data-step="4"]) .quiz-opt').forEach(button => {
    button.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const stepDiv = btn.closest('.quiz-step');
      const stepNum = parseInt(stepDiv.getAttribute('data-step'));
      const scoreWeight = parseInt(btn.getAttribute('data-score') || '0');
      const textVal = btn.textContent.trim();

      // Style active choice
      stepDiv.querySelectorAll('.quiz-opt').forEach(opt => opt.classList.remove('selected'));
      btn.classList.add('selected');

      // Record answer
      quizState.answers[stepNum] = {
        text: textVal,
        score: scoreWeight
      };

      // Slight natural latency for premium reaction feel
      setTimeout(() => {
        handleNextStep();
      }, 350);
    });
  });

  // Slider event listener
  if (rangeM2 && m2Display) {
    rangeM2.addEventListener('input', (e) => {
      m2Display.textContent = e.target.value;
      quizState.mq = parseInt(e.target.value);
    });
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      const sizeValue = quizState.mq;
      let calculatedScore = 8;
      if (sizeValue < 60) calculatedScore = 5;
      else if (sizeValue >= 60 && sizeValue <= 150) calculatedScore = 8;
      else if (sizeValue > 150 && sizeValue <= 250) calculatedScore = 10;
      else calculatedScore = 12;

      quizState.answers[4] = {
        text: `${sizeValue} mq`,
        score: calculatedScore
      };

      handleNextStep();
    });
  }

  // Slowly paced loading moment for deep analytical perception
  const showLoadingAndResults = () => {
    quizActiveSteps.classList.add('d-none');
    quizLoadingScreen.classList.remove('d-none');

    // Simulate extensive analysis comparing data records
    setTimeout(() => {
      quizLoadingScreen.classList.add('d-none');
      quizResultsArea.classList.remove('d-none');
      quizResultsArea.classList.add('active');
      calculateAndRenderResults();
    }, 2200);
  };

  // Perform professional calculations based on responses
  const calculateAndRenderResults = () => {
    let totalScore = 0;
    Object.keys(quizState.answers).forEach(key => {
      totalScore += quizState.answers[key].score;
    });

    // Max theoretical score: 82. Min possible: 42
    // Percentage relative range
    const maxScore = 82;
    const minScore = 42;
    const normalizedScore = totalScore;
    const percent = Math.round(((normalizedScore - minScore) / (maxScore - minScore)) * 100);

    let tierLabel = "";
    let tierBadgeClass = "";
    let tierDescription = "";

    // Base square meter cost based on location (Step 2 selection)
    const locAnswer = quizState.answers[2] ? quizState.answers[2].text : "";
    let baseM2Price = 2500;
    let locationName = "Malta";

    if (locAnswer.includes("Sliema")) {
      baseM2Price = 5200;
      locationName = "Sliema / St. Julian's";
    } else if (locAnswer.includes("Valletta")) {
      baseM2Price = 4800;
      locationName = "Valletta / Three Cities";
    } else if (locAnswer.includes("Mellieha")) {
      baseM2Price = 3900;
      locationName = "Mellieha / North Coast";
    } else if (locAnswer.includes("Gozo")) {
      baseM2Price = 2800;
      locationName = "Gozo";
    } else {
      baseM2Price = 2500;
      locationName = "Altra zona";
    }

    // Adjust by vista factor (Step 3 selection)
    const vistaAnswer = quizState.answers[3] ? quizState.answers[3].text : "";
    let vistaFactor = 1.0;
    let vistaText = "influenza standard";

    if (vistaAnswer.includes("diretta")) {
      vistaFactor = 1.25;
      vistaText = "+25% premio vista diretta";
    } else if (vistaAnswer.includes("parziale")) {
      vistaFactor = 1.15;
      vistaText = "+15% premio vista parziale";
    } else if (vistaAnswer.includes("aperta")) {
      vistaFactor = 1.05;
      vistaText = "+5% per visuale libera";
    } else if (vistaAnswer.includes("interna")) {
      vistaFactor = 0.90;
      vistaText = "-10% per saggio d'interno limitato";
    }

    // Adjust by maintenance status (Step 5 selection)
    const statusAnswer = quizState.answers[5] ? quizState.answers[5].text : "";
    let statusFactor = 1.0;
    if (statusAnswer.includes("Ristrutturato")) {
      statusFactor = 1.12;
    } else if (statusAnswer.includes("parzialmente")) {
      statusFactor = 0.85;
    } else if (statusAnswer.includes("completamente")) {
      statusFactor = 0.70;
    }

    // Calculate final metrics
    const finalM2Price = Math.round(baseM2Price * vistaFactor * statusFactor);
    const calculatedTotal = finalM2Price * quizState.mq;

    // Multi-faceted result segments
    if (percent >= 70) {
      tierLabel = "Prime Market Asset";
      tierBadgeClass = "badge-prime";
      tierDescription = "La tua proprietà si posiziona tra le più richieste nel mercato attuale. L'eccellente micro-localizzazione commerciale, abbinata ad elementi distintivi rari (cono di vista privilegiato, finitura premium o contesto unico), qualifica l'asset per intercettare l'interesse prioritario di acquirenti istituzionali o capitali esteri pronti a sostenere un sovrapprezzo.";
    } else if (percent >= 38 && percent < 70) {
      tierLabel = "Growth Potential Asset";
      tierBadgeClass = "badge-growth";
      tierDescription = "Asset con forte potenziale di rivalutazione o ottimizzazione. L'immobile gode di ottimi fondamentali di stabilità urbana e flussi stabili di domanda. Con una mirata strategia correttiva di presentazione estetica o leggero riposizionamento della metratura, è possibile massimizzare sensibilmente la perizia liquida finale.";
    } else {
      tierLabel = "Under-Optimized Asset";
      tierBadgeClass = "badge-under";
      tierDescription = "La proprietà potrebbe essere sottovalutata rispetto al mercato attuale. Lo stato strutturale bisognoso di CapeX o una tipologia complessa ne rallentano la percezione. Tuttavia, l'immobile rappresenta una preziosa risorsa strategica ad elevato margine di conversione per operatori specializzati.";
    }

    // Inject dynamic elements in result page
    const quizTierBadge = document.getElementById('quizTierBadge');
    const quizTierTitle = document.getElementById('quizTierTitle');
    const quizTierDesc = document.getElementById('quizTierDesc');
    const resAvgM2 = document.getElementById('resAvgM2');
    const resTotalEst = document.getElementById('resTotalEst');
    const insightArea = document.getElementById('insightArea');
    const insightVista = document.getElementById('insightVista');

    if (quizTierBadge) {
      quizTierBadge.textContent = tierLabel;
      quizTierBadge.className = `result-badge ${tierBadgeClass}`;
    }
    if (quizTierTitle) {
      quizTierTitle.innerHTML = `Asset: <i>${tierLabel}</i>`;
    }
    if (quizTierDesc) {
      quizTierDesc.textContent = tierDescription;
    }
    if (resAvgM2) {
      resAvgM2.textContent = `€${finalM2Price.toLocaleString('it-IT')} / mq`;
    }
    if (resTotalEst) {
      resTotalEst.textContent = `€${calculatedTotal.toLocaleString('it-IT')}`;
    }

    // Customize dynamic bullet insights
    if (insightArea) {
      insightArea.innerHTML = `<i class="bi bi-geo-alt-fill text-gold-dark me-2"></i><strong>Domanda micro-area:</strong> Tasso d'interesse elevato monitorato su ${locationName}.`;
    }
    if (insightVista) {
      insightVista.innerHTML = `<i class="bi bi-eye-fill text-gold-dark me-2"></i><strong>Impatto cono visivo:</strong> Corretto con saggio di vista corrispondente (${vistaText}).`;
    }
  };


  /* ==========================================
     6. MARKET INSIGHT CHECK CONTROLLER (PREVIOUS TRIVIA)
     ========================================== */
  const triviaState = {
    step: 1,
    totalSteps: 3,
    correct: 0,
    answers: {
      1: { selected: null, correct: 0, explanation: "Sliema Promenade ed il lungomare rimangono le aree più performanti con incremento medio del 14% guidato dalla micro-localizzazione premium e dalla scarsità assoluta di nuove licenze fronte mare." },
      2: { selected: null, correct: 2, explanation: "Nei comparabili ad altezze elevate, la vista mare diretta genera un sovrapprezzo medio certificato di oltre il 25% rispetto a unità analoghe collocate sui lati del medesimo edificio." },
      3: { selected: null, correct: 1, explanation: "Gli immobili di prestigio posizionati strategicamente sul mercato tramite perizia scientifica si vendono mediamente in soli 52 giorni medi, minimizzando inutili giacenze speculative." }
    }
  };

  const showTriviaStep = (num) => {
    document.querySelectorAll('.trivia-step').forEach(stepDiv => {
      stepDiv.classList.add('d-none');
    });

    const currentStepDiv = document.querySelector(`.trivia-step[data-trivia-step="${num}"]`);
    if (currentStepDiv) {
      currentStepDiv.classList.remove('d-none');
    }
  };

  // Handle options selections
  document.querySelectorAll('.trivia-step .trivia-opt').forEach(button => {
    button.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const stepDiv = btn.closest('.trivia-step');
      const stepNum = parseInt(stepDiv.getAttribute('data-trivia-step'));
      const optionIndex = parseInt(btn.getAttribute('data-index'));

      const truth = triviaState.answers[stepNum];
      if (truth.selected !== null) return; // Prevent multiple choices

      truth.selected = optionIndex;
      const allStepButtons = stepDiv.querySelectorAll('.trivia-opt');

      allStepButtons.forEach(b => {
        const bIdx = parseInt(b.getAttribute('data-index'));
        b.disabled = true;
        if (bIdx === truth.correct) {
          b.classList.add('correct');
        }
      });

      if (optionIndex === truth.correct) {
        triviaState.correct++;
      } else {
        btn.classList.add('incorrect');
      }

      // Show explain block
      const revealBlock = stepDiv.querySelector('.trivia-reveal');
      const explanationText = stepDiv.querySelector('.trivia-explain-text');
      if (revealBlock && explanationText) {
        explanationText.textContent = truth.explanation;
        revealBlock.classList.remove('d-none');
      }
    });
  });

  // Next insight trigger button
  document.querySelectorAll('.trivia-next-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const stepDiv = e.currentTarget.closest('.trivia-step');
      const currentStep = parseInt(stepDiv.getAttribute('data-trivia-step'));

      if (currentStep < triviaState.totalSteps) {
        triviaState.step++;
        showTriviaStep(triviaState.step);
      } else {
        // Render outcomes in playground card
        const triviaActiveGroup = document.getElementById('triviaActiveGroup');
        const triviaOutcomeGroup = document.getElementById('triviaOutcomeGroup');
        const triviaOutScore = document.getElementById('triviaOutScore');
        const triviaOutMsg = document.getElementById('triviaOutMsg');

        if (triviaActiveGroup && triviaOutcomeGroup) {
          triviaActiveGroup.classList.add('d-none');
          triviaOutcomeGroup.classList.remove('d-none');

          if (triviaOutScore) {
            triviaOutScore.textContent = `${triviaState.correct} su ${triviaState.totalSteps}`;
          }

          if (triviaOutMsg) {
            if (triviaState.correct === 3) {
              triviaOutMsg.textContent = "Conoscenza eccellente! Possiedi una chiara comprensione delle dinamiche immobiliari reali a Malta. Sei pronto per massimizzare il valore del tuo immobile residenziale.";
            } else if (triviaState.correct === 2) {
              triviaOutMsg.textContent = "Ottimo risultato! Hai una solida comprensione delle varianti di mercato. L'analisi personalizzata chiarirà ogni dettaglio mancante per il tuo civico.";
            } else {
              triviaOutMsg.textContent = "Il mercato maltese presenta forti asimmetrie informative. Affidarsi ad analisi oggettive e attuarili è indispensabile per non compromettere il valore del proprio asset.";
            }
          }
        }
      }
    });
  });


  /* ==========================================
     7. RANKING BARS ANIMATION INTERACTION
     ========================================== */
  const rankingSection = document.getElementById('ranking');
  const tierBars = document.querySelectorAll('.tier-bar');

  const animateRankingBars = () => {
    tierBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-target-w') || '0%';
      bar.style.width = targetWidth;
    });
  };

  if (rankingSection) {
    const rankingObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateRankingBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    rankingObserver.observe(rankingSection);
  }


  /* ==========================================
     8. FORM VALIDATION & MODAL ORCHESTRATION
     ========================================== */
  // Initializing Bootstrap modal instance
  const leadModalElem = document.getElementById('leadModal');
  let leadModalBootstrap = null;

  if (leadModalElem && typeof bootstrap !== 'undefined') {
    leadModalBootstrap = new bootstrap.Modal(leadModalElem);
  }

  // Handle all triggers calling target action trigger
  document.querySelectorAll('[data-open-lead-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Ensure states are cleaned
      const formState = document.getElementById('modalFormState');
      const successState = document.getElementById('modalSuccessState');
      if (formState && successState) {
        formState.classList.remove('d-none');
        successState.classList.add('d-none');
      }

      // Reset fields
      const leadForm = document.getElementById('leadSubmissionForm');
      if (leadForm) {
        leadForm.reset();
        leadForm.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
      }

      if (leadModalBootstrap) {
        leadModalBootstrap.show();
      }
    });
  });

  const successCloseBtn = document.getElementById('successCloseBtn');
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      if (leadModalBootstrap) {
        leadModalBootstrap.hide();
      }
    });
  }

  // Focus real-time clear indicators
  const inputFields = document.querySelectorAll('.modal-form-input');
  inputFields.forEach(input => {
    ['input', 'focus', 'change'].forEach(evName => {
      input.addEventListener(evName, () => {
        input.classList.remove('is-invalid');
      });
    });
  });

  // Modal main lead form submission handling
  const submissionForm = document.getElementById('leadSubmissionForm');
  if (submissionForm) {
    submissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      const requiredInputs = submissionForm.querySelectorAll('.modal-form-input[required]');

      requiredInputs.forEach(input => {
        const val = input.value.trim();
        if (!val) {
          input.classList.add('is-invalid');
          isFormValid = false;
        }

        if (input.type === 'email' && val) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(val)) {
            input.classList.add('is-invalid');
            isFormValid = false;
          }
        }
      });

      if (isFormValid) {
        const firstNameInput = document.getElementById('modalFirstName');
        const successNameSpan = document.getElementById('successName');
        if (firstNameInput && successNameSpan) {
          successNameSpan.textContent = firstNameInput.value.trim();
        }

        const formState = document.getElementById('modalFormState');
        const successState = document.getElementById('modalSuccessState');
        if (formState && successState) {
          formState.classList.add('d-none');
          successState.classList.remove('d-none');
        }
      }
    });
  }

  // Embed results form submission handling
  const embedLeadForm = document.getElementById('quizEmbedLeadForm');
  const quizFormSuccessBlock = document.getElementById('quizFormSuccessBlock');

  if (embedLeadForm) {
    embedLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      const requiredInputs = embedLeadForm.querySelectorAll('.modal-form-input[required]');

      requiredInputs.forEach(input => {
        const val = input.value.trim();
        if (!val) {
          input.classList.add('is-invalid');
          isFormValid = false;
        }

        if (input.type === 'email' && val) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(val)) {
            input.classList.add('is-invalid');
            isFormValid = false;
          }
        }
      });

      if (isFormValid) {
        // Hide form and display success checked block within results view
        embedLeadForm.classList.add('d-none');
        if (quizFormSuccessBlock) {
          quizFormSuccessBlock.classList.remove('d-none');
        }
      }
    });
  }

});
