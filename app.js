const figurePresets = [
  {
    id: 'pulse',
    name: 'Pulse Runner',
    description: 'High-contrast athletic build',
    primary: '#F9FBFF',
    accent: '#61E9FF',
    face: 'focus',
    action: 'run',
    glow: true,
    shadow: true,
    accessory: false,
    speed: 1.35,
    scale: 1.08,
    thickness: 6,
    background: 'dusk'
  },
  {
    id: 'graffiti',
    name: 'Graffiti Echo',
    description: 'Vibrant street look',
    primary: '#FFEFF9',
    accent: '#FF61D8',
    face: 'joy',
    action: 'walk',
    glow: true,
    shadow: true,
    accessory: true,
    speed: 1,
    scale: 1,
    thickness: 7,
    background: 'grid'
  },
  {
    id: 'scout',
    name: 'Midnight Scout',
    description: 'Stealth matte rig',
    primary: '#C8D2FF',
    accent: '#7C60FF',
    face: 'focus',
    action: 'express',
    glow: false,
    shadow: true,
    accessory: false,
    speed: 0.85,
    scale: 0.9,
    thickness: 5,
    background: 'void'
  },
  {
    id: 'ember',
    name: 'Ember Screamer',
    description: 'Loud festival energy',
    primary: '#FFF4E3',
    accent: '#FF7A61',
    face: 'rage',
    action: 'scream',
    glow: true,
    shadow: true,
    accessory: true,
    speed: 1.1,
    scale: 1.2,
    thickness: 6,
    background: 'paper'
  },
  {
    id: 'neon',
    name: 'Neon Phantom',
    description: 'Electric sprint silhouette',
    primary: '#E9FBFF',
    accent: '#00F5FF',
    face: 'shock',
    action: 'slide',
    glow: true,
    shadow: false,
    accessory: false,
    speed: 1.4,
    scale: 1.05,
    thickness: 5,
    background: 'void'
  },
  {
    id: 'mech',
    name: 'Mecha Wireframe',
    description: 'Robotic punch rig',
    primary: '#D6E2FF',
    accent: '#2AFFB9',
    face: 'focus',
    action: 'punch',
    glow: false,
    shadow: true,
    accessory: true,
    speed: 0.95,
    scale: 1.15,
    thickness: 8,
    background: 'grid'
  },
  {
    id: 'luxe',
    name: 'Luxe Performer',
    description: 'Stage-ready groove',
    primary: '#FFF8F0',
    accent: '#F973FF',
    face: 'joy',
    action: 'groove',
    glow: true,
    shadow: true,
    accessory: true,
    speed: 0.9,
    scale: 1,
    thickness: 6,
    background: 'dusk'
  }
];

const expressionVariants = [
  {
    id: 'focus',
    label: 'Focused Calm',
    eyes: { shape: 'soft', open: 0.6, tilt: 0.05 },
    mouth: { shape: 'flat', open: 0.2 },
    brow: { lift: 0.1, angle: 0.05 }
  },
  {
    id: 'joy',
    label: 'Joyful Burst',
    eyes: { shape: 'arc', open: 0.5, tilt: -0.15 },
    mouth: { shape: 'smile', open: 0.45 },
    brow: { lift: -0.1, angle: -0.08 }
  },
  {
    id: 'rage',
    label: 'Battle Cry',
    eyes: { shape: 'slash', open: 0.35, tilt: 0.25 },
    mouth: { shape: 'open', open: 0.9 },
    brow: { lift: 0.25, angle: 0.2 }
  },
  {
    id: 'shock',
    label: 'Shockwave',
    eyes: { shape: 'wide', open: 1, tilt: 0 },
    mouth: { shape: 'oval', open: 0.85 },
    brow: { lift: 0.4, angle: 0 }
  }
];

const TAU = Math.PI * 2;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const clampAngle = (angle) => {
  let result = angle;
  while (result > 180) result -= 360;
  while (result < -180) result += 360;
  return result;
};
const degToRad = (deg) => (deg * Math.PI) / 180;

const actionTemplates = [
  {
    id: 'walk',
    label: 'Walk Cycle',
    description: 'Balanced go-to gait',
    duration: 1600,
    solver: (progress, state) => {
      const t = progress * TAU;
      const swing = Math.sin(t);
      const offset = Math.sin(t + Math.PI);
      return {
        energy: 0.55,
        bounce: Math.sin(t * 2) * 6 * state.scale,
        hipShift: swing * 3,
        torsoLean: swing * 0.08,
        headTilt: Math.sin(t * 0.5) * 0.05,
        mouthOpen: 0.25 + Math.abs(swing) * 0.08,
        limbs: {
          leftLeg: { phase: swing, lift: Math.max(0, swing) },
          rightLeg: { phase: offset, lift: Math.max(0, offset) },
          leftArm: { phase: offset * 0.9, lift: 0.4 + Math.max(0, offset) * 0.4 },
          rightArm: { phase: swing * 0.9, lift: 0.4 + Math.max(0, swing) * 0.4 }
        }
      };
    }
  },
  {
    id: 'run',
    label: 'Run + Leap',
    description: 'Athletic sprint loop',
    duration: 1000,
    solver: (progress, state) => {
      const t = progress * TAU;
      const swing = Math.sin(t);
      const offset = Math.sin(t + Math.PI);
      return {
        energy: 0.92,
        bounce: Math.sin(t * 2) * 12 * state.scale,
        hipShift: swing * 6,
        torsoLean: -0.2 + swing * 0.05,
        headTilt: -0.05,
        mouthOpen: 0.35 + Math.abs(swing) * 0.1,
        limbs: {
          leftLeg: { phase: swing * 1.2, lift: 0.2 + Math.max(0, swing) },
          rightLeg: { phase: offset * 1.2, lift: 0.2 + Math.max(0, offset) },
          leftArm: { phase: offset * 1.1, lift: 0.6 + Math.max(0, -offset) * 0.3, reach: 1.2 },
          rightArm: { phase: swing * 1.1, lift: 0.6 + Math.max(0, -swing) * 0.3, reach: 1.2 }
        }
      };
    }
  },
  {
    id: 'scream',
    label: 'Scream & Tremor',
    description: 'Arms overhead shout',
    duration: 1100,
    solver: (progress, state) => {
      const tremor = Math.sin(progress * TAU * 3) * 0.2;
      return {
        energy: 0.5,
        bounce: Math.sin(progress * TAU * 2) * 4 * state.scale,
        hipShift: 0,
        torsoLean: -0.18 + tremor * 0.1,
        headTilt: -0.08 + tremor * 0.05,
        mouthOpen: 1,
        limbs: {
          leftLeg: { phase: -0.2, lift: 0.1 + Math.max(0, tremor) * 0.2 },
          rightLeg: { phase: 0.2, lift: 0.15 + Math.max(0, -tremor) * 0.2 },
          leftArm: { phase: -0.25, lift: 1.3, reach: 0.8 },
          rightArm: { phase: 0.25, lift: 1.4, reach: 0.8 }
        },
        expressionBoost: 0.3
      };
    }
  },
  {
    id: 'express',
    label: 'Expression Pulse',
    description: 'Subtle acting beats',
    duration: 1800,
    solver: (progress, state) => {
      const t = progress * TAU;
      const sway = Math.sin(t) * 0.3;
      return {
        energy: 0.35,
        bounce: Math.sin(t * 2) * 3 * state.scale,
        hipShift: sway * 4,
        torsoLean: sway * 0.1,
        headTilt: Math.sin(t * 1.5) * 0.12,
        mouthOpen: 0.3 + (Math.sin(t * 1.5) + 1) * 0.2,
        limbs: {
          leftLeg: { phase: sway * 0.6, lift: 0.2 + Math.max(0, Math.sin(t + 0.5)) * 0.3 },
          rightLeg: { phase: -sway * 0.6, lift: 0.2 + Math.max(0, Math.sin(t + Math.PI)) * 0.3 },
          leftArm: { phase: -sway * 1.2, lift: 0.5 + Math.sin(t * 2) * 0.3 },
          rightArm: { phase: sway * 1.2, lift: 0.4 + Math.sin(t * 2 + 0.5) * 0.3 }
        },
        expressionBoost: 0.2
      };
    }
  },
  {
    id: 'jack',
    label: 'Jumping Jack Burst',
    description: 'Arms + legs star-out rhythm',
    duration: 1200,
    solver: (progress, state) => {
      const t = progress * TAU;
      const spread = (Math.sin(t) + 1) / 2;
      const lift = Math.sin(t * 2);
      return {
        energy: 0.78,
        bounce: lift * 10 * state.scale,
        hipShift: 0,
        torsoLean: 0.02,
        headTilt: Math.sin(t) * 0.05,
        mouthOpen: 0.4 + spread * 0.2,
        limbs: {
          leftLeg: { phase: -spread, lift: spread * 1.1 },
          rightLeg: { phase: spread, lift: spread * 1.1 },
          leftArm: { phase: spread, lift: 1.2, reach: 1.3 },
          rightArm: { phase: -spread, lift: 1.2, reach: 1.3 }
        },
        expressionBoost: 0.15
      };
    }
  },
  {
    id: 'sneak',
    label: 'Stealth Sneak',
    description: 'Low center, offset shoulders',
    duration: 1900,
    solver: (progress, state) => {
      const t = progress * TAU;
      const sway = Math.sin(t) * 0.5;
      const crouch = 0.3 + (Math.cos(t) + 1) * 0.15;
      return {
        energy: 0.4,
        bounce: -crouch * 12 * state.scale,
        hipShift: sway * 5,
        torsoLean: 0.25 + sway * 0.05,
        headTilt: -0.15,
        mouthOpen: 0.2,
        limbs: {
          leftLeg: { phase: sway * 0.8, lift: 0.2 + crouch },
          rightLeg: { phase: -sway * 0.8, lift: 0.25 + crouch * 0.5 },
          leftArm: { phase: -0.4 + sway * 0.5, lift: 0.3 },
          rightArm: { phase: 0.4 - sway * 0.5, lift: 0.5, reach: 0.7 }
        }
      };
    }
  },
  {
    id: 'hero',
    label: 'Power-Up Roar',
    description: 'Charge, pulse, release',
    duration: 1500,
    solver: (progress, state) => {
      const t = progress * TAU;
      const charge = Math.sin(t * 0.5);
      const surge = Math.max(0, Math.sin(t + Math.PI / 2));
      return {
        energy: 0.85,
        bounce: surge * 8 * state.scale,
        hipShift: 0,
        torsoLean: -0.25 + charge * 0.1,
        headTilt: -0.1 + surge * 0.05,
        mouthOpen: 0.6 + surge * 0.4,
        limbs: {
          leftLeg: { phase: -0.2, lift: 0.3 + surge * 0.2 },
          rightLeg: { phase: 0.2, lift: 0.35 + surge * 0.2 },
          leftArm: { phase: -surge, lift: 1 + surge * 0.5, reach: 0.9 },
          rightArm: { phase: surge, lift: 1.1 + surge * 0.4, reach: 0.9 }
        },
        expressionBoost: 0.35
      };
    }
  },
  {
    id: 'slide',
    label: 'Slide Dash',
    description: 'Low drift with trailing arm',
    duration: 1200,
    solver: (progress, state) => {
      const t = progress * TAU;
      const glide = (Math.sin(t) + 1) / 2;
      const crouch = 0.4 + glide * 0.2;
      return {
        energy: 0.7,
        bounce: -crouch * 8 * state.scale,
        hipShift: glide * 12,
        torsoLean: 0.35,
        headTilt: -0.12,
        mouthOpen: 0.25,
        limbs: {
          leftLeg: { phase: -0.2, lift: 0.3 + glide * 0.2 },
          rightLeg: { phase: 0.4, lift: 0.1 },
          leftArm: { phase: -0.6, lift: 0.4, reach: 0.9 },
          rightArm: { phase: 0.8, lift: 0.7, reach: 1.4 }
        }
      };
    }
  },
  {
    id: 'punch',
    label: 'Combo Punch',
    description: 'Jab-cross rebound',
    duration: 1000,
    solver: (progress, state) => {
      const t = progress * TAU;
      const punch = Math.sin(t * 2);
      const lean = Math.sin(t + Math.PI / 4) * 0.15;
      return {
        energy: 0.88,
        bounce: Math.sin(t * 2) * 4 * state.scale,
        hipShift: punch * 3,
        torsoLean: lean,
        headTilt: -0.05 + punch * 0.02,
        mouthOpen: 0.3 + Math.max(0, punch) * 0.1,
        limbs: {
          leftLeg: { phase: -0.2, lift: 0.25 + Math.max(0, -punch) * 0.2 },
          rightLeg: { phase: 0.2, lift: 0.25 + Math.max(0, punch) * 0.2 },
          leftArm: { phase: -punch * 0.8, lift: 0.4 + Math.max(0, -punch) * 0.5, reach: 1 },
          rightArm: { phase: punch * 1.4, lift: 0.5 + Math.max(0, punch) * 0.7, reach: 1.4 }
        },
        expressionBoost: 0.25
      };
    }
  },
  {
    id: 'groove',
    label: 'Groove Wave',
    description: 'Body rolls + snaps',
    duration: 1800,
    solver: (progress, state) => {
      const t = progress * TAU;
      const wave = Math.sin(t);
      const snap = Math.sin(t * 3);
      return {
        energy: 0.6,
        bounce: Math.sin(t * 2) * 6 * state.scale,
        hipShift: wave * 8,
        torsoLean: -0.05 + wave * 0.2,
        headTilt: wave * 0.12,
        mouthOpen: 0.35 + (snap + 1) * 0.15,
        limbs: {
          leftLeg: { phase: wave * 0.4, lift: 0.2 + Math.max(0, snap) * 0.2 },
          rightLeg: { phase: -wave * 0.4, lift: 0.2 + Math.max(0, -snap) * 0.2 },
          leftArm: { phase: -wave * 1.3, lift: 0.5 + snap * 0.2, reach: 0.9 },
          rightArm: { phase: wave * 1.3, lift: 0.5 - snap * 0.2, reach: 0.9 }
        },
        expressionBoost: 0.18
      };
    }
  }
];

