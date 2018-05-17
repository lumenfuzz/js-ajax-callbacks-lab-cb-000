// We should wait for the page to load before running our Ajax request
$(document).ready(function(){
  // Now we start the Ajax GET request. The first parameter is the URL with the data.
  // The second parameter is a function that handles the response.
  $.get("sentence.html", function(response) {
    // Here we are getting the element on the page with the id of sentences and
    // inserting the response
    $("#sentences").html(response);
  });
});

function displayError() {
  document.getElementById("errors").innerHTML += "I'm sorry, there's been an error. Please try again."
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  document.getElementById("repositories").innerHTML = repoList
}

function searchRepositories() {
  var query = document.getElementById("searchTerms").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/search/repositories/?q=${query}`)
  req.send()
}

function showCommits() {

}
