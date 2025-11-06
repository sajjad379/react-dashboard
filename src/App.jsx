import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  // 🌟 حالت‌ها (state)
  const [text, setText] = useState("");
  const [color, setColor] = useState("black");
  const [clicks, setClicks] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [mood, setMood] = useState("");

  // 🎨 رنگ‌ها
  const colors = ["black", "blue", "red", "green", "purple", "orange"];

  // 💬 داده‌های احساس و پیشنهاد
  const positiveWords = ["love", "great", "awesome", "happy", "nice"];
  const negativeWords = ["bad", "sad", "angry", "hate", "terrible"];
  const wordSuggestions = {
    hello: "world",
    good: "job",
    react: "rocks",
    i: "am",
    you: "are",
  };

  // ♻️ بازیابی از localStorage
  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) setText(savedText);
  }, []);

  // 💾 ذخیره خودکار
  useEffect(() => {
    localStorage.setItem("savedText", text);
  }, [text]);

  // 💡 تشخیص احساس متن
  useEffect(() => {
    const lower = text.toLowerCase();
    const posCount = positiveWords.filter((w) => lower.includes(w)).length;
    const negCount = negativeWords.filter((w) => lower.includes(w)).length;

    if (posCount > negCount && text.length > 0) setMood("مثبت 😊");
    else if (negCount > posCount && text.length > 0) setMood("منفی 😔");
    else if (text.length > 0) setMood("خنثی 😐");
    else setMood("");
  }, [text]);

  // ✍️ رویداد تغییر متن + پیشنهاد
  const handleInputChange = (e) => {
    const val = e.target.value;
    setText(val);

    const lastWord = val.trim().split(" ").pop().toLowerCase();
    if (wordSuggestions[lastWord]) setSuggestion(wordSuggestions[lastWord]);
    else setSuggestion("");
  };

  // 🧹 پاک کردن
  const clearText = () => {
    setText("");
    setClicks((c) => c + 1);
  };

  // 🎨 تغییر رنگ
  const changeColor = () => {
    setClicks((c) => c + 1);
    const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
    setColor(nextColor);
  };

  // 🌙 تغییر تم
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // 📋 کپی
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="background"></div>

      <header>
        <h1 className="typewriter">🚀 داشبورد هوشمند React</h1>
        <button className="theme-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️ حالت روشن" : "🌙 حالت تاریک"}
        </button>
      </header>

      <main className="container">
        <input
          type="text"
          placeholder="یه چیزی بنویس..."
          value={text}
          onChange={handleInputChange}
        />

        <div className="buttons">
          <button onClick={clearText}>🧹 پاک کن</button>
          <button onClick={changeColor}>🎨 تغییر رنگ</button>
          <button onClick={copyToClipboard}>📋 کپی</button>
        </div>

        <div
          className="display-box"
          onMouseEnter={() => console.log("🖱️ موس وارد شد")}
          onMouseLeave={() => console.log("🚪 موس خارج شد")}
        >
          {text ? (
            <p style={{ color }} className="fade-in">
              {text}
            </p>
          ) : (
            <p className="hint">اینجا متن نمایش داده میشه...</p>
          )}
        </div>

        {/* پیشنهاد و احساس */}
        {suggestion && (
          <p className="suggestion">
            💡 پیشنهاد بعدی: <b>{suggestion}</b>
          </p>
        )}
        {mood && <p className="mood">احساس کلی متن: {mood}</p>}

        <div className="info">
          <p>🔤 تعداد کاراکترها: {text.length}</p>
          <p>🖱️ تعداد کلیک‌ها: {clicks}</p>
          <p>
            🎯 رنگ فعلی: <span style={{ color }}>{color}</span>
          </p>
          {copied && <p className="copied">✅ متن کپی شد!</p>}
        </div>
      </main>

      <footer>ساخته شده با ❤️ در React</footer>
    </div>
  );
}

export default App;
