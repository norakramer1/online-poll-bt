const http = require('http');
const hostname = '127.0.0.1';
<<<<<<< HEAD
const port = process.env.PORT || 7000;
=======
const port = process.env.PORT || 5500;
>>>>>>> fd08085a38bce651f9153af4d6f2cc21ee637108
 // let ejs = require('ejs');
const bodyParser = require('body-parser');
const {v4: uuidv4 } = require('uuid');
const fs = require('fs');
const express = require('express')
const app = express()


// sets view engine as ejs
app.set('view engine', 'ejs');

// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set('views', './views');

// Hierdoor kan ik CSS en JS bestanden aan de client side uitlezen
app.use(express.static(__dirname + '/public'));

// Gebruik body-parser om te lezen wat er in POST requests van de form staat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  //console.log(res)
  res.render("home", {
    pageTitle: "Home",
  });
});

// respond with view poll render on viewpoll route
app.get("/makepoll", (req, res) => {
  res.render("makepoll", {
    pageTitle: "Make A New Poll",
  });
});

let voteAnswers = [];
let removeAnswers = [];
// get form data and post to json file, then render viewpoll view
app.post("/makepoll", (req, res) => {
  fs.readFile("statham.json", "utf8", (err, data) => {
    let pollList = JSON.parse(data);
    let arr = {
      id: uuidv4(),
      vraag: req.body.vraag,
      antwoordA: req.body.antwoordA,
      antwoordB: req.body.antwoordB,
      votes: voteAnswers,
      remove: removeAnswers,
    };
    pollList.push(arr);
    let pollSubmit = JSON.stringify(pollList, null, 2);
    fs.writeFile("statham.json", pollSubmit, "utf8", (cb) => {});
  });
  res.render("home", {
    pageTitle: "Poll questions",
  });
});

// respond with view poll render on viewpoll route
app.get("/viewpoll", (req, res) => {
  fs.readFile("statham.json", "utf8", (err, data) => {
    let pollList = JSON.parse(data);
    pollList.reverse();
    // console.log(pollList)

    res.render("viewpoll", { 
      data: pollList,
      pageTitle: "View Polls",
    })
  })
 
});

let pollVotesA;
let pollVotesB;
// let removeItem;
//take poll answers and put results in json file, then render viewanswers
app.post("/:id", (req, res) => {
  voteAnswers.push(req.body.answer)
  // console.log(voteAnswers)
  fs.readFile("statham.json", "utf8", (err, data) => {
    let pollList = JSON.parse(data);
    // console.log(pollList);
    pollList.forEach(item => {
      if (item.id === req.params.id) {
        item.votes.push(req.body.answer);
    pollVotesA = item.votes.filter(vote => vote === item.antwoordA).length;
    pollVotesB = item.votes.filter(vote => vote === item.antwoordB).length;
    // removeItem = item.remove.filter(remove => remove === item.remove).length;
    // console.log(pollVotesA, pollVotesB)
      }
    })
    let pollAntwoorden = JSON.stringify(pollList, null, 2);
    fs.writeFile("statham.json", pollAntwoorden, "utf8", (cb) => {});

    res.redirect("viewanswers")

  });


});


//view poll results on poll results page
app.get("/viewanswers", (req, res) => {
  fs.readFile('statham.json', (err, data) => {
    console.log(pollVotesA);
    res.render("viewanswers", {
    pageTitle: 'poll results',
    hoeveelheidA: pollVotesA,
    hoeveelheidB: pollVotesB,
    });
  });
});


// delete polls on view poll page
// app.get("/delete", (req, res) => {
//   // voteAnswers.push(req.body.answer)
//   fs.readFile("statham.json", "utf8", (err, data) => {
//     let polls = JSON.parse(data);
 
// // console.log(removePoll)
// let removeItem = polls.filter(poll => poll.id !== "29d36f13-e19a-4882-92a6-619ae48b7da3");
// console.log(removeItem)

// pollRemove.forEach(item => {
//   if (item.id === req.params.id) {
//     item.votes.push(req.body.answer);
// pollVotesA = item.votes.filter(vote => vote === item.antwoordA).length;
// pollVotesB = item.votes.filter(vote => vote === item.antwoordB).length;
// // console.log(pollVotesA, pollVotesB)
//   }
// })

// // console.log(req.body.delete)
//   });
// });

// listen to the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
