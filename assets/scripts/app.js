(() => {
  "use strict";

  // Helpers ---------------------------------------------------------------
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const makeFact = (a, b, operator) => ({
    a,
    b,
    operator,
    prompt: `${a} ${operator} ${b}`,
    answer: operator === "+" ? a + b : a - b,
  });

  const pushFact = (list, a, b, operator, options = {}) => {
    const { commutative = false } = options;
    list.push(makeFact(a, b, operator));
    if (commutative && a !== b) {
      list.push(makeFact(b, a, operator));
    }
  };

  const buildAddWithFixed = (addends, min = 0, max = 10) => {
    const facts = [];
    range(min, max).forEach((base) => {
      addends.forEach((add) => {
        if (base + add <= 20) {
          facts.push(makeFact(base, add, "+"));
        }
      });
    });
    return facts;
  };

  const buildPairsThatMakeTen = () => {
    const facts = [];
    for (let a = 0; a <= 10; a += 1) {
      const b = 10 - a;
      if (b < 0 || b > 10) continue;
      if (a > b) continue;
      pushFact(facts, a, b, "+", { commutative: a !== b });
    }
    return facts;
  };

  const buildSumsLessThan = (cap = 10) => {
    const facts = [];
    for (let a = 0; a < cap; a += 1) {
      for (let b = 0; b < cap; b += 1) {
        if (a + b >= cap) continue;
        const low = Math.min(a, b);
        const high = Math.max(a, b);
        if (facts.find((fact) => fact.a === low && fact.b === high && fact.operator === "+")) {
          continue;
        }
        facts.push(makeFact(low, high, "+"));
      }
    }
    return facts;
  };

  const buildLeftoverFacts = () => {
    const facts = [];
    for (let a = 5; a <= 9; a += 1) {
      for (let b = 4; b <= 9; b += 1) {
        const sum = a + b;
        if (sum >= 11 && sum <= 15 && a <= b) {
          pushFact(facts, a, b, "+", { commutative: a !== b });
        }
      }
    }
    return facts;
  };

  const buildSubWithFixed = (subs, min = 2, max = 12) => {
    const facts = [];
    range(min, max).forEach((minuend) => {
      subs.forEach((sub) => {
        if (minuend - sub >= 0) {
          facts.push(makeFact(minuend, sub, "-"));
        }
      });
    });
    return facts;
  };

  const buildNeighborSubFacts = () => {
    const facts = [];
    range(2, 12).forEach((minuend) => {
      if (minuend - 1 >= 0) {
        facts.push(makeFact(minuend, minuend - 1, "-"));
      }
      if (minuend - 2 >= 0) {
        facts.push(makeFact(minuend, minuend - 2, "-"));
      }
    });
    return facts;
  };

  const buildSubGreaterThanTen = (subs, min = 11, max = 18) => {
    const facts = [];
    range(min, max).forEach((minuend) => {
      subs.forEach((sub) => {
        if (minuend - sub >= 0) {
          facts.push(makeFact(minuend, sub, "-"));
        }
      });
    });
    return facts;
  };

  // Program data ----------------------------------------------------------
  const additionWeeks = [
    {
      id: "add-w1",
      title: "Week 1 - Adding One and Two",
      focus: "Make +1/+2 jumps automatic.",
      description:
        "Build fact power with every number that adds one or two. The scoreboard celebrates quick counting.",
      buildFacts: () => buildAddWithFixed([1, 2]),
    },
    {
      id: "add-w2",
      title: "Week 2 - Pairs That Make Ten",
      focus: "Find every friend of ten.",
      description:
        "Practice the classic ten-frame partners so students instantly know what completes ten.",
      buildFacts: () => buildPairsThatMakeTen(),
    },
    {
      id: "add-w3",
      title: "Week 3 - Sums Less Than Ten",
      focus: "Keep totals under ten.",
      description:
        "Mix-and-match addends that always stay below ten to reinforce flexible counting strategies.",
      buildFacts: () => buildSumsLessThan(10),
    },
    {
      id: "add-w4",
      title: "Week 4 - Adding Nine",
      focus: "Use make ten minus one.",
      description:
        "Add nine by imagining a ten and removing one - every fact here follows that rhythm.",
      buildFacts: () => buildAddWithFixed([9]),
    },
    {
      id: "add-w5",
      title: "Week 5 - Adding Eight",
      focus: "Use make ten minus two.",
      description:
        "A cozy repeat of week four, now with eights so learners solidify another near-ten strategy.",
      buildFacts: () => buildAddWithFixed([8]),
    },
    {
      id: "add-w6",
      title: "Week 6 - Look at the Leftovers",
      focus: "Bridge through ten and beyond.",
      description:
        "These sums hop past ten. Learners split off leftovers to hit the next ten before finishing.",
      buildFacts: () => buildLeftoverFacts(),
    },
  ];

  const subtractionWeeks = [
    {
      id: "sub-w1",
      title: "Week 1 - Subtracting One and Two",
      focus: "Count back one or two.",
      description:
        "Automatic take-away of one or two keeps counting nimble. Every number from 1-12 appears.",
      buildFacts: () => buildSubWithFixed([1, 2]),
    },
    {
      id: "sub-w2",
      title: "Week 2 - Subtracting Three and Four",
      focus: "Hop back three or four.",
      description:
        "Build confident hops of three and four while results remain friendly and non-negative.",
      buildFacts: () => buildSubWithFixed([3, 4], 3, 14),
    },
    {
      id: "sub-w3",
      title: "Week 3 - Subtracting Neighbor Numbers",
      focus: "Compare near twins.",
      description:
        "When numbers sit beside each other, subtraction just means checking for one or two leftovers.",
      buildFacts: () => buildNeighborSubFacts(),
    },
    {
      id: "sub-w4",
      title: "Week 4 - Subtracting Five, Six, and Seven",
      focus: "Work with mid-sized hops.",
      description:
        "Take away five, six, and seven to emphasize decomposing numbers before counting back.",
      buildFacts: () => buildSubWithFixed([5, 6, 7], 6, 18),
    },
    {
      id: "sub-w5",
      title: "Week 5 - Subtracting Nine",
      focus: "Drop nine using make-ten.",
      description:
        "Mirror the adding nine strategy in reverse - jump to ten and see what remains.",
      buildFacts: () => buildSubWithFixed([9], 9, 18),
    },
    {
      id: "sub-w6",
      title: "Week 6 - Subtracting Eight",
      focus: "Drop eight smoothly.",
      description:
        "Continue the near-ten story: subtract eight from every number with answers that stay positive.",
      buildFacts: () => buildSubWithFixed([8], 8, 18),
    },
    {
      id: "sub-w7",
      title: "Week 7 - Subtracting 3-5 From >10",
      focus: "Work inside the teens.",
      description:
        "Focus on teen numbers taking away three, four, or five to highlight regrouping ideas.",
      buildFacts: () => buildSubGreaterThanTen([3, 4, 5], 11, 18),
    },
    {
      id: "sub-w8",
      title: "Week 8 - Subtracting 6 & 7 From >10",
      focus: "Bigger jumps in the teens.",
      description:
        "Finish with sixes and sevens taken away from numbers greater than ten to cement fluency.",
      buildFacts: () => buildSubGreaterThanTen([6, 7], 12, 20),
    },
  ];

  const programData = {
    addition: additionWeeks,
    subtraction: subtractionWeeks,
  };

  // State & DOM references ------------------------------------------------
  const state = {
    mode: "addition",
    week: null,
    facts: [],
    tracker: [],
    activeIndex: null,
    timerLimit: 10,
    timerId: null,
    countdown: 0,
    nextQuestionTimeout: null,
  };

  const refs = {
    weekSummary: document.getElementById("weekSummary"),
    weekMenu: document.getElementById("weekMenu"),
    weekDescription: document.getElementById("weekDescription"),
    weekLabel: document.getElementById("weekLabel"),
    startButton: document.getElementById("startButton"),
    timeSelect: document.getElementById("timeSelect"),
    timerDisplay: document.getElementById("timerDisplay"),
    progressDisplay: document.getElementById("progressDisplay"),
    lastFactDisplay: document.getElementById("lastFactDisplay"),
    questionPrompt: document.getElementById("questionPrompt"),
    statusText: document.getElementById("statusText"),
    answerInput: document.getElementById("answerInput"),
    submitButton: document.getElementById("submitButton"),
    scoreboard: document.getElementById("scoreboard"),
  };

  const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));
  const cssCache = {};

  const getCssVar = (name) => {
    if (!cssCache[name]) {
      cssCache[name] = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
    }
    return cssCache[name];
  };

  // Event wiring ----------------------------------------------------------
  const init = () => {
    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => handleModeChange(btn.dataset.mode));
    });
    refs.startButton.addEventListener("click", startPractice);
    refs.submitButton.addEventListener("click", handleSubmit);
    refs.answerInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    });

    handleModeChange(state.mode);
    buildScoreboard();
  };

  const handleModeChange = (mode) => {
    if (!programData[mode]) return;
    state.mode = mode;
    state.week = null;
    state.facts = [];
    state.tracker = [];
    state.activeIndex = null;
    state.timerLimit = parseInt(refs.timeSelect.value, 10);
    refs.startButton.disabled = true;
    refs.startButton.textContent = "Begin Practice";
    refs.weekDescription.textContent =
      "Tap a week to preview its focus, then start the practice set.";
    refs.weekLabel.textContent = "Select a week to begin.";
    refs.questionPrompt.textContent = "Ready when you are!";
    refs.statusText.textContent = "";
    refs.lastFactDisplay.textContent = "None yet";
    refs.progressDisplay.textContent = "0 mastered";
    stopTimer();
    clearPendingQuestion();
    resetAnswerInputs();
    buildScoreboard();
    renderWeekSummary();
    renderWeekMenu();
    highlightModeButton();
  };

  const highlightModeButton = () => {
    modeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });
  };

  const renderWeekSummary = () => {
    refs.weekSummary.innerHTML = "";
    const fragment = document.createDocumentFragment();
    programData[state.mode].forEach((week) => {
      const li = document.createElement("li");
      li.textContent = week.title;
      fragment.appendChild(li);
    });
    refs.weekSummary.appendChild(fragment);
  };

  const renderWeekMenu = () => {
    refs.weekMenu.innerHTML = "";
    programData[state.mode].forEach((week) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "week-card";
      card.dataset.weekId = week.id;
      card.innerHTML = `
        <p class="week-card__tag">${week.focus}</p>
        <h3 class="week-card__title">${week.title}</h3>
      `;
      card.addEventListener("click", () => selectWeek(week.id));
      refs.weekMenu.appendChild(card);
    });
  };

  const selectWeek = (weekId) => {
    const week = programData[state.mode].find((w) => w.id === weekId);
    if (!week) return;
    state.week = week;
    state.facts = [];
    state.tracker = [];
    state.activeIndex = null;
    refs.weekDescription.textContent = week.description;
    refs.weekLabel.textContent = week.title;
    refs.startButton.disabled = false;
    refs.statusText.textContent = "Press Begin Practice to launch the board.";
    Array.from(refs.weekMenu.children).forEach((card) => {
      card.classList.toggle("active", card.dataset.weekId === weekId);
    });
    stopTimer();
    clearPendingQuestion();
    resetAnswerInputs();
    buildScoreboard();
  };

  const startPractice = () => {
    if (!state.week) return;
    clearPendingQuestion();
    state.facts = state.week.buildFacts();
    state.tracker = state.facts.map(() => 2);
    state.timerLimit = parseInt(refs.timeSelect.value, 10);
    state.activeIndex = null;
    refs.startButton.textContent = "Restart Week";
    refs.answerInput.disabled = false;
    refs.submitButton.disabled = false;
    refs.statusText.textContent = "Scoreboard ready! Answer each fact before time runs out.";
    refs.lastFactDisplay.textContent = "None yet";
    refs.progressDisplay.textContent = `0 / ${state.facts.length} mastered`;
    buildScoreboard();
    askQuestion();
  };

  const askQuestion = () => {
    stopTimer();
    if (!state.facts.length) return;
    const totalWeight = state.tracker.reduce(
      (sum, weight) => sum + Math.max(weight, 0),
      0
    );
    if (totalWeight <= 0) {
      handleCompletion();
      return;
    }

    let pick = Math.random() * totalWeight;
    let selectedIndex = 0;
    for (let i = 0; i < state.tracker.length; i += 1) {
      pick -= Math.max(state.tracker[i], 0);
      if (pick <= 0) {
        selectedIndex = i;
        break;
      }
    }
    state.activeIndex = selectedIndex;
    const fact = state.facts[selectedIndex];
    refs.questionPrompt.textContent = fact.prompt;
    refs.statusText.textContent = "Type the answer and press Enter.";
    refs.answerInput.value = "";
    refs.answerInput.focus();
    startTimer();
  };

  const handleCompletion = () => {
    refs.questionPrompt.textContent = "You mastered every fact!";
    refs.statusText.textContent =
      "Great work! Pick another week or restart to mix them again.";
    refs.answerInput.disabled = true;
    refs.submitButton.disabled = true;
    refs.timerDisplay.textContent = "Done";
    clearPendingQuestion();
  };

  const handleSubmit = () => {
    if (state.activeIndex === null || refs.answerInput.disabled) {
      return;
    }
    const fact = state.facts[state.activeIndex];
    const userValue = parseInt(refs.answerInput.value, 10);
    if (Number.isNaN(userValue)) {
      refs.statusText.textContent = "Type a number to check your answer.";
      return;
    }
    stopTimer();
    const isCorrect = userValue === fact.answer;
    if (isCorrect) {
      adjustWeight(state.activeIndex, -2);
      refs.statusText.textContent = "Nice! That fact cools down on the grid.";
      refs.lastFactDisplay.textContent = `${fact.prompt} = ${fact.answer} (great job)`;
    } else {
      adjustWeight(state.activeIndex, 4);
      refs.statusText.textContent = `Almost! ${fact.prompt} = ${fact.answer}.`;
      refs.lastFactDisplay.textContent = `${fact.prompt} = ${fact.answer}`;
    }
    buildScoreboard();
    updateProgress();
    queueNextQuestion();
  };

  const adjustWeight = (index, delta) => {
    state.tracker[index] = Math.max(0, state.tracker[index] + delta);
  };

  const updateProgress = () => {
    if (!state.facts.length) {
      refs.progressDisplay.textContent = "0 mastered";
      return;
    }
    const mastered = state.tracker.filter((value) => value <= 0).length;
    refs.progressDisplay.textContent = `${mastered} / ${state.facts.length} mastered`;
  };

  const queueNextQuestion = () => {
    clearTimeout(state.nextQuestionTimeout);
    state.nextQuestionTimeout = setTimeout(() => {
      state.nextQuestionTimeout = null;
      askQuestion();
    }, 900);
  };

  const startTimer = () => {
    stopTimer();
    state.countdown = state.timerLimit;
    refs.timerDisplay.textContent = `${state.countdown}s`;
    state.timerId = setInterval(() => {
      state.countdown -= 1;
      if (state.countdown >= 0) {
        refs.timerDisplay.textContent = `${state.countdown}s`;
      }
      if (state.countdown < 0) {
        handleTimeout();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
    refs.timerDisplay.textContent = "-";
  };

  const handleTimeout = () => {
    stopTimer();
    if (state.activeIndex === null) return;
    const fact = state.facts[state.activeIndex];
    adjustWeight(state.activeIndex, 4);
    refs.statusText.textContent = `Time! ${fact.prompt} = ${fact.answer}.`;
    refs.lastFactDisplay.textContent = `${fact.prompt} = ${fact.answer}`;
    buildScoreboard();
    updateProgress();
    queueNextQuestion();
  };

  const resetAnswerInputs = () => {
    refs.answerInput.value = "";
    refs.answerInput.disabled = true;
    refs.submitButton.disabled = true;
  };

  const colorForWeight = (weight) => {
    const safeWeight = typeof weight === "number" ? weight : 4;
    if (safeWeight <= 0) return getCssVar("--score-good") || "#3cc48b";
    if (safeWeight <= 2) return getCssVar("--score-learning") || "#f1c21b";
    return getCssVar("--score-retry") || "#ff6b6b";
  };

  const buildScoreboard = () => {
    const container = d3.select(refs.scoreboard);
    container.selectAll("*").remove();
    if (!state.facts.length) {
      container
        .append("p")
        .attr("class", "scoreboard-placeholder")
        .text("Choose a week and press Begin Practice to see progress tiles.");
      return;
    }
    const total = state.facts.length;
    const columns = Math.ceil(Math.sqrt(total));
    const rows = Math.ceil(total / columns);
    const tile = 40;
    const gap = 6;
    const width = columns * tile + (columns - 1) * gap;
    const height = rows * tile + (rows - 1) * gap;
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Scoreboard grid");

    const groups = svg
      .selectAll("g")
      .data(state.facts)
      .enter()
      .append("g")
      .attr("transform", (_, idx) => {
        const col = idx % columns;
        const row = Math.floor(idx / columns);
        return `translate(${col * (tile + gap)}, ${row * (tile + gap)})`;
      });

    groups
      .append("rect")
      .attr("class", "score-tile")
      .attr("width", tile)
      .attr("height", tile)
      .attr("fill", (_, idx) => colorForWeight(state.tracker[idx]))
      .attr("rx", 8)
      .attr("ry", 8);

    groups.append("title").text((d) => `${d.prompt} = ${d.answer}`);
  };

  const clearPendingQuestion = () => {
    if (state.nextQuestionTimeout) {
      clearTimeout(state.nextQuestionTimeout);
      state.nextQuestionTimeout = null;
    }
  };

  init();
})();
