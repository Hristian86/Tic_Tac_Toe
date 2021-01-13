import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Invite = ({ answerChoise, description }) => {

    const accept = () => {
        //console.log("1");
        answerChoise(1)
    }

    const decline = () => {
        //console.log("2");
        answerChoise(2)
    }

    return <Apps
        description={description}
        accept={accept}
        decline={decline}
    />
    
}

const MyVerticallyCenteredModal = (props) => {

    const onClickEventAccept = () => {
        props.accept();
        props.onHide();
    }

    const onClickEventDecline = () => {
        props.decline();
        props.onHide();
    }

    return <div>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    {props.description}
        </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClickEventAccept}>Accept</Button>
                <Button onClick={onClickEventDecline}>Decline</Button>
            </Modal.Footer>
        </Modal>

    </div>
}

const Apps = ({ accept, decline, description }) => {
    const [modalShow, setModalShow] = React.useState(true);

    return <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

        <MyVerticallyCenteredModal
            description={description}
            decline={decline}
            accept={accept}
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </div>
}

export default Invite;