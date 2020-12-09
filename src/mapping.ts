import { BigInt } from "@graphprotocol/graph-ts"
import {
  eroll,
  LogBet,
  LogResult,
  LogRefund,
  LogOwnerTransfer
} from "../generated/eroll/eroll"
import { Bet,Player,Statistic } from "../generated/schema"

export function handleLogBet(event: LogBet): void {
  let bet = Bet.load(event.params.BetID.toHexString());
  if (bet == null) {
    bet = new Bet(event.params.BetID.toHexString());
    bet.rewardvalue=BigInt.fromI32(0)
    bet.profitvalue=BigInt.fromI32(0)
    bet.betvalue=BigInt.fromI32(0)

  }
  let player = Player.load(event.params.PlayerAddress.toHex());
  if (player == null) {
    player = new Player(event.params.PlayerAddress.toHex());
    player.save()
  }

  bet.player=player.id
  bet.rewardvalue=event.params.RewardValue
  bet.profitvalue=event.params.ProfitValue
  bet.betvalue=event.params.BetValue
  bet.playernumber=event.params.PlayerNumber
  bet.randomqueryid=event.params.RandomQueryID
  bet.save()
}

export function handleLogResult(event: LogResult): void {
  let stat = Statistic.load('1');
  if (stat == null) {
    stat = new Statistic('1');
    stat.bets=BigInt.fromI32(0)
    stat.wons=BigInt.fromI32(0)
    stat.looses=BigInt.fromI32(0)
  }

  let bet = Bet.load(event.params.BetID.toHexString());
  if (bet == null) {
    bet = new Bet(event.params.BetID.toHexString());
    bet.rewardvalue=BigInt.fromI32(0)
    bet.profitvalue=BigInt.fromI32(0)
    bet.betvalue=BigInt.fromI32(0)
  }
  let player = Player.load(event.params.PlayerAddress.toHex());
  if (player == null) {
    player = new Player(event.params.PlayerAddress.toHex());
    player.save()
  }
  if (event.params.Status == BigInt.fromI32(0) ) {
    bet.Won=false
    stat.looses=stat.looses+BigInt.fromI32(1)
  }
  else {
    bet.Won=true
    stat.wons=stat.wons+BigInt.fromI32(1)
  }
  bet.diceresult=event.params.DiceResult
  bet.proof=event.params.Proof
  bet.save()

  stat.bets=stat.bets+BigInt.fromI32(1)
  stat.save()
}

export function handleLogRefund(event: LogRefund): void {}

export function handleLogOwnerTransfer(event: LogOwnerTransfer): void {}
