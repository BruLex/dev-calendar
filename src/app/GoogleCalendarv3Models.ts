/* tslint:disable */
export interface Schema$Events {
  /**
   * The user&#39;s access role for this calendar. Read-only. Possible values are:   - &quot;none&quot; - The user has no access.  - &quot;freeBusyReader&quot; - The user has read access to free/busy information.  - &quot;reader&quot; - The user has read access to the calendar. Private events will appear to users with reader access, but event details will be hidden.  - &quot;writer&quot; - The user has read and write access to the calendar. Private events will appear to users with writer access, and event details will be visible.  - &quot;owner&quot; - The user has ownership of the calendar. This role has all of the permissions of the writer role with the additional ability to see and manipulate ACLs.
   */
  accessRole?: string;
  /**
   * The default reminders on the calendar for the authenticated user. These reminders apply to all events on this calendar that do not explicitly override them (i.e. do not have reminders.useDefault set to True).
   */
  defaultReminders?: Schema$EventReminder[];
  /**
   * Description of the calendar. Read-only.
   */
  description?: string;
  /**
   * ETag of the collection.
   */
  etag?: string;
  /**
   * List of events on the calendar.
   */
  items?: Schema$Event[];
  /**
   * Type of the collection (&quot;calendar#events&quot;).
   */
  kind?: string;
  /**
   * Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided.
   */
  nextPageToken?: string;
  /**
   * Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided.
   */
  nextSyncToken?: string;
  /**
   * Title of the calendar. Read-only.
   */
  summary?: string;
  /**
   * The time zone of the calendar. Read-only.
   */
  timeZone?: string;
  /**
   * Last modification time of the calendar (as a RFC3339 timestamp). Read-only.
   */
  updated?: string;
}

export interface Schema$EventReminder {
  /**
   * The method used by this reminder. Possible values are:   - &quot;email&quot; - Reminders are sent via email.  - &quot;sms&quot; - Deprecated. Once this feature is shutdown, the API will no longer return reminders using this method. Any newly added SMS reminders will be ignored. See  Google Calendar SMS notifications to be removed for more information. Reminders are sent via SMS. These are only available for G Suite customers. Requests to set SMS reminders for other account types are ignored.  - &quot;popup&quot; - Reminders are sent via a UI popup.   Required when adding a reminder.
   */
  method?: string;
  /**
   * Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes). Required when adding a reminder.
   */
  minutes?: number;
}

