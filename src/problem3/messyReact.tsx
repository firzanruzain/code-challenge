interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // function defined inside component
  const getPriority = (blockchain: any): number => {
    // avoid using switch statements
    // poor practice for maintainability and readability
    // type safety issues with 'any' type
    // use object lookup instead
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    // add return type WalletBalance[]
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain); // blockchain property missing in WalletBalance interface
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain); // repeated calls to getPriority can be optimized
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]); // prices is unused in this memo, this will cause unnecessary recomputations when prices change

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    // should be in useMemo for performance or inline in rows mapping
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  }); // added missing return type FormattedWalletBalance[]

  // type mismatch: sortedBalances should be formattedBalances
  // can be memoized for performance
  // both formattedBalances and rows use mapping, can be combined
  // add return type JSX.Element[]
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount; // render should be pure, avoid calculations here, handle undefined prices
      return (
        <WalletRow
          className={classes.row}
          key={index} // using index as key is an anti-pattern, use stable unique identifier instead
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    },
  );

  return <div {...rest}>{rows}</div>;
};
