import ShaderManager from "./lib/shaderManager";

const btn = document.querySelector(".js-btn");
const view = document.querySelector(".js-view");
const manager = new ShaderManager(view);

manager.init();

btn,
    addEventListener("click", () => {
        manager.changeView();
    });
