// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract EventInteraction is Initializable, OwnableUpgradeable,PausableUpgradeable {
    mapping(address => uint256) private lastAttendanceTime;

    /**
     *
     * @param user wallet address
     */
    event Attendance(address indexed user);

    /**
     * @custom:oz-upgrades-unsafe-allow constructor
     */
    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
    }

    function attendance() public whenNotPaused {
        require(canAttend(), "Already attended today");
        lastAttendanceTime[msg.sender] = getCurrentTime();
        emit Attendance(msg.sender);
    }

    function getLastAttendanceTime(address user) public view whenNotPaused returns (uint256) {
        return lastAttendanceTime[user];
    }

    function canAttend() private view whenNotPaused returns (bool) {
        uint256 currentDay = getCurrentTime();
        uint256 lastAttendedDate = lastAttendanceTime[msg.sender];
        return lastAttendedDate != currentDay;
    }

    function getCurrentTime() private view returns (uint256) {
        // 1 day = 86400 seconds
        return block.timestamp / 86400;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
