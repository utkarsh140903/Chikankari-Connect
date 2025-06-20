
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Camera, Mic, ArrowLeft } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const Chat = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const content = {
    en: {
      messages: "Messages",
      typeMessage: "Type a message...",
      send: "Send",
      noChats: "No conversations yet",
      startChat: "Start chatting with customers and designers"
    },
    hi: {
      messages: "संदेश",
      typeMessage: "संदेश टाइप करें...",
      send: "भेजें",
      noChats: "अभी तक कोई बातचीत नहीं",
      startChat: "ग्राहकों और डिज़ाइनरों के साथ चैट करना शुरू करें"
    }
  };

  const chats = [
    {
      id: 1,
      name: "Priya Sharma",
      lastMessage: "Is this kurta available in size M?",
      lastMessageHi: "क्या यह कुर्ता M साइज में उपलब्ध है?",
      time: "2m ago",
      unread: 2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Design Studio",
      lastMessage: "We'd like to collaborate on a new collection",
      lastMessageHi: "हम एक नए संग्रह पर सहयोग करना चाहेंगे",
      time: "1h ago",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  const messages = [
    {
      id: 1,
      text: "Hello! I'm interested in your white kurta",
      textHi: "नमस्ते! मुझे आपके सफेद कुर्ते में दिलचस्पी है",
      sender: "customer",
      time: "10:30 AM",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      text: "Thank you for your interest! It's available in all sizes.",
      textHi: "आपकी रुचि के लिए धन्यवाद! यह सभी साइज़ में उपलब्ध है।",
      sender: "artisan",
      time: "10:32 AM",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-indigo-950 dark:via-gray-900 dark:to-rose-950 pb-20 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 sticky top-0 z-20 shadow-sm">
        <div className="flex justify-between items-center w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-2 sm:px-4">
          {selectedChat ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full transition-all duration-200 hover:bg-indigo-50"
                onClick={() => setSelectedChat(null)}
                aria-label="Back to messages"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700" />
              </Button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <img 
                    src={chats.find(c => c.id === selectedChat)?.avatar || "https://randomuser.me/api/portraits/women/67.jpg"}
                    alt={chats.find(c => c.id === selectedChat)?.name || "Avatar"}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                </div>
                <div>
                  <span className="font-semibold text-indigo-900 text-sm sm:text-base block">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </span>
                  <span className="text-xs text-indigo-600/70 hidden sm:block">Online</span>
                </div>
              </div>
            </div>
          ) : (
            <h1 className={cn(
              "text-lg sm:text-xl font-bold text-indigo-900 dark:text-indigo-100",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].messages}
            </h1>
          )}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-2 sm:px-4">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          selectedChat ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          {!selectedChat && (
            // Chat List
            <div className="py-3 sm:py-4 grid gap-2 sm:gap-3 md:gap-4">
              {chats.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {chats.map((chat) => (
                    <Card 
                      key={chat.id} 
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/95 dark:hover:bg-gray-700/95 hover:translate-y-[-1px] cursor-pointer"
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative">
                            <img 
                              src={chat.avatar} 
                              alt={chat.name}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-100"
                            />
                            {chat.unread > 0 && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                                {chat.unread}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 truncate text-sm sm:text-base">
                                {chat.name}
                              </h3>
                              <span className="text-2xs sm:text-xs text-gray-500 ml-2 whitespace-nowrap">{chat.time}</span>
                            </div>
                            <p className={cn(
                              "text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate",
                              language === 'hi' ? 'hindi-text' : '',
                              chat.unread > 0 ? "font-medium" : "font-normal"
                            )}>
                              {language === 'hi' ? chat.lastMessageHi : chat.lastMessage}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center shadow-sm">
                    <Send className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
                  </div>
                  <h3 className={cn(
                    "text-lg sm:text-xl font-semibold text-indigo-900 mb-2",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].noChats}
                  </h3>
                  <p className={cn(
                    "text-sm sm:text-base text-gray-600 max-w-xs mx-auto",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].startChat}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          !selectedChat ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          {selectedChat && (
            // Chat Messages
            <div className="h-[calc(100vh-140px)] flex flex-col relative">
              <div className="flex-1 overflow-y-auto py-3 px-1 sm:py-4 sm:px-2 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent pb-20 md:pb-24">
                {/* Message date separator */}
                <div className="flex items-center justify-center my-4 first:mt-0">
                  <div className="bg-gray-200/70 dark:bg-gray-700/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300">
                    Today
                  </div>
                </div>
                
                {messages.map((msg, index) => {
                  // Check if this message is part of a group
                  const prevMsg = index > 0 ? messages[index - 1] : null;
                  const isGrouped = prevMsg && prevMsg.sender === msg.sender;
                  
                  return (
                    <div 
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender === 'artisan' ? 'justify-end' : 'justify-start',
                        isGrouped ? 'mt-1 sm:mt-1.5' : 'mt-3 sm:mt-4'
                      )}
                    >
                      {/* Show avatar only for first message in group for customer */}
                      {msg.sender === 'customer' && !isGrouped && (
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 hidden sm:block shadow-sm border-2 border-white">
                          <img 
                            src={msg.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
                            alt="Customer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Message bubble */}
                      <div className={cn(
                        "max-w-[85%] sm:max-w-[70%] md:max-w-[60%] rounded-2xl px-3 py-2",
                        msg.sender === 'artisan' 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white/95 dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 rounded-tl-none',
                        isGrouped && msg.sender === 'artisan' ? 'rounded-tr-xl' : '',
                        isGrouped && msg.sender === 'customer' ? 'rounded-tl-xl' : ''
                      )}>
                        <p className={cn(
                          "text-sm sm:text-base break-words",
                          msg.sender === 'artisan' 
                            ? 'text-white' 
                            : 'text-gray-800 dark:text-gray-100',
                          language === 'hi' ? 'hindi-text' : ''
                        )}>
                          {language === 'hi' ? msg.textHi : msg.text}
                        </p>
                        <p className={cn(
                          "text-2xs sm:text-xs mt-1 text-right",
                          msg.sender === 'artisan' 
                            ? 'text-indigo-100' 
                            : 'text-gray-500 dark:text-gray-400'
                        )}>
                          {msg.time}
                        </p>
                      </div>
                      
                      {/* Show avatar only for first message in group for artisan */}
                      {msg.sender === 'artisan' && !isGrouped && (
                        <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0 hidden sm:block shadow-sm border-2 border-white">
                          <img 
                            src={msg.avatar || "https://randomuser.me/api/portraits/women/67.jpg"}
                            alt="Artisan"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Typing indicator */}
                <div className="flex justify-start items-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 hidden sm:block shadow-sm border-2 border-white">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Customer typing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white/95 dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none px-3 py-2.5 max-w-[60%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-400 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-400 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-indigo-400 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Message Input */}
              <div className="p-3 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t dark:border-gray-800 shadow-lg fixed bottom-0 left-0 right-0 z-10 transition-all duration-200">
                <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="hidden sm:flex gap-1.5 sm:gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors duration-200"
                        aria-label="Send photo"
                      >
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors duration-200"
                        aria-label="Record audio"
                      >
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                      </Button>
                    </div>
                    <div className="flex-1 relative">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={content[language].typeMessage}
                        className="flex-1 h-10 sm:h-12 text-sm sm:text-base pr-16 rounded-full border-gray-200 dark:border-gray-700 focus:border-indigo-300 dark:focus:border-indigo-600 shadow-sm dark:bg-gray-800 dark:text-gray-100"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <div className="absolute right-0 top-0 h-full flex items-center gap-1 pr-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full sm:hidden text-indigo-600 hover:bg-indigo-50"
                          aria-label="Send photo"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={handleSendMessage}
                          className="bg-indigo-600 hover:bg-indigo-700 h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-sm transition-transform duration-200 hover:scale-105"
                          size="icon"
                          disabled={!message.trim()}
                          aria-label="Send message"
                        >
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation at bottom */}
      <div className={cn(
        "transition-opacity duration-300",
        selectedChat ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        {!selectedChat && <MobileNav language={language} />}
      </div>
      
      {/* Add extra spacing at bottom when no chat is selected to account for mobile nav */}
      {!selectedChat && <div className="h-16 md:h-20"></div>}
      
      {/* Add a loading screen or transition element for page transitions */}
      <div className={cn(
        "fixed inset-0 bg-indigo-600 z-50 flex items-center justify-center transition-opacity duration-500",
        "opacity-0 pointer-events-none" // Initially hidden
      )} id="page-transition">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

// Add some helper styles at the top of the file to handle custom scrollbar
// These styles would typically be in a global CSS file
const styles = document.createElement('style');
styles.innerHTML = `
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #c7d2fe;
  border-radius: 20px;
}
.text-2xs {
  font-size: 0.65rem;
  line-height: 1rem;
}
`;
document.head.appendChild(styles);

export default Chat;
