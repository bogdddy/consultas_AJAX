$(document).ready(() => {

    // AJAX request 
    let url = "https://rickandmortyapi.com/api/character/";
    let ID = [];

    // get all characters 
    $.ajax({
        method: "GET",
        url: url
    })
        .done(function (msg) {

            // generate random ID's 
            let maxCharacters = msg.info.count;

            while (ID.length < 6) {
                random = Random(maxCharacters);

                if (ID.indexOf(random) == -1) {
                    ID.push(random);
                }
            }

            // characters request
            $.ajax({
                method: "GET",
                url: url + ID.join(",")

            })
                .done(function (msg) {

                    for (let i = 0; i < msg.length; i++) {

                        // fill card attributes
                        card = $(`#card${i + 1}`)
                        card.find("img").attr("src", msg[i].image);
                        card.find("h5").html(msg[i].name);
                        card.find("p").eq(0).html(msg[i].status + " - " + msg[i].species);
                        card.find("p small").eq(0).html(msg[i].gender);
                        card.find("p small").eq(1).html(msg[i].origin.name);

                    }

                });
        });
})

//generate random number
const Random = (max) => Math.floor((Math.random() * max) + 1);