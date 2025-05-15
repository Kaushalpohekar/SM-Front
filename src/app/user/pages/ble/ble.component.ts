import { Component } from '@angular/core';

@Component({
  selector: 'app-ble',
  templateUrl: './ble.component.html',
  styleUrls: ['./ble.component.css']
})
export class BleComponent {
  devices: BluetoothDevice[] = [];
  isScanning = false;

  async scanDevices() {
    this.isScanning = true;
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // customize later
      });

      this.devices = [device];
      console.log('Device found:', device);
    } catch (error) {
      console.error('BLE Scan failed:', error);
    }
    this.isScanning = false;
  }

  selectDevice(device: BluetoothDevice) {
    console.log('Selected:', device.name);
  }
}

// ✅ BLE types fallback (for browser support)
declare global {
  interface Navigator {
    bluetooth: any;
  }
  interface BluetoothDevice {
    id: string;
    name?: string;
    gatt?: any;
  }
}
