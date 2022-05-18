function PrefList(n) {
    this.size = n;
    this.items = [{item: 0, equals: []}]; // equals is the array where the categories will be stored in order???
    this.current = {item: 1, try: 0, min: 0, max: 1};
    // KEEP
    // BINARY INSERTION SORT
    this.addAnswer = function(pref) {
        if (pref == 0) { // no preference is selected
            this.items[this.current.try].equals.push(this.current.item); // pushing 1 into equals array
            this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length}; // item: 2, try: 0, min: 0, max: 1
        } else {
            if (pref == -1) this.current.max = this.current.try // category1 is selected; max: 0
            // else pref == 1
            else this.current.min = this.current.try + 1; // category2 is selected; min: 1
            if (this.current.min == this.current.max) {
                this.items.splice(this.current.min, 0, {item: this.current.item, equals: []});
                this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
            }
        }
    }
    // KEEP
    // MAKES SURE THERE ARE NO REDUNDANT QUESTIONS
    this.getQuestion = function() {
        if (this.current.item >= this.size) return null; // false
        this.current.try = Math.floor((this.current.min + this.current.max) / 2); // this.current.try = 0
        return({a: this.current.item, b: this.items[this.current.try].item}); // returns a dictionary; a: 1; b: 0
    }
    // KEEP
    // RETURNS NEW CORRECTLY ORDERED ARRAY
    this.getOrder = function() {
        var index = [];
        for (var i in this.items) {
            var equal = [this.items[i].item];
            for (var j in this.items[i].equals) {
                equal.push(this.items[i].equals[j]);
            }
            index.push(equal);
        }
        return(index);
    }
}
//DISCARD
// THIS FUNCTION ACTS AS THE PERSON ANSWERING THE QUESTIONS
function preference(a, b) {
    if (Math.random() > 0.6) return -1; else return 1; // before, it was -1, 0, 1
    // TODO: RETURN CLICK HERE
}




// PROGRAM STARTS HERE
// KEEP
// CREATE TABLE AND ASK QUESTIONS UNTIL TABLE IS COMPLETE
var categories = ["food", "family", "health", "wealth", "friends"];
var t = new PrefList(5) // t is an object of type PrefList
var c = 0 // numbers generated for each question
var q; // q.a, q.b; where a and b are the categories; these are set in getQuestion function
while (q = t.getQuestion()) { // RUNS WHILE THERE ARE NO MORE QUESTIONS TO ASK; q = a: 1; b: 0
    document.write(++c + ". " + categories[q.a] + " or " + categories[q.b] + "?");
    var answer = preference(categories[q.a], categories[q.b]); // INSTEAD OF CALLING PREFERENCE THE PROGRAM WILL RETURN WHICH EVENT WAS CLICKED
    document.write([categories[q.a], "no preference", categories[q.b]][answer + 1]); // will print either 0, 1, 2 or category1, no preference, category2
    t.addAnswer(answer); // category1, category2, [either -1, 0, or 1]
}
// KEEP
// PERFORM SORT BASED ON TABLE AND DISPLAY RESULT
var index = t.getOrder();
document.write("LIST IN ORDER:"); // change to console.log
for (var i = 0, pos = 1; i < index.length; i++) {
    for (var j = 0; j < index[i].length; j++) {
        document.write(categories[index[i][j]]); // change to console.log
    }
    pos += index[i].length;
}

// call getQuestion from pages
// questions are returned pages
// questions are printed
// answer is stored
// asnwer is sent to addAnswer
// continue on to next page
// repeat until pages

// call getOrder
// print the chain


























