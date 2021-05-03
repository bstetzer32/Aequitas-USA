import React, { useState } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as problemActions from "../../store/problem";
import './ProbForm.css';

function ProbFormPage() {
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const pageNames = useSelector(state => state.subscription.pageNames)
  const regionNames = useSelector(state => state.subscription.userSubs.regionSubs)
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState(0);
  const [topic, setTopic] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    const newErrors = []
    e.preventDefault();
    if (region === 0) {
      newErrors.push('Please select a region.')
    }
    if (topic === 0) {
      newErrors.push('Please select a topic.')
    }
    if (title.length < 10 || title.length > 100) {
      newErrors.push('Title must be between 10 and 100 characters.')
    }
    if (summary.length < 50 || summary.length > 1000) {
      newErrors.push('Summary must be between 50 and 1000 characters.')
    }
    if (description.length < 500 || description.length > 5000) {
      newErrors.push('Description must be between 500 and 5000 characters.')
    }
    if (newErrors.length) {
      setErrors(newErrors)
      return
    } 

    setErrors(['Problem Submitted! Navigate to the topic or region page to view your problem!'])
    const problem = {
      title,
      summary,
      description,
      status: false,
      citizenId: sessionUser.id,
      regionId: region,
      topicId: topic
    }
    dispatch(problemActions.postProduct(problem))
    history.push('/')
    // <Redirect />
    // if (password === confirmPassword) {
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
      </label>
      <label>
        Region
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        >
          <option ></option>
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
          <option ></option>
          {pageNames.topics.map((topic, i) => <option value={topic.id} key={`topic-${i}`} >{topic.name}</option>)}
        </select>
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