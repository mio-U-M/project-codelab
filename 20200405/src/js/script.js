import ShaderManager from "./lib/shaderManager";

const view = document.querySelector(".js-view");
const manager = new ShaderManager(view);

// btn
const btn = document.querySelector(".js-btn");

manager.init();

btn.addEventListener("click", () => {
    manager.changeView();
});

// menubtn
const btnAbout = document.querySelector(".js-menu-about");
btnAbout.addEventListener("mouseenter", () => {
    manager.changeMenuMode("menu1");
});
btnAbout.addEventListener("mouseleave", () => {
    manager.clearMenuMode();
});

const btnWorks = document.querySelector(".js-menu-works");
btnWorks.addEventListener("mouseenter", () => {
    manager.changeMenuMode("menu2");
});
btnWorks.addEventListener("mouseleave", () => {
    manager.clearMenuMode();
});

const btnContact = document.querySelector(".js-menu-contact");
btnContact.addEventListener("mouseenter", () => {
    manager.changeMenuMode("menu3");
});
btnContact.addEventListener("mouseleave", () => {
    manager.clearMenuMode();
});
