const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("admin/dashboard", {
        activePage: "dashboard",
        pageTitle: "Admin Dashboard"
    });
});


app.get("/admin/enrollment", (req, res) => {
    res.render("admin/enrollment", {
        activePage: "enrollment",
        pageTitle: "Enrollment"
    });
});


app.get("/admin/students", (req, res) => {
    res.render("admin/students", {
        activePage: "students",
        pageTitle: "Students"
    });
});
app.get("/admin/faculty", (req, res) => {
    res.render("admin/faculty", {
        activePage: "faculty",
        pageTitle: "Faculty"
    });
});
app.get("/admin/academic-year", (req, res) => {
    res.render("admin/academic-year", {
        activePage: "academic-year",
        pageTitle: "Academic Year"
    });
});
app.get("/admin/sections", (req, res) => {
    res.render("admin/sections", {
        activePage: "sections",
        pageTitle: "Sections"
    });
});
app.get("/admin/reports", (req, res) => {
    res.render("admin/reports", {
        activePage: "reports",
        pageTitle: "Reports"
    });
});
app.get("/admin/settings", (req, res) => {
    res.render("admin/settings", {
        activePage: "settings",
        pageTitle: "Settings"
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});