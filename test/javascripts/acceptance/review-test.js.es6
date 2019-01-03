import { acceptance } from "helpers/qunit-helpers";

acceptance("Review", {
  loggedIn: true
});

const REVIEWABLE_USER = ".reviewable-item[data-reviewable-id=1234]";

QUnit.test("It returns a list of reviewable items", async assert => {
  await visit("/review");

  assert.ok(find(".reviewable-item").length, "has a list of items");
  assert.equal(find(REVIEWABLE_USER).length, 1);
  assert.ok(
    find(`${REVIEWABLE_USER}.reviewable-user`).length,
    "applies a class for the type"
  );
  assert.ok(
    find(`${REVIEWABLE_USER} .reviewable-action.approve`).length,
    "creates a button for approve"
  );
  assert.ok(
    find(`${REVIEWABLE_USER} .reviewable-action.reject`).length,
    "creates a button for reject"
  );
});

QUnit.test("Clicking the buttons triggers actions", async assert => {
  await visit("/review");
  await click(`${REVIEWABLE_USER} .reviewable-action.approve`);
  assert.equal(
    find(REVIEWABLE_USER).length,
    0,
    "it removes the reviewable on success"
  );
});
