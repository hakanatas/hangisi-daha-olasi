/* SAHNE 3 — TORBA (30–48 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 30, end: 48, name: 'The bag', nameTr: 'Torba', concept: '5 amber, 1 black', conceptTr: '5 amber, 1 siyah', render });
})(window.LI = window.LI || {});
