pragma solidity 0.5.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

contract MintyToken is ERC20, ERC20Detailed, ERC20Burnable, ERC20Mintable, ERC20Pausable{

    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20Detailed(name, symbol, decimals) {}
}