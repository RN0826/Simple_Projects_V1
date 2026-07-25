/*
Carousel Logic
Handles source landscape and portrait carousel dots, arrows, timers, and hover pause behavior.
===========================================
*/

(() => {
  /* ================= CAROUSEL (LANDSCAPE) ================= */
  const carouselTrack = document.getElementById("carouselTrack");

  if (carouselTrack) {
    (function () {
      const track = carouselTrack;
      const dotsContainer = document.getElementById("carouselDots");
      const prevBtn = document.getElementById("cPrev");
      const nextBtn = document.getElementById("cNext");
      const slides = track.querySelectorAll(".carousel-slide");
      const total = slides.length;
      let current = 0;
      let timer;

      /* Tracks whether the cursor is currently inside the carousel.
         resetTimer() checks this before re-arming autoplay, since
         goTo() calls resetTimer() on every navigation click, not
         just on natural slide advance. Without this, a stale
         interval could survive past manual navigation and fire
         mid-reveal, yanking a revealed quote away with it. */
      let isHovering = false;

      slides.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "carousel-dot" + (i === 0 ? " active" : "");
        d.setAttribute("role", "tab");
        d.setAttribute("aria-label", "Go to slide " + (i + 1));
        d.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(d);
      });

      function updateDots() {
        dotsContainer.querySelectorAll(".carousel-dot").forEach((d, i) => {
          d.classList.toggle("active", i === current);
        });
      }

      function goTo(index) {
        current = (index + total) % total;
        track.style.transform = "translateX(-" + current * 100 + "%)";
        updateDots();
        resetTimer();
      }

      function resetTimer() {
        clearInterval(timer);

        if (isHovering) {
          return;
        }

        timer = setInterval(() => goTo(current + 1), 4500);
      }

      prevBtn.addEventListener("click", () => goTo(current - 1));
      nextBtn.addEventListener("click", () => goTo(current + 1));

      const wrap = document.getElementById("carousel");

      wrap.addEventListener("mouseenter", () => {
        isHovering = true;
        clearInterval(timer);
      });

      wrap.addEventListener("mouseleave", () => {
        isHovering = false;
        resetTimer();
      });

      resetTimer();
    })();
  }

  /* ================= CAROUSEL (PORTRAIT) ================= */
  const carouselTrackP = document.getElementById("carouselTrackP");

  if (carouselTrackP) {
    (function () {
      const track = carouselTrackP;
      const dotsContainer = document.getElementById("carouselDotsP");
      const prevBtn = document.getElementById("cPrevP");
      const nextBtn = document.getElementById("cNextP");
      const slides = track.querySelectorAll(".carousel-slide");
      const total = slides.length;
      let current = 0;
      let timer;

      let isHovering = false;

      slides.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "carousel-dot" + (i === 0 ? " active" : "");
        d.setAttribute("role", "tab");
        d.setAttribute("aria-label", "Go to slide " + (i + 1));
        d.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(d);
      });

      function updateDots() {
        dotsContainer.querySelectorAll(".carousel-dot").forEach((d, i) => {
          d.classList.toggle("active", i === current);
        });
      }

      function goTo(index) {
        current = (index + total) % total;
        track.style.transform = "translateX(-" + current * 100 + "%)";
        updateDots();
        resetTimer();
      }

      function resetTimer() {
        clearInterval(timer);

        if (isHovering) {
          return;
        }

        timer = setInterval(() => goTo(current + 1), 6500);
      }

      prevBtn.addEventListener("click", () => goTo(current - 1));
      nextBtn.addEventListener("click", () => goTo(current + 1));

      const wrap = document.getElementById("carouselPortrait");

      wrap.addEventListener("mouseenter", () => {
        isHovering = true;
        clearInterval(timer);
      });

      wrap.addEventListener("mouseleave", () => {
        isHovering = false;
        resetTimer();
      });

      resetTimer();
    })();
  }
})();

