/* SAHNE 1 — HANGİSİ DAHA OLASI? (0–10 s)  A spinner: which colour will it stop on?
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut, outBack, outCubic, clamp } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink, A = LI.Ang;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  /** the less likely | more likely board (10.6–92 s) */
  function board(ctx, env, t) {
    const L = KD.L(env), B = L.BD, f = F(), a = seg(t, 10.6, 11.4) * END(t); if (a <= 0) return;
    f.T(ctx, 'az olası', B.x[0], B.hy, { size: B.hs, alpha: a, p: seg(t, 10.6, 11.6) });
    f.T(ctx, 'çok olası', B.x[1], B.hy, Object.assign({ size: B.hs, alpha: a, p: seg(t, 11.2, 12.2) }, f.AMB));
    const mid = (B.x[0] + B.x[1]) / 2, y0 = B.hy + 38, y1 = B.y[3] + 40;
    Ink.path(ctx, [[B.x[0] - 170, y0], [B.x[1] + 170, y0]], { w: 4, p: seg(t, 11.4, 12.2), alpha: 0.8 * a, seed: 60, taper: [0.05, 0.05] });
    Ink.path(ctx, [[mid, y0 - 70], [mid, y1]], { w: 4, p: seg(t, 11.8, 12.6), alpha: 0.6 * a, seed: 61, taper: [0.05, 0.05] });
    // chips fly from the object into their column
    f.PAIRS.forEach((q, row) => {
      [0, 1].forEach((col) => {
        const t0 = q[2] + col * 0.7, k = inOut(seg(t, t0, t0 + 0.7)); if (k <= 0) return;
        const x = lerp(L.O.x, B.x[col], k), y = lerp(L.O.y, B.y[row], k) - 90 * Math.sin(Math.PI * k);
        f.T(ctx, q[col], x, y, Object.assign({ size: lerp(B.s * 1.2, B.s, k), alpha: a, halo: true }, col ? f.AMB : {}));
      });
    });
  }

  /** reason line under the object */
  function reason(ctx, env, t, s, t0, t1) {
    const L = KD.L(env), R = L.R, f = F(), a = seg(t, t0, t0 + 0.4) * (1 - seg(t, t1 - 0.5, t1)); if (a <= 0) return;
    f.T(ctx, s, R.x, R.y[0], Object.assign({ size: R.size, alpha: a, p: seg(t, t0, t0 + 1.2), halo: true }, f.AMB));
  }

  /** 1. the spinner (3.4–30 s) */
  function spinner(ctx, env, t) {
    const L = KD.L(env), O = L.O, f = F(), a = seg(t, 3.4, 4.0) * (1 - seg(t, 29.4, 30.0)); if (a <= 0) return;
    const C = [O.x, O.y], r = O.r;
    A.wedge(ctx, C, r, 0, 270, 0.55 * a);                       // amber: 3/4
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.75 * a})`;           // ink: 1/4
    ctx.beginPath(); ctx.moveTo(C[0], C[1]); ctx.arc(C[0], C[1], r, 0, Math.PI / 2); ctx.closePath(); ctx.fill();
    const ring = []; for (let k = 0; k <= 72; k++) ring.push(A.at(C, k * 5, r));
    Ink.path(ctx, ring, { w: 7, p: seg(t, 3.4, 4.6), alpha: a, seed: 70, taper: [0, 0] });
    [0, 270].forEach((d, i) => Ink.path(ctx, [C, A.at(C, d, r)], { w: 5, alpha: a * seg(t, 4.4, 4.8), seed: 72 + i, taper: [0, 0] }));
    // pointer angle
    let ang = 100;
    f.SPINS.forEach((res, i) => {
      const s0 = f.spinT(i), prev = i ? f.FINAL[i - 1] : 100;
      if (t >= s0) ang = t >= s0 + 1.0 ? f.FINAL[i] : lerp(prev, f.FINAL[i] + 1080, outCubic(seg(t, s0, s0 + 1.0)));
    });
    const tip = A.at(C, ang, r * 0.82);
    Ink.path(ctx, [C, tip], { w: 9, alpha: a, seed: 75, taper: [0, 0.6] });
    Ink.path(ctx, [A.at(tip, ang + 150, 26), tip, A.at(tip, ang - 150, 26)], { w: 7, alpha: a, seed: 76, taper: [0, 0] });
    ctx.fillStyle = `rgba(${LI.INK_RGB},${a})`; ctx.beginPath(); ctx.arc(C[0], C[1], 12, 0, Math.PI * 2); ctx.fill();
    // results row
    f.SPINS.forEach((res, i) => {
      const k = seg(t, f.spinT(i) + 1.0, f.spinT(i) + 1.25); if (k <= 0) return;
      const x = O.x + (i - 3.5) * (O.rs * 1.6), y = O.res, rr = O.rs * 0.5 * outBack(k);
      ctx.fillStyle = res ? `rgba(${LI.AMBER_RGB},${0.95 * a})` : `rgba(${LI.INK_RGB},${0.85 * a})`;
      ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.8 * a})`; ctx.lineWidth = 2.5; ctx.stroke();
    });
    reason(ctx, env, t, 'amber bölge daha büyük', 25.2, 30.0);
  }

  /** 2. a bag of 6: 5 amber, 1 black (30.4–48 s) */
  function bag6(ctx, env, t) {
    const L = KD.L(env), O = L.O, f = F(), a = seg(t, 30.4, 31.0) * (1 - seg(t, 47.4, 48.0)); if (a <= 0) return;
    f.bag(ctx, O.x, O.y, O.s, 5, a, seg(t, 30.4, 31.4), (i) => seg(t, 31.2 + i * 0.15, 31.6 + i * 0.15), 6);
    // rings: the lonely black ball, then the five amber ones
    const r = 20 * O.s, h = 150 * O.s, cy = (dy) => O.y + h * 0.12 + dy * r * 2.3, cx = (dx) => O.x + dx * 0.9 * r * 2.3;
    const pos = [[-1, -0.5], [0, -0.5], [1, -0.5], [-1, 0.5], [0, 0.5], [1, 0.5]];
    const k1 = seg(t, 35.6, 36.4) * a, k2 = seg(t, 37.6, 38.6) * a;
    if (k1 > 0) { const [dx, dy] = pos[5]; A.arc(ctx, [cx(dx), cy(dy)], r * 1.5, 90, 90 + 360 * seg(t, 35.6, 36.4), { alpha: k1, w: 5, seed: 90 }); ctx.save(); ctx.restore(); }
    if (k2 > 0) pos.slice(0, 5).forEach(([dx, dy], i) => A.arc(ctx, [cx(dx), cy(dy)], r * 1.35, 90, 90 + 360 * seg(t, 37.6 + i * 0.1, 38.2 + i * 0.1), { alpha: k2, w: 4, seed: 91 + i }));
    reason(ctx, env, t, '6 toptan 5’i amber, 1’i siyah', 39.0, 48.0);
  }

  /** 3. a die: 6 against "less than 6" (48.4–66 s) */
  function die(ctx, env, t) {
    const L = KD.L(env), O = L.O, f = F(), a = seg(t, 48.4, 49.0) * (1 - seg(t, 65.4, 66.0)); if (a <= 0) return;
    const c = O.cell, side = c * 0.8;
    for (let n = 1; n <= 6; n++) {
      const i = (n - 1) % 3, j = Math.floor((n - 1) / 3), x = O.x + (i - 1) * c, y = O.y + (j - 0.5) * c;
      const k = seg(t, 48.6 + n * 0.12, 49.0 + n * 0.12) * a; if (k <= 0) continue;
      const fillA = n < 6 ? seg(t, 54.6 + n * 0.12, 55.0 + n * 0.12) : 0;
      if (fillA > 0) { ctx.fillStyle = `rgba(${LI.AMBER_RGB},${0.45 * fillA * a})`; ctx.fillRect(x - side / 2, y - side / 2, side, side); }
      Ink.path(ctx, [[x - side / 2, y - side / 2], [x + side / 2, y - side / 2], [x + side / 2, y + side / 2], [x - side / 2, y + side / 2], [x - side / 2, y - side / 2]], { w: 5, alpha: k, seed: 100 + n, taper: [0, 0], wob: 0.2 });
      f.T(ctx, String(n), x, y + 4, { size: c * 0.46, alpha: k });
      if (n === 6) { const q = seg(t, 52.4, 53.2) * a; if (q > 0) A.arc(ctx, [x, y], side * 0.72, 90, 90 + 360 * seg(t, 52.4, 53.2), { alpha: q, w: 5, seed: 110 }); }
    }
    const top = O.y - c - 10;
    const l1 = seg(t, 52.8, 53.4) * a, l2 = seg(t, 55.4, 56.0) * a;
    if (l1 > 0) f.T(ctx, '6: 1 durum', O.x + c, O.y + c * 0.5 + side * 0.72 + 34, { size: c * 0.3, alpha: l1, halo: true });
    if (l2 > 0) f.T(ctx, '6’dan küçük: 5 durum', O.x, top - 10, Object.assign({ size: c * 0.3, alpha: l2 }, f.AMB));
    reason(ctx, env, t, '5 durum, 1 durumdan fazla', 57.0, 66.0);
  }

  /** 4. months: what we already know (66.4–80 s) */
  function months(ctx, env, t) {
    const L = KD.L(env), O = L.O, f = F(), a = seg(t, 66.4, 67.0) * (1 - seg(t, 79.4, 80.0)); if (a <= 0) return;
    const c = O.cell, w = c * 1.35, h = c * 1.6;
    [['Ocak', -1], ['Temmuz', 1]].forEach(([name, sgn], i) => {
      const x = O.x + sgn * c * 0.85, y = O.y, k = seg(t, 66.6 + i * 0.5, 67.4 + i * 0.5) * a; if (k <= 0) return;
      Ink.path(ctx, [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2], [x - w / 2, y - h / 2]], { w: 5, p: k, alpha: a, seed: 120 + i, taper: [0, 0], wob: 0.2 });
      Ink.path(ctx, [[x - w / 2, y - h / 2 + c * 0.42], [x + w / 2, y - h / 2 + c * 0.42]], { w: 4, alpha: k, seed: 124 + i, taper: [0, 0] });
      f.T(ctx, name, x, y - h / 2 + c * 0.22, { size: c * 0.3, alpha: k });
      const ic = [x, y + c * 0.22], R = c * 0.3, g = seg(t, 67.6 + i * 0.5, 68.4 + i * 0.5) * a;
      if (g <= 0) return;
      if (i === 0) {           // snowflake
        [0, 60, 120].forEach((d, m) => {
          Ink.path(ctx, [A.at(ic, d, R), A.at(ic, d + 180, R)], { w: 4, alpha: g, seed: 130 + m, taper: [0, 0] });
          [d, d + 180].forEach((e, n) => { const P = A.at(ic, e, R * 0.62); Ink.path(ctx, [A.at(P, e + 40, R * 0.3), P, A.at(P, e - 40, R * 0.3)], { w: 3, alpha: g, seed: 140 + m * 2 + n, taper: [0, 0] }); });
        });
      } else {                 // sun
        A.wedge(ctx, ic, R * 0.55, 0, 360, 0.7 * g);
        for (let m = 0; m < 8; m++) Ink.path(ctx, [A.at(ic, m * 45, R * 0.75), A.at(ic, m * 45, R)], { w: 4, color: LI.AMBER_RGB, alpha: g, seed: 150 + m, taper: [0, 0] });
      }
    });
    reason(ctx, env, t, 'Ocak kış, Temmuz yaz', 71.6, 80.0);
  }

  /** the rule (80–92 s) */
  function rule(ctx, env, t) {
    const L = KD.L(env), S = L.ST, f = F(); if (t < 80.2) return;
    const a = END(t);
    [['daha büyük pay,', 0], ['daha çok durum:', 0], ['daha çok olası', 1]].forEach(([s, amb], k) =>
      f.T(ctx, s, S.x, S.y[k], Object.assign({ size: S.s[k], p: seg(t, 80.4 + k * 1.2, 81.6 + k * 1.2), alpha: a, halo: true }, amb ? f.AMB : {})));
  }

  function intro(ctx, env, t) {
    const L = KD.L(env), B = L.BD, f = F(), i = seg(t, 5.0, 5.6) * (1 - seg(t, 9.8, 10.4)); if (i <= 0) return;
    const x = env.V ? 0 : (B.x[0] + B.x[1]) / 2, y = env.V ? -200 : -150;
    f.T(ctx, 'Hangisi', x, y, { size: env.V ? 70 : 84, alpha: i, p: seg(t, 5.0, 6.0) });
    f.T(ctx, 'daha olası?', x, y + (env.V ? 90 : 110), Object.assign({ size: env.V ? 70 : 84, alpha: i, p: seg(t, 5.8, 6.8) }, f.AMB));
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { spinner(ctx, env, t); bag6(ctx, env, t); die(ctx, env, t); months(ctx, env, t); rule(ctx, env, t); intro(ctx, env, t); board(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Which is more likely?', nameTr: 'Hangisi daha olası?', concept: 'A spinner', conceptTr: 'Bir çark', render });
})(window.LI = window.LI || {});
