import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Params$Resource$Events$List, Schema$Event, Schema$Events } from './google-calendar.types';

enum Zone {
    GreenZone,
    YellowZone,
    RedZone
}

const CALENDARS_URL_MAP: Record<Zone, string> = {
    [Zone.GreenZone]: 'b2sunei7rseftrnsjf9ab54jd4@group.calendar.google.com',
    [Zone.YellowZone]: '1ok7p3motcv4bif3m9llor0k0c@group.calendar.google.com',
    [Zone.RedZone]: 'fmtdb38a16cd3b7i6r7bmrkup4@group.calendar.google.com'
};

const FIRST_ELEM_COUNT: number = 3;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
    dateNow: Date = new Date();
    readonly zonesArray: { value: Zone; class: string }[] = [
        { value: Zone.GreenZone, class: 'green-zone' },
        { value: Zone.YellowZone, class: 'yellow-zone' },
        { value: Zone.RedZone, class: 'red-zone' }
    ];
    todayEventsMap: Record<Zone, Schema$Event[]> = {
        [Zone.GreenZone]: null,
        [Zone.YellowZone]: null,
        [Zone.RedZone]: null
    };
    upcomingEventsMap: Record<Zone, Schema$Event[]> = {
        [Zone.GreenZone]: null,
        [Zone.YellowZone]: null,
        [Zone.RedZone]: null
    };

    get isReady(): boolean {
        return Object.values(Zone)
            .filter(v => typeof v === 'number')
            .every(v => this.todayEventsMap[v]);
    }

    private subs: Subscription[] = [];

    constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {
        Object.values(Zone)
            .filter(v => typeof v === 'number')
            .forEach((zone: Zone) =>
                this.subs.push(this.getData(CALENDARS_URL_MAP[zone]).subscribe(obj => this.setZoneDate(zone, obj)))
            );
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    fixEndDate(date: string): string {
        return date;
        const [{ value: month }, , { value: day }, , { value: year }] = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).formatToParts(new Date(new Date(date).getTime() - 24 * 3600 * 1000));
        return `${day}-${month}-${year}`;
    }

    getLeftDays(date: string): number {
        const cmp: number = Date.parse(date) - Date.now();
        return Math.ceil(cmp / (1000 * 3600 * 24));
    }

    getLeftBusinessDays(date: string): number {
        return this.calculateBusinessDaysBetweenDates(new Date(), date);
    }

    private calculateBusinessDaysBetweenDates(start: Date | string, end: Date | string): number {
        let count: number = 0;
        const curDate: Date = new Date(start);
        const endDate: Date = new Date(end);
        while (curDate <= endDate) {
            const dayOfWeek: number = curDate.getDay();
            if (![0, 6].includes(dayOfWeek)) {
                count++;
            }
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    private getEventsAtDate(
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

    private getFirstEvents(array: any[]): Schema$Event[] {
        return array.splice(0, FIRST_ELEM_COUNT);
    }

    private getData(calendarId: string): Observable<Schema$Events> {
        const params: Params$Resource$Events$List = {
            key: 'AIzaSyDD3ZPB3yZQWqJ1l9fU0W5FvqXI8G8gCVA',
            timeMin: new Date(new Date().setMonth(new Date().getMonth() - 12)).toISOString()
        };
        return this.http.get<Schema$Events>(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
            params: params as any
        });
    }

    private setZoneDate(zone: Zone, obj: Schema$Events): void {
        this.todayEventsMap[zone] = this.getEventsAtDate(obj);
        this.upcomingEventsMap[zone] = this.getFirstEvents(this.getEventsAtDate(obj, this.dateNow, 'b'));
        this.cdRef.markForCheck();
    }
}