/* ============================================================
   SECTION 1
   Council Quote Configuration

   Purpose
   -------
   Defines the global behaviour of the Council Quote Engine.

   Responsibilities

   â€¢ Animation timings
   â€¢ Reading Flow behaviour
   â€¢ Mouse Leave behaviour
   â€¢ Overlay appearance
   â€¢ Future feature toggles

   Notes

   â€¢ This section contains configuration ONLY.
   â€¢ No DOM manipulation should occur here.
   â€¢ No animation logic should exist here.
   â€¢ No quote data should exist here.

   Every other section should reference these values
   instead of hardcoding "magic numbers".

============================================================ */

/* ============================================================
   Quote Engine Configuration
============================================================ */

const QUOTE_CONFIG = {
  /* --------------------------------------------------------
       General
    -------------------------------------------------------- */

  enabled: true,

  lightModeOnly: true,

  /* --------------------------------------------------------
       Typography
    -------------------------------------------------------- */

  fontFamily: "Almendra Display",

  maxWidth: 620,

  /* --------------------------------------------------------
       Hover Overlay
    -------------------------------------------------------- */

  overlayOpacity: 0.05,

  /* --------------------------------------------------------
       Reading Flow (Mouse Enter)

       Confirmed against debug panel:

           Initial Delay     250ms
           Reveal Duration   880ms
           Overlap Amount    88%
           Easing            Gentle
    -------------------------------------------------------- */

  reveal: {
    initialDelay: 250,

    duration: 880,

    overlap: 88,

    easing: "cubic-bezier(0.22, 1, 0.36, 1)", // Gentle
  },

  /* --------------------------------------------------------
       Mouse Leave / Navigation Exit

       Confirmed against debug panel:

           Exit Mode         Memory Fade
           Exit Duration     790ms
           Exit Overlap      80%
           Exit Easing       Ease In-Out
    -------------------------------------------------------- */

  exit: {
    mode: "memory",

    duration: 790,

    overlap: 80,

    easing: "cubic-bezier(0.45, 0, 0.55, 1)", // Ease In-Out
  },

  /* --------------------------------------------------------
       Memory Fade
    -------------------------------------------------------- */

  memory: {
    weighted: true,

    jitter: 0.25,
  },

  /* --------------------------------------------------------
       Navigation Guard

       Purpose

       Determines whether carousel navigation (arrows/pills)
       must wait for an in-progress exit animation to finish
       before the slide is allowed to change.
    -------------------------------------------------------- */

  navigation: {
    waitForExit: true,
  },

  /* --------------------------------------------------------
       Future Character Behaviour

       These values are placeholders.

       Future versions will allow every Council member
       to have an independent reveal philosophy.

    -------------------------------------------------------- */

  characters: {
    oliver: {
      reveal: "reading-flow",

      exit: "memory",
    },

    kafka: {
      reveal: "reading-flow",

      exit: "memory",
    },

    dostoevsky: {
      reveal: "reading-flow",

      exit: "memory",
    },

    ayanokoji: {
      reveal: "reading-flow",

      exit: "memory",
    },
  },
};

/* ============================================================
   Runtime State

   Purpose
   -------
   Stores values that change while the application is running.

   Configuration above should remain constant.

   Runtime State changes continuously.

   Notes

   â€¢ activeSlide tracks which slide (if any) currently has
     its quote revealed. This is what allows navigation to
     know whether it needs to wait for an exit animation.
   â€¢ This object is never rendered or exposed in the DOM.

============================================================ */

const QuoteState = {
  initialized: false,

  currentQuotes: [],

  activeSlides: [],

  /* --------------------------------------------------------
       Currently revealed slide, or null if nothing is
       revealed. Set on mouseenter reveal, cleared once
       an exit animation fully completes.
    -------------------------------------------------------- */

  activeSlide: null,

  /* --------------------------------------------------------
       True while an exit animation is actively playing.
       Used by the navigation guard to avoid stacking
       multiple exits on the same slide.
    -------------------------------------------------------- */

  exitInProgress: false,

  animationLocked: false,
};