const actionMap = Object.fromEntries(actionTemplates.map((a) => [a.id, a]));
const expressionMap = Object.fromEntries(expressionVariants.map((exp) => [exp.id, exp]));
const figureMap = Object.fromEntries(figurePresets.map((fig) => [fig.id, fig]));

function createOverlayDefaults() {
  return {
    enabled: false,
    name: '',
    src: '',
    image: null,
    base: {
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      opacity: 1,
      rotation: 0
    },
    animator: {
      enabled: false,
      frames: {},
      frameCount: 48,
      currentFrame: 0,
      playhead: 0,
      playing: false,
      liveFrame: null,
      ease: 'linear'
    }
  };
}

const elements = {
  stage: document.getElementById('stage'),
  tabButtons: Array.from(document.querySelectorAll('.tab-button')),
  tabPanels: Array.from(document.querySelectorAll('.tab-panel')),
  figureSelect: document.getElementById('figureSelect'),
  actionSelect: document.getElementById('actionSelect'),
  faceSelect: document.getElementById('faceSelect'),
  primaryColor: document.getElementById('primaryColor'),
  accentColor: document.getElementById('accentColor'),
  speedRange: document.getElementById('speedRange'),
  speedValue: document.getElementById('speedValue'),
  sizeRange: document.getElementById('sizeRange'),
  sizeValue: document.getElementById('sizeValue'),
  thicknessRange: document.getElementById('thicknessRange'),
  thicknessValue: document.getElementById('thicknessValue'),
  toggleGlow: document.getElementById('toggleGlow'),
  toggleShadow: document.getElementById('toggleShadow'),
  toggleAccessory: document.getElementById('toggleAccessory'),
  bgSelect: document.getElementById('bgSelect'),
  resetBtn: document.getElementById('resetScene'),
  exportBtn: document.getElementById('exportSequence'),
  playhead: document.getElementById('playhead'),
  statusChip: document.getElementById('statusChip'),
  customModeToggle: document.getElementById('customModeToggle'),
  frameScrubber: document.getElementById('frameScrubber'),
  frameLabel: document.getElementById('frameLabel'),
  keyframeStatus: document.getElementById('keyframeStatus'),
  captureFrame: document.getElementById('captureFrame'),
  clearFrame: document.getElementById('clearFrame'),
  playCustom: document.getElementById('playCustom'),
  stopCustom: document.getElementById('stopCustom'),
  overlayInput: document.getElementById('overlayInput'),
  clearOverlay: document.getElementById('clearOverlay'),
  overlayScale: document.getElementById('overlayScale'),
  overlayScaleValue: document.getElementById('overlayScaleValue'),
  overlayPosX: document.getElementById('overlayPosX'),
  overlayPosY: document.getElementById('overlayPosY'),
  overlayOpacity: document.getElementById('overlayOpacity'),
  overlayOpacityValue: document.getElementById('overlayOpacityValue'),
  overlayName: document.getElementById('overlayName'),
  overlayRotation: document.getElementById('overlayRotation'),
  overlayRotationValue: document.getElementById('overlayRotationValue'),
  overlayEaseSelect: document.getElementById('overlayEaseSelect'),
  overlayAnimToggle: document.getElementById('overlayAnimToggle'),
  overlayFrameScrubber: document.getElementById('overlayFrameScrubber'),
  overlayFrameLabel: document.getElementById('overlayFrameLabel'),
  overlayKeyStatus: document.getElementById('overlayKeyStatus'),
  overlayCapture: document.getElementById('overlayCapture'),
  overlayClearKey: document.getElementById('overlayClearKey'),
  overlayPlay: document.getElementById('overlayPlay'),
  overlayStop: document.getElementById('overlayStop'),
  overlayKeyButtons: Array.from(document.querySelectorAll('[data-overlay-key]'))
};

const ctx = elements.stage.getContext('2d');
const state = {
  figureId: figurePresets[0].id,
  actionId: actionTemplates[0].id,
  expressionId: expressionVariants[0].id,
  primaryColor: figurePresets[0].primary,
  accentColor: figurePresets[0].accent,
  speed: 1,
  scale: 1,
  thickness: 6,
  background: 'grid',
  options: {
    glow: true,
    shadow: true,
    accessory: false
  },
  time: 0,
  customAnimator: {
    enabled: false,
    frames: {},
    frameCount: 48,
    currentFrame: 0,
    liveFrame: null,
    playing: false,
    playhead: 0
  },
  overlay: createOverlayDefaults()
};

const pointerState = {
  activeHandle: null,
  pointerId: null
};

const HANDLE_KEYS = ['hip', 'shoulders', 'head', 'leftHand', 'rightHand', 'leftFoot', 'rightFoot'];
const HANDLE_RADIUS = 18;
const overlayPointerState = {
  active: false,
  mode: null,
  pointerId: null,
  startCanvas: null,
  initialTransform: null,
  transformTarget: null,
  handle: null,
  initialAngle: 0
};
const OVERLAY_HANDLE_SIZE = 16;
const OVERLAY_ROTATE_OFFSET = 40;

let lastTime = 0;
let statusTimer = null;

function init() {
  populateSelect(elements.figureSelect, figurePresets, 'character');
  populateSelect(elements.actionSelect, actionTemplates, 'action');
  populateSelect(elements.faceSelect, expressionVariants, 'face');
  applyPreset(figurePresets[0].id);
  bindControls();
  initTabs();
  initCustomAnimator();
  initOverlayAnimator();
  updateOverlayUiState();
  requestAnimationFrame(tick);
}

function populateSelect(selectEl, data, kind) {
  selectEl.innerHTML = '';
  data.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent =
      kind === 'character'
        ? `${item.name} · ${item.description}`
        : kind === 'action'
        ? `${item.label} · ${item.description}`
        : item.label;
    selectEl.appendChild(option);
  });
}

