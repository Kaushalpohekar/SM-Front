import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
    id: number;
    name: string;
    lastMessage: string;
    timestamp: Date;
    unread: number;
    online: boolean;
    isTyping: boolean;
    avatar: string;
    messages: Message[];
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private chats: Chat[] = [
        {
            id: 1,
            name: 'John Doe',
            lastMessage: 'Hey, how are you?',
            timestamp: new Date(),
            unread: 2,
            online: true,
            isTyping: false,
            avatar: 'assets/user1.jpg',
            messages: [
                { id: 1, text: 'Hi there!', sender: 'John', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'How are you?', sender: 'me', timestamp: new Date(), status: 'delivered' }
            ]
        },
        {
            id: 2,
            name: 'Alice Smith',
            lastMessage: 'See you tomorrow!',
            timestamp: new Date(Date.now() - 3600000),
            unread: 0,
            online: false,
            isTyping: true,
            avatar: 'assets/user2.jpg',
            messages: [
                { id: 1, text: 'Meeting tomorrow?', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Yes, at 2 PM', sender: 'Alice', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 3,
            name: 'Robert King',
            lastMessage: 'Let me know!',
            timestamp: new Date(Date.now() - 200000),
            unread: 1,
            online: true,
            isTyping: false,
            avatar: 'assets/user3.jpg',
            messages: [
                { id: 1, text: 'Are you joining us?', sender: 'Robert', timestamp: new Date(), status: 'sent' }
            ]
        },
        {
            id: 4,
            name: 'Priya Mehta',
            lastMessage: 'Okay noted.',
            timestamp: new Date(Date.now() - 500000),
            unread: 0,
            online: false,
            isTyping: false,
            avatar: 'assets/user4.jpg',
            messages: [
                { id: 1, text: 'Send the update by EOD', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Okay noted.', sender: 'Priya', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 5,
            name: 'Ahmed Khan',
            lastMessage: 'I will call you.',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: true,
            avatar: 'assets/user5.jpg',
            messages: [
                { id: 1, text: 'Let’s discuss later', sender: 'Ahmed', timestamp: new Date(), status: 'sent' }
            ]
        },
        {
            id: 6,
            name: 'Emily Clark',
            lastMessage: 'Sounds good!',
            timestamp: new Date(Date.now() - 7200000),
            unread: 3,
            online: false,
            isTyping: false,
            avatar: 'assets/user6.jpg',
            messages: [
                { id: 1, text: 'We’ll go with your idea', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Sounds good!', sender: 'Emily', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 7,
            name: 'Nikhil Rao',
            lastMessage: 'Thanks for the help!',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: false,
            avatar: 'assets/user7.jpg',
            messages: [
                { id: 1, text: 'Anytime!', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Thanks for the help!', sender: 'Nikhil', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 8,
            name: 'Linda Park',
            lastMessage: 'Will ping you tomorrow.',
            timestamp: new Date(),
            unread: 1,
            online: false,
            isTyping: false,
            avatar: 'assets/user8.jpg',
            messages: [
                { id: 1, text: 'Let’s wrap this up', sender: 'me', timestamp: new Date(), status: 'delivered' }
            ]
        },
        {
            id: 9,
            name: 'Carlos Mendes',
            lastMessage: 'See you in 10.',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: true,
            avatar: 'assets/user9.jpg',
            messages: [
                { id: 1, text: 'On my way', sender: 'Carlos', timestamp: new Date(), status: 'sent' }
            ]
        },
        {
            id: 10,
            name: 'Sneha Sharma',
            lastMessage: 'Working on it.',
            timestamp: new Date(Date.now() - 180000),
            unread: 1,
            online: true,
            isTyping: false,
            avatar: 'assets/user10.jpg',
            messages: [
                { id: 1, text: 'Please send by evening.', sender: 'me', timestamp: new Date(), status: 'delivered' },
                { id: 2, text: 'Working on it.', sender: 'Sneha', timestamp: new Date(), status: 'delivered' }
            ]
        },
        {
            id: 11,
            name: 'Victor Hugo',
            lastMessage: 'Lunch?',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: false,
            avatar: 'assets/user11.jpg',
            messages: [
                { id: 1, text: 'Lunch?', sender: 'Victor', timestamp: new Date(), status: 'sent' }
            ]
        },
        {
            id: 12,
            name: 'Fatima Noor',
            lastMessage: 'Got it, thanks!',
            timestamp: new Date(),
            unread: 0,
            online: false,
            isTyping: false,
            avatar: 'assets/user12.jpg',
            messages: [
                { id: 1, text: 'Shared the doc.', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Got it, thanks!', sender: 'Fatima', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 13,
            name: 'Takeshi Yamato',
            lastMessage: 'Need more time.',
            timestamp: new Date(Date.now() - 300000),
            unread: 2,
            online: false,
            isTyping: false,
            avatar: 'assets/user13.jpg',
            messages: [
                { id: 1, text: 'Can you finish it today?', sender: 'me', timestamp: new Date(), status: 'delivered' },
                { id: 2, text: 'Need more time.', sender: 'Takeshi', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 14,
            name: 'Meera Das',
            lastMessage: 'Okay.',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: false,
            avatar: 'assets/user14.jpg',
            messages: [
                { id: 1, text: 'Final design approved.', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Okay.', sender: 'Meera', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 15,
            name: 'Kevin Lee',
            lastMessage: 'Meeting postponed.',
            timestamp: new Date(),
            unread: 0,
            online: false,
            isTyping: false,
            avatar: 'assets/user15.jpg',
            messages: [
                { id: 1, text: 'Join Zoom at 3?', sender: 'me', timestamp: new Date(), status: 'sent' },
                { id: 2, text: 'Meeting postponed.', sender: 'Kevin', timestamp: new Date(), status: 'sent' }
            ]
        },
        {
            id: 16,
            name: 'Ritika Raj',
            lastMessage: 'Good job!',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: false,
            avatar: 'assets/user16.jpg',
            messages: [
                { id: 1, text: 'Here is the report.', sender: 'me', timestamp: new Date(), status: 'read' },
                { id: 2, text: 'Good job!', sender: 'Ritika', timestamp: new Date(), status: 'read' }
            ]
        },
        {
            id: 17,
            name: 'George Blake',
            lastMessage: 'Can we reschedule?',
            timestamp: new Date(),
            unread: 1,
            online: false,
            isTyping: true,
            avatar: 'assets/user17.jpg',
            messages: [
                { id: 1, text: 'Let’s talk at 5?', sender: 'me', timestamp: new Date(), status: 'delivered' }
            ]
        },
        {
            id: 18,
            name: 'Ayesha Khan',
            lastMessage: 'Done!',
            timestamp: new Date(),
            unread: 0,
            online: true,
            isTyping: false,
            avatar: 'assets/user18.jpg',
            messages: [
                { id: 1, text: 'Please update ASAP', sender: 'me', timestamp: new Date(), status: 'delivered' },
                { id: 2, text: 'Done!', sender: 'Ayesha', timestamp: new Date(), status: 'delivered' }
            ]
        },
        {
            id: 19,
            name: 'Santiago Ruiz',
            lastMessage: 'Check your email.',
            timestamp: new Date(),
            unread: 2,
            online: true,
            isTyping: false,
            avatar: 'assets/user19.jpg',
            messages: [
                { id: 1, text: 'Shared the presentation.', sender: 'Santiago', timestamp: new Date(), status: 'sent' }
            ]
        },
        {
            id: 20,
            name: 'Deepika Verma',
            lastMessage: 'Will discuss later.',
            timestamp: new Date(),
            unread: 0,
            online: false,
            isTyping: false,
            avatar: 'assets/user20.jpg',
            messages: [
                { id: 1, text: 'Let’s sync up later.', sender: 'me', timestamp: new Date(), status: 'delivered' },
                { id: 2, text: 'Will discuss later.', sender: 'Deepika', timestamp: new Date(), status: 'read' }
            ]
        }
    ];


    private chatsSubject = new BehaviorSubject<Chat[]>(this.chats);
    chats$: Observable<Chat[]> = this.chatsSubject.asObservable();

    constructor() { }

    getChatList(): Chat[] {
        return [...this.chats];
    }

    addChat(name: string): Chat {
        const newChat: Chat = {
            id: Date.now(),
            name,
            lastMessage: '',
            timestamp: new Date(),
            unread: 0,
            online: false,
            isTyping: false,
            avatar: 'assets/user.png',
            messages: []
        };

        this.chats.unshift(newChat);
        this.chatsSubject.next([...this.chats]);
        return newChat;
    }
    
    getChatById(id: number): Chat | undefined {
        return this.chats.find(chat => chat.id === id);
    }

    sendMessage(chatId: number, text: string): void {
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            const newMessage: Message = {
                id: chat.messages.length + 1,
                text,
                sender: 'me',
                timestamp: new Date(),
                status: 'sent'
            };

            chat.messages.push(newMessage);
            chat.lastMessage = text;
            chat.timestamp = new Date();
            chat.unread = 0;

            this.updateChat(chat);
        }
    }

    markAsRead(chatId: number): void {
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            chat.messages.forEach(msg => {
                if (msg.sender !== 'me' && msg.status !== 'read') {
                    msg.status = 'read';
                }
            });
            chat.unread = 0;
            this.updateChat(chat);
        }
    }

    updateTypingStatus(chatId: number, isTyping: boolean): void {
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            chat.isTyping = isTyping;
            this.updateChat(chat);
        }
    }

    updateOnlineStatus(chatId: number, online: boolean): void {
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            chat.online = online;
            this.updateChat(chat);
        }
    }

    private updateChat(updatedChat: Chat): void {
        const index = this.chats.findIndex(c => c.id === updatedChat.id);
        if (index !== -1) {
            this.chats[index] = updatedChat;
            this.chatsSubject.next([...this.chats]);
        }
    }

    simulateIncomingMessage(chatId: number): void {
        const chat = this.chats.find(c => c.id === chatId);
        if (chat) {
            const newMessage: Message = {
                id: chat.messages.length + 1,
                text: 'Demo incoming message',
                sender: chat.name,
                timestamp: new Date(),
                status: 'delivered'
            };

            chat.messages.push(newMessage);
            chat.lastMessage = newMessage.text;
            chat.timestamp = new Date();
            chat.unread++;

            this.updateChat(chat);
        }
    }
}
