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
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        const geometry = new THREE.PlaneBufferGeometry(2, 2, 128, 128);
        this.uniforms = {
            uResolution: { type: "v2", value: new THREE.Vector2() },
            uTime: { type: "f", value: 0 }
        };
        const material = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: frag,
            vertexShader: vert
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    resize() {
        const size =
            window.innerWidth > window.innerHeight
                ? window.innerWidth
                : window.innerHeight;
        this.canvas.style.width = size;
        this.canvas.style.height = size;
        this.renderer.setSize(size, size);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.uniforms.uResolution.value.x = this.renderer.domElement.width;
        this.uniforms.uResolution.value.y = this.renderer.domElement.height;
    }
}
