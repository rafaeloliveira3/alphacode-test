const url = "http://localhost/api/"

export const getAllContacts = async () => {
    const res = await fetch(url)
    const data = await res.json()
    return data.data
}

export const createNewContact = async (obj) => {
    const res = await fetch(url, {
        method: "POST",
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(obj)
    })
    return res.status
}

export const editContact = async (obj, id) => {
    const res = await fetch(url + `?id=${id}`, {
        method: "PUT",
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(obj)
    })
    return res.status
}

export const deleteContact = async (id) => {
    const res = await fetch(url + `?id=${id}`, {
        method : "DELETE"
    })
    return res.status
}

export const getContactbyId = async (id) => {
    const res = await fetch(url + `?id=${id}`)
    const data = await res.json()
    return data.data[0]
}