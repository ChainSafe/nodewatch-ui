/**
 *
 * Erc20View
 *
 */

import React, { useState, Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, fade, Button, Input } from '@material-ui/core';
import { brandColors } from 'theme';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
    root: {},
    details: {

    },
    stats:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      "& > *":{
        display: "block",
        padding: "10px 5px",
        backgroundColor: fade(brandColors.default.secondary, 0.2),
        borderRadius: "5px",
        margin: "10px"
      }
    },
    controls: {
      display: "flex",
      flexWrap: "wrap",

    },
    control:{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: 10,
      flexGrow: 1
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  tokenAddress: string,
  totalSupply: number,
  balance: number,
  decimals: number
  symbol: string,
  name: string,
  paused: boolean,
  isPauser: boolean,
  isMinter: boolean

  setTokenAddress(tokenAddress: string): void
  burn(amount: number): void
  mint(account: string, amount: number): void
  transfer(recipient: string, amount: number): void
  approve(spender: string, amount: number): void
  increaseAllowance(spender: string, amount: number): void
  decreaseAllowance(spender: string, amount: number): void
  transferFrom(sender: string, recipient: string, amount: number): void
  burnFrom(from: string, amount: number): void
  addMinter(account: string): void
  addPauser(account: string): void;
  renouncePauser(): void;
  renounceMinter(): void;
  pause(): void;
  unpause(): void;
  refresh(): void;
}

