import { describe, expect, it } from 'vitest';
import { ActorMovement } from '../../src/navigation/ActorMovement';

describe('actor movement', () => {
  it('is frame-rate independent and stops exactly at the destination', () => {
    const oneStep = new ActorMovement({ x: 0, y: 0 }, 10);
    oneStep.moveTo({ x: 10, y: 0 });
    oneStep.update(1);

    const twoSteps = new ActorMovement({ x: 0, y: 0 }, 10);
    twoSteps.moveTo({ x: 10, y: 0 });
    twoSteps.update(0.4);
    twoSteps.update(0.6);

    expect(oneStep.position).toEqual({ x: 10, y: 0 });
    expect(twoSteps.position).toEqual({ x: 10, y: 0 });
  });
});
