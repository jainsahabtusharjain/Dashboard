import React, { useState, FormEvent, useEffect } from "react";
import "../../styles/dashboardapp.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss
import AdminSidebar from "../../components/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "0123456789";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeChracters, setIncludeChracters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await navigator.clipboard.writeText(coupon);
    setIsCopied(true);
    // setTimeout(() => {
    //   setIsCopied(false);
    // }, 1000);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!includeNumbers && !includeChracters && !includeSymbols)
      return alert("Please Select Atleast One Option");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;
    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeChracters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;
      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }
    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <form className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Text To Include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />
            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />
            <fieldset>
              <legend>Include</legend>
              <input
                type="checkbox"
                // placeholder="Text To Include"
                value={prefix}
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                // placeholder="Text To Include"
                value={prefix}
                checked={includeChracters}
                onChange={(e) => setIncludeChracters((prev) => !prev)}
              />
              <span>Chracters</span>

              <input
                type="checkbox"
                // placeholder="Text To Include"
                value={prefix}
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset>
            <button type="submit">Generate</button>
          </form>
          {coupon && (
            <code>
              {coupon}{" "}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </section>
      </main>
      ;
    </div>
  );
};

export default Coupon;