export interface Schema$Event {
  /**
   * Whether anyone can invite themselves to the event (currently works for Google+ events only). Optional. The default is False.
   */
  anyoneCanAddSelf?: boolean;
  /**
   * File attachments for the event. Currently only Google Drive attachments are supported. In order to modify attachments the supportsAttachments request parameter should be set to true. There can be at most 25 attachments per event,
   */
  attachments?: Schema$EventAttachment[];
  /**
   * The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users.
   */
  attendees?: Schema$EventAttendee[];
  /**
   * Whether attendees may have been omitted from the event&#39;s representation. When retrieving an event, this may be due to a restriction specified by the maxAttendee query parameter. When updating an event, this can be used to only update the participant&#39;s response. Optional. The default is False.
   */
  attendeesOmitted?: boolean;
  /**
   * The color of the event. This is an ID referring to an entry in the event section of the colors definition (see the  colors endpoint). Optional.
   */
  colorId?: string;
  /**
   * The conference-related information, such as details of a Hangouts Meet conference. To create new conference details use the createRequest field. To persist your changes, remember to set the conferenceDataVersion request parameter to 1 for all event modification requests.
   */
  conferenceData?: any;
  /**
   * Creation time of the event (as a RFC3339 timestamp). Read-only.
   */
  created?: string;
  /**
   * The creator of the event. Read-only.
   */
  creator?: {
    displayName?: string;
    email?: string;
    id?: string;
    self?: boolean;
  };
  /**
   * Description of the event. Optional.
   */
  description?: string;
  /**
   * The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance.
   */
  end?: Schema$EventDateTime;
  /**
   * Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True. The default is False.
   */
  endTimeUnspecified?: boolean;
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Extended properties of the event.
   */
  extendedProperties?: {
    private?: {
      [key: string]: string;
    };
    shared?: {
      [key: string]: string;
    };
  };
  /**
   * A gadget that extends this event.
   */
  gadget?: {
    display?: string;
    height?: number;
    iconLink?: string;
    link?: string;
    preferences?: {
      [key: string]: string;
    };
    title?: string;
    type?: string;
    width?: number;
  };
  /**
   * Whether attendees other than the organizer can invite others to the event. Optional. The default is True.
   */
  guestsCanInviteOthers?: boolean;
  /**
   * Whether attendees other than the organizer can modify the event. Optional. The default is False.
   */
  guestsCanModify?: boolean;
  /**
   * Whether attendees other than the organizer can see who the event&#39;s attendees are. Optional. The default is True.
   */
  guestsCanSeeOtherGuests?: boolean;
  /**
   * An absolute link to the Google+ hangout associated with this event. Read-only.
   */
  hangoutLink?: string;
  /**
   * An absolute link to this event in the Google Calendar Web UI. Read-only.
   */
  htmlLink?: string;
  /**
   * Event unique identifier as defined in RFC5545. It is used to uniquely identify events accross calendaring systems and must be supplied when importing events via the import method. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs.
   */
  iCalUID?: string;
  /**
   * Opaque identifier of the event. When creating new single or recurring events, you can specify their IDs. Provided IDs must follow these rules:   - characters allowed in the ID are those used in base32hex encoding, i.e. lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938  - the length of the ID must be between 5 and 1024 characters  - the ID must be unique per calendar  Due to the globally distributed nature of the system, we cannot guarantee that ID collisions will be detected at event creation time. To minimize the risk of collisions we recommend using an established UUID algorithm such as one described in RFC4122. If you do not specify an ID, it will be automatically generated by the server. Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs.
   */
  id?: string;
  /**
   * Type of the resource (&quot;calendar#event&quot;).
   */
  kind?: string;
  /**
   * Geographic location of the event as free-form text. Optional.
   */
  location?: string;
  /**
   * Whether this is a locked event copy where no changes can be made to the main event fields &quot;summary&quot;, &quot;description&quot;, &quot;location&quot;, &quot;start&quot;, &quot;end&quot; or &quot;recurrence&quot;. The default is False. Read-Only.
   */
  locked?: boolean;
  /**
   * The organizer of the event. If the organizer is also an attendee, this is indicated with a separate entry in attendees with the organizer field set to True. To change the organizer, use the move operation. Read-only, except when importing an event.
   */
  organizer?: {
    displayName?: string;
    email?: string;
    id?: string;
    self?: boolean;
  };
  /**
   * For an instance of a recurring event, this is the time at which this event would start according to the recurrence data in the recurring event identified by recurringEventId. It uniquely identifies the instance within the recurring event series even if the instance was moved to a different time. Immutable.
   */
  originalStartTime?: Schema$EventDateTime;
  /**
   * Whether this is a private event copy where changes are not shared with other copies on other calendars. Optional. Immutable. The default is False.
   */
  privateCopy?: boolean;
  /**
   * List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events.
   */
  recurrence?: string[];
  /**
   * For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable.
   */
  recurringEventId?: string;
  /**
   * Information about the event&#39;s reminders for the authenticated user.
   */
  reminders?: {
    overrides?: Schema$EventReminder[];
    useDefault?: boolean;
  };
  /**
   * Sequence number as per iCalendar.
   */
  sequence?: number;
  /**
   * Source from which the event was created. For example, a web page, an email message or any document identifiable by an URL with HTTP or HTTPS scheme. Can only be seen or modified by the creator of the event.
   */
  source?: {
    title?: string;
    url?: string;
  };
  /**
   * The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance.
   */
  start?: Schema$EventDateTime;
  /**
   * Status of the event. Optional. Possible values are:   - &quot;confirmed&quot; - The event is confirmed. This is the default status.  - &quot;tentative&quot; - The event is tentatively confirmed.  - &quot;cancelled&quot; - The event is cancelled (deleted). The list method returns cancelled events only on incremental sync (when syncToken or updatedMin are specified) or if the showDeleted flag is set to true. The get method always returns them. A cancelled status represents two different states depending on the event type:   - Cancelled exceptions of an uncancelled recurring event indicate that this instance should no longer be presented to the user. Clients should store these events for the lifetime of the parent recurring event. Cancelled exceptions are only guaranteed to have values for the id, recurringEventId and originalStartTime fields populated. The other fields might be empty.   - All other cancelled events represent deleted events. Clients should remove their locally synced copies. Such cancelled events will eventually disappear, so do not rely on them being available indefinitely. Deleted events are only guaranteed to have the id field populated.   On the organizer&#39;s calendar, cancelled events continue to expose event details (summary, location, etc.) so that they can be restored (undeleted). Similarly, the events to which the user was invited and that they manually removed continue to provide details. However, incremental sync requests with showDeleted set to false will not return these details. If an event changes its organizer (for example via the move operation) and the original organizer is not on the attendee list, it will leave behind a cancelled event where only the id field is guaranteed to be populated.
   */
  status?: string;
  /**
   * Title of the event.
   */
  summary?: string;
  /**
   * Whether the event blocks time on the calendar. Optional. Possible values are:   - &quot;opaque&quot; - Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.  - &quot;transparent&quot; - The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI.
   */
  transparency?: string;
  /**
   * Last modification time of the event (as a RFC3339 timestamp). Read-only.
   */
  updated?: string;
  /**
   * Visibility of the event. Optional. Possible values are:   - &quot;default&quot; - Uses the default visibility for events on the calendar. This is the default value.  - &quot;public&quot; - The event is public and event details are visible to all readers of the calendar.  - &quot;private&quot; - The event is private and only event attendees may view event details.  - &quot;confidential&quot; - The event is private. This value is provided for compatibility reasons.
   */
  visibility?: string;
}

