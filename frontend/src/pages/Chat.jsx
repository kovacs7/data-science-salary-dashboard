import chatBot from "../assets/chatBot.svg"
import axios from "axios";
import { useState } from "react";
import arrow from "../assets/arrow.svg"

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5174/Chat", { input });
      setResponse(res.data.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setResponse("Error fetching feedback");
    }
  };
  
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4 mt-8">
        <div className="text-xl flex flex-row gap-4">
          <img
            src={chatBot}
            alt="chatbotIcon"
            className="bg-indigo-600 rounded-md w-[30px] h-[30px]"
          />
          AI Chat Bot
        </div>
        <form onSubmit={handleSubmit} className="w-full  h-[40%">
          <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50 mx-[10%] h-[40%]">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-indigo-500">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 text-sm text-gray-900 bg-white border-0 focus:ring-0 rounded-md mt-1"
                placeholder="Ask a question..."
                required
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t">
              <button
                type="submit"
                className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-700 hover:bg-indigo-500"
              >
                Post Query
              </button>
            </div>
          </div>
        </form>
        {response && (
          <div className="flex flex-col gap-2 w-[80%]">
            <h1 className="bg-indigo-600 text-white rounded-md p-2 w-auto flex flex-row gap-2">
              Response To Your Query
              <img src={arrow} alt="arrow" />
            </h1>
            <div className="response border-2 border-indigo-300 w-full rounded-md p-2">
              {response}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat