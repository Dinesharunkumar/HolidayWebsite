function get_countries() {

    $.ajax({
        url : "http://api.countrylayer.com/v2/all?access_key=b05c3d5c07ad65da01d800f2b16e58ea",
        type: "GET",
        dataType: "json",
        success: function(data){
            populate_countries(data);
            if (localStorage.selectedCountry) {
                $("#countries").val(localStorage.selectedCountry);
                var countryName = $("#countries option:selected").text();
                get_holidays( localStorage.selectedCountry, countryName );
            }
        },
        error: function(){
            console.log("Error in the request");
        }  
    });
}


function populate_countries(countries) {
    for(var a = 0; a < countries.length; a++) {
        var countryOption = "<option value='" + countries[a].alpha3Code +"'>" + countries[a].name +"</option>"
        document.getElementById("countries").innerHTML += countryOption;
    }
}

$("#countries").change(function(){
    localStorage.setItem("selectedCountry", $("#countries").val());
    var countryName = $("#countries option:selected").text();
    get_holidays( $("#countries").val(), countryName );
});
/* func call */
get_countries();


function get_holidays(countryCode, countryName) {

    var previousYear = new Date().getFullYear() - 1;
    
    //$("#selectedCountry").text("");
    //$("#previousYear").text("");
    $("#container").html("");

    $.ajax({
        url : "https://holidayapi.com/v1/holidays?pretty&key=" + "67530ba6-3f7b-496e-98b9-30bda6337407" + "&country=" + countryCode +"&year=" + previousYear,
        type: "GET",
        dataType: "json",
        success: function(data){
            var holidays = data.holidays;

            //$("#selectedCountry").text(countryName);
            //$("#previousYear").text(previousYear);

            $("#container").html("");

            for (var a = 0; a < holidays.length; a++) {

                if (holidays[a].public) {
                    var listItem = "<li>";
                    listItem += holidays[a].date + " - " + holidays[a].name;
                    listItem += "</li>";

                    $("#container").append(listItem);
                    console.log(listItem);
                }

            }

        },
        error: function(){
            console.log("Error in the request");
        }  
    });
} 
var ccYear = new Date().getFullYear();
$("#cc").text(ccYear);
