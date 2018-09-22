whenLoaded(function () {

    // Touch mode have different player than skin (bigger buttons, metadata, cover ...)
    var player = qid('mainPlayer');
    if (player) {
        player.setAttribute('data-uiblock', 'player_touch');
    }
    includeHTML(player, player.getAttribute('data-uiblock') + '.html');
});