function applyPreset(id) {
  const preset = figureMap[id];
  if (!preset) return;
  state.figureId = preset.id;
  state.primaryColor = preset.primary;
  state.accentColor = preset.accent;
  state.expressionId = preset.face;
  state.actionId = preset.action;
  state.speed = preset.speed;
  state.scale = preset.scale;
  state.thickness = preset.thickness;
  state.background = preset.background;
  state.options = {
    glow: preset.glow,
    shadow: preset.shadow,
    accessory: preset.accessory
  };
  state.time = 0;
  resetCustomAnimator('Preset changed — custom frames cleared.');
  syncControls();
  setStatus(`Loaded ${preset.name}`, 'info');
}

function syncControls() {
  elements.figureSelect.value = state.figureId;
  elements.actionSelect.value = state.actionId;
  elements.faceSelect.value = state.expressionId;
  elements.primaryColor.value = state.primaryColor;
  elements.accentColor.value = state.accentColor;
  elements.speedRange.value = state.speed;
  elements.sizeRange.value = state.scale;
  elements.thicknessRange.value = state.thickness;
  elements.speedValue.textContent = `${state.speed.toFixed(1)}x`;
  elements.sizeValue.textContent = `${state.scale.toFixed(2)}x`;
  elements.thicknessValue.textContent = `${state.thickness}px`;
  elements.toggleGlow.checked = state.options.glow;
  elements.toggleShadow.checked = state.options.shadow;
  elements.toggleAccessory.checked = state.options.accessory;
  elements.bgSelect.value = state.background;
}

function bindControls() {
  elements.figureSelect.addEventListener('change', (event) => {
    applyPreset(event.target.value);
  });

  elements.actionSelect.addEventListener('change', (event) => {
    state.actionId = event.target.value;
    state.time = 0;
    resetCustomAnimator('Action changed — cleared custom frames.');
    setStatus(`Action: ${actionMap[state.actionId].label}`, 'info');
  });

  elements.faceSelect.addEventListener('change', (event) => {
    state.expressionId = event.target.value;
  });

  elements.primaryColor.addEventListener('input', (event) => {
    state.primaryColor = event.target.value;
  });

  elements.accentColor.addEventListener('input', (event) => {
    state.accentColor = event.target.value;
  });

  elements.speedRange.addEventListener('input', (event) => {
    state.speed = parseFloat(event.target.value);
    elements.speedValue.textContent = `${state.speed.toFixed(1)}x`;
  });

  elements.sizeRange.addEventListener('input', (event) => {
    state.scale = parseFloat(event.target.value);
    elements.sizeValue.textContent = `${state.scale.toFixed(2)}x`;
    if (
      state.customAnimator.enabled &&
      !state.customAnimator.playing &&
      !hasCustomKeyframe(state.customAnimator.currentFrame)
    ) {
      state.customAnimator.liveFrame = null;
      seedLiveFrame(state.customAnimator.currentFrame);
    }
  });

  elements.thicknessRange.addEventListener('input', (event) => {
    state.thickness = parseInt(event.target.value, 10);
    elements.thicknessValue.textContent = `${state.thickness}px`;
  });

  elements.toggleGlow.addEventListener('change', (event) => {
    state.options.glow = event.target.checked;
  });

  elements.toggleShadow.addEventListener('change', (event) => {
    state.options.shadow = event.target.checked;
  });

  elements.toggleAccessory.addEventListener('change', (event) => {
    state.options.accessory = event.target.checked;
  });

  elements.bgSelect.addEventListener('change', (event) => {
    state.background = event.target.value;
  });

  elements.resetBtn.addEventListener('click', () => applyPreset(figurePresets[0].id));
  elements.exportBtn.addEventListener('click', exportSequence);

  elements.customModeToggle.addEventListener('change', (event) => {
    toggleCustomMode(event.target.checked);
  });
  elements.frameScrubber.addEventListener('input', (event) => {
    setCustomFrame(parseInt(event.target.value, 10));
  });
  elements.captureFrame.addEventListener('click', captureCurrentPose);
  elements.clearFrame.addEventListener('click', clearCurrentFrame);
  elements.playCustom.addEventListener('click', playCustomSequence);
  elements.stopCustom.addEventListener('click', stopCustomSequence);
  elements.overlayInput.addEventListener('change', handleOverlayUpload);
  elements.clearOverlay.addEventListener('click', clearOverlayAsset);
  elements.overlayScale.addEventListener('input', (event) => {
    handleOverlayControlInput('scale', parseFloat(event.target.value));
  });
  elements.overlayPosX.addEventListener('input', (event) => {
    handleOverlayControlInput('posX', parseInt(event.target.value, 10) / 100);
  });
  elements.overlayPosY.addEventListener('input', (event) => {
    handleOverlayControlInput('posY', parseInt(event.target.value, 10) / 100);
  });
  elements.overlayOpacity.addEventListener('input', (event) => {
    handleOverlayControlInput('opacity', parseFloat(event.target.value));
  });
  elements.overlayRotation.addEventListener('input', (event) => {
    handleOverlayControlInput('rotation', parseFloat(event.target.value));
  });
}

function initTabs() {
  if (!elements.tabButtons.length) return;
  elements.tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      elements.tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      elements.tabPanels.forEach((panel) =>
        panel.classList.toggle('active', panel.dataset.tab === targetTab)
      );
    });
  });
}

function handleOverlayUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    setStatus('Please choose an image file.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const fitScale = Math.min((elements.stage.width * 0.6) / img.width, (elements.stage.height * 0.6) / img.height);
      state.overlay = createOverlayDefaults();
      state.overlay.enabled = true;
      state.overlay.name = file.name || 'Custom overlay';
      state.overlay.src = reader.result;
      state.overlay.image = img;
      state.overlay.base.scale = Number.isFinite(fitScale) ? clamp(fitScale, 0.3, 2.5) : 1;
      state.overlay.base.position = { x: 0.5, y: 0.5 };
      state.overlay.base.opacity = 1;
      state.overlay.base.rotation = 0;
      resetOverlayAnimator();
      updateOverlayUiState();
      setStatus(`Overlay ready: ${state.overlay.name}`, 'info');
    };
    img.onerror = () => {
      setStatus('Unable to load overlay image.', 'error');
    };
    img.src = reader.result;
  };
  reader.onerror = () => setStatus('Unable to read file.', 'error');
  reader.readAsDataURL(file);
  event.target.value = '';
}

function clearOverlayAsset() {
  state.overlay = createOverlayDefaults();
  elements.overlayInput.value = '';
  resetOverlayAnimator();
  updateOverlayUiState();
  setStatus('Overlay removed.', 'info');
}

function updateOverlayUiState() {
  const overlayLoaded = state.overlay.enabled && Boolean(state.overlay.image);
  const animator = state.overlay.animator;
  const displayTransform = overlayLoaded ? getOverlayDisplayTransform() : state.overlay.base;
  const controlsDisabled = !overlayLoaded || (animator.enabled && animator.playing);
  const scaleValue = displayTransform?.scale ?? 1;
  const posX = displayTransform?.position?.x ?? 0.5;
  const posY = displayTransform?.position?.y ?? 0.5;
  const opacityValue = displayTransform?.opacity ?? 1;
  const rotationValue = displayTransform?.rotation ?? 0;

  elements.overlayScale.disabled = controlsDisabled;
  elements.overlayPosX.disabled = controlsDisabled;
  elements.overlayPosY.disabled = controlsDisabled;
  elements.overlayOpacity.disabled = controlsDisabled;
  elements.overlayRotation.disabled = controlsDisabled;
  elements.clearOverlay.disabled = !overlayLoaded;
  elements.overlayScale.value = scaleValue;
  elements.overlayScaleValue.textContent = `${scaleValue.toFixed(1)}x`;
  elements.overlayPosX.value = Math.round(posX * 100);
  elements.overlayPosY.value = Math.round(posY * 100);
  elements.overlayOpacity.value = opacityValue;
  elements.overlayOpacityValue.textContent = `${Math.round(opacityValue * 100)}%`;
  elements.overlayRotation.value = rotationValue;
  elements.overlayRotationValue.textContent = `${Math.round(rotationValue)}°`;
  elements.overlayName.textContent = overlayLoaded ? state.overlay.name || 'Custom overlay' : 'No asset loaded';

  elements.overlayAnimToggle.disabled = !overlayLoaded;
  elements.overlayAnimToggle.checked = animator.enabled;
  elements.overlayFrameScrubber.value = animator.currentFrame;
  elements.overlayFrameScrubber.disabled = !overlayLoaded || !animator.enabled || animator.playing;
  elements.overlayCapture.disabled = !overlayLoaded || !animator.enabled || animator.playing;
  elements.overlayClearKey.disabled = !overlayLoaded || !animator.enabled || animator.playing;
  elements.overlayPlay.disabled = !overlayLoaded || !animator.enabled || !hasAnyOverlayFrames();
  elements.overlayStop.disabled = !overlayLoaded || !animator.enabled || !animator.playing;
  elements.overlayEaseSelect.disabled = !overlayLoaded || !animator.enabled;
  elements.overlayEaseSelect.value = animator.ease || 'linear';
  const canKeyToggle = overlayLoaded && animator.enabled && !animator.playing;
  const hasKey = animator.enabled && hasOverlayKeyframe(animator.currentFrame);
  elements.overlayKeyButtons.forEach((button) => {
    button.disabled = !canKeyToggle;
    button.classList.toggle('active', canKeyToggle && hasKey);
  });
  updateOverlayFrameLabel();
}

function overlayAnimatorEditingActive() {
  return state.overlay.animator.enabled && !state.overlay.animator.playing;
}

function ensureOverlayLiveFrame() {
  if (!overlayAnimatorEditingActive()) return;
  if (!state.overlay.animator.liveFrame) {
    seedOverlayFrame(state.overlay.animator.currentFrame);
  }
}

function commitOverlayTransformChange(target) {
  if (overlayAnimatorEditingActive()) {
    state.overlay.animator.liveFrame = target;
    persistOverlayFrame();
  } else {
    state.overlay.base = target;
  }
}

