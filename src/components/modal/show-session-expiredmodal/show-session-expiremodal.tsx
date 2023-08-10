
function ShowSessionExpiremodal({ isOpen, onClose, title, children }: any) {
    if (!isOpen) return null;

    return (
        <div class="modal-overlay">
            <div class="modal">
                <span class="modal-close-btn" onClick$={onClose}>&times;</span>
                <h2>{title}</h2>
                <div class="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
export default ShowSessionExpiremodal