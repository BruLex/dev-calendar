import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Params$Resource$Events$List, Schema$Event, Schema$Events} from './GoogleCalendarv3Models';

const CALENDARS_URL_MAP = {
  GREEN_ZONE: 'b2sunei7rseftrnsjf9ab54jd4@group.calendar.google.com',
  YELLOW_ZONE: '1ok7p3motcv4bif3m9llor0k0c@group.calendar.google.com',
  RED_ZONE: 'fmtdb38a16cd3b7i6r7bmrkup4@group.calendar.google.com'
};

const ZONES_MAP = {
  GREEN_ZONE: 'GREEN_ZONE',
  YELLOW_ZONE: 'YELLOW_ZONE',
  RED_ZONE: 'RED_ZONE'
};

const FIRST_ELEM_COUNT = 3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'dev-calendar';
  dateNow: Date = new Date();

  zonesArray = ['GREEN_ZONE', 'YELLOW_ZONE', 'RED_ZONE'];
  zonesMap = ZONES_MAP;


  calendarsMap: { [key: string]: Schema$Events } = {
    GREEN_ZONE: null,
    YELLOW_ZONE: null,
    RED_ZONE: null
  };

  eventsMap: { [key: string]: Schema$Event[] } = {
    GREEN_ZONE: null,
    YELLOW_ZONE: null,
    RED_ZONE: null
  };

  firstEventsMap: { [key: string]: Schema$Event[] } = {
    GREEN_ZONE: null,
    YELLOW_ZONE: null,
    RED_ZONE: null
  };

  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef) {
    this.updateStorage(ZONES_MAP.GREEN_ZONE);
    this.updateStorage(ZONES_MAP.YELLOW_ZONE);
    this.updateStorage(ZONES_MAP.RED_ZONE);
  }

  get isReady() {
    return this.eventsMap.GREEN_ZONE && this.eventsMap.YELLOW_ZONE && this.eventsMap.RED_ZONE;
  }

  private getData(calendarId: string): Observable<Schema$Events> {
    const a = new Date();
    const calcMonth = a.getMonth() - 6;
    const month = calcMonth < 0 ? 11 - (calcMonth) : calcMonth;
    const year = calcMonth < 0 ? a.getFullYear() - 1 : a.getFullYear();
    const params: Params$Resource$Events$List = {
      key: 'AIzaSyDD3ZPB3yZQWqJ1l9fU0W5FvqXI8G8gCVA',
      prettyPrint: true,
      timeMin: `${year}-${month < 10 ? '0' + month : month}-01T10:00:00Z`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return this.http.get<Schema$Events>(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {params: params as any});
  }

  private setZoneDate(storage: string, obj: any) {
    this.calendarsMap[storage] = obj;
    this.eventsMap[storage] = this.getEventsAtDate(obj);
    this.firstEventsMap[storage] = this.getFirstEvents(this.getEventsAtDate(obj, this.dateNow, 'b'));
    this.cdr.markForCheck();
  }

  private updateStorage(storage: string) {
    this.getData(CALENDARS_URL_MAP[storage]).subscribe(obj => {
        let storageObj = {};
        storageObj[storage] = obj;
        this.setZoneDate(storage, obj);
      }
    );
  }

  getEventsAtDate(events: Schema$Events, date = new Date(), dateControl: 'm' | 'l' | 'b' = 'm'): Schema$Event[] {
    return events.items.filter((obj: Schema$Event) =>
      dateControl === 'm'
        ? Date.parse(obj.start.date) < date.getTime()
        && date.getTime() < Date.parse(obj.end.date)
        : dateControl === 'b'
        ? date.getTime() < Date.parse(obj.start.date)
        : date.getTime() > Date.parse(obj.end.date)
    );
  }

  getFirstEvents(array: any[]) {
    return array.splice(0, FIRST_ELEM_COUNT);
  }

  getLeftDays(date: string) {
    let cmp = Date.parse(date) - Date.now() - 2 * 3600 * 1000;
    return (cmp / (1000 * 3600 * 24)) | 0;
  }

}
