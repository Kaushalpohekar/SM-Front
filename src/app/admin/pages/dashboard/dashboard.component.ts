import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { ServiceService } from '../../service/service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['ID', 'timestamp', 'deviceInfo', 'status', 'networkInfo'];
  dataSource = new MatTableDataSource<any>([]);
  expandedRow: any | null = null;
  isMobileView = false;
  resizeSubscription!: Subscription;
  dateRange: { start: Date; end: Date };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ServiceService) {
    const now = new Date();
    const jan1 = new Date(now.getFullYear(), 0, 1); // Jan = 0

    this.dateRange = {
      start: jan1,
      end: now
    };
  }

  ngOnInit() {
    const startUtc = formatDate(this.dateRange.start, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    const endUtc = formatDate(this.dateRange.end, 'yyyy-MM-dd HH:mm:ss', 'en-US');

    this.service.getMessages(startUtc, endUtc).subscribe({
      next: (res) => {
        this.dataSource.data = res.Messages || [];
        console.log('Fetched messages:', this.dataSource.data);
      },
      error: (err) => {
        console.error('Failed to fetch messages:', err);
        this.dataSource.data = [];
      }
    });

    this.setupResponsiveListener();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'timestamp':
          return item.MessageUTC;
        case 'deviceInfo':
          return item.MobileID;
        case 'status':
          return item.RawPayload || '';
        case 'networkInfo':
          return item.OTAMessageSize || '';
        default:
          return item[property];
      }
    };
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  toggleRow(row: any) {
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  getResetReasonColor(reason: string): string {
    const colorMap: { [key: string]: string } = {
      'PowerOn': 'primary',
      'External': 'accent',
      'Manual': 'warn',
      'Watchdog': 'warn',
      'default': ''
    };
    return colorMap[reason] || colorMap['default'];
  }

  bytesToHex(bytes: number[]): string {
    return bytes.map(b => b.toString(16).padStart(2, '0')).join(' ');
  }

  setupResponsiveListener() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        map(() => window.innerWidth <= 991),
        startWith(window.innerWidth <= 991)
      )
      .subscribe(isMobile => (this.isMobileView = isMobile));
  }

  asciiToString(payload: number[]): string {
    if (!Array.isArray(payload)) return '--';
    return payload
      .filter((code) => code >= 32 && code <= 126) // printable ASCII
      .map((code) => String.fromCharCode(code))
      .join('');
  }

}
