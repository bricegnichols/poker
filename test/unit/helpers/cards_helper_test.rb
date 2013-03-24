require 'test_helper'

class CardsHelperTest < ActionView::TestCase
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
end
