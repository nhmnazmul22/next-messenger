import Link from "next/link";

const users = [
  { id: 1, name: "Alice Johnson", avatar: "/avatars/alice.png", lastMessage: "Hey, how are you?", time: "2m ago", unread: 3 },
  { id: 2, name: "Bob Smith", avatar: "/avatars/bob.png", lastMessage: "Meeting at 3pm", time: "15m ago", unread: 0 },
  { id: 3, name: "Charlie Brown", avatar: "/avatars/charlie.png", lastMessage: "Thanks for the update!", time: "1h ago", unread: 1 },
  { id: 4, name: "Diana Ross", avatar: "/avatars/diana.png", lastMessage: "See you tomorrow", time: "2h ago", unread: 0 },
  { id: 5, name: "Edward Davis", avatar: "/avatars/edward.png", lastMessage: "Got it, will do!", time: "5h ago", unread: 0 },
  { id: 6, name: "Fiona Green", avatar: "/avatars/fiona.png", lastMessage: "Happy birthday!", time: "1d ago", unread: 0 },
];

export default function Home() {
  return (
    <>
      <header className="bg-indigo-600 text-white px-6 py-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Messenger</h1>
          <button className="p-2 hover:bg-indigo-500 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto bg-white dark:bg-gray-800 min-h-[calc(100vh-64px)] shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                  {user.name.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>

              <div className="flex-1 ml-4 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.lastMessage}
                  </p>
                  {user.unread > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>

              <div className="ml-4">
                <Link
                  href={`/chat/${user.id}`}
                  className="flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
