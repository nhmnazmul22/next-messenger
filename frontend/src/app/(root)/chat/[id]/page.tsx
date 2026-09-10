import Link from "next/link";

const users: Record<string, { name: string; status: string }> = {
  "1": { name: "Alice Johnson", status: "online" },
  "2": { name: "Bob Smith", status: "offline" },
  "3": { name: "Charlie Brown", status: "online" },
  "4": { name: "Diana Ross", status: "away" },
  "5": { name: "Edward Davis", status: "offline" },
  "6": { name: "Fiona Green", status: "online" },
};

const messages = [
  { id: 1, sender: "them", text: "Hey! How's it going?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "I'm doing great, thanks! How about you?", time: "10:32 AM" },
  { id: 3, sender: "them", text: "Pretty good! Just finishing up some work.", time: "10:33 AM" },
  { id: 4, sender: "me", text: "Nice! Want to grab lunch later?", time: "10:35 AM" },
  { id: 5, sender: "them", text: "Sure! That sounds great. Where do you want to go?", time: "10:36 AM" },
  { id: 6, sender: "me", text: "How about that new Italian place downtown?", time: "10:38 AM" },
  { id: 7, sender: "them", text: "Perfect! I've been wanting to try it. What time works for you?", time: "10:39 AM" },
  { id: 8, sender: "me", text: "How about noon?", time: "10:40 AM" },
  { id: 9, sender: "them", text: "See you there! 😊", time: "10:41 AM" },
];

export default function ChatPage({ params }: { params: { id: string } }) {
  const user = users[params.id] || { name: "Unknown User", status: "offline" };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-600 text-white px-4 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link
            href="/"
            className="p-2 hover:bg-indigo-500 rounded-full transition-colors mr-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="flex items-center flex-1">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-indigo-600 rounded-full ${
                  user.status === "online"
                    ? "bg-green-400"
                    : user.status === "away"
                    ? "bg-yellow-400"
                    : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div className="ml-3">
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-xs text-indigo-200">{user.status}</p>
            </div>
          </div>

          <button className="p-2 hover:bg-indigo-500 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 flex flex-col shadow-xl">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] ${
                  msg.sender === "me"
                    ? "bg-indigo-600 text-white rounded-l-2xl rounded-tr-2xl"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-2xl rounded-tl-2xl"
                } px-4 py-2 shadow-sm`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "me"
                      ? "text-indigo-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <button className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
