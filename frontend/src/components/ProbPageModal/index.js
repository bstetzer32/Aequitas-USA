import React, { useState } from 'react';
// import {useSelector} from "react-redux";
import { Modal } from '../../context/Modal';
import ProbPage from './ProbPage';

function ProbPageModal({i, title}) {
  const [showModal, setShowModal] = useState(false);
  // const feed = useSelector(state => state.feed)

  return (
    <>
      <div id="prob-modal-div" onClick={() => setShowModal(true)} className="prob-solv-tile__info__title__icon on-hover">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <div className="prob-solv-tile__info__title__text on-hover" onClick={() => setShowModal(true)}>
                            {title}
                        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProbPage i={i}/>
        </Modal>
      )}
    </>
  );
}

export default ProbPageModal