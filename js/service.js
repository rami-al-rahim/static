function loadAssets() {
    // Check and load Bootstrap JS
    if (!document.querySelector('script[src*="bootstrap.bundle.min.js"]')) {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.integrity = 'sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO';
        bootstrapScript.crossOrigin = 'anonymous';
        document.head.appendChild(bootstrapScript);
    }

    // Check and load Bootstrap CSS
    if (!document.querySelector('link[href*="bootstrap.min.css"]')) {
        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css';
        bootstrapCSS.integrity = 'sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT';
        bootstrapCSS.crossOrigin = 'anonymous';
        document.head.appendChild(bootstrapCSS);
    }

    // Check and load Material Symbols
    if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
        const materialIcons = document.createElement('link');
        materialIcons.rel = 'stylesheet';
        materialIcons.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
        document.head.appendChild(materialIcons);
    }
}

// Create and inject the popup container (hidden by default)
function createAppsPopup() {
    if (document.getElementById('apps-popup')) return;
    const popup = document.createElement('div');
    popup.id = 'apps-popup';
    popup.style.display = 'none';
    popup.style.position = 'fixed';
    popup.style.top = '60px';
    popup.style.right = '30px';
    popup.style.zIndex = '9999';
    popup.style.background = '#fff';
    popup.style.border = '1px solid #ddd';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 2px 16px rgba(0,0,0,0.15)';
    popup.style.padding = '16px';
    popup.style.minWidth = '320px';
    popup.style.maxWidth = '90vw';
    popup.style.maxHeight = '70vh';
    popup.style.overflowY = 'auto';
    popup.innerHTML = `<div id="apps-popup-content">Loading...</div>`;
    document.body.appendChild(popup);

    // Hide popup when clicking outside
    document.addEventListener('mousedown', function(e) {
        if (!popup.contains(e.target) && !e.target.closest('.material-symbols-outlined.user-select-none')) {
            popup.style.display = 'none';
        }
    });
}

// Fetch data and render in popup
async function loadAppsData() {
    try {
        const res = await fetch('https://rami-dev.com/data.json');
        const data = await res.json();
        renderAppsPopup(data);
    } catch (e) {
        document.getElementById('apps-popup-content').innerHTML = 'Failed to load apps.';
    }
}

// Render the popup content
function renderAppsPopup(apps) {
    const content = apps.map(app => `
        <a href="${app.url}" target="_blank" style="text-decoration:none;color:inherit;">
            <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid #eee;">
                <img src="${app.iconURL}" alt="${app.name}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
                <div>
                    <div style="font-weight:600;">${app.name}</div>
                    <div style="font-size:13px;color:#666;">${app.description}</div>
                </div>
            </div>
        </a>
    `).join('');
    document.getElementById('apps-popup-content').innerHTML = content;
}

// Attach click event to the apps icon
function setupAppsPopupTrigger() {
    // Wait for DOMContentLoaded in case the span is not yet available
    document.addEventListener('DOMContentLoaded', () => {
        createAppsPopup();
        const trigger = document.querySelector('.material-symbols-outlined.user-select-none');
        if (trigger) {
            trigger.style.cursor = 'pointer';
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                const popup = document.getElementById('apps-popup');
                if (popup.style.display === 'none') {
                    popup.style.display = 'block';
                    document.getElementById('apps-popup-content').innerHTML = 'Loading...';
                    loadAppsData();
                } else {
                    popup.style.display = 'none';
                }
            });
        }
    });
}

// Call the function when the script loads
loadAssets();
setupAppsPopupTrigger();



document.getElementById("service-box").innerHTML += `
<span class="material-symbols-outlined user-select-none">
            apps
        </span>`;