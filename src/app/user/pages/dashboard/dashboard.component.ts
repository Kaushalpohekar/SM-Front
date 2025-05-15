// import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { animate, state, style, transition, trigger } from '@angular/animations';
// import { fromEvent, Subscription, forkJoin } from 'rxjs';
// import { debounceTime, map, startWith } from 'rxjs/operators';
// import { ServiceService } from '../../service/service.service';
// import { formatDate } from '@angular/common';

// export interface Message {
//   sender: 'me' | 'them';
//   text: string;
//   timestamp: string;
//   status: 'sent' | 'read' | 'delivered' | 'failed';
//   stateLabel?: string;
// }

// export interface Chat {
//   id: string;
//   name: string;
//   lastMessage: string;
//   timestamp: string;
//   unread: number;
//   online: boolean;
//   isTyping: boolean;
//   avatar: string | null;
//   messages: Message[];
// }

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
//   animations: [
//     trigger('detailExpand', [
//       state('collapsed', style({ height: '0px', minHeight: '0' })),
//       state('expanded', style({ height: '*' })),
//       transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
//     ]),
//     trigger('fadeInOut', [
//       transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in-out', style({ opacity: 1 }))]),
//       transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))])
//     ])
//   ]
// })
// export class DashboardComponent implements OnInit, OnDestroy {
//   chatList: Chat[] = [];
//   selectedChat: Chat | null = null;
//   newMessage = '';
//   isMobileView = false;
//   resizeSubscription!: Subscription;
//   dateRange: { start: Date; end: Date };
//   newChatMode = false;
//   newChatName = '';
//   showChatList = true;
//   expandedMessage: Message | null = null;

