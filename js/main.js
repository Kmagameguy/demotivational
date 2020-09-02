let lastQuote = null;

function randContainerXSize() {
    return ((Math.random()*($(document).width()*0.6)) + ($(document).width()*0.35)).toFixed();
}

function randContainerYSize() {
    return ((Math.random()*($(document).height()*0.35)) + ($(document).height()*0.25)).toFixed();
}

function randDelay() {
    return Math.floor(Math.random() * 3000) + 1500;
}

function randXPos(refObjWidth) {
    return (Math.random() * ($(document).width() - refObjWidth)).toFixed();
}

function randYPos(refObjWidth, buffer) {
    let preCalcPos = Math.round((Math.random() * ($(document).height() - refObjWidth) + buffer));
    return preCalcPos;
}

function randomTextColor() {
    return 'hsl(' + 350 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' +
               (85 + 10 * Math.random()) + '%)'
}

function randMotivationIndex() {
    return Math.floor(Math.random() * motivations.length);
}

function getMotivation() {
    let randIndex = randMotivationIndex();
    while (randIndex === lastQuote) {
        randIndex = randMotivationIndex();
    }
    lastQuote = randIndex;
    return motivations[randIndex];
}

function TextIcon(buffer) {
    this.size = randContainerXSize();
    this.position = 'absolute';
    this.left = randXPos(this.size) + 'px';
    this.top = randYPos(randContainerYSize(), buffer) + 'px';
    this.display = 'none';
    this.width = this.size + 'px';
    this.height = randContainerYSize() + 'px';
    this.color = randomTextColor();
    this.content = getMotivation();
    this.fontSize = '4vw';
    this.font = 'DM Serif Display';
}

function constructIcon() {
    let navbarTop = $('#mainNav').position().top;
    let navbarHeight = $('#mainNav').outerHeight(true);
    let navbarOffset = navbarTop + navbarHeight;
    let text = new TextIcon(navbarOffset);
    $newdiv = $('<div/>').css({
        'position': text.position,
        'left': text.left,
        'top': text.top,
        'width': text.width,
        'height': text.height,
        'color': text.color,
        'display': text.display,
        'font-size': text.fontSize,
        'font-family': text.font,
        'text-align': 'center',
        'vertical-align': 'middle',
        'line-hight': text.height
    }).text(text.content).appendTo('body').fadeIn(1200).delay(randDelay()).fadeOut(1000, function() {
        $(this).remove();
        constructIcon();
    });
}

constructIcon();