/* ============================================================
   Future JSON Structure

   This object documents the expected quote format.

   It exists purely for documentation and should be removed
   once JSON loading is implemented.

   Example

   {
       id: 1,
       author: "Oliver",
       quote: "...",
       theme: "Hope",
       tone: "Gentle"
   }

============================================================ */

/* ============================================================
   SECTION 2
   Council Quote Registry

   Purpose
   -------
   Acts as the single source of truth for every Council quote.

   Responsibilities

   â€¢ Stores all available quotes.
   â€¢ Groups quotes by Council member.
   â€¢ Provides a consistent structure for future JSON loading.

   Notes

   â€¢ Quotes are temporarily hardcoded.
   â€¢ Future versions will replace this object with a JSON loader.
   â€¢ The remainder of the Quote Engine should never need to
     change when the data source changes.

============================================================ */

/* ============================================================
   Council Quote Data

   QuoteRegistry is loaded from data/quotes.json before
   the quote engine populates the slides.

   Each council statement contains:

       primary       -> landscape
       companion     -> portrait option
       counterpoint  -> portrait option

============================================================ */

let QuoteRegistry = {};

const QUOTE_DATA_URL = "./data/quotes.json";

async function loadQuoteRegistry() {
  const response = await fetch(QUOTE_DATA_URL);

  if (!response.ok) {
    throw new Error(`Unable to load ${QUOTE_DATA_URL}: ${response.status}`);
  }

  const registry = await response.json();

  QuoteRegistry = normalizeQuoteRegistry(registry);
}

function normalizeQuoteRegistry(registry) {
  const normalized = {};

  Object.entries(registry || {}).forEach(([member, statements]) => {
    normalized[member] = Array.isArray(statements)
      ? statements.filter(isValidCouncilStatement)
      : [];
  });

  return normalized;
}

function isValidCouncilStatement(statement) {
  return (
    statement &&
    typeof statement.primary === "string" &&
    typeof statement.companion === "string" &&
    typeof statement.counterpoint === "string"
  );
}

/* ============================================================
   JSON Quote Flow

       Quote Engine
              â”‚
              â–¼
       QuoteRegistry
              â”‚
              â–¼
         quotes.json

   Runtime

      quotes.json
            â”‚
            â–¼
      Quote Loader
            â”‚
            â–¼
      Quote Registry
            â”‚
            â–¼
      Quote Engine
            â”‚
            â–¼
      Reading Flow

   This intermediate layer keeps the animation sections
   independent from the quote data source.

============================================================ */

/* ============================================================
   SECTION 3
   Quote Builder / Quote Construction Engine

   Purpose
   -------
   Responsible for transforming plain text quotes into
   HTML that can be individually animated.

   Responsibilities

   â€¢ Convert plain text into animatable markup.
   â€¢ Inject quotes into landscape AND portrait slides.
   â€¢ Maintain separation between data and presentation.

   Notes

   â€¢ This section knows NOTHING about animations.
   â€¢ It simply builds the stage.
   â€¢ Reading Flow (Section 4) controls movement.
   â€¢ Mouse Leave (Section 5) controls disappearance.

============================================================ */

/* ============================================================
   Build Quote Fragment

   Purpose
   -------
   Converts a plain text sentence into safe DOM nodes that
   can later be animated.

   Example

       Input

           "One step is all it takes."

       Output DOM

           [One] [step] [is] [all] [it] [takes.]

   Every word receives two wrappers.

       word-mask
           acts like a window.

       word-inner
           is the object that moves.

============================================================ */

function buildQuoteFragment(quoteText) {
  const fragment = document.createDocumentFragment();

  if (!quoteText || typeof quoteText !== "string") {
    return fragment;
  }

  quoteText
    .trim()
    .split(/\s+/)
    .forEach((word, index) => {
      if (index > 0) {
        fragment.append(" ");
      }

      const wordMask = document.createElement("span");
      const wordInner = document.createElement("span");

      wordMask.className = "word-mask";
      wordInner.className = "word-inner";
      wordInner.textContent = word;

      wordMask.appendChild(wordInner);
      fragment.appendChild(wordMask);
    });

  return fragment;
}

