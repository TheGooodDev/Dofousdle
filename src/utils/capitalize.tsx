

export function CapitalizeAll(str: string) {
    return str.split(' ').map((word) => {
        return Capitalize(word)
    }).join(' ')
}

function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}