function handleOverlayControlInput(type, value) {
  if (!state.overlay.enabled || !state.overlay.image) return;
  ensureOverlayLiveFrame();
  const target = getOverlayControlTarget();
  if (!target.position) {
    target.position = { x: 0.5, y: 0.5 };
  }
  if (typeof target.rotation !== 'number') {
    target.rotation = 0;
  }
  if (type === 'scale') {
    target.scale = clamp(value, 0.3, 2.5);
  } else if (type === 'posX') {
    target.position.x = clamp(value, 0, 1);
  } else if (type === 'posY') {
    target.position.y = clamp(value, 0, 1);
  } else if (type === 'opacity') {
    target.opacity = clamp(value, 0.1, 1);
  } else if (type === 'rotation') {
    target.rotation = clampAngle(value);
  }
  commitOverlayTransformChange(target);
  updateOverlayUiState();
}

function getOverlayControlTarget() {
  if (state.overlay.animator.enabled && !state.overlay.animator.playing) {
    if (!state.overlay.animator.liveFrame) {
      seedOverlayFrame(state.overlay.animator.currentFrame);
    }
    return state.overlay.animator.liveFrame;
  }
  return state.overlay.base;
}

function toggleOverlayAnimator(enabled) {
  if (enabled && (!state.overlay.enabled || !state.overlay.image)) {
    setStatus('Load an overlay before keyframing.', 'error');
    elements.overlayAnimToggle.checked = false;
    return;
  }
  state.overlay.animator.enabled = enabled;
  state.overlay.animator.playing = false;
  state.overlay.animator.liveFrame = null;
  state.overlay.animator.playhead = state.overlay.animator.currentFrame;
  if (enabled) {
    seedOverlayFrame(state.overlay.animator.currentFrame);
    setStatus('Overlay keyframes enabled.', 'info');
  } else {
    setStatus('Overlay keyframes disabled.', 'info');
  }
  updateOverlayUiState();
}

function resetOverlayAnimator(message) {
  const { frameCount } = state.overlay.animator;
  state.overlay.animator = {
    enabled: false,
    frames: {},
    frameCount,
    currentFrame: 0,
    playhead: 0,
    playing: false,
    liveFrame: null,
    ease: 'linear'
  };
  elements.overlayAnimToggle.checked = false;
  elements.overlayFrameScrubber.value = 0;
  if (message) {
    setStatus(message, 'info');
  }
}

function setOverlayFrame(nextFrame) {
  if (!state.overlay.enabled || !state.overlay.image) return;
  const maxFrame = state.overlay.animator.frameCount - 1;
  const clamped = Math.min(Math.max(nextFrame, 0), maxFrame);
  state.overlay.animator.currentFrame = clamped;
  state.overlay.animator.playhead = clamped;
  elements.overlayFrameScrubber.value = clamped;
  if (state.overlay.animator.enabled && !state.overlay.animator.playing) {
    state.overlay.animator.liveFrame = null;
    seedOverlayFrame(clamped);
  }
  updateOverlayUiState();
}

function seedOverlayFrame(frameIndex) {
  state.overlay.animator.liveFrame = resolveOverlayTransform(frameIndex);
}

function captureOverlayFrame() {
  if (
    !state.overlay.animator.enabled ||
    !state.overlay.enabled ||
    !state.overlay.image ||
    state.overlay.animator.playing
  ) {
    return;
  }
  if (!state.overlay.animator.liveFrame) {
    seedOverlayFrame(state.overlay.animator.currentFrame);
  }
  persistOverlayFrame();
  updateOverlayUiState();
  setStatus(`Overlay frame ${state.overlay.animator.currentFrame + 1} saved.`, 'info');
}

function clearOverlayFrame() {
  if (!state.overlay.animator.enabled) return;
  delete state.overlay.animator.frames[state.overlay.animator.currentFrame];
  state.overlay.animator.liveFrame = null;
  seedOverlayFrame(state.overlay.animator.currentFrame);
  updateOverlayUiState();
  setStatus(`Overlay frame ${state.overlay.animator.currentFrame + 1} cleared.`, 'info');
}

function toggleOverlayKeyframe() {
  if (!state.overlay.animator.enabled || state.overlay.animator.playing) return;
  if (hasOverlayKeyframe(state.overlay.animator.currentFrame)) {
    clearOverlayFrame();
  } else {
    captureOverlayFrame();
  }
}

function playOverlaySequence() {
  if (!state.overlay.animator.enabled) return;
  if (!hasAnyOverlayFrames()) {
    setStatus('Add at least one overlay frame.', 'error');
    return;
  }
  state.overlay.animator.playhead = state.overlay.animator.currentFrame;
  state.overlay.animator.playing = true;
  state.overlay.animator.liveFrame = null;
  updateOverlayUiState();
  setStatus('Playing overlay loop.', 'info');
}

function stopOverlaySequence() {
  if (!state.overlay.animator.enabled) return;
  state.overlay.animator.playing = false;
  state.overlay.animator.liveFrame = null;
  seedOverlayFrame(state.overlay.animator.currentFrame);
  updateOverlayUiState();
  setStatus('Stopped overlay loop.', 'info');
}

function hasOverlayKeyframe(frameIndex) {
  return Boolean(state.overlay.animator.frames[frameIndex]);
}

function hasAnyOverlayFrames() {
  return Object.keys(state.overlay.animator.frames).length > 0;
}

function updateOverlayFrameLabel() {
  const animator = state.overlay.animator;
  const frameHuman = (animator.currentFrame + 1).toString().padStart(2, '0');
  elements.overlayFrameLabel.textContent = `Frame ${frameHuman} / ${animator.frameCount}`;
  let label = 'No asset';
  if (state.overlay.enabled && state.overlay.image) {
    if (!animator.enabled) {
      label = 'Static';
    } else {
      const status = getOverlayFrameStatus(animator.currentFrame);
      if (status === 'key') label = 'Keyed';
      else if (status === 'tween') label = 'Tween';
      else if (status === 'hold') label = 'Hold';
      else label = 'Empty';
    }
  }
  const activeStatus = label === 'Keyed' || label === 'Tween' || label === 'Hold';
  elements.overlayKeyStatus.textContent = label;
  elements.overlayKeyStatus.classList.toggle('active', activeStatus);
}

function getOverlayFrameStatus(frameIndex) {
  if (!state.overlay.animator.enabled) return 'static';
  if (hasOverlayKeyframe(frameIndex)) return 'key';
  const keys = getOverlayKeyframes();
  if (!keys.length) return 'empty';
  if (keys.length === 1) {
    return frameIndex === keys[0] ? 'key' : 'hold';
  }
  const first = keys[0];
  const last = keys[keys.length - 1];
  if (frameIndex < first || frameIndex > last) return 'hold';
  const { prev, next } = findOverlayNeighborFrames(frameIndex);
  if (prev !== null && next !== null && prev !== next && frameIndex > prev && frameIndex < next) {
    return 'tween';
  }
  return 'hold';
}

function getOverlayKeyframes() {
  return Object.keys(state.overlay.animator.frames)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => a - b);
}

function findOverlayNeighborFrames(frameIndex) {
  const keys = getOverlayKeyframes();
  if (!keys.length) return { prev: null, next: null };
  let prev = null;
  let next = null;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key <= frameIndex) prev = key;
    if (key >= frameIndex) {
      next = key;
      break;
    }
  }
  if (prev === null) prev = keys[0];
  if (next === null) next = keys[keys.length - 1];
  return { prev, next };
}

function interpolateOverlayFrame(frameIndex) {
  const { prev, next } = findOverlayNeighborFrames(frameIndex);
  if (prev === null || next === null) return null;
  const prevFrame = state.overlay.animator.frames[prev];
  const nextFrame = state.overlay.animator.frames[next];
  if (!prevFrame || !nextFrame) return null;
  if (prev === next) return cloneOverlayFrame(prevFrame);
  const rawAlpha = (frameIndex - prev) / (next - prev);
  const alpha = applyOverlayEase(rawAlpha);
  return tweenOverlayFrame(prevFrame, nextFrame, alpha);
}

function tweenOverlayFrame(start, end, alpha) {
  return {
    scale: lerp(start.scale, end.scale, alpha),
    opacity: lerp(start.opacity, end.opacity, alpha),
    position: {
      x: lerp(start.position.x, end.position.x, alpha),
      y: lerp(start.position.y, end.position.y, alpha)
    },
    rotation: lerpAngleDegrees(start.rotation ?? 0, end.rotation ?? 0, alpha)
  };
}

function persistOverlayFrame() {
  if (!state.overlay.animator.liveFrame) return;
  state.overlay.animator.frames[state.overlay.animator.currentFrame] = cloneOverlayFrame(
    state.overlay.animator.liveFrame
  );
}

function applyOverlayEase(value) {
  const ease = state.overlay.animator.ease || 'linear';
  const t = clamp(value, 0, 1);
  switch (ease) {
    case 'easeIn':
      return t * t;
    case 'easeOut':
      return 1 - (1 - t) * (1 - t);
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
    case 'fastSlowFast':
      return clamp(t + 0.15 * Math.sin(2 * Math.PI * t), 0, 1);
    default:
      return t;
  }
}

function cloneOverlayFrame(source) {
  if (!source) return null;
  return {
    scale: source.scale ?? 1,
    opacity: source.opacity ?? 1,
    position: {
      x: source.position?.x ?? 0.5,
      y: source.position?.y ?? 0.5
    },
    rotation: source.rotation ?? 0
  };
}

function getOverlayDisplayTransform() {
  if (!state.overlay.enabled || !state.overlay.image) return state.overlay.base;
  if (state.overlay.animator.enabled) {
    if (state.overlay.animator.playing) {
      const frameIndex = Math.floor(state.overlay.animator.playhead) % state.overlay.animator.frameCount;
      return getOverlayTransform(frameIndex) || state.overlay.base;
    }
    if (state.overlay.animator.liveFrame) {
      return state.overlay.animator.liveFrame;
    }
    return resolveOverlayTransform(state.overlay.animator.currentFrame);
  }
  return state.overlay.base;
}

function getOverlayTransform(frameIndex) {
  return resolveOverlayTransform(frameIndex);
}

