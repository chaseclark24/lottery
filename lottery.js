'use strict';

var ticketInfo = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.from = toString(o.from);
    this.blockHeight = new BigNumber(o.blockHeight);
  } else {
    this.from = null;
    this.blockHeight = new BigNumber(0);

  }
};

ticketInfo.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var lotteryContract = function() 
{
  LocalContractStorage.defineMapProerty(this, "lottery", 
  {
    parse: function (text) 
    {
      return new ticketInfo(text);
    },
    stringify: function (o) 
    {
      return o.toString();
    }
  });

}

// users can participate in a lottery
lottery.prototype = 
{


  init: function () 
  {
    var ticketNumber=1337
  },

  
  buyTicket: function ()
  {
    var from = Blockchain.transaction.from;
    var amount = Blockchain.transaction.value;
    var ticketBlock = new BigNumber(Blockchain.block.height);

    if (amount != 1000000) {
      throw new Error("Tickets cost 0.1 Nebulas");
    }
    var ticket = new ticketInfo()
    ticket.from=from
    ticket.blockHeight=ticketBlock
  
    this.lottery.put(ticketNumber, ticket)
    ticketNumber += 1

  }

  readTickets: function (blockHeight)
  {
    return this.lottery.get(ticketNumber)
  }

  payout: function (value, addr)
  {
    var amount = new BigNumber(value);
    Event.Trigger("BankVault", 
    {
      Transfer: 
      {
        from: Blockchain.transaction.to,
        to: addr.toString(),
        value: amount.toString()
      }
    }

  }



module.exports = Lottery;