/*make the text equal to the initial text if the text is empty
 * if the text is equal to the intial text, make the text color gray
 */
function show_initial_if_empty(element, initial_text) {
    if (element.value.trim() === "")
        element.value = initial_text;

    if (element.value.trim() === initial_text)
        element.style.color = "gray";
}


function make_search_field(key, initial_text) {
    //the initial text color is gray
    var element = $id(key);
    element.value = initial_text;
    element.style.color = "gray";

    //when the mouse is overm make the text color light gray
    element.onmouseover = function () {
        if (element.value.trim() === initial_text)
            element.style.color = "lightgray";
    };

    element.onmouseout = function () {
        show_initial_if_empty(element, initial_text);
    };
    element.onblur = function () {
        show_initial_if_empty(element, initial_text);
    };

    /* when the text field is in focus, make the text empty if it is
     * equal to the initial text
     */
    element.onfocus = function () {
        if (element.value.trim() === initial_text)
            element.value = "";
    };

    /* when the key is down
     * make the text empty if it is equal to the initial text
     * also make the text color black
     */
    element.onkeydown = function () {
        if (element.value.trim() === initial_text)
            element.value = "";
        element.style.color = "black";
    };
}
//live search
function search() {
    var result = new Array();
    var dispresult = new Array();
    var text_field = $id("searchField");
    var value = text_field.value;

    for (var i = 0; i < movies.movies.length; i++) {
        //trim the value, and make case insensitive comparison
        var start = (movies.movies[i].title +"("+ movies.movies[i].year +"), Starring:"+ movies.movies[i].starring)
                .toLowerCase().search(value.toLowerCase().trim());
        if (start != -1){ //if the index is found
            result.push(movies.movies[i].title+"("+movies.movies[i].year+"), Starring:" + movies.movies[i].starring);
            dispresult.push(movies.movies[i].title);
        }
    }
    if (text_field.value.length!=0){
        show_search_results(text_field, result, "suggestions_box", "sub_suggestions");
    }
    else{
        document.getElementById("suggestions_box").style.display = "none";
    }
}
//search button click handler
function search2() {
    var dispresult = new Array();
    var text_field = $id("searchField");
    var value = text_field.value;

    for (var i = 0; i < movies.movies.length; i++) {
        //trim the value, and make case insensitive comparison
        var start = (movies.movies[i].title +"("+ movies.movies[i].year +"), Starring:"+ movies.movies[i].starring)
                .toLowerCase().search(value.toLowerCase().trim());
        if (start != -1){ //if the index is founddispresult.push(movies.movies[i].title);
            dispresult.push(movies.movies[i].title);
        }
    }
    if (text_field.value.length!=0){
        Display_search_results(dispresult);
        document.getElementById("suggestions_box").style.display = "none";
    }
}
function show_search_results(text_field, results, sug_box, sug_item) {

    $id(sug_box).style.display = results.length == 0 ? "none" : "block";
    $id(sug_box).focus();
    

    /* add the suggestion items */
    var html_code = "";
    for (var i = 0; i < results.length && i<5; i++) {
        html_code += "<div class='" + sug_item + "' id= '" + sug_item + 
                "' onclick='fillSearch(\""+ results[i] +"\")" +"'>";
        html_code += results[i].replace(results[i].substring(0,results[i].lastIndexOf("(")),
            "<b>"+results[i].substring(0,results[i].lastIndexOf("("))+"</b>");
        html_code += "</div>";
    }

    $id(sug_box).innerHTML = html_code;
}
function Display_search_results(results){
    var movies = $class("movie");
    for(var i=0; i< movies.length; i++){
        movies[i].style.display = "none";
    }
    for(var i=0; i< movies.length; i++){
            console.log(i);
        for(var j=0; j< results.length; j++){
            console.log(movies[i].id+"--movie_"+results[j].replace(/ /g, "_"));
            if(movies[i].id == "movie_"+results[j].replace(/ /g, "_")){
                movies[i].style.display = "block";
                console.log(true);
            }
        }
    }
}

function fillSearch(movie){
    document.getElementById("suggestions_box").style.display = "none";
    document.getElementById("searchField").value=movie.substring(0,movie.lastIndexOf("(")) ;
}