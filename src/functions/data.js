// Data functions


export const getBook = async () => {
    try {
        const res = await fetch(`./data/chapters.json`)
        const data = await res.json()
        return data
    } catch (err) {
        return console.log(err)
    }
}