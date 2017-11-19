let InstructionsModalComponent = function (loginModal) {
    const $instructionsModal = $('#modal-instructions');
    const $btnStartGame = $instructionsModal.find('#btn-start-game');

    $btnStartGame.on('click', () => {
        loginModal.authenticateUser();
        $instructionsModal.modal('hide');
    });

    $instructionsModal.modal();
};