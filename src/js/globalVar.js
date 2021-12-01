(() => {
    var fs = require('fs');
    fs.readdir("./src/classes/", (err, files) => {
        var path = require('path');
        if (err) console.log(err);
        for (var file of files) {
            file = file.replace(".js", "");
            
            eval(`global.${file} = require(path.join(__dirname, "..", "classes") + "/${file}").${file};`);
        }
    });
})();