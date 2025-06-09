
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Camera, Mic, ArrowLeft } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
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
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Design Studio",
      lastMessage: "We'd like to collaborate on a new collection",
      lastMessageHi: "हम एक नए संग्रह पर सहयोग करना चाहेंगे",
      time: "1h ago",
      unread: 0,
      avatar: "/placeholder.svg"
    }
  ];

  const messages = [
    {
      id: 1,
      text: "Hello! I'm interested in your white kurta",
      textHi: "नमस्ते! मुझे आपके सफेद कुर्ते में दिलचस्पी है",
      sender: "customer",
      time: "10:30 AM"
    },
    {
      id: 2,
      text: "Thank you for your interest! It's available in all sizes.",
      textHi: "आपकी रुचि के लिए धन्यवाद! यह सभी साइज़ में उपलब्ध है।",
      sender: "artisan",
      time: "10:32 AM"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {selectedChat ? (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedChat(null)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <img 
                  src="/placeholder.svg" 
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-indigo-900">
                  {chats.find(c => c.id === selectedChat)?.name}
                </span>
              </div>
            </div>
          ) : (
            <h1 className={cn(
              "text-xl font-bold text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].messages}
            </h1>
          )}
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {!selectedChat ? (
          // Chat List
          <div className="p-4">
            {chats.length > 0 ? (
              <div className="space-y-2">
                {chats.map((chat) => (
                  <Card 
                    key={chat.id} 
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all"
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={chat.avatar} 
                          alt={chat.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold text-indigo-900 truncate">
                              {chat.name}
                            </h3>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <p className={cn(
                            "text-sm text-gray-600 truncate",
                            language === 'hi' ? 'hindi-text' : ''
                          )}>
                            {language === 'hi' ? chat.lastMessageHi : chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold text-indigo-900 mb-2",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].noChats}
                </h3>
                <p className={cn(
                  "text-gray-600",
                  language === 'hi' ? 'hindi-text' : ''
                )}>
                  {content[language].startChat}
                </p>
              </div>
            )}
          </div>
        ) : (
          // Chat Messages
          <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === 'artisan' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2",
                    msg.sender === 'artisan' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white shadow-sm border'
                  )}>
                    <p className={cn(
                      "text-sm",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      {language === 'hi' ? msg.textHi : msg.text}
                    </p>
                    <p className={cn(
                      "text-xs mt-1 opacity-70",
                      msg.sender === 'artisan' ? 'text-indigo-100' : 'text-gray-500'
                    )}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Camera className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mic className="w-4 h-4" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={content[language].typeMessage}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-indigo-600 hover:bg-indigo-700"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {!selectedChat && <MobileNav language={language} />}
    </div>
  );
};

export default Chat;
