import {secondsToHms} from '../app/util/util';

test('Display 3600s as 1 hr', () => {
    expect(secondsToHms(3600)).toBe("1 hr");
});

test('Display 3660s as 1 hr, 1 min', () => {
    expect(secondsToHms(3660)).toBe("1 hr, 1 min");
});

test('Display 5400s as 1 hr, 30 mins', () => {
    expect(secondsToHms(5400)).toBe("1 hr, 30 mins");
});

test('Display 7200s as 2 hrs', () => {
    expect(secondsToHms(7200)).toBe("2 hrs");
});
