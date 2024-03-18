async function simple() {
  return 2;
}

async function simple1() {
  let val = await simple();
  console.log(val);
}

simple1();
