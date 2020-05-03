function initMap() {

    var Nottingham = { lat: 52.958759, lng: -1.159077 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: Nottingham
    });

    const geocoder = new google.maps.Geocoder();
    const dataFile = "http://localhost:8000/penalties.json";
    $.getJSON(dataFile, function (data) {
        $.each(data, function (i) {
            let incidentLocation = data[i]["Street"] + "Nottingham, UK";
            if (i === 10) {
                return false;
            }

            geocoder.geocode({ 'address': incidentLocation }, function (results) {
                let emoji = 'poo.png'
                if (data[i]["Contravention_Description"].toLowerCase() == "leaving litter") {
                    emoji = "litter.png";
                }
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: emoji,
                    title: data[i]["Contravention_Description"]
                });

            });

        });
    });


}