require 'rails_helper'

describe ReviewableQueuedPostSerializer do

  let(:reviewable) { Fabricate(:reviewable_queued_post) }
  let(:admin) { Fabricate(:admin) }

  it "includes the user fields for review" do
    json = ReviewableQueuedPostSerializer.new(reviewable, scope: Guardian.new(admin), root: nil).as_json
    expect(json[:raw]).to eq('hello world post contents.')
    expect(json[:title]).to eq('queued post title')
    expect(json[:topic_id]).to eq(reviewable.topic_id)
    expect(json[:can_edit]).to eq(true)

    fields = json[:editable_fields]
    expect(fields).to be_present
    expect(fields.any? { |f| f[:id] == 'category_id' }).to eq(true)
    expect(fields.any? { |f| f[:id] == 'raw' }).to eq(true)
    expect(fields.any? { |f| f[:id] == 'title' }).to eq(true)
  end

end
