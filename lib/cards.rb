module Cards
  def generate_hand
    cards = []
    5.times do
      new_card = random_card
      while cards.include? new_card
        new_card = random_card
      end
      cards << new_card
    end
    cards
  end

  def random_card
    rand(1..52)
  end

  def card_name_for(card_number)
    prefix = card_prefix_for(card_number)
    if (1..13).include?(card_number)
      suit = 'hearts'
    elsif (14..26).include?(card_number)
      suit = 'diamonds'
    elsif (27..39).include?(card_number)
      suit = 'clubs'
    else
      suit = 'spades'
    end
    "#{prefix}_of_#{suit}"
  end

  def card_prefix_for(card_number)
    card = card_number % 13
    return 'king' if card == 0 || card == 13
    return 'queen' if card == 12
    return 'jack' if card == 11
    return 'ace' if card == 1
    card.to_s
  end
end
