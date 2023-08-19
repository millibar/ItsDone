import {
  elapsedString,
  toLocaleDateOrTimeString,
  toDateString,
} from '../calcElapsedTime';

test.each`
  condition              | fromUTC                                    | toUTC                                         | expected
  ${'同時刻'}            | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 0, 0, 0).getTime()}    | ${'right now'}
  ${'1分未満'}           | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 0, 0, 59).getTime()}   | ${'right now'}
  ${'1分30秒'}           | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 0, 1, 30).getTime()}   | ${'1 minute'}
  ${'2分11秒'}           | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 0, 2, 11).getTime()}   | ${'2 minutes'}
  ${'59分'}              | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 0, 59, 0).getTime()}   | ${'59 minutes'}
  ${'1時間5分59秒'}      | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 1, 5, 59).getTime()}   | ${'1 hour'}
  ${'1時間6分'}          | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 1, 6, 0).getTime()}    | ${'1.1 hours'}
  ${'3時間45分'}         | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 3, 45, 0).getTime()}   | ${'3.8 hours'}
  ${'23時間59分59秒'}    | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 1, 23, 59, 59).getTime()} | ${'24 hours'}
  ${'1日'}               | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 2, 0, 0, 0).getTime()}    | ${'1 day'}
  ${'1日23時間59分59秒'} | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 2, 23, 59, 59).getTime()} | ${'1 day'}
  ${'2日'}               | ${new Date(2023, 8, 1, 0, 0, 0).getTime()} | ${new Date(2023, 8, 3, 0, 0, 0).getTime()}    | ${'2 days'}
`('$conditionのとき、$expected', ({ fromUTC, toUTC, expected }) => {
  expect(elapsedString(fromUTC, toUTC)).toBe(expected);
});

test('同じ日付は始点の時刻をhh:mmで返す', () => {
  const fromUTC = 1692289434000; // JST 2023/08/18 01:23:54, UTC 2023/08/17 16:23:54
  const toUTC = 1692325434000; // JST 2023/08/18 11:23:54, UTC 2023/08/18 02:23:54
  expect(toLocaleDateOrTimeString(fromUTC, toUTC, ['ja-JP'])).toBe('1:23');
});

test('異なる日付は始点の日付をyyyy/mm/ddで返す', () => {
  const fromUTC = 1692275034000; // JST 2023/08/17 21:23:54, UTC 2023/08/17 12:23:54
  const toUTC = 1692289434000; // JST 2023/08/18 01:23:54, UTC 2023/08/17 16:23:54
  expect(toLocaleDateOrTimeString(fromUTC, toUTC, ['ja-JP'])).toBe('2023/8/17');
});

test('日付フォーマット', () => {
  expect(toDateString(new Date(2023, 7, 18, 1, 0, 0), ['ja-JP'])).toBe(
    '2023年8月18日'
  );
});
