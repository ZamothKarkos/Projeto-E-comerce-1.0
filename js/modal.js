// Modal behavior and integration with cart updates
const modalOptions = {
    onShow(modal) {
        modal.removeAttribute('inert');
        modal.setAttribute('aria-hidden', 'false');
        refreshCartModal();
    },
    onClose(modal) {
        modal.setAttribute('inert', '');
        modal.setAttribute('aria-hidden', 'true');
    }
};

function refreshCartModal() {
    if (typeof renderizarTabelaDoCarrinho === 'function') {
        renderizarTabelaDoCarrinho();
    }
    if (typeof atualizarContadorCarrinho === 'function') {
        atualizarContadorCarrinho();
    }
}

function bindModalKeyboardShortcuts() {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.querySelector('.modal.is-open')) {
            MicroModal.close('modal-1');
        }
    });
}

function initModal() {
    MicroModal.init(modalOptions);
    bindModalKeyboardShortcuts();
}

document.addEventListener('DOMContentLoaded', initModal);

// Funções de apoio para manter compatibilidade com a lógica de carrinho existente
function atualizarModalAutomaticamente() {
    refreshCartModal();
}

// Exporte caso queria usar em outros scripts
window.atualizarModalAutomaticamente = atualizarModalAutomaticamente;