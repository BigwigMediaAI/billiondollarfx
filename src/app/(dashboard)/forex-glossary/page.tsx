"use client";
import { useState } from "react";

interface GlossaryItem {
  term: string;
  definition: string;
}

const glossaryData: GlossaryItem[] = [
  {
    term: "Abandon",
    definition:
      "This is derived from the French term abondon which means to abandon or to forsake. In finance, an action of forfeiting a right, abandoning or quitting a trade, or refusing to use an option before that option expires.",
  },
  {
    term: "Accelerator/Decelerator",
    definition:
      "A technical indicator that tracks the rate at which the market's driving force gains or loses momentum.",
  },
  {
    term: "Accumulation/Distribution",
    definition:
      "An indicator that measures the total flow of funds into and out of an asset by comparing closing prices to their respective highs and lows.",
  },
  {
    term: "ADRs (American Depository Receipts) ",
    definition:
      "It enableS U.S. investors to trade shares of international firms on American exchanges. A US depositary bank buys overseas shares and issues ADRs priced in US dollars. This system, which has been in place since 1927, assists enterprises in raising finance in the United States and other international markets, as well as trading freely throughout Europe.",
  },
  {
    term: "AMEX",
    definition:
      "The American Stock Exchange began as a small group of merchants and is now the second-largest stock exchange in the United States. It is well-known for listing shares of small and medium-sized enterprises. Two important indices, the AMEX important Market Index and the AMEX Market Value Index, are computed here",
  },
  {
    term: "Arbitrage",
    definition:
      "A method in which a trader buys an inexpensive asset while simultaneously selling an overpriced equivalent, benefitting from the momentary price differential while avoiding market risk.",
  },
  {
    term: "Ascending Triangle",
    definition:
      "A bullish continuation chart pattern that typically forms during an uptrend and indicates that the trend will continue in the same direction.",
  },
  {
    term: "Ask Price",
    definition:
      "The amount that a seller consents to charge for a financial item.",
  },
  {
    term: "Ask Rate",
    definition: "Another term for Ask Price.",
  },
  {
    term: "Asset",
    definition:
      "Any resource with economic value that can generate future income or benefits.",
  },
  {
    term: "AUDUSD",
    definition:
      "A pair referencing the rate at which you can exchange the Australian dollar (base currency) into the U.S. dollar (quote currency).",
  },
  { term: "Aussie", definition: "Australian dollar slang." },
  {
    term: "Automated Trading",
    definition:
      "A system where trades can be placed and maintained automatically under pre-configured rules or sets of algorithms, minimising or eliminating manual input.",
  },
  {
    term: "Average Directional Index (ADX)",
    definition:
      "Welles Wilder invented this indicator that measures the power of a trend based on the analysis of ranges between the high and low-prices.",
  },
  {
    term: "Average True Range Indicator",
    definition:
      "An indicator that measures market volatility by analysing the average range between high and low prices over a set period.",
  },
  {
    term: "Awesome Oscillator",
    definition:
      "A technical tool that reflects changes in market momentum by comparing current and past price movements (definition continues if needed).",
  },
  {
    term: "Backwardation",
    definition:
      "The state of the market where a futures contract's price is lower than the underlying's price as established by the spot market. Or when further-dated futures are priced at a lesser level than near future futures.",
  },
  {
    term: "Balance/Account Balance",
    definition:
      "The entire value of all closed trades, deposits, and withdrawals from a trading account.",
  },
  {
    term: "Bank of Canada (BOC)",
    definition:
      "The financial system, the monetary policy and the supply of currencies in Canada are managed by the bank of Canada (BOC).",
  },
  {
    term: "Bank of England (BOE)",
    definition: "The United Kingdom's central bank is the Bank of England.",
  },
  {
    term: "Bank of Japan (BOJ)",
    definition:
      "The central bank of Japan monitors monetary policy, the issuance of currency, and has the stability of the economy.",
  },
  {
    term: "Bar Chart",
    definition:
      "A bar chart that displays the high, low, open, and close points over a specific period of time. The vertical stroke represents high and low and the horizontal marks are open (left) and close (right).",
  },
  {
    term: "Base Currency",
    definition:
      "The first currency in a currency pair represents the unit being purchased or sold.",
  },
  {
    term: "Base Interest Rate",
    definition:
      "The interest rate established by a nation's central bank has an impact on the value of its currency and lending rates within the economy.",
  },
  {
    term: "Basis",
    definition:
      "An asset's futures price minus its current price. As a futures contract approaches expiration, its basis narrows to zero.",
  },
  {
    term: "Basis Point",
    definition:
      "Basis points, or 0.01 percent (one tenth of a percentage point),are frequently used to quantify changes in interest rates.",
  },
  {
    term: "Bear Market",
    definition:
      "A market climate characterized by persistently declining pricing.",
  },
  {
    term: "Bearish Rectangle",
    definition:
      "A continuation chart pattern formed during a downtrend, indicating that the decline will most likely continue.",
  },
  {
    term: "Beneficiary",
    definition:
      "An individual or organization entitled to receive advantages or profits, as stipulated in a financial agreement or legal document.",
  },
  {
    term: "Bid Price",
    definition:
      "The price at which a buyer is willing to pay for a financial asset.",
  },
  {
    term: "Bid-Ask Spread",
    definition:
      "Bid (buy) and ask (sell) prices of a financial instrument are not equal.",
  },
  {
    term: "Big Board",
    definition:
      "In terms of market value, the New York Stock Exchange, or NYSE, is the biggest stock exchange in the world, with over 3000 listed companies.",
  },
  {
    term: "Binary Options",
    definition:
      "A kind of monetary option whose payment is fixed, and whose risk is set in advance; where traders gamble whether an asset would go up or down in price, given a certain amount of time.",
  },
  {
    term: "Bollinger Bands Indicator",
    definition:
      "An indicator developed based on volatility, which employs moving average with upper and lower bands to make price extremes, potential breakouts and market consolidation evident.",
  },
  {
    term: "Break",
    definition:
      "The steep rise or fall in price that often takes place when there is an uneven relationship between the buyers and the sellers.",
  },
  {
    term: "Bretton Woods Agreement",
    definition:
      "An agreement of 1944 between Allied Countries to create a fixed exchange rate regime with currencies pegged to the US dollar which was convertible to gold. This made the International Monetary Fund come into being. This system failed in 1971 when America ended the convertibility of gold.",
  },
  {
    term: "Broker",
    definition:
      "The individual or business that serves as a broker allows a client to enter a market and trades on their behalf.",
  },
];

export default function ForexGlossary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = glossaryData.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-10">
      {/* Glossary Title */}
      <h2 className="text-3xl font-bold mb-6">Forex Glossary</h2>
      {/* Top description */}
      <p className="max-w-4xl mb-6 text-gray-300">
        Our Forex Glossary gives a concise view of important trading terms and
        concepts. It discusses not only such technical indicators as RSI and
        MACD but also such financial terms as bid/ask spread, leverage, and
        volatility, which makes it an efficient choice regardless of what stage
        of progression of a trader.
      </p>

      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-500 bg-black text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Glossary List */}
      <div className="space-y-2">
        {filteredGlossary.map((item) => (
          <details
            key={item.term}
            className="border border-white rounded-md overflow-hidden"
          >
            <summary className="cursor-pointer px-3 py-2 font-bold bg-black text-white">
              {item.term}
            </summary>
            <p className="px-3 py-2 text-sm">{item.definition}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
