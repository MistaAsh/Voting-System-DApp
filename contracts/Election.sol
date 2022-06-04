pragma solidity ^0.5.16;

contract Election 
{
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping (address => bool) public voters;

    mapping (uint => Candidate) public candidates;
    uint public candidateCount;

    constructor() public {
        addCandidate("John");
        addCandidate("Newmann");
    }

    event votedEvent (uint indexed _candidateId);

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(voters[msg.sender] == false);
        require(_candidateId <= candidateCount && _candidateId > 0);    
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}