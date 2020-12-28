pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract CounterApp is AragonApp {
    using SafeMath for uint256;

    /// Events
    event CreateTask(address indexed entity, string name, uint256 p);
    event DeleteTask(address indexed entity, string name);
    event EndTask(address indexed entity, string name);
    event ChangePriority(address indexed entity, string name, uint256 p);

    /// State
    uint256 public numTasks;
    enum priority { LOW, MEDIUM, HIGH}
    struct Task {
        string name;
        priority p;
        bool isDone;
    }
    Task t;
    Task[] public tasks ;

    /// ACL
    bytes32 constant public CREATETASK_ROLE = keccak256("CREATETASK_ROLE");
    bytes32 constant public DELETETASK_ROLE = keccak256("DELETETASK_ROLE");
    bytes32 constant public ENDTASK_ROLE = keccak256("ENDTASK_ROLE");
    bytes32 constant public CHANGEPRIORITY_ROLE = keccak256("CHANGEPRIORITY_ROLE");

    function initialize() public onlyInit {
        
        numTasks = 2;
        t = Task("Crear proyecto", priority.LOW, false);
        tasks.push(t);
        t = Task("TFG", priority.MEDIUM, false);
        tasks.push(t);

        initialized();
    }

     function compareStrings(string  a, string  b) public view returns(bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }

    /**
     * @notice Create a new task and increment newTask
     * @param name task name
     * @param p  task priority
     */
    function createTask(string name, uint256 p) external auth(CREATETASK_ROLE) {
        t = Task(name, priority(p), false);
        tasks.push(t);
        numTasks = numTasks.add(1);
        emit CreateTask(msg.sender,name, p);
    }
  
    /**
     * @notice Delete task
     * @param name task name to delete
     */
    function deleteTask(string  name) external  auth(DELETETASK_ROLE){
        uint i = 0;
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            for (uint j = i; j < tasks.length - 1; j++){
                tasks[j] = tasks[j+1];
            }
            delete tasks[tasks.length - 1];
            tasks.length--;
            numTasks = numTasks.sub(1);
            emit DeleteTask(msg.sender, name);
        }
    }
    /**
     * @notice finish task
     * @param name task name
     */
    function endTask(string  name) external  auth(ENDTASK_ROLE){
        uint i = 0;
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            tasks[i].isDone = true;
            emit EndTask(msg.sender, name);
        }

    }

     /**
     * @notice change the priority of a task
     * @param name task name to change
     * @param p  new priority
     */
    function changePriority(string  name, uint256  p) external  auth(CHANGEPRIORITY_ROLE){
         uint i = 0;
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            tasks[i].p = priority(p);
            emit ChangePriority(msg.sender, name, p);
        }
    }
}
