// Initialize Lenis smooth scrolling
const lenis = new Lenis({
    duration: 0.6,
    easing: (t) => t,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.2,
});

// Get RAF (Request Animation Frame)
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

// Start the animation frame
requestAnimationFrame(raf);

// Handle navbar background on scroll
const navbar = document.querySelector('.navbar');
const serviceItems = document.querySelectorAll('.service-item');
const caseStudyItems = document.querySelectorAll('.case-study-item');
let lastScrollTop = 0;

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Handle scroll animations
lenis.on('scroll', ({ scroll }) => {
    // Add/remove scrolled class based on scroll position
    if (scroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Animate service items when they come into view
    serviceItems.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('is-inview');
        }
    });

    // Animate case study items when they come into view
    caseStudyItems.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('is-inview');
        }
    });
    
    // Update last scroll position
    lastScrollTop = scroll;
});

// Smooth scroll to sections when clicking on navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.5,
                easing: (t) => 1 - Math.pow(1 - t, 3) // Cubic ease-out
            });
        }
    });
});

// Wireframe cube animation on canvas
(function() {
    const canvas = document.getElementById('wire-cube-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const size = 170;
    const vertices = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1]
    ];
    const edges = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7]
    ];
    let angle = 0;
    function project([x, y, z]) {
        const scale = size / (z + 4);
        return [
            w/2 + x * scale,
            h/2 + y * scale
        ];
    }
    function draw() {
        ctx.clearRect(0, 0, w, h); // Only clear, do not fill with any color
        // Rotate cube
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const cosB = Math.cos(angle * 0.7);
        const sinB = Math.sin(angle * 0.7);
        const rotated = vertices.map(([x, y, z]) => {
            // Rotate Y
            let x1 = x * cosA - z * sinA;
            let z1 = x * sinA + z * cosA;
            // Rotate X
            let y1 = y * cosB - z1 * sinB;
            let z2 = y * sinB + z1 * cosB;
            return [x1, y1, z2];
        });
        // Draw edges
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (const [a, b] of edges) {
            const [x1, y1] = project(rotated[a]);
            const [x2, y2] = project(rotated[b]);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();
    }
    function animate() {
        angle += 0.02;
        draw();
        requestAnimationFrame(animate);
    }
    animate();
})(); 