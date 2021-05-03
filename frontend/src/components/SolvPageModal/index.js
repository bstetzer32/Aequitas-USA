import React, { useState } from 'react';
// import {useSelector} from "react-redux";
import { Modal } from '../../context/Modal';
import SolvPage from './SolvPage';

function SolvPageModal({i, j, title}) {
  const [showModal, setShowModal] = useState(false);
  // const feed = useSelector(state => state.feed)

  return (
    <>
      <div id="prob-modal-div" onClick={() => setShowModal(true)} className="prob-solv-tile__info__title__icon on-hover">
        <i className="fas fa-scroll"></i>
      </div>
      <div className="prob-solv-tile__info__title__text on-hover" onClick={() => setShowModal(true)}>
                            {title}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SolvPage i={i} j={j}/>
        </Modal>
      )}
    </>
  );
}

export default SolvPageModal