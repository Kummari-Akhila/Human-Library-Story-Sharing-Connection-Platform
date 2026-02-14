function displayStories(filtered){

  const container = document.getElementById("storyList");
  container.innerHTML = "";

  filtered.forEach(story => {

    container.innerHTML += `
  <div class="story-card">

    <div class="card-top">
      <span class="tag">${story.theme}</span>
      <span class="anon">${story.anonymous ? "Anonymous" : "Public"}</span>
    </div>

    <h3>${story.title}</h3>

    <p>${story.content.substring(0,90)}...</p>

    <div class="card-actions">
      <a href="story.html?id=${stories.indexOf(story)}">Read Story</a>
      <a href="chat.html?id=${stories.indexOf(story)}" class="chat-btn">Chat</a>
    </div>

  </div>
    `;
  });

}


// INITIAL LOAD
displayStories(stories);


// FILTER FUNCTION
function filterStories(){

  const theme = document.getElementById("themeFilter").value;
  const tone = document.getElementById("toneFilter").value;

  let filtered = stories.filter(story => {

    return (theme === "All" || story.theme === theme) &&
           (tone === "All" || story.tone === tone);

  });

  displayStories(filtered);
}