/* ============================================================
   Render Quote

   Purpose
   -------
   Inserts a generated quote into a slide.

   Responsibilities

   â€¢ Find the quote container.
   â€¢ Build the required DOM fragment.
   â€¢ Insert it into the DOM safely.

   This function intentionally does NOT animate anything.
   Used by both landscape and portrait population functions.

============================================================ */

function renderQuote(slideElement, quoteObject) {
  if (!slideElement || !quoteObject) {
    return;
  }

  const quoteContainer = slideElement.querySelector(".quote-text");

  if (!quoteContainer) {
    return;
  }

  quoteContainer.replaceChildren(buildQuoteFragment(quoteObject.quote));

  const wordElements = [...quoteContainer.querySelectorAll(".word-inner")];

  slideElement._quote = {
    data: quoteObject,
    words: wordElements,
    wordCount: wordElements.length,
  };
}

/* ============================================================
   Select Random Quote

   Purpose
   -------
   Returns one random quote from a Council member.

   Landscape uses the primary statement.
   Portrait randomly uses either companion or counterpoint.

============================================================ */

function selectRandomStatement(councilMember) {
  const collection = QuoteRegistry[councilMember];

  if (!collection || collection.length === 0) {
    return null;
  }

  return chooseRandom(collection);
}

function createQuoteObject(statement, quoteType) {
  if (!statement || !statement[quoteType]) {
    return null;
  }

  return {
    id: statement.id,
    batch: statement.batch,
    author: statement.author,
    type: quoteType,
    quote: statement[quoteType],
    source: statement,
  };
}

function selectRandomLandscapeQuote(councilMember) {
  return createQuoteObject(selectRandomStatement(councilMember), "primary");
}

function selectRandomPortraitQuote(councilMember) {
  const portraitQuoteTypes = ["companion", "counterpoint"];

  return createQuoteObject(
    selectRandomStatement(councilMember),
    chooseRandom(portraitQuoteTypes),
  );
}

/* ============================================================
   Populate Landscape Slides

   Current Mapping

       Slide 1 â†’ Kafka
       Slide 2 â†’ Dostoevsky
       Slide 3 â†’ Ayanokoji
       Slide 4 â†’ Oliver

============================================================ */

function populateLandscapeQuotes() {
  const slideMap = [
    { selector: ".slide-l1", member: "kafka" },
    { selector: ".slide-l2", member: "dostoevsky" },
    { selector: ".slide-l3", member: "ayanokoji" },
    { selector: ".slide-l4", member: "oliver" },
  ];

  slideMap.forEach((entry) => {
    const slide = document.querySelector(entry.selector);

    if (!slide) {
      return;
    }

    const quote = selectRandomLandscapeQuote(entry.member);

    renderQuote(slide, quote);
  });
}

/* ============================================================
   Populate Portrait Slides

   Mirrors populateLandscapeQuotes(), but selects either
   the companion or counterpoint statement.

   Current Mapping

       Slide 1 â†’ Kafka
       Slide 2 â†’ Dostoevsky
       Slide 3 â†’ Ayanokoji
       Slide 4 â†’ Oliver

============================================================ */

function populatePortraitQuotes() {
  const slideMap = [
    { selector: ".slide-p1", member: "kafka" },
    { selector: ".slide-p2", member: "dostoevsky" },
    { selector: ".slide-p3", member: "ayanokoji" },
    { selector: ".slide-p4", member: "oliver" },
  ];

  slideMap.forEach((entry) => {
    const slide = document.querySelector(entry.selector);

    if (!slide) {
      return;
    }

    const quote = selectRandomPortraitQuote(entry.member);

    renderQuote(slide, quote);
  });
}

