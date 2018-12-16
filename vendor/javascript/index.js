getInfo();

function getInfo() {
    $.get('https://raw.githubusercontent.com/xadamxk/Order-Generator/master/store.json' + '?nc=' + Math.random(), function (responseText) {
        responseJson = JSON.parse(responseText);
        const storeObj = responseJson.store;
        var colors = storeObj.colors;
        var models = storeObj.models;
        console.log(models);

        for (var model in models) {
            var modelName = model;
            if (models.hasOwnProperty(model)) {
                // Entire model object
                var model = models[model];
                if (model.available) {
                    console.log(model);
                    $("#cellContainer")
                        .append($("<div>").addClass("col-lg-4 col-sm-6 portfolio-item modelCell")
                            .append($("<div>").addClass("card h-100")
                                .append($("<a>")
                                    .append($("<img>").attr("src", model.screenshot).addClass("card-img-top")
                                    )
                                )
                                .append($("<div>").addClass("card-body")
                                    .append($("<h4>").addClass("card-title")
                                        .append($("<b>").text(modelName)
                                        )
                                    )
                                    .append($("<p>").text(model.description))
                                    .append(generateColorDropdown(colors))
                                )
                            )
                        );
                    // End append
                }
            }
        }

    });
}

function generateColorDropdown(colors) {
    var colorDropdown = $("<select>").addClass("form-control")
    .append($("<option>").text("Select Color").val(0));
    for (var color in colors) {
        var colorName = color;
        if (colors.hasOwnProperty(color)) {
            // Entire color object
            var color = colors[color];
            //if (color.available) {
            colorDropdown.append($("<option>")
                .text(colorName)
                .val(color.price)
                .attr("enabled",colorDisabledStatus(color.available))
            );
            //}
        }
    }
    return colorDropdown;
}

function colorDisabledStatus(isAvailable){
    var result = "true";
    if (isAvailable){
        result = "false";
    }
    return result;
}