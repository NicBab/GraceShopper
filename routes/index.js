const apiRouter = require('express').Router();

const { getAllUsers } = require("../db");

apiRouter.get("/users", async (req, res, next) => {
    try {
        const users = await getAllUsers

    } catch ({name, messages}) {
      next({name, messages})
    }
})

module.exports = apiRouter;