const Erc20View: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    classes,
    tokenAddress,
    totalSupply,
    balance,
    decimals,
    symbol,
    name,
    paused,
    isPauser,
    isMinter,
    setTokenAddress,
    burn,
    mint,
    transfer,
    approve,
    increaseAllowance,
    decreaseAllowance,
    transferFrom,
    burnFrom,
    addMinter,
    addPauser,
    renouncePauser,
    renounceMinter,
    pause,
    unpause,
    refresh
  } = props;


  const [inTokenAddress, setInTokenAddress] = useState("")

  const [inMint, setInMint] = useState({
    account: "",
    amount: 0
  });

  const [inTransfer, setInTransfer] = useState({
    to: "",
    amount: 0
  });


  const [inApprove, setInApprove] = useState({
    spender: "",
    amount: 0
  });

  const [inIncreaseAllowance, setInIncreaseAllowance] = useState({
    spender: "",
    amount: 0
  });

  const [inDecreaseAllowance, setInDecreaseAllowance] = useState({
    spender: "",
    amount: 0
  });

  const [inTransferFrom, setInTransferFrom] = useState({
    sender: "",
    recipient: "",
    amount: 0
  });

  const [inBurnFrom, setInBurnFrom] = useState({
    from: "",
    amount: 0
  });

  const [inBurn, setInBurn] = useState(0)

  const [inAddMinter, setAddMinter] = useState("")

  const [inAddPauser, setAddPauser] = useState("")

  return <article className={classes.root}>
    <header className={classes.details}>
      <Typography variant="h1" component="h1">
        ERC20 Demo
      </Typography>
      <Typography variant="h3" component="p">
        State
      </Typography>
      <section className={classes.stats}>
        <span>
          tokenAddress: {tokenAddress}
        </span>
        <span>
          totalSupply: {totalSupply}
        </span>
        <span>
          balance: {balance}
        </span>
        <span>
          decimals: {decimals}
        </span>
        <span>
          symbol: {symbol}
        </span>
        <span>
          name: {name}
        </span>
        <span>
          paused: {`${paused}`}
        </span>
        <span>
          isPauser: {`${isPauser}`}
        </span>
        <span>
          isMinter: {`${isMinter}`}
        </span>
      </section>
    </header>
    <section className={classes.controls}>
      <div className={classes.control}>
        <Input value={inTokenAddress} onChange={(event) => setInTokenAddress(event.target.value)} placeholder="0xdeadbeef..."/>
        <Button disabled={inTokenAddress.length != 42 || tokenAddress == inTokenAddress} onClick={() => setTokenAddress(inTokenAddress)} variant="contained" color="secondary">
          Set Token Address
        </Button>
      </div>

      {
        tokenAddress != "" && <Fragment>
           <div className={classes.control}>
            <Button onClick={() => refresh()} variant="contained" color="secondary">
              Refresh
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inTransfer.to} onChange={(event) => setInTransfer({
              to: event.target.value,
              amount: inTransfer.amount
            })} placeholder="to" />
            <Input value={inTransfer.amount} type="number" onChange={(event) => setInTransfer({
              to: inTransfer.to,
              amount: parseFloat(event.target.value)
            })} placeholder="amount"  />
            <Button disabled={inTransfer.to.length != 42} onClick={() => transfer(inTransfer.to, inTransfer.amount)} variant="contained" color="secondary">
              Transfer
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inApprove.spender} onChange={(event) => setInApprove({
              spender: event.target.value,
              amount: inApprove.amount
            })} placeholder="spender" />
            <Input value={inApprove.amount} onChange={(event) => setInApprove({
              spender: inApprove.spender,
              amount: parseFloat(event.target.value)
            })} placeholder="amount" type="number" />
            <Button disabled={inApprove.spender.length != 42} onClick={() => approve(inApprove.spender, inApprove.amount)} variant="contained" color="secondary">
              Approve
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inIncreaseAllowance.spender} onChange={(event) => setInIncreaseAllowance({
              spender: event.target.value,
              amount: inIncreaseAllowance.amount
            })} placeholder="spender" />
            <Input value={inIncreaseAllowance.amount} onChange={(event) => setInIncreaseAllowance({
              spender: inIncreaseAllowance.spender,
              amount: parseFloat(event.target.value)
            })} placeholder="amount" type="number" />
            <Button disabled={inIncreaseAllowance.spender.length != 42} onClick={() => increaseAllowance(inIncreaseAllowance.spender, inIncreaseAllowance.amount)} variant="contained" color="secondary">
              Increase Allowance
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inDecreaseAllowance.spender} onChange={(event) => setInDecreaseAllowance({
              spender: event.target.value,
              amount: inDecreaseAllowance.amount
            })} placeholder="spender" />
            <Input value={inDecreaseAllowance.amount} onChange={(event) => setInDecreaseAllowance({
              spender: inDecreaseAllowance.spender,
              amount: parseFloat(event.target.value)
            })} placeholder="amount" type="number" />
            <Button disabled={inDecreaseAllowance.spender.length != 42} onClick={() => decreaseAllowance(inDecreaseAllowance.spender, inDecreaseAllowance.amount)} variant="contained" color="secondary">
              Decrease Allowance
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inTransferFrom.sender} onChange={(event) => setInTransferFrom({
              sender: event.target.value,
              recipient: inTransferFrom.recipient,
              amount: inTransferFrom.amount
            })} placeholder="sender" />
            <Input value={inTransferFrom.recipient} onChange={(event) => setInTransferFrom({
              sender: inTransferFrom.sender,
              recipient: event.target.value,
              amount: inTransferFrom.amount
            })} placeholder="recipient" />
            <Input value={inTransferFrom.amount} onChange={(event) => setInTransferFrom({
              sender: inTransferFrom.sender,
              recipient: inTransferFrom.recipient,
              amount: parseFloat(event.target.value)
            })} placeholder="amount" type="number"  />
            <Button onClick={() => transferFrom(inTransferFrom.sender, inTransferFrom.recipient, inTransferFrom.amount)} disabled={inTransferFrom.sender.length != 42 || inTransferFrom.recipient.length != 42 || inTransferFrom.amount <= 0} variant="contained" color="secondary">
              TransferFrom
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inBurnFrom.from} onChange={(event) => setInBurnFrom({
              from: event.target.value,
              amount: inBurnFrom.amount
            })} placeholder="from" />
            <Input value={inBurnFrom.amount} onChange={(event) => setInBurnFrom({
              from: inBurnFrom.from,
              amount: parseFloat(event.target.value)
            })} placeholder="amount" type="number"  />
            <Button onClick={() => burnFrom(inBurnFrom.from, inBurnFrom.amount)} disabled={inBurnFrom.from.length != 42 || inBurnFrom.amount <= 0}  variant="contained" color="secondary">
              BurnFrom
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inMint.account} onChange={(event) => setInMint({
              account: event.target.value,
              amount: inMint.amount
            })} placeholder="account" />
            <Input value={inMint.amount} type="number" onChange={(event) => setInMint({
              account: inMint.account,
              amount: parseFloat(event.target.value)
            })} placeholder="amount"  />
            <Button disabled={inMint.account.length != 42} onClick={() => mint(inMint.account, inMint.amount)} variant="contained" color="secondary">
              Mint
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inBurn} onChange={(event) => setInBurn(parseFloat(event.target.value))} placeholder="amount" type="number" />
            <Button disabled={inBurn <= 0} onClick={() => burn(inBurn)} variant="contained" color="secondary">
              Burn
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inAddMinter} onChange={(event) => setAddMinter(event.target.value)} placeholder="account" />
            <Button onClick={() => addMinter(inAddMinter)} disabled={!isMinter || inAddMinter.length != 42} variant="contained" color="secondary">
              Add Minter
            </Button>
          </div>
          <div className={classes.control}>
            <Input value={inAddPauser} onChange={(event) => setAddPauser(event.target.value)} placeholder="account" />
            <Button onClick={() => addPauser(inAddPauser)} disabled={!isPauser || inAddPauser.length != 42} variant="contained" color="secondary">
              Add Pauser
            </Button>
          </div>
          <div className={classes.control}>
            <Button disabled={!isMinter} onClick={() => renounceMinter()} variant="contained" color="secondary">
              Renounce Minter
            </Button>
          </div>
          <div className={classes.control}>
            <Button disabled={!isPauser} onClick={() => renouncePauser()} variant="contained" color="secondary">
              Renounce Pauser
            </Button>
          </div>
          <div className={classes.control}>
            <Button disabled={!isPauser || paused} onClick={() => pause()} variant="contained" color="secondary">
              Pause
            </Button>
            <Button disabled={!isPauser || !paused} onClick={() => unpause()}  variant="contained" color="secondary">
              Unpause
            </Button>
          </div>
        </Fragment>
      }
    </section>
  </article>;
};

export default withStyles(styles, { withTheme: true })(Erc20View);