//   messageStateMap: { [key: number]: string } = {
//     0: 'Submitted',
//     1: 'Delivered',
//     2: 'Message Error',
//     3: 'Failed Delivery',
//     4: 'Timed Out',
//     5: 'Cancelled'
//   };

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private service: ServiceService) {
//     const now = new Date();
//     const jan1 = new Date(now.getFullYear(), 0, 1);
//     this.dateRange = {
//       start: jan1,
//       end: now
//     };
//   }

//   ngOnInit() {
//     const startUtc = formatDate(this.dateRange.start, 'yyyy-MM-dd HH:mm:ss', 'en-US');
//     const endUtc = formatDate(this.dateRange.end, 'yyyy-MM-dd HH:mm:ss', 'en-US');

//     forkJoin({
//       messages: this.service.getChatMessages(startUtc, endUtc),
//       users: this.service.getAllUsers()
//     }).subscribe({
//       next: ({ messages, users }) => {
//         this.chatList = this.buildChats(messages, users.users);
//         console.log('Fetched chat data:', this.chatList);
//       },
//       error: (err) => {
//         console.error('Failed to fetch chat data:', err);
//       }
//     });

//     this.setupResponsiveListener();
//   }

//   buildChats(data: any[], users: any[]): Chat[] {
//     const chats: Chat[] = [];

//     users.forEach(user => {
//       const id = user.destination_id;
//       const entry = data.find((x: any) => x.MobileID === id);
//       if (!entry) return;

//       const allMsgs: Message[] = [];

//       entry.MobileOriginated.forEach((m: any) => {
//         allMsgs.push({
//           sender: 'them',
//           text: this.asciiToString(m.RawPayload),
//           timestamp: m.MessageUTC,
//           status: 'read'
//         });
//       });

//       entry.MobileTerminated.forEach((m: any) => {
//         allMsgs.push({
//           sender: 'me',
//           text: this.asciiToString(m.RawPayload),
//           timestamp: m.CreateUTC,
//           status: m.ErrorID === 0 ? 'sent' : 'failed',
//           stateLabel: this.messageStateMap[m.State] || 'Unknown'
//         });
//       });

//       allMsgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
//       const last = allMsgs[allMsgs.length - 1];

//       chats.push({
//         id,
//         name: `${user.first_name} ${user.last_name}`,
//         lastMessage: last?.text || '',
//         timestamp: last?.timestamp || '',
//         unread: 0,
//         online: false,
//         isTyping: false,
//         avatar: null,
//         messages: allMsgs
//       });
//     });

//     return chats;
//   }

//   // asciiToString(payload: number[]): string {
//   //   if (!Array.isArray(payload)) return '--';
//   //   return payload.filter(code => code >= 32 && code <= 126).map(code => String.fromCharCode(code)).join('');
//   // }
//   asciiToString(payload: number[]): string {
//     if (!Array.isArray(payload) || payload.length < 3) return '--';
//     return payload
//       .slice(2)
//       .filter(code => code >= 32 && code <= 126)
//       .map(code => String.fromCharCode(code))
//       .join('');
//   }


//   toggleRow(row: any) {
//     this.selectedChat = this.selectedChat === row ? null : row;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
//     this.chatList = this.chatList.filter(chat => chat.name.toLowerCase().includes(filterValue));
//   }

//   sendMessage() {
//     if (!this.newMessage.trim() || !this.selectedChat) return;

//     const trimmedMsg = this.newMessage.trim();
//     const encoder = new TextEncoder();
//     const encoded = encoder.encode(trimmedMsg);

//     if (encoded.length > 18) {
//       alert('Message too long. Max 18 bytes allowed.');
//       return;
//     }

//     // Send as-is without padding
//     this.service.sendMTMessage(this.selectedChat.id, trimmedMsg).subscribe({
//       next: (res) => {
//         this.selectedChat?.messages.push({
//           sender: 'me',
//           text: trimmedMsg,
//           timestamp: new Date().toISOString(),
//           status: 'sent'
//         });
//         this.newMessage = '';
//       },
//       error: (err) => {
//         console.error('Failed to send message:', err);
//         this.selectedChat?.messages.push({
//           sender: 'me',
//           text: trimmedMsg,
//           timestamp: new Date().toISOString(),
//           status: 'failed'
//         });
//       }
//     });
//   }


//   selectChat(chat: Chat) {
//     this.selectedChat = chat;
//     if (this.isMobileView) this.showChatList = false;
//   }

//   backToChatList() {
//     this.selectedChat = null;
//     if (this.isMobileView) this.showChatList = true;
//   }

//   addNewChat() {
//     this.newChatMode = true;
//   }

//   cancelNewChat() {
//     this.newChatMode = false;
//     this.newChatName = '';
//   }

//   confirmNewChat() {
//     if (this.newChatName.trim()) {
//       this.chatList.unshift({
//         id: Math.random().toString(36).substring(2),
//         name: this.newChatName.trim(),
//         lastMessage: '',
//         timestamp: '',
//         unread: 0,
//         online: false,
//         isTyping: false,
//         avatar: null,
//         messages: []
//       });
//       this.newChatName = '';
//       this.newChatMode = false;
//     }
//   }

//   setupResponsiveListener() {
//     this.resizeSubscription = fromEvent(window, 'resize')
//       .pipe(
//         debounceTime(200),
//         map(() => window.innerWidth <= 991),
//         startWith(window.innerWidth <= 991)
//       )
//       .subscribe(isMobile => (this.isMobileView = isMobile));
//   }

//   ngOnDestroy() {
//     this.resizeSubscription?.unsubscribe();
//   }

//   get groupedMessages() {
//     if (!this.selectedChat) return [];

//     const groups: { date: string; messages: Message[] }[] = [];

//     this.selectedChat.messages.forEach(msg => {
//       const msgDate = new Date(msg.timestamp).toDateString();
//       let group = groups.find(g => g.date === msgDate);
//       if (!group) {
//         group = { date: msgDate, messages: [] };
//         groups.push(group);
//       }
//       group.messages.push(msg);
//     });

//     return groups;
//   }

//   formatDateLabel(dateStr: string): string {
//     const today = new Date();
//     const date = new Date(dateStr);
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) return 'Today';
//     if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

//     return date.toLocaleDateString();
//   }

//   toggleMessageDetails(message: Message) {
//     this.expandedMessage = this.expandedMessage === message ? null : message;
//   }

//   getMessageIcon(stateLabel: string | undefined): string {
//     switch (stateLabel) {
//       case 'Submitted': return 'done';
//       case 'Delivered': return 'done_all';
//       case 'Message Error': return 'error';
//       case 'Failed Delivery': return 'highlight_off';
//       case 'Timed Out': return 'schedule';
//       case 'Cancelled': return 'cancel';
//       default: return '';
//     }
//   }

//   getMessageIconColor(stateLabel: string | undefined): string {
//     switch (stateLabel) {
//       case 'Delivered': return 'text-primary';
//       case 'Message Error':
//       case 'Failed Delivery': return 'text-danger';
//       case 'Timed Out': return 'text-warning';
//       case 'Cancelled': return 'text-muted';
//       default: return '';
//     }
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
