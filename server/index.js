const app = require("./server");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`express server listening on port ${port}`);
});
