const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 2842;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => res.render("index"));

app.post('/', (req, res) => {
    const { description } = req.body;
    if (!description || description.length <= 0) return res.render("index", { error: "uh no", description });
    res.redirect(`/${encodeURIComponent(description).replace(/%20/g, "/")}`);
});

app.get('/:path(*)', (req, res) => {
    const description = decodeURIComponent(req.url.trimStart("/").replace(/(\+|\/)/g, " ")).trim();
    if (description.length > 0) res.render("desc", { description, url: req.url });
    else res.redirect("/");
});

app.use((_, res) => res.sendStatus(404));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
