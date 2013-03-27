$(function() {
    $('#royal-flush').click(function() {
        checkRules({
            assert: [isRoyalFlush]
        });
    });
    $('#straight-flush').click(function() {
        checkRules({
            refute: [isRoyalFlush],
            assert: [isStraightFlush]
        });
    });
    $('#four-of-a-kind').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush],
            assert: [isFourOfAKind]
        });
    });
    $('#full-house').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind],
            assert: [isFullHouse]
        });
    });
    $('#flush').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse],
            assert: [isFlush]
        });
    });
    $('#straight').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush],
            assert: [isStraight]
        });
    });
    $('#three-of-a-kind').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush, isStraight],
            assert: [isThreeOfAKind]
        });
    });
    $('#two-pair').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush, isStraight, isThreeOfAKind],
            assert: [isTwoPair]
        });
    });
    $('#one-pair').click(function() {
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush, isStraight, isThreeOfAKind,
                    isTwoPair],
            assert: [isOnePair]
        });
    });
    $('#high-card').click(function() {        
        checkRules({
            refute: [isRoyalFlush, isStraightFlush, isFourOfAKind, isFullHouse, isFlush, isStraight, isThreeOfAKind, 
                    isTwoPair, isOnePair],
            assert: [isHighCard]
        });
    });
});

function checkRules(oRules) {
    var refuted = false, asserted = true, cards = readCards();
    if (oRules.refute) {
        $.each(oRules.refute, function(i, fRule) {
            if (fRule(cards)) {
                refuted = true;            
                return false;  // break out of the $.each loop
            }
        });
        if (refuted) {
            respond(false);
            return;
        }
    }
    $.each(oRules.assert, function(i, fRule) {
        if (!fRule(cards)) {
            asserted = false;
            return false;  // break out of the $.each loop
        }
    });
    respond(asserted);
}

function readCards() {
    var cards = [];
    $('input[name=card]').each(function(i, input) {
        cards.push(parseInt($(input).val()));
    });
    return cards;
}

function respond(bCorrectAnswer) {
    if (bCorrectAnswer) {
        alert("That's right!");
    }
    else {
        alert('NO! NO!!! NO NO!! WRONG!!!');
    }
}

function suit(cardNum) {
    if (cardNum >= 1 && cardNum <= 13) {
        return 'hearts';
    }
    if (cardNum >= 14 && cardNum <= 26) {
        return 'diamonds';
    }
    if (cardNum >= 27 && cardNum <= 39) {
        return 'clubs';
    }
    return 'spades';
}

function rank(cardNum) {
    return cardNum % 13 || 13;
}

function cardData(cards) {
    data = [];
    for (var i=0; i < cards.length; i++) {
        data.push({
            rank: rank(cards[i]),
            suit: suit(cards[i])
        });
    }
    return data;
}

function isRoyalFlush(cards) {
    if (!isStraightFlush(cards)) {
        return false;
    }
    lowestCard = Math.max.apply(Math, cards);
    return rank(lowestCard) === 13;
}

function isStraightFlush(cards) {
    return isStraight(cards) && isFlush(cards);
}

function isFourOfAKind(cards) {
    var bFoundFour = false, rankCounts = {};
    $.each(cards, function(i, cardNum) {
        rankStr = rank(cardNum).toString();
        rankCounts[rankStr] = rankCounts[rankStr] ? rankCounts[rankStr]+1 : 1;
    });    
    $.each(rankCounts, function(i, count) {
        if (count === 4) {
            bFoundFour = true;
            return false;  // break of out the $.each loop
        }
    });
    return bFoundFour;
}

function isFullHouse(cards) {
    var bFoundTwo = false, bFoundThree = false, rankCounts = {};
    $.each(cards, function(i, cardNum) {
        rankStr = rank(cardNum).toString();
        rankCounts[rankStr] = rankCounts[rankStr] ? rankCounts[rankStr]+1 : 1;
    });
    $.each(rankCounts, function(i, count) {
        if (count === 3) {
            bFoundThree = true;
        }
        if (count === 2) {
            bFoundTwo = true;
        }
    });
    return (bFoundTwo && bFoundThree);
}

function isFlush(cards) {
    var cardVals = cardData(cards);
    for (var i=0; i < cardVals.length - 1; i++) {
        if (cardVals[i].suit !== cardVals[i+1].suit) {
            return false;
        }
    }
    return true;
}

function isStraight(cards, convert) {       
    /* unless specified (by passing convert=false), we'll convert the card number 
       (e.g. 14 becomes 1, 15 becomes 2 etc, since there are 13 cards in each suit) */
    var sortedCards, verdict, copy, ace, cardNums;
    convert = typeof convert !== 'undefined' ? convert : true; 
    if (convert) {
        cardNums = [];
        $.each(cardData(cards), function(i, card) {
            cardNums.push(card.rank);
        });
    }
    else {
        cardNums = cards;
    }
    sortedCards = sort(cardNums);
    for (var i=0; i < sortedCards.length - 1; i++) {
        if (sortedCards[i+1] !== sortedCards[i]+1) {
            verdict = false;
            break;
        }
    }
    if (verdict === false) {
        /* aces can also be treated as higher than king (14) */
        ace = sortedCards.indexOf(1);
        if (ace >= 0) {
            copy = clone(sortedCards);
            copy[ace] = 14;
            return isStraight(copy, false);
        }
        else return false;
    }
    return true;
}

function isThreeOfAKind(cards) {
    var bFoundThree = false, rankCounts = {};
    $.each(cards, function(i, cardNum) {
        rankStr = rank(cardNum).toString();
        rankCounts[rankStr] = rankCounts[rankStr] ? rankCounts[rankStr]+1 : 1;
    });    
    $.each(rankCounts, function(i, count) {
        if (count === 3) {
            bFoundThree = true;
            return false;  // break of out the $.each loop
        }
    });
    return bFoundThree;
}

function isTwoPair(cards) {
    var pairCount = 0, rankCounts = {};
    $.each(cards, function(i, cardNum) {
        rankStr = rank(cardNum).toString();
        rankCounts[rankStr] = rankCounts[rankStr] ? rankCounts[rankStr]+1 : 1;
    });    
    $.each(rankCounts, function(i, count) {
        if (count >= 2) {
            pairCount++;
        }
    });
    return pairCount >= 2;
}

function isOnePair(cards) {
    var bPair = false, rankCounts = {};
    $.each(cards, function(i, cardNum) {
        rankStr = rank(cardNum).toString();
        rankCounts[rankStr] = rankCounts[rankStr] ? rankCounts[rankStr]+1 : 1;
    });    
    $.each(rankCounts, function(i, count) {
        if (count === 2) {
            bPair = true
            return false; // break out of the $.each loop
        }
    });
    return bPair;
}

function isHighCard(cards) {
    return true;
}

function sort(array) {
    return array.sort(function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    });
}

function clone(array) {
    return array.slice(0);
}
