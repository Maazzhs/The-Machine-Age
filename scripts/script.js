// Highlight active nav link
(() => {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll(".nav-link").forEach(a => {
        if (a.dataset.nav === page) a.classList.add("active");
    });
})();

// Page fade transition on navigation
(() => {
    const body = document.body;
    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.getAttribute("href");
        const isInternalPage =
            href &&
            !href.startsWith("#") &&
            !href.startsWith("http") &&
            !href.startsWith("mailto:") &&
            !href.startsWith("tel:") &&
            href.endsWith(".html");
        if (!isInternalPage) return;
        link.addEventListener("click", (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            body.classList.add("is-leaving");
            setTimeout(() => {
                window.location.href = href;
            }, 180);
        });
    });
})();

// Reveal elements on scroll
(() => {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("in");
        });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
})();

// Quiz panel open/close
(() => {
    document.querySelectorAll("[data-quiz-panel]").forEach(panel => {
        const btn = panel.querySelector("[data-quiz-toggle]");
        const content = panel.querySelector("[data-quiz-content]");
        if (!btn || !content) return;
        btn.addEventListener("click", () => {
            const isOpen = panel.classList.toggle("open");
            btn.textContent = isOpen ? "Close Quiz" : "Open Quiz";
        });
    });
})();

// Embedded quizzes logic
(() => {
    const quizzes = {
        visionary: [
            {
                q: "Why did Babbage want to build calculating machines?",
                a: [
                    "To replace steam engines",
                    "To reduce errors in mathematical tables",
                    "To improve telegraph systems"
                ],
                c: 1
            },
            {
                q: "Which person is strongly linked with early programming for Babbage’s ideas?",
                a: ["Ada Lovelace", "Alan Turing", "Tim Berners-Lee"],
                c: 0
            },
            {
                q: "What is the best modern match for Babbage’s 'store'?",
                a: ["Memory (RAM/storage)", "A monitor", "A keyboard"],
                c: 0
            }
        ],
        machines: [
            {
                q: "What method did the Difference Engine use to simplify calculations?",
                a: ["Binary arithmetic", "Finite differences", "Quantum logic"],
                c: 1
            },
            {
                q: "What made the Analytical Engine different from the Difference Engine?",
                a: ["It was programmable", "It used electricity", "It was smaller"],
                c: 0
            },
            {
                q: "Which component is most like the Analytical Engine’s 'mill'?",
                a: ["Processor (CPU)", "Printer", "Hard drive"],
                c: 0
            }
        ]
    };
    document.querySelectorAll(".quiz-box").forEach(box => {
        const type = box.dataset.quiz;
        const data = quizzes[type];
        if (!data) return;
        let index = 0;
        let score = 0;
        const qEl = box.querySelector(".quiz-question");
        const aEl = box.querySelector(".quiz-answers");
        const fEl = box.querySelector(".quiz-feedback");
        const resetBtn = box.querySelector(".quiz-reset");
        function load() {
            fEl.textContent = "";
            qEl.textContent = data[index].q;
            aEl.innerHTML = "";
            data[index].a.forEach((text, i) => {
                const btn = document.createElement("button");
                btn.className = "btn btn-outline";
                btn.textContent = text;
                btn.addEventListener("click", () => answer(i), { once: true });
                aEl.appendChild(btn);
            });
        }
        function answer(i) {
            if (i === data[index].c) {
                score++;
                fEl.textContent = "Correct ✓";
            } else {
                fEl.textContent = "Incorrect ✕";
            }
            [...aEl.querySelectorAll("button")].forEach(b => b.disabled = true);
            setTimeout(() => {
                index++;
                if (index < data.length) {
                    load();
                } else {
                    qEl.textContent = "Quiz complete!";
                    aEl.innerHTML = "";
                    fEl.textContent = `Score: ${score} / ${data.length}`;
                }
            }, 650);
        }
        resetBtn?.addEventListener("click", () => {
            index = 0;
            score = 0;
            load();
        });
        load();
    });
})();

// Theme toggle (light/dark)
(() => {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const label = document.getElementById("themeLabel");
    if (!toggle || !label) return;
    const saved = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (systemPrefersDark ? "dark" : "light");
    root.dataset.theme = initialTheme;
    toggle.checked = initialTheme === "dark";
    label.textContent = toggle.checked ? "Switch to light mode" : "Switch to dark mode";
    toggle.addEventListener("change", () => {
        const newTheme = toggle.checked ? "dark" : "light";
        root.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
        label.textContent = toggle.checked ? "Switch to light mode" : "Switch to dark mode";
    });
})();

// Hamburger menu toggle
(() => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('mainNav');
    if (hamburgerBtn && nav) {
        hamburgerBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
        });
    }
})();
