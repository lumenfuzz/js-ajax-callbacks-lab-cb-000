$(document).ready(function (){
});

function displayError() {
  document.getElementById("errors").innerHTML += "I'm sorry, there's been an error. Please try again."
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function searchRepositories() {
  var query = document.getElementById("searchTerms").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://github.com/search?utf8=✓&q=${query}`)
  req.send()
}

function showCommits() {

}
