const assert = require("mocha").assert;
const updateAccount = require("../components/Accounts/Accounts").updateAccount;

describe("App", function() {
  it("updateAccount should update account with id provided", function() {
    let result = updateAccount();
    assert.equal(result, "User has been deleted");
  });
});
