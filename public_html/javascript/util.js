/* helper functions for getting movies info as well as set up the page */
function $id(id){
    return document.getElementById(id);
}
function $class(classes){
    return document.getElementsByClassName(classes);
}
function init(){
    // set up the images
    fill_view();
    // set up the search box
    make_search_field("searchField", "Search for movies here");
    //show images as gridview 
    show('grid');
}
//function to get and create html element for movie image 
function get_img(movie){
    var img = document.createElement("img");
    img.setAttribute("class","pic");
    img.setAttribute("src",movie.photo);
    img.setAttribute("alt","movie_pic");
    
    var contain = document.createElement("div");
    contain.setAttribute("class","imgcontainer");
    contain.appendChild(img);
    
    if(movie.HD){
        var hd = document.createElement("img");
        hd.setAttribute("class","yHD");
        hd.setAttribute("src","images/HD.png");
        hd.setAttribute("alt","HD");
        contain.appendChild(hd);
    }
    return contain;
}
//function to get and create html element for movie title
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
//function to get and create html element for movie actor
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
//function to get and create html element for movie rating
function get_rating(movie){
    var rating = document.createElement("div");
    rating.setAttribute("class","rating");
    
    var words = document.createElement("span");
    words.setAttribute("class","words");
    words.appendChild(document.createTextNode("Rating: "));
    rating.appendChild(words);
    //create star images based on rating
    for(var i=0;i<movie.rating;i++){
        var img = document.createElement("img");
        img.setAttribute("src","images/gold_star.png");
        img.setAttribute("alt"," ");
        rating.appendChild(img);
    }
    for(var i=5-movie.rating;i>0;i--){
        var img = document.createElement("img");
        img.setAttribute("src","images/regular_star.png");
        img.setAttribute("alt"," ");
        rating.appendChild(img);
    }
    return rating;
}
//function to get and create html elements for a movie
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
//function to get and create html element for movie content
function get_content(movie){
    var content = document.createElement("section");
    content.setAttribute("class","content");

    content.appendChild(get_title(movie));
    content.appendChild(get_actors(movie));
    content.appendChild(get_rating(movie));
    content.appendChild(get_info(movie));

    return content;
}
//functin to create a container for a movie
function get_container(movie){
    var licontain = document.createElement("div");
    licontain.setAttribute("class","liContainer");

    licontain.appendChild(get_img(movie));
    licontain.appendChild(get_content(movie));
    return licontain;
}
//function to fill the view with movies
function fill_view(){    
    var ul = document.createElement("ul");
    
    for(var i=0;i<movies.movies.length;i++){
        var li = document.createElement("li");
        li.setAttribute("id","movie_"+
                movies.movies[i].title.replace(/ /g, "_"));
        li.setAttribute("class","movie");
        
        li.appendChild(get_container(movies.movies[i]));
        ul.appendChild(li);
    }
    $id("view").appendChild(ul);
}
//function to change class of the view (grid to list/list to grid)
function show(view){
    $id("view").className = view;
    if (view == "list"){
        $id("listBtn").src="images/list_pressed.jpg"; 
        $id("gridBtn").src="images/grid.jpg";
    }
    else{
        $id("gridBtn").src="images/grid_pressed.jpg";
        $id("listBtn").src="images/list.jpg"; 
    }
}
//sort function based on rating/year (descending)
function sort(){
    var value=$id("combo_box").value.toLowerCase();
    movies["movies"]=movies["movies"].sort(
            function(a,b){
                if(a[value]<b[value])
                    return 1;
                if(a[value]==b[value])
                    return 0;
                if(a[value]>b[value])
                    return -1;
            }
        );
    
    $id("view").innerHTML = "";
    fill_view(); 
}


