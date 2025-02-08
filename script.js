const input = document.querySelector("inputText");
const search = document.querySelector("#search");
const heading = document.querySelector("#word");
const meaning = document.querySelector("#meaning");
const example = document.querySelector("#example");
const ul = document.querySelector("#Antonyms");
search.addEventListener("click", (e) => {
  const word = e.target.previousElementSibling.value;
  console.log(typeof word);
  async function Apiresponse() {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const convertIntoJson = await response.json();
      console.log(convertIntoJson);
      heading.innerHTML = convertIntoJson[0].word;
      meaning.innerHTML =
        convertIntoJson[0].meanings[0].definitions[0].definition;
      example.innerHTML = convertIntoJson[0].meanings[0].definitions[0].example;
      const antonyms = convertIntoJson[0].meanings[0].definitions[0].antonyms;
      if (antonyms.length > 0) {
        antonyms.forEach((antonym) => {
          const li = document.createElement("li");
          li.innerText = antonym;
          ul.append(li);
        });
      }
    } catch (Error) {
      console.log("E:", Error);
    }
  }
  Apiresponse();
});
