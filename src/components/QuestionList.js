import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
      .then(resp=>resp.json())
      .then((obj)=>setQuestions(obj))
  },[])

  function handleDeletedQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question)=> question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion){
    console.log('Update this item:', updatedQuestion)

    const updatedQuestions = questions.map((question)=>{
      if(question.id === updatedQuestion.id){
        console.log('this has been updated')
        return updatedQuestion;
      } else{
        return question;
      }
    })

    setQuestions(updatedQuestions);
  }

  const allQuestions = questions.map((question)=>{
    return <QuestionItem 
      question={question}
      key={question.id}  
      onDeleteQuestion={handleDeletedQuestion}
      onUpdateQuestion={handleUpdateQuestion}
    />
  })

  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
