import React, { useState } from "react";
import {  useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './ProbForm.css';

function ProbFormPage() {
  const pageNames = useSelector(state => state.subscription.pageNames)
  const regionNames = useSelector(state => state.subscription.userSubs.regionSubs)
  // const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [topic, setTopic] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
      setErrors([]);
    //   // return dispatch(sessionActions.signup({ email, username, password }))
    //   //   .catch(async (res) => {
    //   //     const data = await res.json();
          // if (data && data.errors) setErrors(data.errors);
    //   //   });
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Identify a Problem</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <h2>Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      <label>
        Region
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        >
          {regionNames.map((region, i) => <option value={region.id} key={`region-${i}`} >{region.name}</option>)}
        </select>
      </label>
      <label>
        Topic
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        >
          {pageNames.topics.map((topic, i) => <option value={topic.id} key={`topic-${i}`} >{topic.name}</option>)}
        </select>
      </label>
      </label>
      <label>
        Summary
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Problem</button>
    </form>
  );
}

export default ProbFormPage;