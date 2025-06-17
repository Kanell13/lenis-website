import { ViewCubeGizmo } from '@mlightcad/three-viewcube';
import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cube-container');
    if (!container) return;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    // Set up scene (not used, but required for render loop)
    const scene = new THREE.Scene();

    // Custom face names (optional, can be Greek or English)
    const faceNames = {
        top: 'TOP',
        front: 'FRONT',
        right: 'RIGHT',
        back: 'BACK',
        left: 'LEFT',
        bottom: 'BOTTOM'
    };

    // Set up ViewCubeGizmo with custom colors
    const viewCube = new ViewCubeGizmo(camera, renderer, {
        faceColor: 0x9b6bdc, // Purple
        hoverColor: 0x4a90e2, // Blue on hover
        outlineColor: 0x8cc63f, // Green outline
        dimension: 150,
        faceNames,
        fontSize: 18
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.clear();
        renderer.render(scene, camera);
        viewCube.update();
    }
    animate();

    // Responsive resize
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
}); 