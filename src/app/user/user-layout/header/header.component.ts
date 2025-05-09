import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { navbarData } from '../sidebar/nav-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pageTitle: string = 'Dashboard';
  showDropdown: boolean = false;
  navData = navbarData;

  notifications: string[] = [
    'New user registered',
    'System update available',
    'You have 3 new messages'
  ];

  constructor(private router: Router, ) {
    // Update page title based on route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.updateTitleBasedOnUrl(url);
      }
    });
  }

  // Toggle dropdown on profile icon click
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  


  // Optional: Customize title based on routing
  updateTitleBasedOnUrl(url: string) {
    if (url.includes('dashboard')) {
      this.pageTitle = 'Dashboard';
    } else if (url.includes('analytics')) {
      this.pageTitle = 'Analytics';
    } else if (url.includes('user')) {
      this.pageTitle = 'User Management';
    } else if (url.includes('schedule')) {
      this.pageTitle = 'Schedule Management';
    } else if (url.includes('profile')){
      this.pageTitle = 'Profile';
    }
  }

  // logout() { 
  //   this.auhservice.logout();
  // }
}
