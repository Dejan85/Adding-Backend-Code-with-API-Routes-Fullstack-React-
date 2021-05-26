import { useState } from "react";
import { buildFunctionPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  const { geedbackItems } = props;
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {geedbackItems.map((item) => {
          <li key={item.id} onClick={() => loadFeedbackHandler(item.id)}>
            {item.text}
          </li>;
        })}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const filePath = buildFunctionPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItem: data,
    },
  };
}

export default FeedbackPage;
