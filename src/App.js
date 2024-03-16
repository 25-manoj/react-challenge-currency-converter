import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [inputCurrency, setInputCurrency] = useState("INR");
  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${inputCurrency}&to=${outputCurrency}`
        );
        const data = await response.json();
        setOutput(data.rates[outputCurrency]);
        setIsLoading(false);
      }
      if (inputCurrency === outputCurrency || amount <= 0) {
        setOutput(amount);
        return;
      }
      fetchData();
    },
    [amount, inputCurrency, outputCurrency]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        disabled={isLoading}
        value={inputCurrency}
        onChange={(e) => setInputCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        disabled={isLoading}
        value={outputCurrency}
        onChange={(e) => setOutputCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {outputCurrency}
      </p>
    </div>
  );
}
