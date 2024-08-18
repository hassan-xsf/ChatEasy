"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const index_1 = require("./database/index");
(0, index_1.connectDB)()
    .then(() => {
    app_1.server.listen(process.env.PORT || 3000, () => {
        console.log("Server is running on port: " + process.env.PORT || 3000);
    });
})
    .catch((e) => {
    console.log("E:" + e);
});
