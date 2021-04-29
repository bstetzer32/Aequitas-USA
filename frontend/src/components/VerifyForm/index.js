import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import VerifyForm from './VerifyForm';

function VerifyFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li id="log-in-div" onClick={() => setShowModal(true)}>Verify Your Account</li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <VerifyForm />
        </Modal>
      )}
    </>
  );
}

export default VerifyFormModal