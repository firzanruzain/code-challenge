import { SwapHeader } from "./components/SwapHeader";
import { SwapPanel } from "./components/SwapPanel";
import { SwapMetadata } from "./components/SwapMetadata";
import { Alert } from "./components/Alert";
import { Toast } from "./components/Toast";
import { usePrices } from "./hooks/usePrices";
import { useSwapState } from "./hooks/useSwapState";
import { useSwapCalculations } from "./hooks/useSwapCalculations";
import { useSwapSubmission } from "./hooks/useSwapSubmission";
import { validateSwapForm } from "./utils/validation";
import "./App.css";

function App() {
  const { tokens, loadingPrices, pricesError, lastUpdated, loadPrices } =
    usePrices();

  const {
    fromSymbol,
    toSymbol,
    amountFrom,
    setFromSymbol,
    setToSymbol,
    setAmountFrom,
    handleSwap,
  } = useSwapState({ tokens });

  const { rate, amountFromNumber, amountTo, usdFrom, usdTo } =
    useSwapCalculations({
      tokens,
      fromSymbol,
      toSymbol,
      amountFrom,
    });

  const { submitting, submitMessage, handleSubmit } = useSwapSubmission({
    amountFromNumber,
    fromSymbol,
    toSymbol,
    rate,
  });

  const { isAmountValid, samePair, disableSubmit } = validateSwapForm({
    amountFrom,
    amountFromNumber,
    fromSymbol,
    toSymbol,
    rate,
    loadingPrices,
    pricesError,
    submitting,
  });

  return (
    <div className="page">
      <div className="grid-overlay" aria-hidden="true" />
      <main className="shell">
        <SwapHeader
          tokenCount={tokens.length}
          loadingPrices={loadingPrices}
          onRefresh={loadPrices}
        />

        <form
          className="card"
          onSubmit={handleSubmit}
          aria-label="Currency swap form"
        >
          <div className="swap-container">
            <SwapPanel
              title="You send"
              description="Live pricing pulled from Switcheo feed"
              label="Amount"
              inputId="from-amount"
              amount={amountFrom}
              onAmountChange={setAmountFrom}
              tokens={tokens}
              selectedSymbol={fromSymbol}
              onSelectSymbol={setFromSymbol}
              disabledSymbol={toSymbol}
              usdValue={usdFrom}
              isValid={isAmountValid}
            />

            <button
              type="button"
              className="swap-button"
              onClick={handleSwap}
              aria-label="Swap tokens"
            >
              <svg
                className="swap-icon"
                width="24"
                height="24"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M19.29894,13.097555 C19.9200379,13.097555 20.2332042,13.8469628 19.7969407,14.2892722 L14.369746,19.7916791 C14.0983279,20.0668585 13.6553376,20.0697948 13.3802994,19.7982374 C13.1052612,19.52668 13.1023265,19.0834622 13.3737445,18.8082827 L17.6255116,14.497593 L0.703482198,14.497593 C0.317070803,14.497593 0.00382247492,14.1841838 0.00382247492,13.797574 C0.00382247492,13.4109642 0.317070803,13.097555 0.703482198,13.097555 L19.29894,13.097555 Z M6.61970059,0.201762638 C6.89473881,0.473320047 6.89767354,0.91653784 6.62625551,1.19171729 L2.37448841,5.50240698 L19.2965178,5.50240698 C19.6829292,5.50240698 19.9961775,5.81581617 19.9961775,6.20242599 C19.9961775,6.58903581 19.6829292,6.902445 19.2965178,6.902445 L0.701060011,6.902445 C0.0799621139,6.902445 -0.233204177,6.15303716 0.203059275,5.7107278 L5.63025404,0.208320918 C5.90167207,-0.0668585286 6.34466238,-0.0697947706 6.61970059,0.201762638 Z"
                />
              </svg>
            </button>

            <SwapPanel
              title="You receive"
              description="Auto-calculated at current rate"
              label="Estimated amount"
              inputId="to-amount"
              amount={amountTo}
              tokens={tokens}
              selectedSymbol={toSymbol}
              onSelectSymbol={setToSymbol}
              disabledSymbol={fromSymbol}
              usdValue={usdTo}
              isValid={!!amountTo}
              readOnly
              action={<div className="pill muted">Read only</div>}
            />
          </div>

          <SwapMetadata
            rate={rate}
            fromSymbol={fromSymbol}
            toSymbol={toSymbol}
            loadingPrices={loadingPrices}
            pricesError={pricesError}
            lastUpdated={lastUpdated}
          />

          {pricesError && <Alert>{pricesError}</Alert>}
          {samePair && !pricesError && (
            <Alert>Choose two different tokens to swap.</Alert>
          )}
          {!isAmountValid && !pricesError && (
            <Alert>Amount must be greater than 0.</Alert>
          )}

          <button type="submit" className="primary" disabled={disableSubmit}>
            {submitting ? (
              <span className="spinner" aria-hidden="true" />
            ) : (
              "Confirm swap"
            )}
          </button>

          {submitMessage && (
            <Toast message={submitMessage.text} type={submitMessage.type} />
          )}
        </form>
      </main>
    </div>
  );
}

export default App;
