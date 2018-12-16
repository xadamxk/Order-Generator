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
    // Append available colors
    for (var color in colors) {
        var colorName = color;
        if (colors.hasOwnProperty(color)) {
            // Entire color object
            var color = colors[color];
            var colorOption = $("<option>")
                .text(colorName)
                .val(color.price);
            // If unavailable
            if (!color.available) {
                markColorOptionUnavailable(colorOption);
            }
            // Append color to colors list
            colorDropdown.append(colorOption);

        }
    }
    return colorDropdown;
}


function markColorOptionUnavailable(colorOption) {
    colorOption.text(colorOption.text() + " (Out of Stock)");
    colorOption.attr("disabled", "disabled");
}