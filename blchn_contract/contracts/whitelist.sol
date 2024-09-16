// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract whitelist {
    mapping(address => bool) public nameList;
    address public admin;

    event AddedToWhitelist(address indexed account);
    event RemovedFromWhitelist(address indexed account);

    constructor() {
        admin = msg.sender; // The contract deployer is the admin
        nameList[admin]=true;

    }
     // Modifier to restrict functions to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }


    // Function to add an address to the whitelist
    function addToList(address _address) public onlyAdmin(){
        nameList[_address] = true;
    }
    //Function to remove from whitelist
    function removeFromList(address _account) public onlyAdmin {
        nameList[_account] = false;
        emit RemovedFromWhitelist(_account);
    }
    // Function to check if an address is whitelisted
    function inTheList(address _address) public view returns (bool) {
        return nameList[_address];
    }
    // Function to change the admin
    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }
    // Function to check if an address is the admin
    function isAdmin(address _account) public view returns (bool) {
        return _account == admin;
    }
    //Function to get address of admin, for testing purpose
    function getAdmin() public view returns (address) {
        return admin;
    }
}
