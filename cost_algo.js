export function PrefListCost(n) {
    this.size = n;
    this.items = [{item: 0, equals: []}]; // array where the categories will be stored
    this.current = {item: 1, try: 0, min: 0, max: 1};
    // BINARY INSERTION SORT
    this.addAnswer = function(pref) {
        if (pref == 0) { // no preference is selected
            this.items[this.current.try].equals.push(this.current.item);
            this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
        } else {
            if (pref == -1) this.current.max = this.current.try
            // else pref == 1
            else this.current.min = this.current.try + 1;
            if (this.current.min == this.current.max) {
                this.items.splice(this.current.min, 0, {item: this.current.item, equals: []});
                this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
            }
        }
    }
    // MAKES SURE THERE ARE NO REDUNDANT QUESTIONS
    this.getQuestion = function() {
        if (this.current.item >= this.size) return null;
        this.current.try = Math.floor((this.current.min + this.current.max) / 2);
        return({a: this.current.item, b: this.items[this.current.try].item});
    }
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