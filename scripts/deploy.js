async function main() {
  
  const TodoList = await hre.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  await todoList.deployed();

  console.log("Lock with 1 ETH deployed to:",todoList.address);
  //console.log(todoList);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
