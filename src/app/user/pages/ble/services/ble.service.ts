// src/app/services/ble.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BleService {
  readMessages(id: string) {
    throw new Error('Method not implemented.');
  }
  private device: BluetoothDevice | null = null;

  setDevice(device: BluetoothDevice) {
    this.device = device;
  }

  getDevice(): BluetoothDevice | null {
    return this.device;
  }

  clearDevice() {
    this.device = null;
  }
}
