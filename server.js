const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const users = [];
const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://www.manchestereveningnews.co.uk/sport/football/";
const articles = [];
axios(URL)
  .then((res) => {
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);

    $(".teaser").each((index, element) => {
      const title = $(element).children("a").text();
      const titleURL = $(element).children("a").attr("href");
      const image = $(element).children("figure").children("a").children("img").attr('data-src')
      
      articles.push({
        image,
        title,
        titleURL,
      });
    });
  })
  .catch((err) => console.error(err));

app.listen(PORT);
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/")));

app.get("/home", (req, res) => {
  res.render("home", { articles });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  

  try {
    if (req.body.userPw === users[0].userPw) {
      console.log("로그인 성공");
      res.redirect("/home");
    } else {
      alert("비밀번호가 틀립니다.");
    }
  } catch {
    console.log("로그인실패");
  }
});

app.post("/register", (req, res) => {
  // const hashedPassword = await bcrypt.hash(req.body.userPw, 10);

  try {
    users.push({
      id: Date.now().toString(),
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      userPw: req.body.userPw,
    });
    console.log(users);
    res.render("index");
  } catch {
    console.log("회원가입 실패");
  }
});
