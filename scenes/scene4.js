/* SAHNE 4 — ZAR (48–66 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 48, end: 66, name: 'The die', nameTr: 'Zar', concept: '5 outcomes vs 1 outcome', conceptTr: '5 durum, 1 duruma karşı', render });
})(window.LI = window.LI || {});
