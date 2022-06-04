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

    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "voter marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "increments the candidate's vote count");
        });
    });

    it("throws an exception for an invalid candidate", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.vote(231, { from: accounts[1] });    
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        })
    })

    // it("throws an exception for double voting", function() {
    //     return Election.deployed().then(function(instance) {
    //         electionInstance = instance;
    //         candidateId = 2;
    //         electionInstance.vote(candidateId, { from: accounts[2] });
    //         return electionInstance.candidates(candidateId);
    //     }).then(function(candidate) {
    //         assert.equal(candidate.voteCount, 1, "accepts first vote");
    //     })
    // })
})