function resolveOverlayTransform(frameIndex) {
  if (!state.overlay.enabled || !state.overlay.image) {
    return cloneOverlayFrame(state.overlay.base);
  }
  if (!state.overlay.animator.enabled || frameIndex === null || frameIndex === undefined) {
    return cloneOverlayFrame(state.overlay.base);
  }
  const stored = state.overlay.animator.frames[frameIndex];
  if (stored) return cloneOverlayFrame(stored);
  const interpolated = interpolateOverlayFrame(frameIndex);
  if (interpolated) return interpolated;
  return cloneOverlayFrame(state.overlay.base);
}

function initCustomAnimator() {
  const { frameCount } = state.customAnimator;
  elements.frameScrubber.max = frameCount - 1;
  elements.frameScrubber.value = state.customAnimator.currentFrame;
  elements.frameScrubber.disabled = true;
  elements.captureFrame.disabled = true;
  elements.clearFrame.disabled = true;
  elements.playCustom.disabled = true;
  elements.stopCustom.disabled = true;
  updateFrameLabel();
  elements.stage.addEventListener('pointerdown', handlePointerDown);
  elements.stage.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', handlePointerUp);
  elements.stage.addEventListener('pointerleave', handlePointerUp);
}

function initOverlayAnimator() {
  const { frameCount } = state.overlay.animator;
  elements.overlayFrameScrubber.max = frameCount - 1;
  elements.overlayFrameScrubber.value = state.overlay.animator.currentFrame;
  elements.overlayFrameScrubber.disabled = true;
  elements.overlayCapture.disabled = true;
  elements.overlayClearKey.disabled = true;
  elements.overlayPlay.disabled = true;
  elements.overlayStop.disabled = true;
  elements.overlayAnimToggle.disabled = true;
  elements.overlayAnimToggle.addEventListener('change', (event) =>
    toggleOverlayAnimator(event.target.checked)
  );
  elements.overlayFrameScrubber.addEventListener('input', (event) =>
    setOverlayFrame(parseInt(event.target.value, 10))
  );
  elements.overlayCapture.addEventListener('click', captureOverlayFrame);
  elements.overlayClearKey.addEventListener('click', clearOverlayFrame);
  elements.overlayPlay.addEventListener('click', playOverlaySequence);
  elements.overlayStop.addEventListener('click', stopOverlaySequence);
  elements.overlayKeyButtons.forEach((button) => button.addEventListener('click', toggleOverlayKeyframe));
  elements.overlayEaseSelect.disabled = true;
  elements.overlayEaseSelect.addEventListener('change', (event) => {
    state.overlay.animator.ease = event.target.value;
  });
  updateOverlayFrameLabel();
}

function toggleCustomMode(enabled) {
  state.customAnimator.enabled = enabled;
  state.customAnimator.playing = false;
  state.customAnimator.liveFrame = null;
  elements.stage.classList.toggle('edit-mode', enabled);
  if (enabled) {
    seedLiveFrame(state.customAnimator.currentFrame);
    setStatus('Custom sculpting enabled.', 'info');
  } else {
    setStatus('Custom sculpting disabled.', 'info');
  }
  refreshCustomUiState();
}

function resetCustomAnimator(message) {
  state.customAnimator.frames = {};
  state.customAnimator.currentFrame = 0;
  state.customAnimator.liveFrame = null;
  state.customAnimator.playing = false;
  state.customAnimator.playhead = 0;
  state.customAnimator.enabled = false;
  elements.customModeToggle.checked = false;
  elements.stage.classList.remove('edit-mode');
  elements.frameScrubber.value = 0;
  refreshCustomUiState();
  if (message) {
    setStatus(message, 'info');
  }
}

function setCustomFrame(nextFrame) {
  const maxFrame = state.customAnimator.frameCount - 1;
  const clamped = Math.min(Math.max(nextFrame, 0), maxFrame);
  state.customAnimator.currentFrame = clamped;
  state.customAnimator.playhead = clamped;
  elements.frameScrubber.value = clamped;
  if (state.customAnimator.enabled && !state.customAnimator.playing) {
    state.customAnimator.liveFrame = null;
    seedLiveFrame(clamped);
  }
  updateFrameLabel();
  refreshCustomUiState();
}

function seedLiveFrame(frameIndex) {
  const action = actionMap[state.actionId] || actionTemplates[0];
  const progress = frameIndex / state.customAnimator.frameCount;
  const pose = action.solver(progress, state);
  state.customAnimator.liveFrame = resolveCustomSkeleton(frameIndex, pose, ctx);
}

function updateFrameLabel() {
  const frameHuman = (state.customAnimator.currentFrame + 1).toString().padStart(2, '0');
  elements.frameLabel.textContent = `Frame ${frameHuman} / ${state.customAnimator.frameCount}`;
  const status = getFrameStatus(state.customAnimator.currentFrame);
  let label = 'Empty';
  if (status === 'key') label = 'Keyed';
  else if (status === 'tween') label = 'Tween';
  else if (status === 'hold') label = 'Hold';
  elements.keyframeStatus.textContent = label;
  elements.keyframeStatus.classList.toggle('active', status !== 'empty');
}

function captureCurrentPose() {
  if (!state.customAnimator.enabled) return;
  if (!state.customAnimator.liveFrame) {
    seedLiveFrame(state.customAnimator.currentFrame);
  }
  persistLiveFrame();
  refreshCustomUiState();
  setStatus(`Saved frame ${state.customAnimator.currentFrame + 1}.`, 'info');
}

function clearCurrentFrame() {
  if (!state.customAnimator.enabled) return;
  delete state.customAnimator.frames[state.customAnimator.currentFrame];
  state.customAnimator.liveFrame = null;
  seedLiveFrame(state.customAnimator.currentFrame);
  refreshCustomUiState();
  setStatus(`Cleared frame ${state.customAnimator.currentFrame + 1}.`, 'info');
}

function playCustomSequence() {
  if (!state.customAnimator.enabled) return;
  if (!hasAnyCustomFrames()) {
    setStatus('Add at least one saved pose to play.', 'error');
    return;
  }
  state.customAnimator.playing = true;
  state.customAnimator.playhead = state.customAnimator.currentFrame;
  elements.stage.classList.remove('edit-mode');
  refreshCustomUiState();
  setStatus('Playing custom loop.', 'info');
}

function stopCustomSequence() {
  if (!state.customAnimator.enabled) return;
  state.customAnimator.playing = false;
  elements.stage.classList.add('edit-mode');
  refreshCustomUiState();
  setStatus('Stopped custom loop.', 'info');
}

function hasCustomKeyframe(frameIndex) {
  return Boolean(state.customAnimator.frames[frameIndex]);
}

function hasAnyCustomFrames() {
  return Object.keys(state.customAnimator.frames).length > 0;
}

function getFrameStatus(frameIndex) {
  if (hasCustomKeyframe(frameIndex)) return 'key';
  const keys = getSortedKeyframes();
  if (!keys.length) return 'empty';
  if (keys.length === 1) {
    return frameIndex === keys[0] ? 'key' : 'hold';
  }
  const first = keys[0];
  const last = keys[keys.length - 1];
  if (frameIndex < first || frameIndex > last) return 'hold';
  const { prev, next } = findNeighborKeyframes(frameIndex);
  if (prev !== null && next !== null) {
    if (prev !== next && frameIndex > prev && frameIndex < next) {
      return 'tween';
    }
    if (prev === next) {
      return 'key';
    }
  }
  return 'hold';
}

function refreshCustomUiState() {
  const enabled = state.customAnimator.enabled;
  elements.frameScrubber.disabled = !enabled || state.customAnimator.playing;
  elements.captureFrame.disabled = !enabled;
  elements.clearFrame.disabled = !enabled;
  elements.playCustom.disabled = !enabled || !hasAnyCustomFrames();
  elements.stopCustom.disabled = !enabled || !state.customAnimator.playing;
  if (!state.customAnimator.playing) {
    elements.stage.classList.toggle('edit-mode', enabled);
  }
  updateFrameLabel();
}

function handlePointerDown(event) {
  if (attemptOverlayPointerDown(event)) return;
  if (!state.customAnimator.enabled || state.customAnimator.playing) return;
  if (!state.customAnimator.liveFrame) return;
  const position = getCanvasCoordinates(event);
  const handle = findHandleAtPoint(position, state.customAnimator.liveFrame);
  if (!handle) return;
  pointerState.activeHandle = handle;
  pointerState.pointerId = event.pointerId;
  elements.stage.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function handlePointerMove(event) {
  if (overlayPointerState.active) {
    handleOverlayPointerMove(event);
    return;
  }
  if (!state.customAnimator.enabled || !pointerState.activeHandle) return;
  if (!state.customAnimator.liveFrame) return;
  const position = clampPoint(getCanvasCoordinates(event));
  state.customAnimator.liveFrame.points[pointerState.activeHandle] = position;
}

function handlePointerUp(event) {
  if (handleOverlayPointerUp(event)) return;
  if (pointerState.pointerId && event.pointerId && pointerState.pointerId !== event.pointerId) return;
  if (pointerState.activeHandle && state.customAnimator.enabled && state.customAnimator.liveFrame) {
    persistLiveFrame();
    refreshCustomUiState();
  }
  if (pointerState.pointerId) {
    try {
      elements.stage.releasePointerCapture(pointerState.pointerId);
    } catch (error) {
      // ignored
    }
  }
  pointerState.activeHandle = null;
  pointerState.pointerId = null;
}

function getCanvasCoordinates(event) {
  const rect = elements.stage.getBoundingClientRect();
  const scaleX = elements.stage.width / rect.width;
  const scaleY = elements.stage.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function clampPoint(point) {
  const canvas = elements.stage;
  return {
    x: Math.min(Math.max(point.x, 0), canvas.width),
    y: Math.min(Math.max(point.y, 0), canvas.height)
  };
}

function findHandleAtPoint(position, skeleton) {
  if (!skeleton) return null;
  const entries = HANDLE_KEYS.map((key) => [key, skeleton.points[key]]).filter(([, value]) => Boolean(value));
  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i];
    const distance = Math.hypot(value.x - position.x, value.y - position.y);
    if (distance <= HANDLE_RADIUS) {
      return key;
    }
  }
  return null;
}

