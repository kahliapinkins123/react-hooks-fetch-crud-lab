import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteHandler() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteQuestion(question));
  }

  function changeHandler(e){
    console.log(e.target[e.target.value].innerText)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(e.target.value),
    }),
  })
    .then((resp) => resp.json())
    .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={changeHandler} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={deleteHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
