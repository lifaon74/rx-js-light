type ComparisonResult = -1 | 0 | 1;

interface DisambiguationOptions {
  disambiguation: 'constrain' | 'balance' | 'reject';
}

interface ArithmeticOptions {
  disambiguation: 'constrain' | 'reject';
}

interface DifferenceOptions<T extends string> {
  largestUnit: T;
}

interface DurationLike {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  microseconds?: number;
  nanoseconds?: number;
}

interface Duration {

  readonly years: number;
  readonly months: number;
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;
  readonly microseconds: number;
  readonly nanoseconds: number;

  with(durationLike: DurationLike, options: DisambiguationOptions): Duration;

  plus(other: Duration, options: ArithmeticOptions): Duration;

  minus(other: Duration, options: ArithmeticOptions): Duration;

  getFields(): Required<DurationLike>;

  toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

  toJSON(): string;

  toString(): string;
}

interface DurationConstructor {
  from(item: Duration | string | object, options?: DisambiguationOptions): Duration;

  new(
    years?: number,
    months?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number,
    microseconds?: number,
    nanoseconds?: number,
  ): Duration;
}

// interface Absolute {
//   getEpochSeconds(): number;
//   getEpochMilliseconds(): number;
//   getEpochMicroseconds(): bigint;
//   getEpochNanoseconds(): bigint;
//   plus(temporalDurationLike: DurationLike): Absolute;
//   minus(temporalDurationLike: DurationLike): Absolute;
//   difference(
//     other: Absolute,
//     options?: DifferenceOptions<'days' | 'hours' | 'minutes' | 'seconds'>
//   ): Duration;
//   inTimeZone(temporalTimeZoneLike?: TimeZoneLike): DateTime;
//   toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
//   toJSON(): string;
//   toString(temporalTimeZoneLike?: TimeZoneLike): string;
// }
//
// interface AbsoluteConstructor {
//   fromEpochSeconds(epochSeconds: number): Absolute;
//   fromEpochMilliseconds(epochMilliseconds: number): Absolute;
//   fromEpochMicroseconds(epochMicroseconds: bigint): Absolute;
//   fromEpochNanoseconds(epochNanoseconds: bigint): Absolute;
//   from(item: Absolute | string | object): Absolute;
//   compare(one: Absolute, two: Absolute): 1 | -1 | 0;
//   new(epochNanoseconds: bigint): Absolute;
// }
//
// interface DateLike {
//   year?: number;
//   month?: number;
//   day?: number;
// }
//
// interface Date {
//   static from(item: Date | string | object, options?: DisambiguationOptions): Date;
//   static compare(one: Date, two: Date): ComparisonResult;
//   constructor(year: number, month: number, day: number);
//   readonly year: number;
//   readonly month: number;
//   readonly day: number;
//   readonly dayOfWeek: number;
//   readonly dayOfYear: number;
//   readonly weekOfYear: number;
//   readonly daysInYear: number;
//   readonly daysInMonth: number;
//   readonly isLeapYear: boolean;
//   with(temporalDateLike: DateLike, options?: DisambiguationOptions): Date;
//   plus(temporalDurationLike: DurationLike, options?: ArithmeticOptions): Date;
//   minus(temporalDurationLike: DurationLike, options?: ArithmeticOptions): Date;
//   difference(other: Date, options?: DifferenceOptions<'years' | 'months' | 'days'>): Duration;
//   withTime(temporalTime: Time): DateTime;
//   getYearMonth(): YearMonth;
//   getMonthDay(): MonthDay;
//   getFields(): Required<DateLike>;
//   toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
//   toJSON(): string;
//   toString(): string;
// }
//
// interface DateTimeLike {
//   year?: number;
//   month?: number;
//   day?: number;
//   hour?: number;
//   minute?: number;
//   second?: number;
//   millisecond?: number;
//   microsecond?: number;
//   nanosecond?: number;
// }

