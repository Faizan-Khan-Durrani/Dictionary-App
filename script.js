const input = document.querySelector("inputText");
const search = document.querySelector("#search");
const heading = document.querySelector("#word");
const meaning = document.querySelector("#meaning");
const example = document.querySelector("#example");
const ul = document.querySelector("#Antonyms");
const error = document.querySelector("#status");
const antonymsHeading = document.querySelector("#antonymsHeading");
const button = document.querySelector(".read");

// function for empty
function emptyCard() {
  heading.innerHTML = "";
  meaning.innerHTML = "";
  example.innerHTML = "";
  ul.innerHTML = "";
  antonymsHeading.innerHTML = "";
  button.innerHTML = "";
}
//Event handling
search.addEventListener("click", (e) => {
  const word = e.target.previousElementSibling.value;
  const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  if (word === "" || !isNaN(word) || word.match(format)) {
    error.innerHTML = `<h4 id="Error">Please Enter valid Word </h4>`;
    emptyCard();
    e.target.previousElementSibling.value = "";
    return;
  } else {
    emptyCard();
    error.innerHTML = "";
    Apiresponse(word);
    e.target.previousElementSibling.value = "";
  }
});

// Fetching data
async function Apiresponse(word) {
  try {
    error.innerHTML = "Fetching Data.....";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const convertIntoJson = await response.json();

    setTimeout(() => {
      error.innerHTML = "";
      convertIntoJson.message !== undefined
        ? (error.innerHTML = convertIntoJson.message)
        : parseInHtml(convertIntoJson);
    }, 1000);
  } catch (error) {
    console.log("E:", error);
  }
}
//function to display card
function parseInHtml(convertIntoJson) {
  let data = convertIntoJson[0].meanings[0].definitions[0];
  convertIntoJson[0].word === undefined ||
  convertIntoJson[0].word === null ||
  convertIntoJson === ""
    ? (heading.innerHTML = "Not found")
    : (heading.innerHTML = `<strong>Word: </strong>${convertIntoJson[0].word}`);

  data.definition === undefined || data.definition === null
    ? (meaning.innerHTML = "Not found")
    : (meaning.innerHTML = `<strong>Meaning: </strong>${data.definition}`);
  data.example === undefined || data.example === null
    ? (example.innerHTML = "")
    : (example.innerHTML = `<strong>Example: </strong>${data.example}`);
  const antonyms = data.antonyms;
  if (antonyms.length > 0) {
    antonymsHeading.innerHTML = `<strong>Antonyms</strong>`;
    antonyms.forEach((antonym) => {
      const li = document.createElement("li");
      li.innerText = antonym;
      ul.append(li);
    });
  }
  button.innerHTML = `<a href="${convertIntoJson[0].sourceUrls[0]}" target="_blank" class="read-more read">
  Read More
  </a>`;
}
