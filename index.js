// We should wait for the page to load before running our Ajax request
$(document).ready(function(){
});

function displayError() {
  document.getElementById("errors").innerHTML += "I'm sorry, there's been an error. Please try again."
}

function searchRepositories() {
  var query = document.getElementById("searchTerms").value
  $.get(`https:\/\/api.github.com\/search\/repositories\?q=${query}/`, function(data) {
    console.log(data);
    const dataList = `<ul>${data.items.map(r => `<li> ${r.name} - ${r.description} - ${r.html_url} - ${r.owner.login} - <img src=${r.owner.avatar_url} alt=""> - ${r.owner.url} - <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a> </li>`).join('')}</ul>`
    document.getElementById("results").innerHTML = dataList
  }).fail(function(error) {
    // This is called when an error occurs
    displayError()
  });
}

function showCommits(el) {
  console.log(el.dataset)
  var username = el.dataset.owner
  var repository = el.dataset.repository
  $.get(`https://api.github.com/repos/${username}/${repository}/commits`, function(data) {
    console.log(data);
    const dataList = `<ul>${data.map(r => `<li> ${r.sha} - ${r.author.login} - <img src=${r.author.avatar_url} alt=""> </li>`).join('')}</ul>`
    console.log(dataList);
    document.getElementById("details").innerHTML = dataList
  }).fail(function(error) {
    // This is called when an error occurs
    displayError()
  });
}

function getCommits(el) {
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