// interface DateTime {
//   static from(item: DateTime | string | object, options?: DisambiguationOptions): DateTime;
//   static compare(one: DateTime, two: DateTime): ComparisonResult;
//   constructor(
//     year: number,
//     month: number,
//     day: number,
//     hour?: number,
//     minute?: number,
//     second?: number,
//     millisecond?: number,
//     microsecond?: number,
//     nanosecond?: number
//   );
//   readonly year: number;
//   readonly month: number;
//   readonly day: number;
//   readonly hour: number;
//   readonly minute: number;
//   readonly second: number;
//   readonly millisecond: number;
//   readonly microsecond: number;
//   readonly nanosecond: number;
//   readonly dayOfWeek: number;
//   readonly dayOfYear: number;
//   readonly weekOfYear: number;
//   readonly daysInYear: number;
//   readonly daysInMonth: number;
//   readonly isLeapYear: boolean;
//   with(temporalDateTimeLike: DateTimeLike, options?: DisambiguationOptions): DateTime;
//   plus(temporalDurationLike: DurationLike, options?: ArithmeticOptions): DateTime;
//   minus(temporalDurationLike: DurationLike, options?: ArithmeticOptions): DateTime;
//   difference(
//     other: DateTime,
//     options?: DifferenceOptions<'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'>
//   ): Duration;
//   inTimeZone(temporalTimeZoneLike: TimeZoneLike, options?: DisambiguationOptions): Absolute;
//   getDate(): Date;
//   getYearMonth(): YearMonth;
//   getMonthDay(): MonthDay;
//   getTime(): Time;
//   getFields(): Required<DateTimeLike>;
//   toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
//   toJSON(): string;
//   toString(): string;
// }
//
// interface MonthDayLike {
//   month?: number;
//   day?: number;
// }
//
// interface MonthDay {
//   static from(item: MonthDay | string | object, options?: DisambiguationOptions): MonthDay;
//   static compare(one: MonthDay, two: MonthDay): ComparisonResult;
//   constructor(month: number, day: number);
//   readonly month: number;
//   readonly day: number;
//   with(temporalMonthDayLike: MonthDayLike, options?: DisambiguationOptions): MonthDay;
//   withYear(year: number): Date;
//   getFields(): Required<MonthDayLike>;
//   toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
//   toJSON(): string;
//   toString(): string;
// }
//
// interface TimeLike {
//   hour?: number;
//   minute?: number;
//   second?: number;
//   millisecond?: number;
//   microsecond?: number;
//   nanosecond?: number;
// }
//
// interface Time {
//   static from(item: Time | string | object, options?: DisambiguationOptions): Time;
//   static compare(one: Time, two: Time): ComparisonResult;
//   constructor(
//     hour?: number,
//     minute?: number,
//     second?: number,
//     millisecond?: number,
//     microsecond?: number,
//     nanosecond?: number
//   );
//   readonly hour: number;
//   readonly minute: number;
//   readonly second: number;
//   readonly millisecond: number;
//   readonly microsecond: number;
//   readonly nanosecond: number;
//   with(temporalTimeLike: TimeLike, options?: DisambiguationOptions): Time;
//   plus(temporalDurationLike: DurationLike, options?: ArithmeticOptions): Time;
//   minus(temporalDurationLike: DurationLike, options?: ArithmeticOptions): Time;
//   // TODO: might need to update based on #580
//   difference(other: Time, options?: DifferenceOptions<'hours' | 'minutes' | 'seconds'>): Duration;
//   withDate(temporalDate: Date): DateTime;
//   getFields(): Required<TimeLike>;
//   toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
//   toJSON(): string;
//   toString(): string;
// }
//
// type TimeZoneLike = TimeZone | string;
//
// interface TimeZone {
//   static from(timeZone: TimeZoneLike): TimeZone;
//   static [Symbol.iterator](): IteratorResult<TimeZone>;
//   constructor(timeZoneIdentifier: string);
//   readonly name: string;
//   getOffsetFor(absolute: Absolute): string;
//   getDateTimeFor(absolute: Absolute): DateTime;
//   getAbsoluteFor(dateTime: DateTime, options?: DisambiguationOptions): Absolute;
//   getTransitions(startingPoint: Absolute): IteratorResult<Absolute>;
//   toString(): string;
//   toJSON(): string;
// }
//
// interface YearMonthLike {
//   year?: number;
//   month?: number;
// }
//
// interface YearMonth {
//   static from(item: string | object, options?: DisambiguationOptions): YearMonth;
//   static compare(one: YearMonth, two: YearMonth): ComparisonResult;
//   constructor(year: number, month: number);
//   readonly year: number;
//   readonly month: number;
//   readonly daysInMonth: number;
//   readonly daysInYear: number;
//   readonly isLeapYear: boolean;
//   with(temporalYearMonthLike: YearMonthLike, options: DisambiguationOptions): YearMonth;
//   plus(temporalDurationLike: YearMonthLike, options: ArithmeticOptions): YearMonth;
//   minus(temporalDurationLike: DurationLike, options: ArithmeticOptions): YearMonth;
//   difference(other: YearMonth, options: DifferenceOptions<'years' | 'months'>): Duration;
//   withDay(day: number): Date;
//   getFields(): Required<YearMonthLike>;
//   toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
//   toJSON(): string;
//   toString(): string;
// }

// interface now {
//   function absolute(): Absolute;
//   function dateTime(temporalTimeZoneLike?: TimeZoneLike): DateTime;
//   function date(temporalTimeZoneLike?: TimeZoneLike): Date;
//   function time(temporalTimeZoneLike?: TimeZoneLike): Time;
//   function timeZone(): TimeZone;
// }

declare interface Temporal {
  Duration: DurationConstructor;
}

declare var Temporal: Temporal;

interface Window {
  Temporal: Temporal;
}
