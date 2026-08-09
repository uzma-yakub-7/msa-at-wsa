document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    setCurrentYear();
    setupMobileNavigation();
});


function loadHeader() {
    const header = document.getElementById("site-header");

    if (!header) {
        return;
    }

    header.innerHTML = `
        <div class="header-container">

            <a href="/" class="site-logo">
                MSA at WSA
            </a>

            <button
                class="nav-toggle"
                type="button"
                aria-label="Open navigation"
                aria-expanded="false"
            >
                ☰
            </button>

            <nav class="site-nav" aria-label="Main navigation">

                <a href="/">Home</a>

                <a href="/about.html">
                    About Us
                </a>

                <a href="/events.html">
                    Events
                </a>

                <a href="/leadership.html">
                    Leadership
                </a>

                <a href="/resources.html">
                    Resources
                </a>

                <a href="/join.html">
                    Join MSA
                </a>

                <a href="/contact.html">
                    Contact
                </a>

                <a
                    href="/join.html"
                    class="nav-join"
                >
                    Join MSA
                </a>

            </nav>

        </div>
    `;
}


function loadFooter() {
    const footer = document.getElementById("site-footer");

    if (!footer) {
        return;
    }

    footer.innerHTML = `
        <div class="footer-container">

            <div class="footer-main">

                <div class="footer-brand">

                    <h2>
                        Muslim Student Association
                        at Westchester Square Academy
                    </h2>

                    <p>
                        Gather • Pray • Inspire
                    </p>

                    <div class="footer-social">
                        <a
                            href="https://www.instagram.com/wsa_msa/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram @wsa_msa
                        </a>
                    </div>

                </div>


                <nav
                    class="footer-links"
                    aria-label="Footer navigation"
                >

                    <a href="/">
                        Home
                    </a>

                    <a href="/about.html">
                        About Us
                    </a>

                    <a href="/events.html">
                        Events
                    </a>

                    <a href="/leadership.html">
                        Leadership
                    </a>

                    <a href="/resources.html">
                        Resources
                    </a>

                    <a href="/join.html">
                        Join MSA
                    </a>

                    <a href="/contact.html">
                        Contact
                    </a>

                </nav>

            </div>


            <div class="footer-bottom">

                <p>
                    © <span id="current-year"></span>
                    Muslim Student Association at
                    Westchester Square Academy
                </p>

            </div>

        </div>
    `;
}


function setCurrentYear() {
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}


function setupMobileNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const navigation = document.querySelector(".site-nav");

    if (!toggle || !navigation) {
        return;
    }

    toggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("active");

        toggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        toggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

    });


    navigation.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });
}
