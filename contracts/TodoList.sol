//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

contract TodoList {
    uint256 public _idUser;
    address public contractOwner;

    address[] public creators;
    string[] public messages;
    uint256[] public messageId;

    struct TodoListApp{
        address account;
        uint256 userId;
        string message;
        bool completed;

    } 
    event ToDoEvent(
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed
    );

    mapping(address => TodoListApp) public toDoListApps;

    constructor() {
        contractOwner = msg.sender;
    }

    function inc() internal{
        _idUser++;
    }
    
    function CreateList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;
        TodoListApp storage toDo = toDoListApps[msg.sender];

        toDo.account = msg.sender;
        toDo.message = _message;
        toDo.completed = false;
        toDo.userId = idNumber;

        creators.push(msg.sender);
        messages.push(_message);
        messageId.push(idNumber);

        emit ToDoEvent(msg.sender,toDo.userId, _message, toDo.completed);

    }

    function getCreatorData(address _address) public view returns(address, uint256, string memory,bool){
        TodoListApp memory singleUserData = toDoListApps[_address];
        return (
            singleUserData.account,
            singleUserData.userId,
            singleUserData.message,
            singleUserData.completed
        );
        
    }

    function getAddress() external view returns (address[] memory){
        return creators;
    }
    function getMessage() external view returns(string[] memory){
        return messages;
    }
    //function to see to do list is complete or not
    function toggle(address _creator) public {
        TodoListApp storage singleUserData = toDoListApps[_creator];
        singleUserData.completed = !singleUserData.completed;
    }

}