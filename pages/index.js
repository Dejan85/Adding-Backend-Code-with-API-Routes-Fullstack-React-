import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHadler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("test", data))
      .catch((err) => {
        console.log("test", err);
      });
  }

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback))
      .catch((err) => {
        console.log("test", err);
      });
  };

  return (
    <div className={styles.container}>
      <h1>The home page</h1>
      <form onSubmit={submitFormHadler}>
        <div>
          <label htmlFor="email">Your Email Addres</label>
          <input ref={emailInputRef} type="email" id="email"></input>
        </div>
        <div>
          <label htmlFor="feedback">Your feedbac</label>
          <textarea ref={feedbackInputRef} rows="5" id="feedback"></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
