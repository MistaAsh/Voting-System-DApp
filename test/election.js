var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    var electionInstance;

    it("initialized with two candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidateCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("initialized with corect candidates", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate.id, 1, "correct id - yes");
            assert.equal(candidate.name, "John", "correct name - yes");
            assert.equal(candidate.voteCount, 0, "correct vote count - yes");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate.id, 2, "correct id - yes");
            assert.equal(candidate.name, "Newmann", "correct name - yes");
            assert.equal(candidate.voteCount, 0, "correct vote count - yes");          
        });
    });
})