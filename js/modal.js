// // Inicializar MicroModal
MicroModal.init({
    onShow: function(modal) {
        modal.removeAttribute('inert');
        modal.setAttribute('aria-hidden', 'false');
    },
    onClose: function(modal) {
        modal.setAttribute('inert', '');
        modal.setAttribute('aria-hidden', 'true');
    }
});