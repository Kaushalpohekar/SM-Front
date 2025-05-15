import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BleService } from './services/ble.service';

@Component({
  selector: 'app-ble',
  templateUrl: './ble.component.html',
  styleUrls: ['./ble.component.css']
})
export class BleComponent implements OnInit {
  bluetoothEnabled = true; // For UI toggle (cannot control real adapter)
  isScanning = false;
  devices: BluetoothDevice[] = [];
  selectedDevice: BluetoothDevice | null = null;
  connectingDeviceId!: string | null;

  constructor(private bleService: BleService, private router: Router) {}

  ngOnInit(): void {
    const device = this.bleService.getDevice();
    if (device) {
      this.selectedDevice = device;
      this.devices = [device];
    }
  }

  toggleBluetooth() {
    console.log('Bluetooth toggled (UI only):', this.bluetoothEnabled);
  }

  async scanDevices() {
    this.isScanning = true;
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', '0000ffe0-0000-1000-8000-00805f9b34fb'] // Include chat service UUID
      });

      // Avoid duplicate devices
      if (!this.devices.some(d => d.id === device.id)) {
        this.devices.push(device);
      }
      this.selectedDevice = device;
      this.bleService.setDevice(device);

      console.log('Device found:', device);
    } catch (error) {
      console.error('BLE scan failed:', error);
    }
    this.isScanning = false;
  }

async selectDevice(device: BluetoothDevice) {
  this.connectingDeviceId = device.id;
  this.selectedDevice = device;
  this.bleService.setDevice(device);
  try {
await device.gatt?.connect();
this.router.navigate(['/u/ble-chat'], {
  state: {
    device: {
      id: device.id,
      name: device.name || 'Unnamed Device'
    }
  }
});
  } catch (error) {
    console.error('Failed to connect:', error);
    this.router.navigate(['/u/ble-chat']);
  } finally {
    this.connectingDeviceId = null;
  }
}

}
// Type fallback
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