//create container row and col divs
var container = document.createElement("div")
container.classList.add("container")
var row = document.createElement("div")
row.classList.add("row")
container.append(row)
document.body.append(container)


//getting restcountries data  
var countryData = fetch("https://restcountries.com/v2/all");
countryData.then((data) => data.json()).then((data) => {

    for (var i = 0; i < data.length; i++) {

        //create col
        var col = document.createElement("div")
        col.classList.add("col-lg-4")
        col.classList.add("col-sm-12")
        var card = document.createElement("div")
        card.classList.add("card")

        //card header
        var cHeader = document.createElement("div")
        cHeader.classList.add("card-header")
        cHeader.innerHTML = data[i].name;

        //add flag
        var flagImg = document.createElement("img")
        flagImg.classList.add("card-img-top")
        flagImg.setAttribute("src", data[i].flag);

        //card body- contains other details
        var cBody = document.createElement("div")
        cBody.setAttribute("class", "card-body")

        //other details
        var capital = document.createElement("div")
        capital.setAttribute("class", 'card-text');
        capital.innerHTML = `Capital : ${data[i].capital}`

        var region = document.createElement("div")
        region.setAttribute("class", "card-text")
        region.innerHTML = `Region : ${data[i].region}`

        var cCode = document.createElement("div")
        cCode.setAttribute("class", "card-text")
        cCode.innerHTML = `Country Code : ${data[i].alpha3Code}`


        var latlng = document.createElement("div")
        latlng.setAttribute("class", "card-text")
        if (undefined != data[i].latlng) {
            latlng.innerHTML = `Lat, Lng: ${data[i].latlng[0]}, ${data[i].latlng[1]}`
        } else {
            latlng.innerHTML = "Lat, Lng : NA";
        }


        var btn = document.createElement("button")
        btn.setAttribute("class", "btn btn-primary")
        if (undefined != data[i].latlng){
            btn.innerHTML = "Click for Weather";
        }else{
            btn.innerHTML = "Not Available";
        }
        btn.setAttribute("value", `${i}`)
        btn.setAttribute("id", `btn${i}`)

        cBody.append(capital, region, cCode, latlng, btn)
        card.append(cHeader, flagImg, cBody)
        col.append(card)
        row.append(col)
        
        //button click event
        document.getElementById(`btn${i}`).addEventListener("click", (e) => {
            console.log(e)
            // var key = e.originalTarget.value
            var key = e.target.attributes[1].value
            var lat, lng
            if (data[key].latlng != undefined) {
                lat = data[key].latlng[0]
                lng = data[key].latlng[1]

                //fetching weather data

                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e81f09aeaf7682af4f913672dc0df16c&units=imperial`
                fetch(url)
                    .then((datas) => datas.json())
                    .then(val => {
                        alert(`Weather= ${val.weather[0].description}
                        \nTemperature= ${val.main.temp} F`)
                    })
            } else {
                alert("Weather data not available")
            }

        })
    }
})