/* ============================================================
   Section Summary

   This section builds the stage.

       Registry
            â”‚
            â–¼
       Random Quote
            â”‚
            â–¼
       HTML Builder
            â”‚
            â–¼
       Render Into Slide

   The quote now exists inside the DOM.

   Nothing has animated yet.

   Sections 4 and 5 will bring the quote to life.

============================================================ */

/* ============================================================
   SECTION 4
   Reading Flow Engine

   Purpose
   -------
   Controls the reveal animation for Council quotes.

   Responsibilities

   â€¢ Reading Flow sequencing
   â€¢ Reveal timing
   â€¢ Transition generation
   â€¢ Word animation

   Notes

   â€¢ This section does NOT build quotes.
   â€¢ This section does NOT choose quotes.
   â€¢ This section does NOT bind events.
   â€¢ Works identically for landscape and portrait slides â€”
     it operates on whatever slide element it is given.

============================================================ */

/* ============================================================
   Calculate Reading Flow Stagger
============================================================ */

function calculateRevealStagger() {
  const factor = 1 - QUOTE_CONFIG.reveal.overlap / 100;

  return Math.round(QUOTE_CONFIG.reveal.duration * factor * 0.55);
}

/* ============================================================
   Calculate Reveal Delay
============================================================ */

function calculateRevealDelay(wordIndex) {
  return (
    QUOTE_CONFIG.reveal.initialDelay + wordIndex * calculateRevealStagger()
  );
}

/* ============================================================
   Reveal Quote

   Notes

   â€¢ Marks the slide as the engine's active slide once
     the reveal begins. This is what Section 6/7 checks
     against for the navigation guard.

============================================================ */

function revealQuote(slideElement) {
  if (!slideElement?._quote) {
    return;
  }

  const { words } = slideElement._quote;

  words.forEach((word, index) => {
    word.style.transition = `transform
            ${QUOTE_CONFIG.reveal.duration}ms
            ${QUOTE_CONFIG.reveal.easing}
            ${calculateRevealDelay(index)}ms`;

    word.style.transform = "translateY(0)";
  });

  QuoteState.activeSlide = slideElement;
}

/* ============================================================
   Initialize Quote State

   Purpose
   -------
   Places every word into its initial hidden position.
   Does NOT animate. Used after rendering, before revealing.

============================================================ */

function initializeQuoteState(slideElement) {
  if (!slideElement?._quote) {
    return;
  }

  slideElement._quote.words.forEach((word) => {
    word.style.transition = "none";

    word.style.transform = "translateY(112%)";
  });
}

/* ============================================================
   Reading Flow Status
============================================================ */

function isQuoteReady(slideElement) {
  return (
    slideElement && slideElement._quote && slideElement._quote.words.length > 0
  );
}

/* ============================================================
   Section Summary

       Prepared Quote
              â”‚
              â–¼
       Calculate Stagger
              â”‚
              â–¼
       Calculate Delay
              â”‚
              â–¼
       Reveal Words

============================================================ */

/* ============================================================
   SECTION 5
   Quote Exit Engine

   Purpose
   -------
   Controls how Council quotes leave the screen.

   Responsibilities

   â€¢ Exit timing
   â€¢ Exit sequencing
   â€¢ Replay Reverse
   â€¢ Right â†’ Left
   â€¢ Memory Fade

   Notes

   â€¢ This section NEVER reveals quotes.
   â€¢ Works identically for landscape and portrait slides.

============================================================ */

/* ============================================================
   Exit Modes
============================================================ */

const EXIT_MODES = {
  REVERSE: "reverse",

  RIGHT_TO_LEFT: "rightleft",

  MEMORY: "memory",
};

/* ============================================================
   Calculate Exit Stagger
============================================================ */

function calculateExitStagger() {
  const factor = 1 - QUOTE_CONFIG.exit.overlap / 100;

  return Math.round(QUOTE_CONFIG.exit.duration * factor * 0.55);
}

