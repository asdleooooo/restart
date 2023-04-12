var t = null;
var replaceThing = function() {
    var o = t
    var unused = function() {
        if (o)
            console.log("hi")
    }
    t = {
            longStr: new Array(1000000).join('*'),
            someMethod: function() {
              console.log(1)
            }
        }
}
replaceThing();
replaceThing();
replaceThing();