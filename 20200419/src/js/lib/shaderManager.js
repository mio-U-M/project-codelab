import gsap from "gsap";
import vert from "../../shader/vertics.vert";
import gradientFrag from "../../shader/gradient.frag";
import textureFrag from "../../shader/texture.frag";
import { IMG_DIR } from "../../constants.yml";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const DIRECTIONAL_LIGHT_PARAM = {
    color: 0xffffff,
    intensity: 1.0,
    x: 1.0,
    y: 1.0,
    z: 1.0
};

const COLOR_PALLETE = {
    vividpurple: "#A599FD",
    pinkred: "#EE54DA",
    skyblue: "#197CE4"
};

export default class ShaderManager {
    constructor(canvas) {
        this.canvas = canvas;

        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.light = null;

        this.uniforms = null;

        this.color1 = [...this.hexToRgb(COLOR_PALLETE.vividpurple)];
        this.color2 = [...this.hexToRgb(COLOR_PALLETE.skyblue)];
        this.color3 = [...this.hexToRgb(COLOR_PALLETE.pinkred)];
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
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight
        );
        this.camera.position.set(0, 0, +100);
        // plane
        this.planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
        // spehre
        this.sphereGeometry = new THREE.SphereGeometry(10, 32, 32);

        this.uniforms = {
            uResolution: { type: "v2", value: new THREE.Vector2() },
            uTime: { type: "f", value: 0 },
            uTexture: {
                type: "t",
                value: THREE.TextureLoader(`${IMG_DIR}/3d_graphic_texture.jpg`)
            },
            uColor1: {
                type: "v3",
                value: new THREE.Vector3(
                    this.color1[0],
                    this.color1[1],
                    this.color1[2]
                )
            },
            uColor2: {
                type: "v3",
                value: new THREE.Vector3(
                    this.color2[0],
                    this.color2[1],
                    this.color2[2]
                )
            },
            uColor3: {
                type: "v3",
                value: new THREE.Vector3(
                    this.color3[0],
                    this.color3[1],
                    this.color3[2]
                )
            },
            uNoiseOffset1: { type: "f", value: 2.8 },
            uNoiseOffset2: { type: "f", value: 1.2 },
            uNoiseOffset3: { type: "f", value: 1.8 }
        };
        this.gradientShaderMaterial = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: gradientFrag,
            vertexShader: vert
        });
        this.textureShaderMaterial = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: textureFrag,
            vertexShader: vert
        });

        // マテリアルのパラメータ
        const MATERIAL_PARAM = {
            color: 0x3399ff,
            specular: 0xffffff
        };
        const samplemesh = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

        this.planeMesh = new THREE.Mesh(this.planeGeometry, samplemesh);
        this.planeMesh.position.z = -1;
        // this.scene.add(this.planeMesh);

        for (let index = 0; index < 3; index++) {
            const sphereMesh = new THREE.Mesh(this.sphereGeometry, samplemesh);

            sphereMesh.position.x = Math.random() * 10.0;
            sphereMesh.position.y = Math.random() * 10.0;
            sphereMesh.position.z = 0;

            this.scene.add(sphereMesh);
        }

        this.light = new THREE.DirectionalLight(
            DIRECTIONAL_LIGHT_PARAM.color,
            DIRECTIONAL_LIGHT_PARAM.intensity
        );
        this.light.position.x = DIRECTIONAL_LIGHT_PARAM.x;
        this.light.position.y = DIRECTIONAL_LIGHT_PARAM.y;
        this.light.position.z = DIRECTIONAL_LIGHT_PARAM.z;
        this.scene.add(this.light);

        const axes = new THREE.AxesHelper(25);
        this.scene.add(axes);

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
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

    hexToRgb(color) {
        // #が先頭についてたら除去
        const replacedColor = color.replace(/#/g, "");

        return [
            parseInt(replacedColor.substr(0, 2), 16),
            parseInt(replacedColor.substr(2, 2), 16),
            parseInt(replacedColor.substr(4, 2), 16)
        ];
    }
}
