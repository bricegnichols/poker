require 'test_helper'

class CardsTest < ActionView::TestCase
  include Cards
  
  def setup
  end

  test 'generate_hand produces a 5 card hand' do
    hand = generate_hand
    assert hand.is_a?(Array)
    assert_equal 5, hand.length
    hand.each do |card|
      assert card >= 1
      assert card <= 52
    end
  end
  
  test 'generate_hand consistently produces unique hands' do
    1000.times do
      hand = generate_hand   
      hand.each_with_index do |card, idx|        
        other_cards = hand.clone
        other_cards.delete_at(idx)
        refute other_cards.include?(card), "Hand should not have duplicates!"
      end
    end
  end

  test 'card_name_for maps card number (1-52) to a string' do
    assert_equal 'ace_of_hearts', card_name_for(1)
    assert_equal '2_of_hearts', card_name_for(2)
    assert_equal '5_of_hearts', card_name_for(5)
    assert_equal '10_of_hearts', card_name_for(10)
    assert_equal 'jack_of_hearts', card_name_for(11)
    assert_equal 'queen_of_hearts', card_name_for(12)
    assert_equal 'king_of_hearts', card_name_for(13)

    assert_equal 'ace_of_diamonds', card_name_for(14)
    assert_equal '4_of_diamonds', card_name_for(17)
    assert_equal '10_of_diamonds', card_name_for(23)
    assert_equal 'jack_of_diamonds', card_name_for(24)
    assert_equal 'queen_of_diamonds', card_name_for(25)
    assert_equal 'king_of_diamonds', card_name_for(26)

    assert_equal 'ace_of_clubs', card_name_for(27)
    assert_equal '2_of_clubs', card_name_for(28)
    assert_equal '10_of_clubs', card_name_for(36)
    assert_equal 'jack_of_clubs', card_name_for(37)
    assert_equal 'queen_of_clubs', card_name_for(38)
    assert_equal 'king_of_clubs', card_name_for(39)

    assert_equal 'ace_of_spades', card_name_for(40)
    assert_equal '2_of_spades', card_name_for(41)
    assert_equal '10_of_spades', card_name_for(49)
    assert_equal 'jack_of_spades', card_name_for(50)
    assert_equal 'queen_of_spades', card_name_for(51)
    assert_equal 'king_of_spades', card_name_for(52)
  end
    
  test 'card_prefix gives the number (within suit) or face card type' do
    assert_equal 'ace', card_prefix_for(1)
    assert_equal 'ace', card_prefix_for(14)
    assert_equal 'ace', card_prefix_for(27)
    assert_equal 'ace', card_prefix_for(40)

    assert_equal 'jack', card_prefix_for(11)
    assert_equal 'jack', card_prefix_for(24)
    assert_equal 'jack', card_prefix_for(37)
    assert_equal 'jack', card_prefix_for(50)

    assert_equal 'queen', card_prefix_for(12)
    assert_equal 'queen', card_prefix_for(25)
    assert_equal 'queen', card_prefix_for(38)
    assert_equal 'queen', card_prefix_for(51)

    assert_equal 'king', card_prefix_for(13)
    assert_equal 'king', card_prefix_for(26)
    assert_equal 'king', card_prefix_for(39)
    assert_equal 'king', card_prefix_for(39)
    assert_equal 'king', card_prefix_for(52)

    assert_equal '4', card_prefix_for(4)
    assert_equal '4', card_prefix_for(17)
    assert_equal '4', card_prefix_for(30)
    assert_equal '4', card_prefix_for(43)
  end
end
