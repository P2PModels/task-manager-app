/*pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract taskManager is AragonApp {
    //address public manager;
    enum priority { HIGH, MEDIUM, LOW }
    struct  Task {
        string name;
        priority p;
        bool isDone;
    }
    Task t;
    Task[]  tasks ;
    uint public numTasks;
 
    

    /// ROLES
    bytes32 constant public CREATE_ROLE = keccak256("CREATE_ROLE");
    bytes32 constant public DELETE_ROLE = keccak256("DELETE_ROLE");
    bytes32 constant public END_ROLE = keccak256("END_ROLE");
    bytes32 constant public CHANGE_ROLE = keccak256("CHANGE_ROLE");

   function initialize(uint256 _initValue) public onlyInit {
        
        numTasks = _initValue;
        initialized();
    }


    function compareStrings(string  a, string  b) public view returns(bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }

    function createTask(string  name, string  p) public  auth(CREATE_ROLE){
        priority pr;
        
        if(compareStrings(p, "HIGH")) {
            pr = priority.HIGH;
        }
        else if(compareStrings(p, "MEDIUM"))  
        {
            pr = priority.MEDIUM;
        }
        else if(compareStrings(p, "LOW"))  
        {
            pr = priority.LOW;
        }
        
        t = Task(name, pr, false);
        tasks.push(t);
        numTasks++;
    }
    
    function deleteTask(string  name) public  auth(DELETE_ROLE){
        uint i = 0;
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            delete tasks[i];
            numTasks--;
        }
        
    }

    function listTasks() public returns (Task[] memory){
        return (tasks);
    }

    function endTask(string  name) public  auth(END_ROLE){
        uint i = 0;
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            tasks[i].isDone = true;
        }
    }

    function changePriority(string  name, string  p) public  auth(CHANGE_ROLE){
         uint i = 0;
          priority pr;
        
        if(compareStrings(p, "HIGH")) {
            pr = priority.HIGH;
        }
        else if(compareStrings(p, "MEDIUM"))  
        {
            pr = priority.MEDIUM;
        }
        else if(compareStrings(p, "LOW"))  
        {
            pr = priority.LOW;
        }
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            tasks[i].p = pr;
        }
    }
}
*/
pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract CounterApp is AragonApp {
    using SafeMath for uint256;

    /// Events
    event CreateTask(address indexed entity, uint256 step, string name, string p);
    event DeleteTask(address indexed entity, uint256 step, string name);

    /// State
    uint256 public numTasks;
    enum priority { HIGH, MEDIUM, LOW }
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

    function initialize(uint256 _initValue) public onlyInit {
        numTasks = _initValue;

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
    function createTask(uint256 step, string name, string p) external auth(CREATETASK_ROLE) {
        priority pr;
        
        if(compareStrings(p, "HIGH")) {
            pr = priority.HIGH;
        }
        else if(compareStrings(p, "MEDIUM"))  
        {
            pr = priority.MEDIUM;
        }
        else if(compareStrings(p, "LOW"))  
        {
            pr = priority.LOW;
        }
        
        t = Task(name, pr, false);
        tasks.push(t);
        numTasks = numTasks.add(step);
        emit CreateTask(msg.sender, step, name, p);
    }

    /**
     * @notice Delete task
     * @param name task name to delete
     */
    function deleteTask(uint256 step, string  name) external  auth(DELETETASK_ROLE){
        uint i = 0;
        while(i < tasks.length && !compareStrings(tasks[i].name, name)) {
            i++;
        }
        if(i != tasks.length) {
            delete tasks[i];
            numTasks = numTasks.sub(step);
            emit DeleteTask(msg.sender, step, name);
        }
        
    }
}
