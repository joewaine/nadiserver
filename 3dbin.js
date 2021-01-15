const BinPacking3D = require('binpackingjs').BP3D;

const { Item, Bin, Packer } = BinPacking3D;

let bin1 = new Bin("Le petite box", 296, 296, 8, 1000);
let item1 = new Item("Item 1", 250, 250, 2, 200);
let item2 = new Item("Item 2", 250, 250, 2, 200);
let item3 = new Item("Item 3", 250, 250, 2, 200);
let packer = new Packer();



console.log(item1);
console.log(bin1);
packer.addBin(bin1);
packer.addItem(item1);
packer.addItem(item2);
packer.addItem(item3);

// pack items into bin1
packer.pack();

// item1, item2, item3
console.log(bin1.items);

// items will be empty, all items was packed
console.log(packer.items);

// unfitItems will be empty, all items fit into bin1
console.log(packer.unfitItems)
