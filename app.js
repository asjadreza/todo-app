
// why do we need ejs template?
// ejs = embedded javascript templating

// EJS templates are used in Node.js applications to generate HTML pages. They are a simple and effective\
// way to create dynamic web pages that can be easily updated and maintained.


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js")




const app = express();

let items = ["Buy food", "cook food", "write code"];
let workItems = [];


const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// let today = new Date();
	// let currentDay = today.getDay();
	// let day = '';

	// if(currentDay === 6 || currentDay === 0){
	// 	// res.send("Yaay it's weekend!!");
	// 	day = "Weekend"; 
	// 	// res.sendFile(__dirname + '/weekend.html')
	// 	// res.render('list', {KindOfDay: day}); // ejs example (from ejs github)
	// } else {
	// 	// res.sendFile(__dirname + '/index.html')
	// 	day = "Weekday"
	// 	// res.sendFile(__dirname + "/weekday.html");
	// }

	// let options = {
	// 	weekday: "long",
	// 	day: "numeric",
	// 	month: "long"
	// };
	// let day = today.toLocaleDateString("en-US", options);
	let day = date.getDate(); 

	res.render('list', { listTitle: day, newListItems: items });  // we can do this way also
});

app.get("/work", function (req, res) {
	res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.get("/about", function(req, res) {
	res.render("about")
})

app.post("/", function (req, res) {
	let item = (req.body.newItem);
	if (req.body.list === "Work List") {
		workItems.push(item);
		res.redirect('/work')
	} else {
		items.push(item);
		res.redirect('/');
	}
})

app.post("/work", function (req, res) {
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
})

app.listen(port, function () {
	console.log(`Server is running on port ${port}`);
})