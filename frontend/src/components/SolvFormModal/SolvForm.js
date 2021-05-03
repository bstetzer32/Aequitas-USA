import React, { useState } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as solutionActions from "../../store/solution";
import './SolvForm.css';

function SolvFormPage({id}) {
  // console.log(id)
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [thesis, setThesis] = useState("");
  const [proposal, setProposal] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    const newErrors = []
    e.preventDefault();
    if (title.length < 10 || title.length > 100) {
      newErrors.push('Title must be between 10 and 100 characters.')
    }
    if (thesis.length < 50 || thesis.length > 1000) {
      newErrors.push('Thesis must be between 50 and 1000 characters.')
    }
    if (proposal.length < 500 || proposal.length > 10000) {
      newErrors.push('Description must be between 500 and 10000 characters.')
    }
    if (newErrors.length) {
      setErrors(newErrors)
      return
    } 

    setErrors(['Solution Submitted! Navigate to the problem to view your solution!'])
    const solution = {
      problemId: id + 1,
      title,
      thesis,
      proposal,
      status: false,
      citizenId: sessionUser.id
    }
    dispatch(solutionActions.postSolution(solution))
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
    <form onSubmit={handleSubmit} id='col-1__solution-form'>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h2>Propose a Solution</h2>
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
        Thesis
        <textarea
          value={thesis}
          onChange={(e) => setThesis(e.target.value)}
          required
        />
      </label>
      <label>
        Proposal
        <textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Solution</button>
    </form>
  );
}

export default SolvFormPage;