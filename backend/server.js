const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 10000;


/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


/*
|--------------------------------------------------------------------------
| Static Files
|--------------------------------------------------------------------------
*/

app.use(
    "/css",
    express.static(
        path.join(__dirname, "..", "css")
    )
);


app.use(
    "/js",
    express.static(
        path.join(__dirname, "..", "js")
    )
);


app.use(
    "/assets",
    express.static(
        path.join(__dirname, "..", "assets")
    )
);


/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "..",
            "frontend",
            "index.html"
        )
    );

});


/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {

    res.status(200).json({
        status: "ok",
        message: "WSA MSA server is running"
    });

});


/*
|--------------------------------------------------------------------------
| Test API
|--------------------------------------------------------------------------
*/

app.get("/api/test", (req, res) => {

    res.status(200).json({
        success: true,
        message: "WSA MSA API is working"
    });

});


/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Page or API route not found"
    });

});


/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `WSA MSA server running on port ${PORT}`
        );

    }
);
