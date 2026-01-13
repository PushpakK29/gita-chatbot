import { useState, useRef, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Ask me anything from the Bhagavad Gita." },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Not mentioned in the Bhagavad Gita.",
        },
      ]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f1e7] text-[#3b2f1c]">
      <div className="p-4 text-center font-semibold text-lg border-b border-[#d6c7a1] bg-[#f1e6cf]">
        📜 Bhagavad Gita Chat
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl px-4 py-3 rounded-lg ${
              msg.role === "user"
                ? "ml-auto bg-[#e3c97a]"
                : "mr-auto bg-[#fdf8ed] border border-[#d6c7a1]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-[#d6c7a1] bg-[#f1e6cf] flex gap-2">
        <input
          className="flex-1 bg-[#fffaf0] border border-[#d6c7a1] rounded px-3 py-2"
          placeholder="Ask a question from the Gita..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#d4af37] px-4 rounded font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
