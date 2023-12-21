import { createNewContact, deleteContact, editContact, getContactbyId } from "./apiCalls.js"

export const handleNew = async (e) => {
    e.preventDefault()

    const getElementValue = (id) => document.getElementById(id).value
    const isChecked = (id) => document.getElementById(id).checked ? 1 : 0

    const data = {
        name: getElementValue("name-input"),
        birth_date: handleBirth(getElementValue("birth-input"), "send"),
        email: getElementValue("email-input"),
        profession: getElementValue("profession-input"),
        phone: phoneToNumber(getElementValue("phone-input")),
        cellphone: phoneToNumber(getElementValue("cellphone-input")),
        has_whatsapp: isChecked("has-whatsapp"),
        email_notifications: isChecked("email-notific"),
        sms_notifications: isChecked("sms-notific")
    }

    const statusCode = await createNewContact(data)

    if (statusCode === 201) {
        showToast('toast-register-success', 1000, "cadastrado", true)
        setTimeout(() => window.location.reload(), 1000)
    } else {
        showToast('toast-register-failure', 2000, "o cadastro", false)
    }
}

export const handleDelete = async (id) => {
    const contactinTable = document.getElementById(`container-${id}`)
    const toast = document.getElementById('toast-contact-deletion')
    const confirmButton = document.getElementById("button-delete-confirm")
    const cancelButton = document.getElementById("button-delete-cancel")
    const closeButton = document.getElementById("button-delete-close")
    const deleteToastBody = document.getElementById("delete-toast-body")

    contactinTable.classList.add("text-bg-danger")

    const bsAlert = new bootstrap.Toast(toast, {
        autohide: false
    })
    bsAlert.show()

    toast.addEventListener('hidden.bs.toast', () => {
        contactinTable.classList.remove("text-bg-danger")
        document.querySelectorAll(".actions-button").forEach(item => {
            item.disabled = false
        })
    })

    confirmButton.addEventListener("click", async () => {
        confirmButton.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`
        cancelButton.style.display = "none"
        closeButton.style.display = "none"
        deleteToastBody.textContent = "Deletando dados..."

        const statusCode = await deleteContact(id)

        if (statusCode === 200) {
            bsAlert.hide()
            setTimeout(() => window.location.reload(), 1000)
        } else {
            confirmButton.style.display = "none"
            cancelButton.style.display = "block"
            closeButton.style.display = "block"
            deleteToastBody.textContent = "Algo deu errado durante a exclusão do contato!"
            setTimeout(() => window.location.reload(), 1000)
        }
    }, { once: true })
}

export const handleEdit = async (e) => {
    e.preventDefault()

    const getElementValue = (id) => document.getElementById(id).value
    const isChecked = (id) => document.getElementById(id).checked ? 1 : 0

    const data = {
        name: getElementValue("name-input"),
        birth_date: handleBirth(getElementValue("birth-input"), "send"),
        email: getElementValue("email-input"),
        profession: getElementValue("profession-input"),
        phone: phoneToNumber(getElementValue("phone-input")),
        cellphone: phoneToNumber(getElementValue("cellphone-input")),
        has_whatsapp: isChecked("has-whatsapp"),
        email_notifications: isChecked("email-notific"),
        sms_notifications: isChecked("sms-notific")
    }

    const editId = localStorage.getItem("edit-id")
    const statusCode = await editContact(data, editId)

    if (statusCode === 200) {
        showToast('toast-register-success', 1000, "editado", true)
        setTimeout(() => window.location.reload(), 1000)
    } else {
        showToast('toast-register-failure', 2000, "a edição", false)
    }
}

export const formBuild = async () => {
    const id = localStorage.getItem("edit-id")
    const data = await getContactbyId(id)

    const setValue = (id, value) => document.getElementById(id).value = value
    const setChecked = (id, checked) => document.getElementById(id).checked = checked

    setValue("name-input", data.name)
    setValue("birth-input", handleBirth(data.birth_date, "formBuild"))
    setValue("email-input", data.email)
    setValue("profession-input", data.profession)
    setValue("phone-input", numberToPhone(data.phone))
    setValue("cellphone-input", numberToCellphone(data.cellphone))
    setChecked("has-whatsapp", data.has_whatsapp)
    setChecked("email-notific", data.email_notifications)
    setChecked("sms-notific", data.sms_notifications)
}

export const formCleaner = async () => {
    document.querySelector("#contact-creator").reset()
}

export const handleBirth = (birthDate, type) => {
    if (type == "send") {
        const birthArray = birthDate.split("/")
        return `${birthArray[2]}-${birthArray[1]}-${birthArray[0]}`
    }
    const birthArray = birthDate.split("-")
    return `${birthArray[2]}/${birthArray[1]}/${birthArray[0]}`
}
export const numberToCellphone = (number) => {
    return number.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}
const numberToPhone = (number) => {
    return number ? number.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3') : ""
}
const phoneToNumber = (phone) => {
    if (phone == "") {
        return null
    }
    return phone.replace(/\D/g, "")
}

const showToast = (id, delay, body, isSuccess) => {
    const toastBody = document.getElementById(`register-toast-body-${isSuccess ? 'success' : 'failure'}`)
    
    if (toastBody) {
        toastBody.textContent = isSuccess ? `O contato inserido foi ${body} com sucesso` : `Algo deu errado durante ${body} do contato`
    }

    const toast = document.getElementById(id)

    let bsAlert = new bootstrap.Toast(toast, { animation: true, autohide: true, delay })
    bsAlert.show()
}