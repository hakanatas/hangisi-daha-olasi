/* Shared layout + Nokta helpers for "Hangisi Daha Olası?". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          O: { x: 0, y: -570, r: 185, s: 1.75, cell: 135, res: -345, rs: 30 },
          R: { x: 0, y: [-280], size: 46 },
          BD: { x: [-235, 235], hy: -180, y: [-90, -10, 70, 150], hs: 56, s: 42 },
          ST: { x: 0, y: [-680, -590, -500], s: [60, 60, 60] },
          nx: -360, gy: 560, s: 1.15 }
        : {
          O: { x: -260, y: -80, r: 200, s: 2.1, cell: 150, res: 172, rs: 32 },
          R: { x: -260, y: [260], size: 52 },
          BD: { x: [270, 660], hy: -400, y: [-295, -195, -95, 5], hs: 66, s: 48 },
          ST: { x: -260, y: [-200, -110, -20], s: [58, 58, 58] },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
