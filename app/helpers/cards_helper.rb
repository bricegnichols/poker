module CardsHelper
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
end
