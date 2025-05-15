import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChatService, Chat, Message } from '../../pages/dashboard/chat.service'; // Import ChatService

@Component({
  selector: 'app-ble-chat',
  templateUrl: './ble-chat.component.html',
  styleUrls: ['./ble-chat.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))])
    ])
  ]
})
export class BleChatComponent implements OnInit, OnDestroy {
  chat: Chat | null = null;
  deviceId: string = '';
deviceName: string = '';

  newMessage = '';
  isMobileView = false;
  showChatList = true;
  expandedMessage: Message | null = null;
  private resizeSubscription!: Subscription;

  constructor(
    private router: Router,
    private chatService: ChatService
  ) {}


ngOnInit() {
  const device = history.state.device || {
    id: 'device-001',
    name: 'Test Device'
  };

  this.deviceId = device.id;
  this.deviceName = device.name;

  let chat = this.chatService.getChatById(parseInt(this.deviceId, 10));
  if (!chat) {
    chat = this.chatService.addChat(this.deviceName);
    chat.id = parseInt(this.deviceId, 10);
    chat.avatar = 'assets/device.png';
    chat.online = true;
    this.chatService.updateChat(chat);
  }
  this.chat = chat;

  this.chatService.markAsRead(chat.id);

  setTimeout(() => {
    this.chatService.simulateIncomingMessage(chat!.id);
  }, 2000);

  this.setupResponsiveListener();
}


  sendMessage() {
    if (this.newMessage.trim() && this.chat) {
      this.chatService.sendMessage(this.chat.id, this.newMessage);
      this.newMessage = '';
      // Simulate incoming message after 1 second
      setTimeout(() => {
        this.chatService.simulateIncomingMessage(this.chat!.id);
      }, 1000);
    }
  }

  selectDeviceChat() {
    if (this.isMobileView) this.showChatList = false;
  }

  backToChatList() {
    if (this.isMobileView) this.showChatList = true;
  }

  setupResponsiveListener() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        map(() => window.innerWidth <= 768),
        startWith(window.innerWidth <= 768)
      )
      .subscribe(isMobile => (this.isMobileView = isMobile));
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
  }

  get groupedMessages() {
    if (!this.chat) return [];

    const groups: { date: string; messages: Message[] }[] = [];

    this.chat.messages.forEach(msg => {
      const msgDate = new Date(msg.timestamp).toDateString();
      let group = groups.find(g => g.date === msgDate);
      if (!group) {
        group = { date: msgDate, messages: [] };
        groups.push(group);
      }
      group.messages.push(msg);
    });

    return groups;
  }

  formatDateLabel(dateStr: string): string {
    const today = new Date();
    const date = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString();
  }

  toggleMessageDetails(message: Message) {
    this.expandedMessage = this.expandedMessage === message ? null : message;
  }

  getMessageIcon(status: string): string {
    switch (status) {
      case 'sent': return 'done';
      case 'delivered':
      case 'read': return 'done_all'; // Map 'read' to 'delivered' icon
      default: return '';
    }
  }

  getMessageIconColor(status: string): string {
    switch (status) {
      case 'delivered':
      case 'read': return 'text-success'; // Map 'read' to 'delivered' color
      default: return 'text-info';
    }
  }
}