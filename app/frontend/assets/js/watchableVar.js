import { formBuild, formCleaner, handleEdit, handleNew } from "./handlers.js";

export const isEditing = new Proxy({ value: false }, {
    set: async (target, key, value) => {
        target[key] = value;
        const form = document.getElementById("contact-creator");
        const buttonSubmit = document.getElementById("button-submit");
        const buttonCancel = document.getElementById("button-cancel");

        if (!value) {
            form.removeEventListener("submit", handleEdit)
            form.addEventListener("submit", handleNew)
            buttonSubmit.textContent = "Cadastrar Contato"
            buttonCancel.classList.add("hide")
            formCleaner()
        } else {
            form.removeEventListener("submit", handleNew)
            form.addEventListener("submit", handleEdit)
            buttonSubmit.textContent = "Editar Contato"
            buttonCancel.classList.remove("hide")
            await formBuild()
        }

        return true
    }
})