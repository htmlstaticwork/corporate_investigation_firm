/**
 * Corporate Investigation Firm - Dashboard Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    // Sidebar items and sections
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const backdrop = document.getElementById('sidebar-overlay');

    // Sidebar Slide and Toggle for mobile
    function toggleSidebar(show) {
        if (show) {
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0');
            backdrop.classList.remove('hidden', 'pointer-events-none');
            setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
            backdrop.classList.add('opacity-0');
            setTimeout(() => {
                backdrop.classList.add('hidden', 'pointer-events-none');
            }, 300);
        }
    }

    const closeSidebarButton = document.getElementById('close-sidebar');

    if (sidebarToggle && sidebar && backdrop) {
        sidebarToggle.addEventListener('click', () => {
            const isHidden = sidebar.classList.contains('-translate-x-full');
            toggleSidebar(isHidden);
        });

        backdrop.addEventListener('click', () => toggleSidebar(false));
    }

    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', () => toggleSidebar(false));
    }

    // Function to switch sections
    function switchSection(targetId) {
        // Update Nav Links
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('bg-accent/10', 'border-accent', 'text-accent');
                item.classList.remove('text-secondary/60', 'border-transparent');
            } else {
                item.classList.remove('bg-accent/10', 'border-accent', 'text-accent');
                item.classList.add('text-secondary/60', 'border-transparent');
            }
        });

        // Update Sections
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
                section.classList.add('block');
                
                // Re-init specific section animations if needed
                if (targetId === 'overview') {
                    initStatusTrackers();
                }
            } else {
                section.classList.add('hidden');
                section.classList.remove('block');
            }
        });

        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024) {
            toggleSidebar(false);
        }
    }

    // Add click listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (target) switchSection(target);
        });
    });

    // Initial Status Trackers
    function initStatusTrackers() {
        const statusTrackers = document.querySelectorAll('.status-track');
        statusTrackers.forEach(tracker => {
            const percentage = tracker.getAttribute('data-percentage');
            tracker.querySelector('.status-line').style.width = percentage + '%';
        });
    }

    initStatusTrackers();

    // Animate metrics on load
    const metrics = document.querySelectorAll('.dashboard-metric');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.classList.add('animate-secure-pulse');
        }, index * 200);
    });
}
