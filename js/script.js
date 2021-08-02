const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// seaech states.json and filter
const searchStates = async (searchText) => {
  const res = await fetch("../state.json");
  const states = await res.json();
  console.log(states);
  //    get matches to current element
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });
  if (searchStates.length === 0) {
    matches = [];
    matchList.innerHTML='';
  }
  console.log(matches);
  outputHtml(matches);
};

// show result in Html
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches.map(
      (match) => `
        <div className="card card-body mb-1">
        <h4>${match.name} (${match.abbr})<span class="text-primary">${match.capital}</span></h4>
        <small>Lat:${match.lat}/Long: ${match.long}</small>
        </div>
        `
    ).join('');
    console.log(html);
    matchList.innerHTML=html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
