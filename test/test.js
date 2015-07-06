var test = require("tape");
var columnLayout = require("../");

test("no options", function(t){
    t.strictEqual(
        columnLayout([ { a: 1, b: 2 } ]),
        " 1  2 \n"
    );
    t.end();
});