/* ============================================================
   Generate Memory Fade Order

   Purpose
   -------
   Produces a weighted pseudo-random sequence. Words closer
   to the centre statistically remain visible longer.

============================================================ */

function generateMemoryFadeOrder(wordCount) {
  const centre = calculateCentreIndex(wordCount);

  const scored = [];

  for (let i = 0; i < wordCount; i++) {
    const distance = Math.abs(i - centre);

    const weight = 1 / (1 + distance);

    const score = Math.pow(Math.random(), 1 / weight);

    scored.push({ index: i, score });
  }

  scored.sort((a, b) => a.score - b.score);

  const order = new Array(wordCount);

  scored.forEach((item, rank) => {
    order[item.index] = rank;
  });

  return order;
}

/* ============================================================
   Apply Word Transition

   Purpose
   -------
   Applies a single transform transition to one word.

   Shared by all three exit modes to avoid repeating the
   same style-assignment lines in every branch of exitQuote().

============================================================ */

function applyWordTransition(
  wordElement,
  duration,
  easing,
  delay,
  transformValue,
) {
  if (!wordElement) {
    return;
  }

  wordElement.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;

  wordElement.style.transform = transformValue;
}

/* ============================================================
   Exit Quote

   Notes

   â€¢ Accepts an optional onComplete callback, fired once the
     slowest word has genuinely finished animating (delay +
     duration). The navigation guard relies on this to know
     when it is safe to move the carousel track.
   â€¢ Sets QuoteState.exitInProgress for the duration of the
     animation, clears it â€” along with activeSlide â€” once
     the exit is fully complete.

============================================================ */

function exitQuote(slideElement, onComplete) {
  if (!slideElement?._quote) {
    if (typeof onComplete === "function") {
      onComplete();
    }

    return;
  }

  const words = slideElement._quote.words;

  const totalWords = words.length;

  if (totalWords === 0) {
    if (typeof onComplete === "function") {
      onComplete();
    }

    return;
  }

  const exitStep = calculateExitStagger();

  const memoryOrder = generateMemoryFadeOrder(totalWords);

  QuoteState.exitInProgress = true;

  let maxDelay = 0;

  words.forEach((word, index) => {
    let delay = 0;

    switch (QUOTE_CONFIG.exit.mode) {
      case EXIT_MODES.REVERSE:
        delay = (totalWords - 1 - index) * exitStep;

        break;

      case EXIT_MODES.RIGHT_TO_LEFT:
        delay = (totalWords - 1 - index) * exitStep;

        break;

      case EXIT_MODES.MEMORY:
        delay = memoryOrder[index] * exitStep;

        break;
    }

    if (delay > maxDelay) {
      maxDelay = delay;
    }

    applyWordTransition(
      word,

      QUOTE_CONFIG.exit.duration,

      QUOTE_CONFIG.exit.easing,

      delay,

      "translateY(112%)",
    );
  });

  const totalExitTime = maxDelay + QUOTE_CONFIG.exit.duration;

  window.setTimeout(() => {
    QuoteState.exitInProgress = false;

    if (QuoteState.activeSlide === slideElement) {
      QuoteState.activeSlide = null;
    }

    if (typeof onComplete === "function") {
      onComplete();
    }
  }, totalExitTime);
}

/* ============================================================
   Future Expansion

   Reserved for future Council personalities.

   Oliver         Memory Fade
   Kafka          Fragmented Exit
   Dostoevsky     Reflection Collapse
   Ayanokoji      Instant Silence

============================================================ */

/* ============================================================
   SECTION 6
   Shared Utilities

   Purpose
   -------
   Provides reusable helper functions shared by multiple
   sections of the Council Quote Engine.

   Notes

   â€¢ Utilities should never manipulate the DOM.
   â€¢ Utilities should never contain animation logic.
   â€¢ Utilities should remain deterministic whenever possible.

============================================================ */

/* ============================================================
   Clamp
============================================================ */

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

/* ============================================================
   Random Integer
============================================================ */

