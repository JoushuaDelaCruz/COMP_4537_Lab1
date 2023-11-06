const SERVER = "https://isa-server-lab4-f3b53ce2616e.herokuapp.com";
const LANGUAGE_PATH = "/api/v1/languages";
const DEFINITION_PATH = "/api/v1/definition";
const WORD_LANGUAGE_ID = "word-language";
const WORD_ID = "word";
const DEFINITION_ID = "definition";
const DEFINITION_LANGUAGE_ID = "definition-language";
const MAIN_ID = "main";

const getConfig = (method, body) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

const loadWordAlreadyExistsOptions = () => {
  return `
  <button type='submit' onclick='reDefine()'> ReDefine </button>
  <button type='submit' onclick='cancelReDefine()'> Cancel </button>
  <button type='submit' onclick='deleteWord()'> Delete Word </button>
  `;
};

const updateReq = (body) => {
  const main = document.getElementsByTagName(MAIN_ID)[0];
  fetch(`${SERVER}${DEFINITION_PATH}`, getConfig("PATCH", body)).then(
    (response) => {
      response.json().then((data) => {
        main.innerHTML = JSON.stringify(data);
      });
    }
  );
};

const postReq = (body) => {
  const main = document.getElementsByTagName(MAIN_ID)[0];
  fetch(`${SERVER}${DEFINITION_PATH}`, getConfig("POST", body)).then(
    (response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          main.innerHTML = JSON.stringify(data);
        });
      } else if (response.status === 409) {
        main.innerHTML = loadWordAlreadyExistsOptions();
      }
    }
  );
};

const reDefine = () => {
  const word = document.getElementById(WORD_ID).value;
  const word_language = parseInt(
    document.getElementById(WORD_LANGUAGE_ID).value
  );
  const definition = document.getElementById(DEFINITION_ID).value;
  const definition_language = parseInt(
    document.getElementById(DEFINITION_LANGUAGE_ID).value
  );
  const body = { word_language, definition, definition_language, word };
  updateReq(body);
};

const deleteWord = () => {
  const word = document.getElementById(WORD_ID).value;
  const main = document.getElementsByTagName(MAIN_ID)[0];
  fetch(`${SERVER}${DEFINITION_PATH}/`, getConfig("DELETE", { word })).then(
    async (response) => {
      if (response.status === 204) {
        main.innerHTML = `Definition for '${word}' deleted`;
        return;
      }
      response.json().then((data) => {
        main.innerHTML = JSON.stringify(data);
      });
    }
  );
};

const cancelReDefine = () => {
  const main = document.getElementsByTagName(MAIN_ID)[0];
  main.innerHTML = "";
};

const submitWord = () => {
  const word = document.getElementById(WORD_ID).value;
  const word_language = parseInt(
    document.getElementById(WORD_LANGUAGE_ID).value
  );
  const definition = document.getElementById(DEFINITION_ID).value;
  const definition_language = parseInt(
    document.getElementById(DEFINITION_LANGUAGE_ID).value
  );
  const body = { word, word_language, definition, definition_language };
  postReq(body);
};

const loadOption = (language) => {
  const option = document.createElement("option");
  option.value = language.id;
  option.innerHTML = language.name;
  return option;
};

const loadLanguages = () => {
  const word_languages = document.getElementById(WORD_LANGUAGE_ID);
  const definition_language = document.getElementById(DEFINITION_LANGUAGE_ID);
  fetch(`${SERVER}${LANGUAGE_PATH}`)
    .then((response) => {
      response.json().then((data) => {
        data.languages.forEach((language) => {
          const option = loadOption(language);
          word_languages.appendChild(option);
          definition_language.appendChild(option.cloneNode(true));
        });
      });
    })
    .catch(() => {
      alert("Error loading languages");
    });
};

window.onload = loadLanguages;
