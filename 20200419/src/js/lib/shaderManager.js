import gsap from "gsap";
import vert from "../../shader/vertics.vert";
import frag from "../../shader/fragment.frag";

export default class ShaderManager {
    constructor(canvas) {
        this.canvas = canvas;

        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.mesh = null;
        this.light = null;

        this.uniforms = null;
    }

    init() {
        this.setupWebgl();
        this.resize();

        gsap.ticker.add(time => {
            this.uniforms.uTime.value = time;
            this.renderer.render(this.scene, this.camera);
        });
    }

    setupWebgl() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        });
        this.renderer.setClearColor(new THREE.Color(0xffffff));

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        // plane
        this.planeGeometry = new THREE.PlaneBufferGeometry(2, 2, 128, 128);
        // spehre
        this.sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

        this.uniforms = {
            uResolution: { type: "v2", value: new THREE.Vector2() },
            uTime: { type: "f", value: 0 }
        };
        const material = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: frag,
            vertexShader: vert
        });
        // this.mesh = new THREE.Mesh(geometry, material);
        // this.scene.add(this.mesh);
    }

    resize() {
        this.canvas.style.width = window.innerWidth;
        this.canvas.style.height = window.innerHeight;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.uniforms.uResolution.value.x = this.renderer.domElement.width;
        this.uniforms.uResolution.value.y = this.renderer.domElement.height;
    }
}
