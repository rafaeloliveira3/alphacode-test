const applyMask = (input, mask) => {
    input.addEventListener('input', () => {
        const cleanValue = input.value.replace(/\D/g, "")
        let maskedValue = ""

        for (let i = 0, j = 0; i < mask.length && j < cleanValue.length; i++) {
            maskedValue += mask[i] === 'D' ? cleanValue[j++] : mask[i]
        }

        input.value = maskedValue
    })
}

export const masker = () => {
    const cellphoneInput = document.getElementById("cellphone-input")
    applyMask(cellphoneInput, '(DD) DDDDD-DDDD')

    const birthInput = document.getElementById("birth-input")
    applyMask(birthInput, 'DD/DD/DDDD')

    const phoneInput = document.getElementById("phone-input")
    applyMask(phoneInput, '(DD) DDDD-DDDD')
}
