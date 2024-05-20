import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore: Firestore = inject(Firestore);
  trackDataList: any = [];
  filteredDataList: any = [];
  track: string = '';

  constructor() {
    this.filteredDataList = this.trackDataList;
  }

  /**
   * get all documents from a collection, push them into 'trackDataList'-array and add every data to the specific ID.
   */
  async getAllData() {
    const collRef = await getDocs(collection(this.firestore, 'trackdatalist'));
    collRef.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      this.trackDataList.push({ id, data });
    });
    this.sortTime();
  }

  async addNewTime(track: string, driver: string, time: string, car: string) {
    let msec = this.getTimeInMilliseconds(time);
    const driverData = {
      driver: driver.charAt(0).toUpperCase() + driver.slice(1).toLowerCase(),
      time: time,
      msec: msec,
      car: car,
    };
    const trackRef = doc(this.firestore, 'trackdatalist', track);
    const trackSnapshot = await getDoc(trackRef);

    if (trackSnapshot.exists()) {
      const trackData = trackSnapshot.data();
      const existingDriverIndex = trackData['drivers'].findIndex(
        (d: { car: string; driver: string }) =>
          d.car === car && d.driver === driver
      );

      if (existingDriverIndex !== -1) {
        const updatedDrivers = [...trackData['drivers']];
        updatedDrivers[existingDriverIndex].time = time;
        updatedDrivers[existingDriverIndex].msec = msec;
        await updateDoc(trackRef, { drivers: updatedDrivers });
      } else {
        // Driver with the same car doesn't exist, add new driver entry
        await updateDoc(trackRef, { drivers: arrayUnion(driverData) });
      }
    }
  }

  sortTime() {
    this.trackDataList.forEach((element: any) => {
      if (element.data && element.data.drivers) {
        element.data.drivers.sort((a: any, b: any) => a.msec - b.msec);
      }
    });
  }

  getTimeInMilliseconds(time: string) {
    let splittedTime = time.split('.');
    let minutes = parseInt(splittedTime[0], 10);
    let seconds = parseInt(splittedTime[1], 10);
    let milliSeconds = parseInt(splittedTime[2], 10);
    return minutes * 60 * 1000 + seconds * 1000 + milliSeconds;
  }

  filterData() {
    this.filteredDataList = this.trackDataList.filter((item: any) =>
      item.id.toLowerCase().includes(this.track.toLowerCase())
    );
  }
}
