export default function modalControls() {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal-backdrop');

    const modalActions = {
        runOpen: () => {
            modalActions.openerElement = document.activeElement //set and save element that opened the modal
            openModal();
        },
        runClose: () => {
            closeModal(modalActions.openerElement);
        },
        handleBackdropClick: (event) => {
            if(event.target.className === 'modal-backdrop') {
                closeModal(modalActions.openerElement);
            }
        }
    }

    function openModal() {
        setVisibile(true);
        setFocus();
    }

    function closeModal(openerElement) {
        setVisibile(false);
        openerElement.focus() //return focus to opened element
    }

    function setVisibile(visible) {
        const display = visible ? 'visible' : 'hidden'

        if (visible) { // open
            modal.removeAttribute("inert", true)
            modal.showModal()
            body.setAttribute("inert", true);
        } else { // close
            body.removeAttribute("inert", true);
            modal.setAttribute("inert", true);
            modal.close()
        }
        
        modal.dataset.display = display;
    }

    function setFocus() {
        document.querySelectorAll('.modal-backdrop button, .modal-backdrop input, .modal-backdrop textarea, .modal-backdrop select')[0].focus()
    }

    function closeOnEscapeKeyPress(event) {
        if(event.key === 'Escape') {
            modalActions.runClose();
        }
    }

    function attachEventListeners(openButtons, closeButtons, backdrop) {
        openButtons.forEach(button => {
            button.addEventListener('click', modalActions.runOpen);
        });
        closeButtons.forEach(button => {
            button.addEventListener('click', modalActions.runClose);
        });

        backdrop.addEventListener('click', modalActions.handleBackdropClick);
        window.addEventListener('keydown', closeOnEscapeKeyPress);
    }


    attachEventListeners(openModalButtons, closeModalButtons, modal);
    
}