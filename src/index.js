const hh = require("hyperscript-helpers");
const { h, diff, patch } = require("virtual-dom");
const createElement = require("virtual-dom/create-element");


const MSG = {
  UPDATE_QUESTION: "UPDATE_QUESTION",
  UPDATE_ANSWER: "UPDATE_ANSWER",
  SAVE_CARD: "SAVE_CARD",
  HIDE_ANSWER: "HIDE_ANSWER",
  DELETE_CARD: "DELETE_CARD",
  EDIT_CARD: "EDIT_CARD",
  RATE_CARD: "RATE_CARD",
};



const { div, button, input, p, br } = hh(h); //hilfestruckturen



// 'dispatch' sendet die Aktionen an andere Teile der App.
// 'model' hat die aktuellen Daten der App.
function view(dispatch, model) {
  return div({ }, [
    div([ 
      input({ 
        type: "question",
        placeholder: "Frage eingeben",
        value: model.question,
        oninput: (event) =>
          dispatch({
            type: MSG.UPDATE_QUESTION,
            value: event.target.value,
          }),
        
      }),
      input({
        type: "answer",
        placeholder: "Antwort eingeben",
        value: model.answer,
        oninput: (event) =>
          dispatch({ type: MSG.UPDATE_ANSWER, value: event.target.value }),
        
      }),
      button(
        {
          type: "save",
          onclick: () => dispatch({ type: MSG.SAVE_CARD }),
         
        },
        "➕"
      ),
    ]),
    ...model.cards.map((card, index) => div( {className: "p-2 border",
         index},[
          p({ },[
              button(
                {
                  type: "edit",
                  onclick: () => dispatch({ type: MSG.EDIT_CARD, index }),
                },
                "✍️"
              ),
              
              button(
                {
                  type: "delete",
                  onclick: () =>
                    dispatch({ type: MSG.DELETE_CARD, index }),
                  
                },
                "🚮"
              ),
            ]
          ),
          p({}, "Frage"),
          p({}, card.question),
          br({}),
          button(
            {
              type: "show",
              onclick: () => dispatch({ type: MSG.HIDE_ANSWER, index }),
            },
            card.showAnswer ? "Antwort verbergen" : "Antwort anzeigen"
          ),
          card.showAnswer ? p({}, card.answer) : null,
          card.showAnswer ? br({}) : null,
          card.showAnswer ? div({}, [
            "Bewertung: ",
            button(
              {
                onclick: () =>
                  dispatch({ type: MSG.RATE_CARD, index, rating: "bad"}),
              },
              "👎"
            ),
            button(
              {
                onclick: () =>
                  dispatch({ type: MSG.RATE_CARD, index, rating: "good"}),
              },
              "👍"
            ),
            button( 
              {
                onclick: () =>
                  dispatch({ type: MSG.RATE_CARD, index, rating: "perfect" }),
              },
              "👌"
            ),
          ]) : null,
        ]
      )
    ),
  ]);
}


// 'model' enthält die aktuellen Daten der App.
function update(message, model) {
  switch (message.type) {
    case MSG.UPDATE_QUESTION:
      return { ...model, question: message.value };

    case MSG.UPDATE_ANSWER:
      return { ...model, answer: message.value };

    case MSG.SAVE_CARD:
      return {
        ...model,

        cards: [
          ...model.cards,
          {
            question: model.question,
            answer: model.answer,
            showAnswer: false,
            rating: 0,
          },
        ],
        question: "",
        answer: "",
      };

    case MSG.HIDE_ANSWER:
      const updatedCards = [...model.cards];
// Die 'showAnswer' (true wird zu false und umgekehrt).
      updatedCards[message.index].showAnswer =
        !updatedCards[message.index].showAnswer;

      return { ...model, cards: updatedCards };

    case MSG.DELETE_CARD:
      return {
        ...model,
        cards: model.cards.filter((_, index) => index !== message.index),
      };
      case MSG.EDIT_CARD:
      const cardToEdit = model.cards[message.index];

      return {
        ...model,
        question: cardToEdit.question,
        answer: cardToEdit.answer,
        cards: model.cards.filter((_, index) => index !== message.index),
      };

      case MSG.RATE_CARD:
        const { index, rating } = message;
        const ratedCards = [...model.cards];
  
        if (rating === "bad") {
          ratedCards[index].rating = 0;
        } else if (rating === "good") {
          ratedCards[index].rating += 1;
        } else if (rating === "perfect") {
          ratedCards[index].rating += 2;
        }

        ratedCards.sort((a, b) => a.rating - b.rating);
  
        return { ...model, cards: ratedCards };
  }
}

const initModel = {
  question: "",
  answer: "",
  cards: [],
};

// ⚠️ Impure code below (not avoidable but controllable)
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById("app");

app(initModel, update, view, rootNode);
