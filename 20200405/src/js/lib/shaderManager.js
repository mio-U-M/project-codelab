import { IMG_DIR } from "../../constants.yml";
import gsap from "gsap";
import vert from "../../shader/vertics.vert";
import frag from "../../shader/fragment.frag";

const TEXTURE_1 = `${IMG_DIR}/texture1.jpg`;
const TEXTURE_1_BLUR = `${IMG_DIR}/texture1_blur.jpg`;

const TETURE = {
    main: `${IMG_DIR}/texture1.jpg`,
    mainBlur: `${IMG_DIR}/texture1_blur.jpg`,
    menu1: `${IMG_DIR}/menu1.jpg`,
    menu2: `${IMG_DIR}/menu2.jpg`,
    menu3: `${IMG_DIR}/menu3.jpg`
};

export default class ShaderManager {
    constructor(canvas) {
        this.canvas = canvas;

        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.mesh = null;

        this.texture = {};
        this.uniforms = null;

        // change
        this.isBlurActive = false;
        this.menuMode = null;
    }

    init() {
        this.setupWebgl();
        this.resize();

        gsap.ticker.add(time => {
            // btn: change view
            // if (this.isBlurActive) {
            //     if (!this.menuMode && this.uniforms.uImageBlend.value > 0) {
            //         this.uniforms.uImageBlend.value -= 0.02;
            //     }

            //     if (this.menuMode && this.uniforms.uImageBlend.value < 1.0) {
            //         this.uniforms.uImageBlend.value += 0.02;
            //     }
            // } else {
            //     if (this.uniforms.uImageBlend.value < 1.0) {
            //         this.uniforms.uImageBlend.value += 0.02;
            //     }
            // }

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

        // texture
        this.createTextures();

        this.uniforms = {
            uResolution: { type: "v2", value: new THREE.Vector2() },
            uTime: { type: "f", value: 0 },
            uTexture1: {
                type: "t",
                value: this.texture.main
            },
            uTexture2: {
                type: "t",
                value: this.texture.mainBlur
            },
            // image blend
            uImageBlend: { type: "f", value: 1.0 },
            // wave animation
            uWaveImpact: { type: "f", value: 0.0 }
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
        this.canvas.style.width = window.innerWidth;
        this.canvas.style.height = window.innerHeight;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.uniforms.uResolution.value.x = this.renderer.domElement.width;
        this.uniforms.uResolution.value.y = this.renderer.domElement.height;
    }

    createTextures() {
        Object.keys(TETURE).forEach(key => {
            this.texture[key] = new THREE.TextureLoader().load(TETURE[key]);
        });
    }

    changeView() {
        this.isBlurActive = !this.isBlurActive;

        if (this.isBlurActive) {
            this.animateMenu(true);
            this.animateImageBlend("down");
        } else {
            this.initMainImage();
            this.initSubImage();
            this.animateMenu(false);
            this.animateImageBlend("up");
        }

        this.animateWave();
    }

    changeMenuMode(id) {
        this.menuMode = id;
        this.setMainImage(id);
        this.animateImageBlend("up");
        this.animateWave(0.5);
    }

    clearMenuMode() {
        this.menuMode = null;
        this.animateImageBlend("down");
        this.animateWave(0.5);
    }

    setMainImage(id) {
        this.uniforms.uTexture1.value = this.texture[id];
    }

    initMainImage() {
        this.uniforms.uTexture1.value = this.texture.main;
    }

    initSubImage() {
        this.uniforms.uTexture2.value = this.texture.mainBlur;
    }

    // animation
    animateImageBlend(direction) {
        switch (direction) {
            case "up":
                gsap.to(this.uniforms.uImageBlend, 0.6, {
                    value: 1.0,
                    ease: "sine.out"
                });
                break;
            case "down":
                gsap.to(this.uniforms.uImageBlend, 0.6, {
                    value: 0.0,
                    ease: "sine.out"
                });
                break;
            default:
                break;
        }
    }

    animateMenu(isShow) {
        if (isShow) {
            gsap.set(".js-menu", { pointerEvents: "auto" });
            gsap.to(".js-menu", 0.5, {
                opacity: 1,
                ease: "sine.out",
                delay: 0.3
            });
        } else {
            gsap.set(".js-menu", { pointerEvents: "none" });
            gsap.to(".js-menu", 0.5, {
                opacity: 0,
                ease: "sine.out",
                delay: 0.3
            });
        }
    }

    animateWave(time = 0.6) {
        if (this.waveTl) this.waveTl.kill();
        this.waveTl = gsap.timeline();
        this.waveTl.to(this.uniforms.uWaveImpact, time / 2, {
            value: 1.0,
            ease: "sine.out"
        });
        this.waveTl.to(this.uniforms.uWaveImpact, time / 2, {
            value: 0.0,
            ease: "sine.out"
        });
    }
}
