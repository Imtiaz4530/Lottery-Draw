function error (msg = "Something went wrong!!!", status = 500) {
    const c = new Error(msg)
    c.status = status
    return c
}

module.exports = error