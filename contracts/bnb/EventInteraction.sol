// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract EventInteraction is
    Initializable,
    // ERC20Upgradeable,
    // ERC20PermitUpgradeable,
    // ERC20VotesUpgradeable,
    OwnableUpgradeable
{
    /**
     * @param voter wallet address
     * @param vote true, false
     */
    // event Vote(address indexed voter, bool vote);

    /**
     *
     * @param user wallet address
     */
    event Attendance(address indexed user);

    /**
     * @dev voting record
     */
    // mapping(address => bool) private votes;

    /**
     * @custom:oz-upgrades-unsafe-allow constructor
     */
    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner) public initializer {
        // __ERC20_init("EventInteraction", "XR");
        // __ERC20Permit_init("EventInteraction");
        // __ERC20Votes_init();
        __Ownable_init(initialOwner);
    }

    function attendance() public {
        emit Attendance(msg.sender);
    }

    // function _update(
    //     address from,
    //     address to,
    //     uint256 value
    // ) internal override(ERC20Upgradeable, ERC20VotesUpgradeable) {
    //     super._update(from, to, value);
    // }

    // function nonces(
    //     address owner
    // ) public view override(ERC20PermitUpgradeable, NoncesUpgradeable) returns (uint256) {
    //     return super.nonces(owner);
    // }

    // function getVote(address voter) public view returns (bool) {
    //     return votes[voter];
    // }

    /**
     *
     * @param _vote true, false
     * 현재는 배포된 토큰 컨트랙트 보유 여부만 판단 추후 요구사항 반영 필요
     */
    // function vote(bool _vote) public {
    //     IERC20 token = IERC20(0xaC81fB36843918C616344Ff1BC866E4a1C136cC3);
    //     uint256 balance = token.balanceOf(msg.sender);
    //     require(balance > 0, "You must hold tokens to vote");

    //     votes[msg.sender] = _vote;
    //     emit Vote(msg.sender, _vote);
    // }
}
