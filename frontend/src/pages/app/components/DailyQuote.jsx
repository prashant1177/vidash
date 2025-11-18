import React, { useState, useEffect } from "react";
import { Quote, RefreshCw } from "lucide-react";

const QuoteSection = () => {
  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius"
    },
    {
      text: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair"
    },
    {
      text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
      author: "Roy T. Bennett"
    },
    {
      text: "I learned that courage was not the absence of fear, but the triumph over it.",
      author: "Nelson Mandela"
    },
    {
      text: "Opportunities don't happen. You create them.",
      author: "Chris Grosser"
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson"
    },
    {
      text: "The harder you work for something, the greater you'll feel when you achieve it.",
      author: "Anonymous"
    },
    {
      text: "Dream bigger. Do bigger.",
      author: "Anonymous"
    },
    {
      text: "Success doesn't just find you. You have to go out and get it.",
      author: "Anonymous"
    },
    {
      text: "Great things never come from comfort zones.",
      author: "Anonymous"
    },
    {
      text: "Dream it. Wish it. Do it.",
      author: "Anonymous"
    },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier"
    },
    {
      text: "Push yourself, because no one else is going to do it for you.",
      author: "Anonymous"
    },
    {
      text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
      author: "Anonymous"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Set a random quote on mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  const getNewQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (quotes[randomIndex].text === currentQuote.text && quotes.length > 1);
      
      setCurrentQuote(quotes[randomIndex]);
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <div className=" text-neutral-300 p-6 rounded-xl shadow-2xl h-full flex items-center">

      {/* Quote Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative">
          <p className=" md:text-xl font-extralight leading-relaxed mb-6 pl-2 italic">
            "{currentQuote.text}"
          </p>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-12 h-[2px] bg-orange-500/50"></div>
          <p className="text-sm text-neutral-300 font-light">
            {currentQuote.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;