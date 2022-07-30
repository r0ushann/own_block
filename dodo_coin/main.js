
const SHA256 = require('crypto-js/sha256');

class Block {

    constructor (index , timestamp , data , previousHash = ''){
       this.index = index;
       this.timestamp = timestamp;
       this.data= data;
       this.previousHash = previousHash;
       this.hash = this.calculateHash() ;
       this.nonce = 0;
    }


   //here's the function to generate the unique hash
    calculateHash(){
        return SHA256(this.index+ this.previousHash + this.timestamp +JSON.stringify(this.data) + this.nonce).toString();

    }
    mineBlock(difficulty){
        while(this.hash.substring(0 , difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined : " + this.hash)
    }

}



class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
        this.difficulty = 2;
    }


    createGenesisBlock(){
        return new Block(0 , "01/01/2022", "Genesis block", "0");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i< this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }

        return true;
        console.log(" ^_^ ")
      
    }

    theGreeting(){
         if(this.isChainValid = true){
        console.log("Hurray! you have a genuine block :)")

        }
        else{
            console.log('sorry! the block is currupted  ;( ')
        }
    }

}

let dodoCoin = new Blockchain()

console.log('Mining block 1....')
dodoCoin.addBlock(new Block(1 , "29/07/2022" , {amount : 04 , detail :"to self" }))

console.log('Mining block 2....')
dodoCoin.addBlock(new Block(2 , "29/07/2022", {amount: 08, detail : "to self"}))
//console.log( JSON.stringify(dodoCoin , null , 3) + dodoCoin.isChainValid()  +'\n')
//console.log(JSON.stringify(dodoCoin , null , 3))