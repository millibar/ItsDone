/**
 * 始点から終点までが現地時刻で同じ日付なら始点の時刻（hh:mm）の文字列を返す。
 * 異なる日付なら始点の日付（yyyy/mm/dd）の文字列を返す
 */
export const toLocaleDateOrTimeString = (
  fromUTC: number,
  toUTC: number,
  locales: string[]
): string => {
  const fromDate = new Date(fromUTC);
  const toDate = new Date(toUTC);

  const isSameDate =
    fromDate.toLocaleDateString() === toDate.toLocaleDateString();

  const options: object = isSameDate
    ? {
        hour: 'numeric',
        minute: 'numeric',
      }
    : {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };

  return Intl.DateTimeFormat(locales, options).format(fromDate);
};

/**
 * 始点から終点までの経過時間に応じた文字列を返す
 * 1分未満： right now
 * 3時間45分： 3.8 hours
 * 5日： 5 days
 */
export const elapsedString = (fromUTC: number, toUTC: number): string => {
  const diff_s = (toUTC - fromUTC) / 1000;

  if (diff_s < 60) return 'right now';

  if (diff_s < 120) return '1 minute';

  if (diff_s < 3600) return `${Math.floor(diff_s / 60)} minutes`;

  if (diff_s < 3960) return '1 hour';

  if (diff_s < 3600 * 24)
    return `${Math.round((diff_s / 3600) * 10) / 10} hours`;

  if (diff_s < 3600 * 24 * 2) return '1 day';

  return `${Math.floor(diff_s / (3600 * 24))} days`;
};

/**
 * 日付を現地時間の文字列に変換する
 * toDateString(new Date(2023, 7, 18, 1, 0, 0), ['ja-JP']) => '2023年8月18日'
 */
export const toDateString = (date: Date, locales: string[]): string => {
  return Intl.DateTimeFormat(locales, {
    dateStyle: 'long',
  }).format(date);
};
