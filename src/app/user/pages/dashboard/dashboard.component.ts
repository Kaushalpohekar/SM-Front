import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat, ChatService } from './chat.service';
import { fromEvent, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  selectedChat: Chat | null = null;
  newMessage = '';
  isMobileView = false;
  showChatList = true;
  newChatMode = false;
  newChatName = '';

  private resizeSub!: Subscription;
  private mobileView$ = new BehaviorSubject<boolean>(window.innerWidth <= 768);

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    // Subscribe to window resize and update mobile view state
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        map(() => window.innerWidth <= 768),
        startWith(window.innerWidth <= 768)
      )
      .subscribe((isMobile) => {
        this.isMobileView = isMobile;

        if (isMobile && this.selectedChat) {
          this.showChatList = false;
        } else if (!isMobile) {
          this.showChatList = true;
        }
      });
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    if (this.isMobileView) {
      this.showChatList = false;
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedChat) {
      this.chatService.sendMessage(this.selectedChat.id, this.newMessage);
      this.newMessage = '';
    }
  }

  backToChatList() {
    this.showChatList = true;
    this.selectedChat = null;
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }

  addNewChat() {
    this.newChatMode = true;
    this.newChatName = '';
  }

  confirmNewChat() {
    const name = this.newChatName.trim();
    if (name) {
      const newChat = this.chatService.addChat(name);
      this.selectChat(newChat);
    }
  
    this.newChatMode = false;
    this.newChatName = '';
  }
  cancelNewChat() {
    this.newChatMode = false;
    this.newChatName = '';
  }  
}