function attemptOverlayPointerDown(event) {
  if (!canEditOverlayTransform()) return false;
  const transform = getOverlayDisplayTransform();
  if (!transform) return false;
  const position = getCanvasCoordinates(event);
  const hit = pickOverlayHandle(position, transform);
  if (!hit) return false;
  ensureOverlayLiveFrame();
  overlayPointerState.active = true;
  overlayPointerState.mode = hit.mode;
  overlayPointerState.handle = hit.handle;
  overlayPointerState.pointerId = event.pointerId;
  overlayPointerState.startCanvas = position;
  const targetRef = getOverlayControlTarget();
  overlayPointerState.transformTarget = targetRef;
  overlayPointerState.initialTransform = cloneOverlayFrame(targetRef);
  overlayPointerState.initialAngle = hit.initialAngle || 0;
  elements.stage.setPointerCapture?.(event.pointerId);
  event.preventDefault();
  return true;
}

function handleOverlayPointerMove(event) {
  if (!overlayPointerState.active || !overlayPointerState.transformTarget) return;
  const pointer = clampPoint(getCanvasCoordinates(event));
  const target = overlayPointerState.transformTarget;
  const canvasWidth = elements.stage.width;
  const canvasHeight = elements.stage.height;
  if (overlayPointerState.mode === 'move') {
    const dx = (pointer.x - overlayPointerState.startCanvas.x) / canvasWidth;
    const dy = (pointer.y - overlayPointerState.startCanvas.y) / canvasHeight;
    target.position.x = clamp(overlayPointerState.initialTransform.position.x + dx, 0, 1);
    target.position.y = clamp(overlayPointerState.initialTransform.position.y + dy, 0, 1);
  } else if (overlayPointerState.mode === 'scale') {
    const local = canvasToOverlayLocal(pointer, target);
    const image = state.overlay.image;
    if (image) {
      const ratioX = (Math.abs(local.x) * 2) / image.width;
      const ratioY = (Math.abs(local.y) * 2) / image.height;
      const newScale = clamp(Math.max(ratioX, ratioY), 0.3, 2.5);
      if (Number.isFinite(newScale)) {
        target.scale = newScale;
      }
    }
  } else if (overlayPointerState.mode === 'rotate') {
    const center = overlayCenterInPixels(target);
    const angleNow = Math.atan2(pointer.y - center.y, pointer.x - center.x);
    const delta = ((angleNow - overlayPointerState.initialAngle) * 180) / Math.PI;
    target.rotation = clampAngle((overlayPointerState.initialTransform.rotation || 0) + delta);
  }
  commitOverlayTransformChange(target);
  updateOverlayUiState();
  event.preventDefault();
}

function handleOverlayPointerUp(event) {
  if (!overlayPointerState.active) return false;
  if (overlayPointerState.pointerId && event.pointerId && overlayPointerState.pointerId !== event.pointerId) {
    return false;
  }
  try {
    elements.stage.releasePointerCapture(overlayPointerState.pointerId);
  } catch (error) {
    // ignore
  }
  overlayPointerState.active = false;
  overlayPointerState.mode = null;
  overlayPointerState.pointerId = null;
  overlayPointerState.transformTarget = null;
  overlayPointerState.initialTransform = null;
  overlayPointerState.handle = null;
  updateOverlayUiState();
  return true;
}

function canEditOverlayTransform() {
  if (!state.overlay.enabled || !state.overlay.image) return false;
  if (state.overlay.animator.enabled && state.overlay.animator.playing) return false;
  return true;
}

function pickOverlayHandle(canvasPoint, transform) {
  const dims = getOverlayDimensions(transform);
  const halfW = dims.width / 2;
  const halfH = dims.height / 2;
  const local = canvasToOverlayLocal(canvasPoint, transform);
  const corners = [
    { name: 'topLeft', x: -halfW, y: -halfH },
    { name: 'topRight', x: halfW, y: -halfH },
    { name: 'bottomRight', x: halfW, y: halfH },
    { name: 'bottomLeft', x: -halfW, y: halfH }
  ];
  for (let i = 0; i < corners.length; i += 1) {
    const corner = corners[i];
    const dist = Math.hypot(local.x - corner.x, local.y - corner.y);
    if (dist <= OVERLAY_HANDLE_SIZE) {
      return { mode: 'scale', handle: corner.name };
    }
  }
  const rotatePoint = { x: 0, y: -halfH - OVERLAY_ROTATE_OFFSET };
  const rotateDist = Math.hypot(local.x - rotatePoint.x, local.y - rotatePoint.y);
  if (rotateDist <= OVERLAY_HANDLE_SIZE) {
    const center = overlayCenterInPixels(transform);
    const initialAngle = Math.atan2(canvasPoint.y - center.y, canvasPoint.x - center.x);
    return { mode: 'rotate', handle: 'rotate', initialAngle };
  }
  if (Math.abs(local.x) <= halfW && Math.abs(local.y) <= halfH) {
    return { mode: 'move', handle: 'move' };
  }
  return null;
}

function persistLiveFrame() {
  if (!state.customAnimator.liveFrame) return;
  state.customAnimator.frames[state.customAnimator.currentFrame] = cloneSkeleton(state.customAnimator.liveFrame);
}

function cloneSkeleton(source) {
  return {
    points: Object.fromEntries(
      Object.entries(source.points).map(([key, value]) => [key, { x: value.x, y: value.y }])
    ),
    metrics: { ...source.metrics }
  };
}

function getSortedKeyframes() {
  return Object.keys(state.customAnimator.frames)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => a - b);
}

function findNeighborKeyframes(frameIndex) {
  const keys = getSortedKeyframes();
  if (!keys.length) return { prev: null, next: null, keys };
  let prev = null;
  let next = null;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key <= frameIndex) {
      prev = key;
    }
    if (key >= frameIndex) {
      next = key;
      break;
    }
  }
  return { prev, next, keys };
}

function interpolateBetweenKeyframes(frameIndex) {
  const { prev, next, keys } = findNeighborKeyframes(frameIndex);
  if (!keys.length) return null;
  const prevSkel = prev !== null ? state.customAnimator.frames[prev] : null;
  const nextSkel = next !== null ? state.customAnimator.frames[next] : null;
  if (!prevSkel && !nextSkel) return null;
  if (!prevSkel) return cloneSkeleton(nextSkel);
  if (!nextSkel) return cloneSkeleton(prevSkel);
  if (prev === next) return cloneSkeleton(prevSkel);
  const alpha = (frameIndex - prev) / (next - prev);
  return tweenSkeleton(prevSkel, nextSkel, alpha);
}

