function $id(id){
    return document.getElementById(id);
}
    
function init(){
    fill_movie_info();
}
function get_img(movie){
    var img = document.createElement("img");
    img.setAttribute("src",movie.photo);
    img.setAttribute("alt","movie_pic");
    return img;
}

function get_title(movie){
    var title = document.createElement("span");
    title.setAttribute("class","title");
    title.appendChild(document.createTextNode(movie.title));

    var date = document.createElement("span");
    date.setAttribute("class","date");
    date.appendChild(document.createTextNode('('+movie.year+')'));

    var hdr = document.createElement("header");
    hdr.appendChild(title);
    hdr.appendChild(date);
    return hdr;
}
function get_actors(movie){
    var words = document.createElement("span");
    words.setAttribute("class","words");
    words.appendChild(document.createTextNode("Staring: "));

    var actor = document.createElement("span");
    actor.setAttribute("class","actor");
    actor.appendChild(document.createTextNode(movie.starring));

    var div = document.createElement("div");
    div.setAttribute("class","actors");
    div.appendChild(words);
    div.appendChild(actor);
    return div;
}
function get_rating(movie){
    var words = document.createElement("span");
    words.setAttribute("class","words");
    words.appendChild(document.createTextNode("Rating: "));

    var img = document.createElement("img");
    img.setAttribute("src","images/regular_star.png");
    img.setAttribute("alt"," ");

    var rating = document.createElement("div");
    rating.setAttribute("class","rating");
    rating.appendChild(words);
    rating.appendChild(img);
    return rating;
}
function get_info(movie){
    var info = document.createElement("section");
    info.setAttribute("class","info");
    info.appendChild(document.createTextNode(movie.description));
    /*
    var rating = document.createElement("div");
    rating.setAttribute("class","rating");
    rating.appendChild(words);
    rating.appendChild(img);*/
    return info;
}
function get_content(movie){
    var content = document.createElement("section");
    content.setAttribute("class","content");

    content.appendChild(get_title(movie));
    content.appendChild(get_actors(movie));
    content.appendChild(get_rating(movie));
    content.appendChild(get_info(movie));

    return content;
}
function fill_movie_info(){
    var ul = document.createElement("ul");
    
    for(var i=0;i<movies.movies.length;i++){
        var li = document.createElement("li");
        
        li.appendChild(get_img(movies.movies[i]));
        li.appendChild(get_content(movies.movies[i]));
        
        ul.appendChild(li);
    }
    
    $id("listview").appendChild(ul);
}


function search() {
    var result = new Array();
    var text_field = $id("searchField");
    var value = text_field.value;

    for (var i = 0; i < movies.movies.length; i++) {
        //trim the value, and make case insensitive comparison
        var start = (movies.movies[i].title + movies.movies[i].year + movies.movies[i].starring)
                .toLowerCase().search(value.toLowerCase().trim());
        if (start != -1) //if the index is found
            result.push(movies.movies[i].title+movies.movies[i].year + movies.movies[i].starring);
    }
    show_search_results(text_field, result, "suggestions_box", "sub_suggestions");
}

function show_search_results(text_field, results, sug_box, sug_item) {

    $id(sug_box).style.display = results.length == 0 ? "none" : "block";
    $id(sug_box).focus();

    /* add the suggestion items */
    var html_code = "";
    for (var i = 0; i < results.length; i++) {
        html_code += "<div class='" + sug_item + "' id='" + results[i] + "' >";
        html_code += results[i];
        html_code += "</div>";
    }

    $id(sug_box).innerHTML = html_code;
}

