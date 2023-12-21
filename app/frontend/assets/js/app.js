'use strict'

import { getAllContacts } from "./apiCalls.js"
import { handleBirth, handleDelete, handleEdit, handleNew, numberToCellphone } from "./handlers.js"
import { masker } from "./masker.js"
import { isEditing } from "./watchableVar.js"

document.querySelector("#contact-creator").addEventListener("submit", handleNew)
document.getElementById("button-cancel").addEventListener("click", () => isEditing.value = false)

const load = async () => {
    masker()
    const tableBody = document.querySelector("#table-body")
    const contacts = await getAllContacts()

    tableBody.append(...contacts.map(createTableElement))
    document.querySelectorAll(".actions-button").forEach(item => {
        item.addEventListener("click", ({ currentTarget }) => {
            const [action, id] = currentTarget.id.split("-")

            if (action === "delete") {
                document.querySelectorAll(".actions-button").forEach(item => {
                    item.disabled = true
                })
                handleDelete(id)
            } else {
                localStorage.setItem("edit-id", id)
                isEditing.value = true
                document.getElementById("form-container").scrollIntoView()
            }
        })
    })
}

const createTableElement = (data) => {
    const tr = document.createElement("tr")
    tr.setAttribute("id", `container-${data.id}`)
    tr.innerHTML = `
        <td>${data.name}</td>
        <td>${handleBirth(data.birth_date, "tableBuild")}</td>
        <td>${data.email}</td>
        <td>${numberToCellphone(data.cellphone)}</td>
        <td>
            <div class="d-flex justify-content-around gap-1">
                <button class="actions-button" id="edit-${data.id}">
                    <img src="./assets/img/editar.png" alt="editar contato">
                </button>
                <button class="actions-button" id="delete-${data.id}">
                    <img src="./assets/img/excluir.png" alt="excluir contato">
                </button>
            </div>
        </td>
    `
    return tr
}


load()