export interface Schema$EventAttachment {
  /**
   * ID of the attached file. Read-only. For Google Drive files, this is the ID of the corresponding Files resource entry in the Drive API.
   */
  fileId?: string;
  /**
   * URL link to the attachment. For adding Google Drive file attachments use the same format as in alternateLink property of the Files resource in the Drive API. Required when adding an attachment.
   */
  fileUrl?: string;
  /**
   * URL link to the attachment&#39;s icon. Read-only.
   */
  iconLink?: string;
  /**
   * Internet media type (MIME type) of the attachment.
   */
  mimeType?: string;
  /**
   * Attachment title.
   */
  title?: string;
}

export interface Schema$EventAttendee {
  /**
   * Number of additional guests. Optional. The default is 0.
   */
  additionalGuests?: number;
  /**
   * The attendee&#39;s response comment. Optional.
   */
  comment?: string;
  /**
   * The attendee&#39;s name, if available. Optional.
   */
  displayName?: string;
  /**
   * The attendee&#39;s email address, if available. This field must be present when adding an attendee. It must be a valid email address as per RFC5322. Required when adding an attendee.
   */
  email?: string;
  /**
   * The attendee&#39;s Profile ID, if available. It corresponds to the id field in the People collection of the Google+ API
   */
  id?: string;
  /**
   * Whether this is an optional attendee. Optional. The default is False.
   */
  optional?: boolean;
  /**
   * Whether the attendee is the organizer of the event. Read-only. The default is False.
   */
  organizer?: boolean;
  /**
   * Whether the attendee is a resource. Can only be set when the attendee is added to the event for the first time. Subsequent modifications are ignored. Optional. The default is False.
   */
  resource?: boolean;
  /**
   * The attendee&#39;s response status. Possible values are:   - &quot;needsAction&quot; - The attendee has not responded to the invitation.  - &quot;declined&quot; - The attendee has declined the invitation.  - &quot;tentative&quot; - The attendee has tentatively accepted the invitation.  - &quot;accepted&quot; - The attendee has accepted the invitation.
   */
  responseStatus?: string;
  /**
   * Whether this entry represents the calendar on which this copy of the event appears. Read-only. The default is False.
   */
  self?: boolean;
}

export interface Schema$EventDateTime {
  /**
   * The date, in the format &quot;yyyy-mm-dd&quot;, if this is an all-day event.
   */
  date?: string;
  /**
   * The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.
   */
  dateTime?: string;
  /**
   * The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. &quot;Europe/Zurich&quot;.) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.
   */
  timeZone?: string;
}

export interface Params$Resource$Events$List extends StandardParameters {
  /**
   * Auth client or API Key for the request
   */
  auth?: string;
  /**
   * Whether to always include a value in the email field for the organizer, creator and attendees, even if no real email is available (i.e. a generated, non-working value will be provided). The use of this option is discouraged and should only be used by clients which cannot handle the absence of an email address value in the mentioned places. Optional. The default is False.
   */
  alwaysIncludeEmail?: boolean;
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId?: string;
  /**
   * Specifies event ID in the iCalendar format to be included in the response. Optional.
   */
  iCalUID?: string;
  /**
   * The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional.
   */
  maxResults?: number;
  /**
   * The order of the events returned in the result. Optional. The default is an unspecified, stable order.
   */
  orderBy?: string;
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.
   */
  privateExtendedProperty?: string[];
  /**
   * Free text search terms to find events that match these terms in any field, except for extended properties. Optional.
   */
  q?: string;
  /**
   * Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.
   */
  sharedExtendedProperty?: string[];
  /**
   * Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Whether to include hidden invitations in the result. Optional. The default is False.
   */
  showHiddenInvitations?: boolean;
  /**
   * Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False.
   */
  singleEvents?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. All events deleted since the previous list request will always be in the result set and it is not allowed to set showDeleted to False. There are several query parameters that cannot be specified together with nextSyncToken to ensure consistency of the client state.  These are:  - iCalUID  - orderBy  - privateExtendedProperty  - q  - sharedExtendedProperty  - timeMin  - timeMax  - updatedMin If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken. Learn more about incremental synchronization. Optional. The default is to return all entries.
   */
  syncToken?: string;
  /**
   * Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.
   */
  timeMax?: string;
  /**
   * Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.
   */
  timeMin?: string;
  /**
   * Time zone used in the response. Optional. The default is the time zone of the calendar.
   */
  timeZone?: string;
  /**
   * Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time.
   */
  updatedMin?: string;
}

interface StandardParameters {
  /**
   * Data format for the response.
   */
  alt?: string;
  /**
   * Selector specifying which fields to include in a partial response.
   */
  fields?: string;
  /**
   * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
   */
  key?: string;
  /**
   * OAuth 2.0 token for the current user.
   */
  oauth_token?: string;
  /**
   * Returns response with indentations and line breaks.
   */
  prettyPrint?: boolean;
  /**
   * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
   */
  quotaUser?: string;
  /**
   * Deprecated. Please use quotaUser instead.
   */
  userIp?: string;
}
