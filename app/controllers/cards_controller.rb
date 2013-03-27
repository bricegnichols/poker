class CardsController < ApplicationController
  include Cards
  
  def index
    @cards = cards.map do |card_number|
      {
        name: card_name_for(card_number),
        number: card_number
      }
    end
  end

  private

  def cards
    if params[:cards].present?
      params[:cards].split(',').map do |card|
        card.strip.to_i
      end
    else
      generate_hand
    end
  end
end
