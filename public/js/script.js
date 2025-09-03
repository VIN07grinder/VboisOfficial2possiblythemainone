const getPath = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
	const blobsenabled = localStorage.getItem("blobs") || "true";
	const stars = localStorage.getItem("stars") || "true";
	const starselement = document.getElementById("particles-js");
	const blobselement = document.getElementById("blobs");
	const navbar = `<div class="navbar">
      <div class="navbar-logo">
        <button class="button logo">
          <a href="/"><img src="/media/logo.svg" alt="Logo" /></a>
        </button>
      </div>
      <div></div>
      <div class="navbar-links">
        <a href="/">
          <div class="navbar-item navbar-item-home" id="home">
            <i class="fa-regular fa-house"></i>
            <span>Home</span>
          </div>
        </a>

        <a href="/science">
          <div class="navbar-item" id="games">
            <i class="fa-regular fa-gamepad"></i>
            <span>&#x47;&#x61;&#x6D;&#x65;&#x73;</span>
          </div>
        </a>
             <a href="/search">
          <div class="navbar-item" id="search">
            <i class="fa-regular fa-magnifying-glass"></i>
            <span>Search</span>
          </div>
        </a>
        <a href="/math">
          <div class="navbar-item" id="apps">
            <i class="fa-regular fa-grid-2"></i>
            <span>Apps</span>
          </div>
        </a>

        <a href="/settings">
          <div class="navbar-item" id="settings">
            <i class="fa-regular fa-gear"></i>
            <span>Settings</span>
          </div>
        </a>
      </div>
    </div>`;

	document.body.insertAdjacentHTML("afterbegin", navbar);

	fetch("../package.json")
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("version").textContent = `v${data.version}`;
		});
	document.body.setAttribute(
		"theme",
		localStorage.getItem("theme") || "default",
	);

	if (starselement && stars === "false") {
		starselement.classList.add("hide");
	}

	if (blobselement && blobsenabled === "false") {
		blobselement.classList.add("hide");
	}

	document.addEventListener("keydown", keyCheck);

	function keyCheck(e) {
		const panicKey = localStorage.getItem("panicKey") || "`";
		const panicUrl =
			localStorage.getItem("panicUrl") ||
			"https://www.google.com/search?q=elon+musk";

		if (!panicKey || !panicUrl) return;

		if (e.key === panicKey) {
			window.location.href = panicUrl;
		}
	}

	function fetchSearchEngine() {
		try {
			const searchengine = localStorage.getItem("se");
			const seElement = document.getElementById("proxy-search-engine");
			const searchIcon = document.getElementById("search-icon");
			const address = document.getElementById("proxy-address");
			if (searchengine === "google") {
				seElement.value = "https://www.google.com/search?q=%s";
				searchIcon.src = "/media/cloaks/google.png";
				address.placeholder = "Search the the web with Google";
			} else if (searchengine === "bing") {
				seElement.value = "https://www.bing.com/search?q=%s";
				searchIcon.src = "/media/cloaks/bing.png";
				address.placeholder = "Search the the web with Bing";
			} else if (searchengine === "ddg") {
				seElement.value = "https://duckduckgo.com/?q=%s";
				searchIcon.src = "/media/cloaks/ddg.png";
				address.placeholder = "Search the the web with DuckDuckGo";
			} else if (searchengine === "brave") {
				seElement.value = "https://search.brave.com/search?q=%s";
				searchIcon.src = "/media/cloaks/brave.png";
				address.placeholder = "Search the the web with Brave";
			}
		} catch (err) {
			console.log("[Lunaar]", "Something bad happened", err);
		}
	}

	fetchSearchEngine();
	const pathname = window.location.pathname.slice(1);

	const pathMap = {
		"": "home",
		science: "games",
		search: "search",
		math: "apps",
		settings: "settings",
	};

	const currentNavItemId = pathMap[pathname] || "home";
	const currentNavItem = document.getElementById(currentNavItemId);

	if (currentNavItem) {
		currentNavItem.classList.add("active");
		const icon = currentNavItem.querySelector("i");
		if (icon) {
			icon.classList.remove("fa-regular");
			icon.classList.add("fa-solid");
		}
	}
});