function randomInteger(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

/* ============================================================
   Choose Random Element
============================================================ */

function chooseRandom(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }

  return array[randomInteger(0, array.length - 1)];
}

/* ============================================================
   Calculate Centre Index
============================================================ */

function calculateCentreIndex(length) {
  return (length - 1) / 2;
}

/* ============================================================
   Shuffle (Fisher-Yates)
============================================================ */

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInteger(0, i);

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/* ============================================================
   Future Utilities

   Reserved for

   â€¢ Weighted shuffle
   â€¢ Seeded randomness
   â€¢ Future easing helpers
   â€¢ Character-specific calculations
   â€¢ Quote filtering

============================================================ */

/* ============================================================
   SECTION 7
   Event Binding

   Purpose
   -------
   Connects user interactions to the Council Quote Engine.

   Responsibilities

   â€¢ Locate landscape AND portrait slides.
   â€¢ Bind mouse events.
   â€¢ Trigger reveal animations.
   â€¢ Trigger exit animations.
   â€¢ Guard carousel navigation while a quote is revealed.

   Notes

   â€¢ This section never performs animations itself.
   â€¢ Reveal logic belongs to Section 4.
   â€¢ Exit logic belongs to Section 5.

   ------------------------------------------------------------
   Navigation Guard â€” how it works

   The landscape and portrait carousels' arrows/dots are
   created and controlled entirely inside the untouched IIFEs
   at the top of this file. That logic is not modified.

   Instead, a click listener is attached to each carousel
   wrapper (#carousel, #carouselPortrait), registered in the
   CAPTURE phase, so it always runs before the base carousel's
   own listener regardless of script load order.

   When a nav click arrives and a quote is currently revealed:

       1. Propagation is stopped immediately, so the base
          goTo() logic never sees this click.
       2. The revealed slide's exit animation plays, in
          place, in full.
       3. Once exitQuote() reports genuine completion, a
          synthetic click is re-dispatched on the same
          element, allowed to pass through untouched.

   A bypass flag prevents the synthetic replay click from
   being intercepted a second time.
============================================================ */

/* ============================================================
   Bind Quote Events

   Attaches the Quote Engine to a single slide, landscape
   or portrait â€” this function does not care which.

============================================================ */

function bindQuoteEvents(slideElement) {
  if (!slideElement) {
    return;
  }

  slideElement.addEventListener("mouseenter", () => {
    initializeQuoteState(slideElement);

    revealQuote(slideElement);
  });

  slideElement.addEventListener("mouseleave", () => {
    exitQuote(slideElement);
  });
}

/* ============================================================
   Bind Landscape Quotes
============================================================ */

function bindLandscapeQuoteEvents() {
  const slides = document.querySelectorAll(".carousel-slide[class*='slide-l']");

  slides.forEach((slide) => {
    bindQuoteEvents(slide);
  });
}

/* ============================================================
   Bind Portrait Quotes

   Mirrors bindLandscapeQuoteEvents(). Reveal/exit mechanics
   are already generic, so no separate logic is needed here.

============================================================ */

function bindPortraitQuoteEvents() {
  const slides = document.querySelectorAll(".carousel-slide[class*='slide-p']");

  slides.forEach((slide) => {
    bindQuoteEvents(slide);
  });
}

/* ============================================================
   Navigation Guard

   Prevents carousel navigation (arrows/dots) from moving
   the track while a quote's exit animation is still in
   progress. See section banner above for full explanation.

============================================================ */

let navigationGuardBypass = false;

function handleNavigationIntercept(event) {
  if (navigationGuardBypass) {
    return;
  }

  const navTarget = event.target.closest(".carousel-arrow, .carousel-dot");

  if (!navTarget) {
    return;
  }

  if (!QUOTE_CONFIG.navigation.waitForExit) {
    return;
  }

  const activeSlide = QuoteState.activeSlide;

  if (!activeSlide) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  if (QuoteState.exitInProgress) {
    return;
  }

  exitQuote(activeSlide, () => {
    navigationGuardBypass = true;

    navTarget.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    navigationGuardBypass = false;
  });
}

