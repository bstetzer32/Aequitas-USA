import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProbForm from './ProbForm';

function ProbFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="log-in-div" onClick={() => setShowModal(true)}>Identify a Problem</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProbForm />
        </Modal>
      )}
    </>
  );
}

export default ProbFormModal