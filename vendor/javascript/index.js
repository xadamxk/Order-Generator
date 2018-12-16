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
                //console.log(model);
                var temp = $("<div>").addClass("col-lg-4 col-sm-6 portfolio-item modelCell")
                    .append($("<div>").addClass("card h-100").attr("length",model.length)
                        .append($("<a>")
                            .append($("<img>").attr("src", model.screenshot).addClass("card-img-top")
                            )
                        )
                        .append($("<div>").addClass("card-body")
                            .append($("<h4>").addClass("card-title")
                                .append($("<b>").text(modelName).addClass("modelName"))
                                .append($("<b>").text("").addClass("modelPrice").css("color", "green"))
                                .append($("<b>").text("").addClass("modelUnavailable"))

                            )
                            .append(generateColorDropdown(colors))
                            .append($("<p>").text(model.description))
                        )
                        .append($("<button>").attr({ "type": "button", "onclick": "orderModel($(this))" }).addClass("btn btn-primary orderButton").text("Order"))
                    );
                if (!model.available) {
                    temp.find(".modelUnavailable").append("<br>").after($("<b>").text("Unavailable").css("color", "red").addClass("unavailable"));
                }
                $("#cellContainer").append(temp);
                // End append
            }
        }

        $(".colorDropdown").change(function () {
            var modelLength = $(this).parent().parent().attr("length");
            var colorPricePerMeter = $(this).parent().find("option:selected").val();
            var modelPrice = (modelLength*colorPricePerMeter).toFixed(2);
            $(this).parent().find(".modelPrice").text("$" + modelPrice + " + shipping");
        });

    });
}

function orderModel(element) {
    var parentElement = element.parent();
    var modelName = parentElement.find(".modelName").text();
    var selectedColor = parentElement.find("option:selected").text();
    var priceString =  parentElement.find(".modelPrice").text();

    if (parentElement.find(".unavailable").length > 0) {
        alert("We apologize, but this model (" + modelName + ") is not currently available.");
    }
    else if (selectedColor !== "Select Color") {
        // PM Subject
        const pmURL = "https://hackforums.net/private.php?action=send&uid=1306528";
        const newLine = "%0A";
        const subjConst = "&subject=";
        var subjVar = encodeURI("3D Model Request");
        // PM Message
        const msgConst = "&message=";
        var msgVarModel = encodeURI("Model: " + modelName) + newLine;
        var msgVarColor = encodeURI("Color: " + selectedColor) + newLine;
        var msgVarPrice = encodeURI("Price: " + priceString) + newLine;
        var msgVarInstructions = encodeURI("----- Requests/Comments Below -----") + newLine;

        var finalURL = pmURL + subjConst + subjVar + msgConst + msgVarModel + msgVarColor + msgVarPrice + msgVarInstructions;
        console.log(finalURL);
        window.open(finalURL, "_blank");
    }
}

function generateColorDropdown(colors) {
    var colorDropdown = $("<select>").addClass("form-control colorDropdown")
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