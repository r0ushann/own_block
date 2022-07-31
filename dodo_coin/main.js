
const SHA256 = require('crypto-js/sha256');

class Block {

    constructor (timestamp , data , previousHash = ''){
    //    this.index = index;
       this.timestamp = timestamp;
       this.transactions = this.transactions;
       this.previousHash = previousHash;
       this.hash = this.calculateHash() ;
       this.nonce = 0;
    }


   //here's the function to generate the unique hash
    calculateHash(){
        return SHA256(this.index+ this.previousHash + this.timestamp +JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring( 0 , difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined : " + this.hash)
    }

}

class Transaction{
    constructor (fromAddress , toAddress , amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}



class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }


    createGenesisBlock(){
        return new Block( "01/01/2022", "Genesis block", "0");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);


        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress , this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){

        let balance = 0;

        for(const block of this.chain){

            for(const trans of block.transactions){

                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLastBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineBlock(this.difficulty)
    //     this.chain.push(newBlock);
    // }

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

// console.log('Mining block 1....')
// dodoCoin.addBlock(new Block(1 , "29/07/2022" , {amount : 04 , detail :"to self" }))

// console.log('Mining block 2....')
// dodoCoin.addBlock(new Block(2 , "29/07/2022", {amount: 08, detail : "to self"}))
//console.log( JSON.stringify(dodoCoin , null , 3) + dodoCoin.isChainValid()  +'\n')
//console.log(JSON.stringify(dodoCoin , null , 3))


dodoCoin.createTransaction(new Transaction('address1' , 'address2', 100));
dodoCoin.createTransaction(new Transaction('address2' , 'address1', 100));

console.log('\n Starting the miner...');
dodoCoin.minePendingTransactions('roushans-address');

console.log('\n Balance of roushan is ', dodoCoin.getBalanceOfAddress('roushans-address'));