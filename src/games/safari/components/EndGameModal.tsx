import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EndGameModal = ({
  closeModal,
  show,
}: {
  closeModal: Function;
  showModal?: Function;
  show: boolean;
}): JSX.Element => {
  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Body>Вы потратили все жизни и проиграли</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => closeModal()}>
            Играть еще!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EndGameModal;
