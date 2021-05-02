import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Prob from './Prob';

function ProbModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="log-in-div" onClick={() => setShowModal(true)}>Identify a Problem</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Prob />
        </Modal>
      )}
    </>
  );
}

export default ProbModal