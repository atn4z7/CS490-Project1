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