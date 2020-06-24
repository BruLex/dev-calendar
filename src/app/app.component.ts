import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Params$Resource$Events$List, Schema$Event, Schema$Events } from './GoogleCalendarv3Models';

const CALENDARS_URL_MAP: { [key: string]: string } = {
    GREEN_ZONE: 'b2sunei7rseftrnsjf9ab54jd4@group.calendar.google.com',
    YELLOW_ZONE: '1ok7p3motcv4bif3m9llor0k0c@group.calendar.google.com',
    RED_ZONE: 'fmtdb38a16cd3b7i6r7bmrkup4@group.calendar.google.com'
};

const ZONES_MAP: { [key: string]: string } = {
    GREEN_ZONE: 'GREEN_ZONE',
    YELLOW_ZONE: 'YELLOW_ZONE',
    RED_ZONE: 'RED_ZONE'
};

const FIRST_ELEM_COUNT: number = 3;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    dateNow: Date = new Date();
    zonesArray: string[] = ['GREEN_ZONE', 'YELLOW_ZONE', 'RED_ZONE'];
    zonesMap: { [key: string]: string } = ZONES_MAP;
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

    get isReady(): boolean {
        return !!this.eventsMap.GREEN_ZONE && !!this.eventsMap.YELLOW_ZONE && !!this.eventsMap.RED_ZONE;
    }

    constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {
        this.updateStorage(ZONES_MAP.GREEN_ZONE);
        this.updateStorage(ZONES_MAP.YELLOW_ZONE);
        this.updateStorage(ZONES_MAP.RED_ZONE);
    }

    getEventsAtDate(
        events: Schema$Events,
        date: Date = new Date(),
        dateControl: 'm' | 'l' | 'b' = 'm'
    ): Schema$Event[] {
        return events.items.filter((obj: Schema$Event) =>
            dateControl === 'm'
                ? Date.parse(obj.start.date) < date.getTime() && date.getTime() < Date.parse(obj.end.date)
                : dateControl === 'b'
                ? date.getTime() < Date.parse(obj.start.date)
                : date.getTime() > Date.parse(obj.end.date)
        );
    }

    getFirstEvents(array: any[]): Schema$Event[] {
        return array.splice(0, FIRST_ELEM_COUNT);
    }

    getLeftDays(date: string): number {
        const cmp: number = Date.parse(date) - Date.now() - 2 * 3600 * 1000;
        return (cmp / (1000 * 3600 * 24)) | 0;
    }

    private getData(calendarId: string): Observable<Schema$Events> {
        const params: Params$Resource$Events$List = {
            key: 'AIzaSyDD3ZPB3yZQWqJ1l9fU0W5FvqXI8G8gCVA',
            prettyPrint: true,
            /**
             * re-check month calculation, problem with january
             */
            timeMin: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        return this.http.get<Schema$Events>(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
            params: params as any
        });
    }

    private setZoneDate(storage: string, obj: any): void {
        this.calendarsMap[storage] = obj;
        this.eventsMap[storage] = this.getEventsAtDate(obj);
        this.firstEventsMap[storage] = this.getFirstEvents(this.getEventsAtDate(obj, this.dateNow, 'b'));
        this.cdRef.markForCheck();
    }

    private updateStorage(storage: string): void {
        this.getData(CALENDARS_URL_MAP[storage]).subscribe(obj => {
            const storageObj: object = {};
            storageObj[storage] = obj;
            this.setZoneDate(storage, obj);
        });
    }
}
