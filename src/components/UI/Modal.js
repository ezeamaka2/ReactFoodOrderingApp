import react from 'react';
import ReactDom from 'react-dom';

import classes from './Modal.module.css'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return <react.Fragment>
        {ReactDom.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, portalElement)}
        {ReactDom.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>    
        ,portalElement)}
    </react.Fragment>
}

export default Modal
