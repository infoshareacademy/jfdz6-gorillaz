let InstructionsModalComponent = function (loginModal){
    const $instructionsModal = $('#instructionsModal');
    const $btnStartGame = $instructionsModal.find('#btnStartGame');

    $btnStartGame.on('click', () => {
        loginModal.authenticateUser();
    });

    $instructionsModal.modal();
}