/* ============================================================
   Bind Navigation Guard

   Purpose
   -------
   Attaches the capture-phase listener to a carousel wrapper.

   Accepts a carouselId so the same guard logic can attach to
   both #carousel and #carouselPortrait without duplicating
   handleNavigationIntercept.

============================================================ */

function bindNavigationGuard(carouselId) {
  const carouselWrap = document.getElementById(carouselId);

  if (!carouselWrap) {
    return;
  }

  carouselWrap.addEventListener("click", handleNavigationIntercept, true);
}

/* ============================================================
   Future Expansion

   Reserved for

   â€¢ Touch interactions
   â€¢ Keyboard navigation
   â€¢ Accessibility events
   â€¢ Mobile behaviour
   â€¢ Character-specific interactions

============================================================ */

/* ============================================================
   SECTION 8
   Initialization

   Purpose
   -------
   Boots the Council Quote Engine.

   Responsibilities

   â€¢ Populate every landscape AND portrait slide with a quote.
   â€¢ Prepare every quote for animation.
   â€¢ Bind all required mouse events.
   â€¢ Bind the navigation guard on both carousels.
   â€¢ Prevent duplicate initialization.

   Notes

   â€¢ This is the ONLY public entry point of the Quote Engine.
   â€¢ Call initializeQuoteEngine() once after the DOM has been
     created.

============================================================ */

async function initializeQuoteEngine() {
  /* --------------------------------------------------------
       Prevent duplicate initialization.
    -------------------------------------------------------- */

  if (QuoteState.initialized) {
    return;
  }

  /* --------------------------------------------------------
       Quote Engine disabled.
    -------------------------------------------------------- */

  if (!QUOTE_CONFIG.enabled) {
    console.info("[Council Quote Engine] Disabled.");

    return;
  }

  /* --------------------------------------------------------
       Load Quote Data.
    -------------------------------------------------------- */

  try {
    await loadQuoteRegistry();
  } catch (error) {
    console.error("[Council Quote Engine] Quote data failed to load.", error);

    return;
  }

  /* --------------------------------------------------------
       Populate Landscape Quotes.
    -------------------------------------------------------- */

  populateLandscapeQuotes();

  /* --------------------------------------------------------
       Populate Portrait Quotes.
    -------------------------------------------------------- */

  populatePortraitQuotes();

  /* --------------------------------------------------------
       Prepare Every Quote â€” landscape.
    -------------------------------------------------------- */

  const landscapeSlides = document.querySelectorAll(
    ".carousel-slide[class*='slide-l']",
  );

  landscapeSlides.forEach((slide) => {
    initializeQuoteState(slide);
  });

  /* --------------------------------------------------------
       Prepare Every Quote â€” portrait.
    -------------------------------------------------------- */

  const portraitSlides = document.querySelectorAll(
    ".carousel-slide[class*='slide-p']",
  );

  portraitSlides.forEach((slide) => {
    initializeQuoteState(slide);
  });

  /* --------------------------------------------------------
       Bind Events â€” both carousels.
    -------------------------------------------------------- */

  bindLandscapeQuoteEvents();
  bindPortraitQuoteEvents();

  /* --------------------------------------------------------
       Bind Navigation Guard â€” both carousels.
    -------------------------------------------------------- */

  bindNavigationGuard("carousel");
  bindNavigationGuard("carouselPortrait");

  /* --------------------------------------------------------
       Store active slides.
    -------------------------------------------------------- */

  QuoteState.activeSlides = [...landscapeSlides, ...portraitSlides];

  /* --------------------------------------------------------
       Engine Ready.
    -------------------------------------------------------- */

  QuoteState.initialized = true;

  console.info("[Council Quote Engine] Initialized.");
}

/* ============================================================
   Automatic Startup
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initializeQuoteEngine();
});
