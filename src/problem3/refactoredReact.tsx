interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // Use union type for stricter safety
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  priority: number;
  usdValue: number;
}

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

// Moved outside component to avoid redefinition
const priorities: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number => {
  return priorities[blockchain] ?? -99;
};

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props; // Removed unused 'children'
  const balances: Array<WalletBalance> = useWalletBalances();
  const prices = usePrices();

  /**
   * Memoized sorted balances: Precomputes priorities, filters valid balances, sorts by priority.
   * Only depends on balances.
   */
  const sortedBalances = useMemo((): Array<
    WalletBalance & { priority: number }
  > => {
    return balances
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .filter((balance) => balance.priority > -99 && balance.amount > 0)
      .sort((lhs, rhs) => rhs.priority - lhs.priority);
  }, [balances]);

  /**
   * Memoized formatted balances: Adds formatted and usdValue, depends on sortedBalances and prices.
   */
  const formattedBalances = useMemo((): Array<FormattedWalletBalance> => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
      usdValue: (prices?.[balance.currency] ?? 0) * balance.amount,
    }));
  }, [sortedBalances, prices]);

  /**
   * Memoized rows: Maps formatted balances to WalletRow components.
   */
  const rows = useMemo((): JSX.Element[] => {
    return formattedBalances.map((balance: FormattedWalletBalance) => (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ));
  }, [formattedBalances]);

  return <div {...rest}>{rows}</div>;
};
