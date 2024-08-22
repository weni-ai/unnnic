import { expect } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

export const jestImageSnapshotOptions = {
  customDiffConfig: { threshold: 0.1 },
  failureThreshold: 0.005,
  failureThresholdType: 'percent',
};