function tweenSkeleton(start, end, alpha) {
  const keys = new Set([...Object.keys(start.points), ...Object.keys(end.points)]);
  const points = {};
  keys.forEach((key) => {
    const a = start.points[key];
    const b = end.points[key];
    if (a && b) {
      points[key] = {
        x: lerp(a.x, b.x, alpha),
        y: lerp(a.y, b.y, alpha)
      };
    } else {
      points[key] = { ...(a || b) };
    }
  });
  return {
    points,
    metrics: {
      headRadius: lerp(start.metrics.headRadius, end.metrics.headRadius, alpha),
      groundY: lerp(start.metrics.groundY, end.metrics.groundY, alpha),
      scale: lerp(start.metrics.scale, end.metrics.scale, alpha)
    }
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpAngleDegrees(a, b, t) {
  const delta = ((((b - a) % 360) + 540) % 360) - 180;
  return clampAngle(a + delta * t);
}

function getSkeletonForFrame(frameIndex, pose, targetCtx) {
  if (frameIndex === null || frameIndex === undefined) return null;
  if (!state.customAnimator.enabled) return null;
  const editingThisFrame =
    !state.customAnimator.playing && targetCtx === ctx && frameIndex === state.customAnimator.currentFrame;
  if (editingThisFrame) {
    if (!state.customAnimator.liveFrame) {
      state.customAnimator.liveFrame = resolveCustomSkeleton(frameIndex, pose, targetCtx);
    }
    return state.customAnimator.liveFrame;
  }
  const resolved = resolveCustomSkeleton(frameIndex, pose, targetCtx);
  return resolved ? cloneSkeleton(resolved) : null;
}

function resolveCustomSkeleton(frameIndex, pose, targetCtx) {
  const stored = state.customAnimator.frames[frameIndex];
  if (stored) return cloneSkeleton(stored);
  const interpolated = interpolateBetweenKeyframes(frameIndex);
  if (interpolated) return interpolated;
  return buildSkeleton(pose, targetCtx);
}

function tick(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  const action = actionMap[state.actionId] || actionTemplates[0];
  const fpsAdvance = (delta / 1000) * 24 * state.speed;
  if (state.customAnimator.enabled && state.customAnimator.playing) {
    const frames = state.customAnimator.frameCount;
    state.customAnimator.playhead = (state.customAnimator.playhead + fpsAdvance) % frames;
  } else {
    state.time = (state.time + delta * state.speed) % action.duration;
  }
  if (state.overlay.animator.enabled && state.overlay.animator.playing) {
    const overlayFrames = state.overlay.animator.frameCount;
    state.overlay.animator.playhead = (state.overlay.animator.playhead + fpsAdvance) % overlayFrames;
  }
  renderFrame(ctx);
  requestAnimationFrame(tick);
}

function renderFrame(targetCtx, overrideProgress, overrideFrameIndex) {
  const { width, height } = targetCtx.canvas;
  targetCtx.clearRect(0, 0, width, height);
  drawBackdrop(targetCtx, width, height, state.background);
  const action = actionMap[state.actionId] || actionTemplates[0];
  let progress;
  let customFrameIndex = null;
  if (state.customAnimator.enabled) {
    const frameTotal = state.customAnimator.frameCount;
    if (typeof overrideFrameIndex === 'number') {
      customFrameIndex = Math.min(Math.max(overrideFrameIndex, 0), frameTotal - 1);
      progress = customFrameIndex / frameTotal;
    } else if (state.customAnimator.playing) {
      customFrameIndex = Math.floor(state.customAnimator.playhead) % frameTotal;
      progress = customFrameIndex / frameTotal;
    } else {
      customFrameIndex = state.customAnimator.currentFrame;
      progress = customFrameIndex / frameTotal;
    }
  } else if (typeof overrideProgress === 'number') {
    progress = overrideProgress;
  } else {
    progress = (state.time % action.duration) / action.duration;
  }
  const pose = action.solver(progress, state);
  let skeletonOverride = null;
  if (state.customAnimator.enabled) {
    skeletonOverride = getSkeletonForFrame(customFrameIndex, pose, targetCtx);
    const frameTotal = state.customAnimator.frameCount;
    if (state.customAnimator.playing && targetCtx === ctx && customFrameIndex !== null) {
      state.customAnimator.currentFrame = customFrameIndex;
      elements.frameScrubber.value = customFrameIndex;
      updateFrameLabel();
    }
    if (customFrameIndex !== null && targetCtx === ctx) {
      elements.playhead.style.left = `${((customFrameIndex / frameTotal) * 100).toFixed(2)}%`;
    }
  } else if (typeof overrideProgress !== 'number' && targetCtx === ctx) {
    elements.playhead.style.left = `${(progress * 100).toFixed(2)}%`;
  }
  let overlayFrameIndex = null;
  if (state.overlay.animator.enabled) {
    const overlayTotal = state.overlay.animator.frameCount;
    if (typeof overrideFrameIndex === 'number') {
      overlayFrameIndex = Math.min(Math.max(overrideFrameIndex, 0), overlayTotal - 1);
    } else if (state.overlay.animator.playing) {
      overlayFrameIndex = Math.floor(state.overlay.animator.playhead) % overlayTotal;
    } else {
      overlayFrameIndex = state.overlay.animator.currentFrame;
    }
  }
  let overlayTransform = null;
  if (state.overlay.enabled && state.overlay.image) {
    if (
      state.overlay.animator.enabled &&
      !state.overlay.animator.playing &&
      overlayFrameIndex === state.overlay.animator.currentFrame &&
      targetCtx === ctx &&
      state.overlay.animator.liveFrame
    ) {
      overlayTransform = state.overlay.animator.liveFrame;
    } else {
      overlayTransform = getOverlayTransform(overlayFrameIndex);
    }
    if (
      state.overlay.animator.enabled &&
      state.overlay.animator.playing &&
      targetCtx === ctx &&
      overlayFrameIndex !== null
    ) {
      state.overlay.animator.currentFrame = overlayFrameIndex;
      elements.overlayFrameScrubber.value = overlayFrameIndex;
      updateOverlayFrameLabel();
    }
  }
  drawStickCharacter(targetCtx, pose, skeletonOverride);
  drawOverlay(targetCtx, overlayTransform);
  if (shouldShowOverlayHandles(targetCtx) && overlayTransform) {
    drawOverlayHandles(targetCtx, overlayTransform);
  }
  if (
    state.customAnimator.enabled &&
    targetCtx === ctx &&
    !state.customAnimator.playing
  ) {
    drawHandles(targetCtx, skeletonOverride || buildSkeleton(pose, targetCtx));
  }
}

function drawBackdrop(targetCtx, width, height, mode) {
  targetCtx.save();
  if (mode === 'grid') {
    const gradient = targetCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0d1221');
    gradient.addColorStop(1, '#05070f');
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(0, 0, width, height);
    targetCtx.strokeStyle = 'rgba(255,255,255,0.04)';
    targetCtx.lineWidth = 1;
    for (let x = 0; x < width; x += 32) {
      targetCtx.beginPath();
      targetCtx.moveTo(x, 0);
      targetCtx.lineTo(x, height);
      targetCtx.stroke();
    }
    for (let y = 0; y < height; y += 32) {
      targetCtx.beginPath();
      targetCtx.moveTo(0, y);
      targetCtx.lineTo(width, y);
      targetCtx.stroke();
    }
  } else if (mode === 'dusk') {
    const gradient = targetCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1b1b3a');
    gradient.addColorStop(1, '#3b185f');
    targetCtx.fillStyle = gradient;
    targetCtx.fillRect(0, 0, width, height);
  } else if (mode === 'paper') {
    targetCtx.fillStyle = '#f5f1e7';
    targetCtx.fillRect(0, 0, width, height);
    targetCtx.strokeStyle = 'rgba(0,0,0,0.04)';
    for (let y = 40; y < height; y += 40) {
      targetCtx.beginPath();
      targetCtx.moveTo(0, y);
      targetCtx.lineTo(width, y);
      targetCtx.stroke();
    }
  } else {
    targetCtx.fillStyle = '#020205';
    targetCtx.fillRect(0, 0, width, height);
  }
  targetCtx.restore();
}

function buildSkeleton(pose, referenceCtx = ctx) {
  const canvas = referenceCtx.canvas;
  const width = canvas.width;
  const height = canvas.height;
  const scale = state.scale;
  const groundY = height * 0.86;
  const legLength = 120 * scale;
  const torsoLength = 95 * scale;
  const hip = {
    x: width / 2 + (pose.hipShift || 0) * scale,
    y: groundY - legLength + (pose.bounce || 0) * 0.2
  };
  const shoulders = {
    x: hip.x + Math.sin(pose.torsoLean || 0) * 18 * scale,
    y: hip.y - torsoLength + (pose.bounce || 0) * 0.15
  };
  const headCenter = {
    x: shoulders.x + Math.sin(pose.headTilt || 0) * 15 * scale,
    y: shoulders.y - 30 * scale
  };
  const energy = pose.energy ?? 0.5;
  const stepWidth = 34 * scale * (0.8 + energy);
  const liftHeight = 26 * scale * (0.7 + energy * 0.4);
  const armReachBase = 55 * scale * (0.7 + energy * 0.4);

  return {
    points: {
      hip,
      shoulders,
      head: headCenter,
      leftFoot: resolveFoot(hip, pose.limbs?.leftLeg, stepWidth, liftHeight, groundY),
      rightFoot: resolveFoot(hip, pose.limbs?.rightLeg, stepWidth, liftHeight, groundY),
      leftHand: resolveHand(shoulders, pose.limbs?.leftArm, armReachBase, scale),
      rightHand: resolveHand(shoulders, pose.limbs?.rightArm, armReachBase, scale)
    },
    metrics: {
      headRadius: 22 * scale,
      groundY,
      scale
    }
  };
}

function drawStickCharacter(targetCtx, pose, skeletonOverride) {
  const skeleton = skeletonOverride || buildSkeleton(pose, targetCtx);
  const expression = expressionMap[state.expressionId] || expressionVariants[0];

  if (state.options.shadow) {
    drawGroundShadow(targetCtx, skeleton.points.hip.x, skeleton.metrics.groundY);
  }

  targetCtx.save();
  targetCtx.lineCap = 'round';
  targetCtx.lineJoin = 'round';
  targetCtx.strokeStyle = state.primaryColor;
  targetCtx.lineWidth = state.thickness;
  if (state.options.glow) {
    targetCtx.shadowBlur = 18;
    targetCtx.shadowColor = state.accentColor;
  }

  drawSegment(targetCtx, skeleton.points.hip, skeleton.points.leftFoot);
  drawSegment(targetCtx, skeleton.points.hip, skeleton.points.rightFoot);
  drawSegment(targetCtx, skeleton.points.shoulders, skeleton.points.leftHand);
  drawSegment(targetCtx, skeleton.points.shoulders, skeleton.points.rightHand);
  drawSegment(targetCtx, skeleton.points.shoulders, skeleton.points.hip);

  targetCtx.restore();

  drawHead(targetCtx, skeleton.points.head, skeleton.metrics.headRadius, expression, pose);
  if (state.options.accessory) {
    drawAccessory(targetCtx, skeleton);
  }
}

function drawHandles(targetCtx, skeleton) {
  if (!skeleton) return;
  targetCtx.save();
  HANDLE_KEYS.forEach((key) => {
    const point = skeleton.points[key];
    if (!point) return;
    targetCtx.beginPath();
    targetCtx.arc(point.x, point.y, pointerState.activeHandle === key ? 8 : 6, 0, TAU);
    targetCtx.fillStyle = pointerState.activeHandle === key ? state.accentColor : 'rgba(97, 233, 255, 0.9)';
    targetCtx.lineWidth = 2;
    targetCtx.strokeStyle = '#02030a';
    targetCtx.fill();
    targetCtx.stroke();
  });
  targetCtx.restore();
}

function drawOverlay(targetCtx, transform) {
  const overlay = state.overlay;
  if (!overlay.enabled || !overlay.image || !transform) return;
  const canvas = targetCtx.canvas;
  const drawWidth = overlay.image.width * transform.scale;
  const drawHeight = overlay.image.height * transform.scale;
  const centerX = transform.position.x * canvas.width;
  const centerY = transform.position.y * canvas.height;
  targetCtx.save();
  targetCtx.translate(centerX, centerY);
  targetCtx.rotate(degToRad(transform.rotation || 0));
  targetCtx.globalAlpha = transform.opacity;
  targetCtx.drawImage(overlay.image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  targetCtx.restore();
}

function shouldShowOverlayHandles(targetCtx) {
  if (targetCtx !== ctx) return false;
  if (!state.overlay.enabled || !state.overlay.image) return false;
  if (state.overlay.animator.enabled && state.overlay.animator.playing) return false;
  return true;
}

function drawOverlayHandles(targetCtx, transform) {
  if (!transform || !state.overlay.enabled || !state.overlay.image) return;
  const dims = getOverlayDimensions(transform);
  const halfW = dims.width / 2;
  const halfH = dims.height / 2;
  const corners = [
    { x: -halfW, y: -halfH },
    { x: halfW, y: -halfH },
    { x: halfW, y: halfH },
    { x: -halfW, y: halfH }
  ];
  const screenCorners = corners.map((corner) => overlayLocalToCanvas(corner, transform));
  const topCenter = overlayLocalToCanvas({ x: 0, y: -halfH }, transform);
  const rotateHandle = overlayLocalToCanvas({ x: 0, y: -halfH - OVERLAY_ROTATE_OFFSET }, transform);
  targetCtx.save();
  targetCtx.lineWidth = 1.5;
  targetCtx.strokeStyle = 'rgba(97, 233, 255, 0.9)';
  targetCtx.beginPath();
  screenCorners.forEach((point, index) => {
    if (index === 0) targetCtx.moveTo(point.x, point.y);
    else targetCtx.lineTo(point.x, point.y);
  });
  targetCtx.closePath();
  targetCtx.stroke();
  screenCorners.forEach((point) => {
    targetCtx.beginPath();
    targetCtx.fillStyle = '#02030a';
    targetCtx.strokeStyle = 'rgba(97, 233, 255, 0.9)';
    targetCtx.rect(point.x - 6, point.y - 6, 12, 12);
    targetCtx.fill();
    targetCtx.stroke();
  });
  targetCtx.beginPath();
  targetCtx.moveTo(topCenter.x, topCenter.y);
  targetCtx.lineTo(rotateHandle.x, rotateHandle.y);
  targetCtx.stroke();
  targetCtx.beginPath();
  targetCtx.arc(rotateHandle.x, rotateHandle.y, 8, 0, TAU);
  targetCtx.stroke();
  targetCtx.restore();
}

function getOverlayDimensions(transform) {
  const image = state.overlay.image;
  if (!image) return { width: 0, height: 0 };
  return {
    width: image.width * transform.scale,
    height: image.height * transform.scale
  };
}

function overlayCenterInPixels(transform) {
  return {
    x: transform.position.x * elements.stage.width,
    y: transform.position.y * elements.stage.height
  };
}

function overlayLocalToCanvas(localPoint, transform) {
  const center = overlayCenterInPixels(transform);
  const rad = degToRad(transform.rotation || 0);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: center.x + localPoint.x * cos - localPoint.y * sin,
    y: center.y + localPoint.x * sin + localPoint.y * cos
  };
}

function canvasToOverlayLocal(canvasPoint, transform) {
  const center = overlayCenterInPixels(transform);
  const dx = canvasPoint.x - center.x;
  const dy = canvasPoint.y - center.y;
  const rad = degToRad(transform.rotation || 0);
  const cos = Math.cos(-rad);
  const sin = Math.sin(-rad);
  return {
    x: dx * cos - dy * sin,
    y: dx * sin + dy * cos
  };
}

function drawSegment(ctx2d, from, to) {
  ctx2d.beginPath();
  ctx2d.moveTo(from.x, from.y);
  ctx2d.lineTo(to.x, to.y);
  ctx2d.stroke();
}

function resolveFoot(hip, limb, stepWidth, liftHeight, groundY) {
  const phase = limb?.phase ?? 0;
  const lift = limb?.lift ?? 0;
  return {
    x: hip.x + phase * stepWidth,
    y: groundY - lift * liftHeight
  };
}

function resolveHand(shoulders, limb, reachBase, scale) {
  const phase = limb?.phase ?? 0;
  const lift = limb?.lift ?? 0.4;
  const actualReach = reachBase * (limb?.reach ?? 1);
  const vertical = lift * 50 * scale;
  return {
    x: shoulders.x + phase * actualReach,
    y: shoulders.y - (vertical - 10 * scale)
  };
}

function drawHead(targetCtx, center, radius, expression, pose) {
  targetCtx.save();
  targetCtx.lineWidth = Math.max(2, state.thickness * 0.8);
  targetCtx.strokeStyle = state.primaryColor;
  if (state.options.glow) {
    targetCtx.shadowBlur = 12;
    targetCtx.shadowColor = state.accentColor;
  }
  targetCtx.beginPath();
  targetCtx.arc(center.x, center.y, radius, 0, TAU);
  targetCtx.stroke();
  targetCtx.restore();

  drawFaceFeatures(targetCtx, center, radius, expression, pose);
}

function drawFaceFeatures(ctx2d, center, radius, expression, pose) {
  const mouthIntensity = Math.min(1, (pose.mouthOpen || 0) + expression.mouth.open);
  const browLift = expression.brow.lift + (pose.expressionBoost || 0);
  const leftEyeCenter = { x: center.x - radius * 0.4, y: center.y - radius * 0.1 };
  const rightEyeCenter = { x: center.x + radius * 0.4, y: center.y - radius * 0.1 };
  ctx2d.save();
  ctx2d.strokeStyle = state.primaryColor;
  ctx2d.lineWidth = Math.max(1.5, state.thickness * 0.35);
  ctx2d.lineCap = 'round';

  drawEye(ctx2d, leftEyeCenter, radius, expression.eyes, -1);
  drawEye(ctx2d, rightEyeCenter, radius, expression.eyes, 1);

  drawMouth(ctx2d, center, radius, expression.mouth.shape, mouthIntensity);
  drawBrows(ctx2d, leftEyeCenter, rightEyeCenter, expression.brow, browLift);
  ctx2d.restore();
}

function drawEye(ctx2d, eyeCenter, radius, eyes, direction) {
  const tilt = eyes.tilt * direction;
  ctx2d.save();
  ctx2d.translate(eyeCenter.x, eyeCenter.y);
  ctx2d.rotate(tilt);
  ctx2d.beginPath();
  if (eyes.shape === 'arc') {
    ctx2d.arc(0, 0, radius * 0.25, Math.PI * 0.1, Math.PI - Math.PI * 0.1);
  } else if (eyes.shape === 'slash') {
    ctx2d.moveTo(-radius * 0.2, radius * 0.1);
    ctx2d.lineTo(radius * 0.2, -radius * 0.1);
  } else if (eyes.shape === 'wide') {
    ctx2d.ellipse(0, 0, radius * 0.22, radius * 0.16 * eyes.open, 0, 0, TAU);
  } else {
    ctx2d.moveTo(-radius * 0.15, 0);
    ctx2d.lineTo(radius * 0.15, 0);
  }
  ctx2d.stroke();
  ctx2d.restore();
}

function drawMouth(ctx2d, center, radius, shape, openness) {
  ctx2d.beginPath();
  const y = center.y + radius * 0.45;
  if (shape === 'smile') {
    ctx2d.arc(center.x, y, radius * 0.35, 0, Math.PI);
  } else if (shape === 'open') {
    ctx2d.ellipse(center.x, y, radius * 0.35, radius * 0.2 * openness, 0, 0, TAU);
  } else if (shape === 'oval') {
    ctx2d.ellipse(center.x, y, radius * 0.25, radius * 0.25 * openness, 0, 0, TAU);
  } else {
    ctx2d.moveTo(center.x - radius * 0.35, y);
    ctx2d.quadraticCurveTo(center.x, y + radius * 0.15 * openness, center.x + radius * 0.35, y);
  }
  ctx2d.stroke();
}

function drawBrows(ctx2d, leftEye, rightEye, brow, lift) {
  ctx2d.save();
  ctx2d.lineWidth = Math.max(1.5, state.thickness * 0.3);
  const offset = lift * 12;
  const tilt = brow.angle || 0;
  ctx2d.beginPath();
  ctx2d.moveTo(leftEye.x - 12, leftEye.y - 12 - offset);
  ctx2d.lineTo(leftEye.x + 12, leftEye.y - 12 - offset + tilt * 10);
  ctx2d.moveTo(rightEye.x - 12, rightEye.y - 12 - offset - tilt * 10);
  ctx2d.lineTo(rightEye.x + 12, rightEye.y - 12 - offset);
  ctx2d.stroke();
  ctx2d.restore();
}

function drawAccessory(ctx2d, skeleton) {
  const shoulders = skeleton.points.shoulders;
  const headCenter = skeleton.points.head;
  const scale = skeleton.metrics.scale;
  ctx2d.save();
  ctx2d.strokeStyle = state.accentColor;
  ctx2d.lineWidth = Math.max(2, state.thickness * 0.5);
  ctx2d.beginPath();
  ctx2d.moveTo(shoulders.x - 30 * scale, shoulders.y + 8 * scale);
  ctx2d.lineTo(shoulders.x + 30 * scale, shoulders.y - 4 * scale);
  ctx2d.stroke();
  ctx2d.beginPath();
  ctx2d.arc(headCenter.x, headCenter.y - 14 * scale, 26 * scale, Math.PI * 0.65, Math.PI * 0.35, true);
  ctx2d.stroke();
  ctx2d.restore();
}

function drawGroundShadow(ctx2d, centerX, groundY) {
  ctx2d.save();
  ctx2d.filter = 'blur(12px)';
  ctx2d.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx2d.beginPath();
  ctx2d.ellipse(centerX, groundY + 4, 70, 16, 0, 0, TAU);
  ctx2d.fill();
  ctx2d.restore();
}

async function exportSequence() {
  if (!window.JSZip || !window.saveAs) {
    setStatus('CDN blocked: unable to export.', 'error');
    return;
  }
  elements.exportBtn.disabled = true;
  try {
    setStatus('Rendering PNG frames…', 'busy');
    const zip = new window.JSZip();
    const offscreen = document.createElement('canvas');
    offscreen.width = elements.stage.width;
    offscreen.height = elements.stage.height;
    const offCtx = offscreen.getContext('2d');
    const frames = 48;
    for (let i = 0; i < frames; i += 1) {
      const progress = i / frames;
      const frameOverride = state.customAnimator.enabled ? i % state.customAnimator.frameCount : undefined;
      renderFrame(offCtx, progress, frameOverride);
      const data = offscreen.toDataURL('image/png').split(',')[1];
      zip.file(`frame_${String(i + 1).padStart(2, '0')}.png`, data, { base64: true });
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    window.saveAs(blob, `stickmotion-${state.actionId}.zip`);
    setStatus('PNG sequence ready.', 'info');
  } catch (error) {
    console.error('Export failed', error);
    setStatus('Export failed. Check console.', 'error');
  } finally {
    elements.exportBtn.disabled = false;
  }
}

function setStatus(message, tone = 'ready') {
  elements.statusChip.textContent = message;
  elements.statusChip.dataset.tone = tone;
  if (statusTimer) clearTimeout(statusTimer);
  if (tone !== 'ready') {
    statusTimer = setTimeout(() => {
      elements.statusChip.textContent = 'Ready';
      elements.statusChip.dataset.tone = 'ready';
    }, 4000);
  }
}

init();
