module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/api", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const uploadRoutes = require("./upload.routes")
    app.use("api/upload", uploadRoutes)

    const userRoutes = require("./user.routes")
    app.use("/api/user", userRoutes)

}