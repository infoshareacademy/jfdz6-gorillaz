let BoardComponent = function (statisticsService) {
    const heroes = [
        {url: 'assets/images/batman.svg', position: []},
        {url: 'assets/images/captain-america.svg', position: []},
        {url: 'assets/images/flash.svg', position: []},
        {url: 'assets/images/hulk.svg', position: []},
        {url: 'assets/images/superheroe.svg', position: []},
        {url: 'assets/images/superman.svg', position: []},
        {url: 'assets/images/thor.svg', position: []},
        {url: 'assets/images/wolverine.svg', position: []},
    ];
    let $onTableCard;
    let $flippedCard;
    const $cards = $('.board__card');

    function startGame() {
        const cardsRotationTime = 500;

        $cards.removeClass('flipped').attr('disabled', false).css('cursor', 'pointer');
        $onTableCard = null;
        $flippedCard = null;

        setTimeout(() => {
            setHeroesRandomPositions();
            addHeroes();
        }, cardsRotationTime);
    }

    function setHeroesRandomPositions() {
        const positions = [];

        function getPosition() {
            let index;
            let position;

            index = Math.floor((Math.random() * positions.length));
            position = positions[index];
            positions.splice(index, 1);

            return position;
        }

        for (let i = 0; i < 16; i++) {
            positions.push(i);
        }

        heroes.forEach((hero) => {
            hero.position = [];
            hero.position.push(getPosition());
            hero.position.push(getPosition());
        });
    }

    function addHeroes() {
        heroes.forEach((hero) => {
            hero.position.forEach((position) => $cards.eq(position).find('.hero-image').attr('src', hero.url));
        });
    }

    function onClickedCard() {
        function checkCards() {
            if (!$onTableCard) {
                $onTableCard = $flippedCard;
            } else {
                const $selectedCards = [$onTableCard, $flippedCard];

                if ($onTableCard.find('.hero-image').attr('src') === $flippedCard.find('.hero-image').attr('src')) {
                    $selectedCards.forEach(($card) => $card.attr('disabled', 'disabled').css('cursor', 'not-allowed'));
                    statisticsService.guessHero();
                } else {
                    $selectedCards.forEach(($card) => $card.toggleClass('flipped'));
                }

                $onTableCard = null;
                $cards.on('click', onClickedCard);
            }

            statisticsService.makeAttempt();
        }

        if ($(this).attr('disabled') !== 'disabled') {
            $flippedCard = $(this);
            $flippedCard.toggleClass('flipped');

            if (!$onTableCard) {
                checkCards();
            } else {
                $cards.off('click');
                setTimeout(checkCards, 500);
            }
        }
    }

    statisticsService.restartedGame.subscribe(startGame);

    $cards.on('click', onClickedCard);
    startGame();
};