pragma solidity ^0.5.16;

contract Election 
{
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping (uint => Candidate) public candidates;
    uint public candidateCount;

    constructor() public {
        addCandidate("John");
        addCandidate("Newmann");
    }

    function addCandidate(string memory _name) private {
        candidateCount += 1;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }
}