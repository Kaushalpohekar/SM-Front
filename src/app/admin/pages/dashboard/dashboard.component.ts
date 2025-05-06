import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'MessageUTC', 'MobileID', 'lastResetReason', 'product', 'virtualCarrier', 'beam', 'RegionName'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  modemRegistrations  = [
    {
      ID: 10001,
      MessageUTC: '2025-05-03 01:00:00',
      MobileID: '01995895QCS9090',
      lastResetReason: 'PowerOn',
      product: '159',
      virtualCarrier: '202',
      beam: '5',
      RegionName: 'EMEARB19'
    },
    {
      ID: 10002,
      MessageUTC: '2025-05-03 02:00:00',
      MobileID: '01995895QCS9091',
      lastResetReason: 'External',
      product: '160',
      virtualCarrier: '203',
      beam: '3',
      RegionName: 'EMEASA02'
    },
    {
      ID: 10003,
      MessageUTC: '2025-05-03 03:30:00',
      MobileID: '01995895QCS9092',
      lastResetReason: 'Manual',
      product: '161',
      virtualCarrier: '205',
      beam: '7',
      RegionName: 'APAC01'
    },
    {
      ID: 10004,
      MessageUTC: '2025-05-03 04:45:00',
      MobileID: '01995895QCS9093',
      lastResetReason: 'Watchdog',
      product: '162',
      virtualCarrier: '208',
      beam: '2',
      RegionName: 'NA01'
    },
    {
      ID: 10005,
      MessageUTC: '2025-05-03 05:15:00',
      MobileID: '01995895QCS9094',
      lastResetReason: 'PowerOn',
      product: '163',
      virtualCarrier: '210',
      beam: '6',
      RegionName: 'LATAM01'
    }
  ];
  
  rawPayloadMessages = [
    {
      ID: 10010,
      MessageUTC: '2025-05-03 03:00:00',
      MobileID: '01995895QCS9092',
      SIN: 140,
      payload: 'TEST123',
      RegionName: 'EMEASA03'
    },
    {
      ID: 10011,
      MessageUTC: '2025-05-03 04:00:00',
      MobileID: '01995895QCS9093',
      SIN: 141,
      payload: 'ABCD123',
      RegionName: 'EMEASA04'
    },
    {
      ID: 10012,
      MessageUTC: '2025-05-03 05:30:00',
      MobileID: '01995895QCS9094',
      SIN: 142,
      payload: 'DATA456',
      RegionName: 'APAC01'
    },
    {
      ID: 10013,
      MessageUTC: '2025-05-03 06:00:00',
      MobileID: '01995895QCS9095',
      SIN: 143,
      payload: 'XYZ789',
      RegionName: 'NA02'
    },
    {
      ID: 10014,
      MessageUTC: '2025-05-03 06:30:00',
      MobileID: '01995895QCS9096',
      SIN: 144,
      payload: 'PING007',
      RegionName: 'LATAM02'
    }
  ];

  ngOnInit() {
    this.dataSource.data = this.modemRegistrations;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
