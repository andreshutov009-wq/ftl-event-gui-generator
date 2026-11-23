const VANILLA_EVENT_LIST = [
      'START_GAME', 'START_BEACON', 'START_BEACON_FED', 'START_BEACON_ENGI',
      'START_BEACON_MANTIS', 'START_BEACON_ZOLTAN', 'START_BEACON_ROCK',
      'START_BEACON_SLUG', 'START_BEACON_CRYSTAL', 'START_BEACON_LANIUS',
      'NOTHING', 'STORE', 'DISTRESS_BEACON', 'NEBULA_EMPTY', 'PIRATE_CIVILIAN',
      'FEDERATION_BASE', 'REBEL_VS_FEDERATION', 'MERCENARY', 'ASTEROID_EXPLORE',
      'QUEST_ESCORT', 'BOSS_AUTOMATED', 'BOSS_STANDARD'
    ];
    const VANILLA_OVERRIDE_IDS = new Set(VANILLA_EVENT_LIST);

    const FTLMAN_SUPPORTED_MOD_COMMANDS = new Set([
      'mod:findName',
      'mod:findComposite',
      'mod:findWithChildLike',
      'mod:setValue',
      'mod:remove',
      'mod:par',
      'mod:selector'
    ]);

    const DEFAULT_SPRITE_CATEGORIES = [
      'Crew-Sprite-Sheet',
      'Waffe',
      'Drohne',
      'Treibstoff',
      'Schiff',
      'Achievement',
      'Quest-Schiff'
    ];

    const DEFAULT_SECTORS = [
      'General / Sector-Independent',
      'CIVILIAN_SECTOR',
      'ENGI_SECTOR',
      'MANTIS_SECTOR',
      'ROCK_SECTOR',
      'ZOLTAN_SECTOR',
      'SLUG_SECTOR',
      'CRYSTAL_SECTOR',
      'LANIUS_SECTOR',
      'REBEL_SECTOR',
      'NEBULA_SECTOR'
    ];

    const QUEST_STAGE_PRESETS = [
      { value: 'Normal Event', hint: 'Standard-Begegnung' },
      { value: 'Stage 1: Quest Start', hint: 'Startet Quest-Kette' },
      { value: 'Stufe 2: Zwischenschritt (Neue Etappe anlegen)', hint: 'Hängt neue Etappe an' },
      { value: 'Stufe 2: Zwischenschritt (Aktuelles Event)', hint: 'Mittelteil der Kette' },
      { value: 'Stage 3: Quest End (Reward / Resolution)', hint: 'Finaler Abschluss' },
      { value: 'Als Quest-Referenz merken', hint: 'Für <quest event="...">' }
    ];

    const CREW_CLASSES = ['human', 'engi', 'mantis', 'rock', 'zoltan', 'slug', 'crystal', 'lanius'];

    const SUGGESTIONS = {
      eventIds: [...VANILLA_EVENT_LIST],
      sectors: [...DEFAULT_SECTORS],
      questStages: QUEST_STAGE_PRESETS.map(p => p.value),
      weapons: [
        'LASER_BURST_1', 'LASER_BURST_2', 'LASER_BURST_2_ENEMY', 'LASER_BURST_3', 'LASER_BURST_5',
        'LASER_HEAVY_1', 'LASER_HEAVY_2', 'LASER_CHARGEDGUN', 'LASER_CHAINGUN', 'LASER_CHAINGUN_2',
        'FLAK_1', 'FLAK_2', 'FLAK_2_ENEMY',
        'BEAM_1', 'BEAM_2', 'BEAM_3', 'BEAM_4', 'BEAM_5', 'BEAM_6', 'BEAM_7', 'BEAM_BIO', 'BEAM_HULL',
        'GLAIVE_BEAM', 'HALBERD_BEAM', 'PIKE_BEAM', 'FIRE_BEAM', 'ANTI_BIO_BEAM', 'HULL_BEAM',
        'ION_1', 'ION_2', 'ION_4', 'ION_BLAST_1', 'ION_BLAST_2', 'ION_STUN', 'ION_CHAINGUN', 'ION_CHARGED',
        'MISSILES_1', 'MISSILES_2', 'MISSILES_3', 'MISSILES_BREACH', 'MISSILES_FIRE', 'MISSILES_HULL',
        'MISSILES_BURST', 'MISSILES_SWARM', 'MISSILES_PHEROMONE', 'MISSILES_ION', 'MISSILES_REPAIR',
        'BOMB_1', 'BOMB_2', 'BOMB_FIRE', 'BOMB_ION', 'BOMB_BREACH', 'BOMB_HEAL', 'BOMB_LOCK', 'BOMB_STUN',
        'CRYSTAL_BURST_1', 'CRYSTAL_BURST_2', 'CRYSTAL_HEAVY_1', 'CRYSTAL_HEAVY_2', 'CRYSTAL_LOCK',
        'ARTILLERY_FED', 'BOSS_1', 'BOSS_2', 'BOSS_3', 'BOSS_4', 'BOSS_5', 'BOSS_6', 'BOSS_7', 'BOSS_8'
      ],
      drones: ['COMBAT_1', 'COMBAT_2', 'BEAM_1', 'BEAM_2', 'DEFENSE_1', 'DEFENSE_2', 'ANTI_DRONE', 'REPAIR', 'BOARDER'],
      augments: ['SCRAP_COLLECTOR', 'PRE_IGNITER', 'AUTO_COOLDOWN', 'SHIELD_RECHARGE', 'LONG_RANGE_SCANNERS', 'ZOLTAN_SHIELD', 'CLOAK_FIRE', 'ADV_SCANNERS'],
      reqs: ['sensors', 'medbay', 'clonebay', 'teleporter', 'cloaking', 'hacking', 'mind', 'drones', 'weapons', 'shields', 'engines', 'piloting', 'zoltan', 'engi', 'mantis', 'rock', 'slug', 'crystal', 'lanius', 'human'],
      achievements: [],
      ships: ['REBEL_AUTO', 'REBEL_RIGGER', 'PIRATE_FIGHTER', 'MANTIS_FIGHTER', 'ROCK_FIGHTER', 'SLUG_INTERCEPTOR', 'ENGI_BOMBER', 'PLAYER_SHIP_HARD', 'PLAYER_SHIP_STEALTH', 'PLAYER_SHIP_MANTIS'],
      spriteCategories: [...DEFAULT_SPRITE_CATEGORIES]
    };

    let quickPresets = [
      'Continue...',
      'Hail them.',
      'Attack the ship!',
      'Ignore and move on.',
      '(Sensors) Scan the debris field.',
      '(Engi) Send a drone to repair the hull.'
    ];

    function createDefaultChoice(text = '') {
      return {
        id: 'ch_' + Math.random().toString(36).slice(2, 9),
        text,
        outcomeText: '',
        effects: createDefaultEffects()
      };
    }

    function createDefaultEffects() {
      return {
        req: '', reqLvl: 1, rewardMode: 'custom', condition: '',
        scrap: 0, fuel: 0, missiles: 0, drones: 0, hull: 0, crew: 0,
        weapon: '', drone: '', augment: '', ship: '', quest: '', hsVar: '',
        achId: '', achShip: '', achText: '', achTrigger: 'choice', achArtworkName: '', achArtworkDataUrl: ''
      };
    }

    function createDefaultEventObj(index = 1, sourceFile = 'Custom Events', sector = 'General / Sector-Independent') {
      return {
        name: `CUSTOM_EVENT_${index}`,
        sector,
        questStageLabel: 'Normal Event',
        questRole: 'normal',
        questChainId: '',
        questStepOrder: 0,
        overrideExisting: false,
        sourceFile,
        text: '',
        choices: [createDefaultChoice('Continue...')]
      };
    }

    function createDefaultShip(index = 1, layout = 'kestral') {
      const cleanLayout = String(layout || 'kestral').trim() || 'kestral';
      const derivedId = sanitizeID(cleanLayout) || `CUSTOM_SHIP_${index}`;
      return {
        id: 'sh_' + Math.random().toString(36).slice(2, 9),
        name: derivedId,
        layout: cleanLayout,
        img: cleanLayout,
        hull: 30,
        weaponSlots: 4,
        unlockQuest: '',
        unlockNote: '',
        weapons: ['LASER_BURST_2'],
        crew: [{ class: 'human', amount: 2 }]
      };
    }

    function createDefaultWeapon(index = 1) {
      return {
        id: 'wp_' + Math.random().toString(36).slice(2, 9),
        name: `CUSTOM_LASER_${index}`,
        type: 'LASER',
        title: `Custom Laser Mk ${index}`,
        desc: 'Eigene Mod-Waffe mit konfigurierbarer Feuerrate und Schaden.',
        damage: 1,
        shots: 2,
        cooldown: 11,
        power: 2,
        missiles: 0,
        cost: 50,
        weaponArt: 'laser_burst_1'
      };
    }

    // Startet immer mit 1 bearbeitbarem Event, damit Text & Antwort-Option sofort beschreibbar sind
    let eventsCollection = [createDefaultEventObj(1)];
    let selectedModFilter = '__ALL__';
    let shipsCollection = [createDefaultShip(1, 'kestral')];
    let currentShipIndex = 0;
    let weaponsCollection = [createDefaultWeapon(1)];
    let currentWeaponIndex = 0;
    let exportedQuests = [];
    let spritesCollection = [];
    let spritePickerMode = null;
    let currentIndex = 0;
    let activeChoiceIndex = 0;

    function getCurrentEvent() {
      if (!eventsCollection.length) {
        eventsCollection.push(createDefaultEventObj(1));
        currentIndex = 0;
      }
      if (currentIndex < 0 || currentIndex >= eventsCollection.length) {
        currentIndex = 0;
      }
      return eventsCollection[currentIndex];
    }

    function getCurrentShip() {
      return shipsCollection[currentShipIndex] || null;
    }

    function getCurrentWeapon() {
      return weaponsCollection[currentWeaponIndex] || null;
    }

    function sanitizeID(val) {
      return String(val || '').toUpperCase().replace(/[^A-Z0-9_]/g, '_').replace(/_+/g, '_');
    }

    function addSuggestionEntry(type, value) {
      const clean = String(value || '').trim();
      if (!clean) return;
      if (!SUGGESTIONS[type]) SUGGESTIONS[type] = [];
      if (!SUGGESTIONS[type].includes(clean)) {
        SUGGESTIONS[type].push(clean);
      }
    }

    function escapeXML(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function decodeTextContent(raw) {
      return String(raw || '')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
    }

    /* Dropdown + Vorschläge im Header */
    function showComboSuggestions(type, query = '') {
      const box = document.getElementById('sug-' + type);
      if (!box) return;
      const q = String(query || '').trim().toLowerCase();

      let items = [];
      if (type === 'questStages') {
        const dynamicStages = SUGGESTIONS.questStages
          .filter(v => !QUEST_STAGE_PRESETS.some(p => p.value === v))
          .map(v => ({ value: v, hint: 'Eigene Stufe' }));
        items = [...QUEST_STAGE_PRESETS, ...dynamicStages];
      } else {
        const rawList = SUGGESTIONS[type] || [];
        items = rawList.map(v => ({ value: v, hint: '' }));
      }

      const filtered = items.filter(it => !q || it.value.toLowerCase().includes(q));
      if (!filtered.length) {
        box.style.display = 'none';
        return;
      }

      box.innerHTML = filtered.map(it => {
        const safeVal = escapeXML(it.value).replace(/'/g, "\\'");
        return `<div class="suggestion-item" onmousedown="event.preventDefault(); pickComboSuggestion('${type}', '${safeVal}')">
          <span>${escapeXML(it.value)}</span>
          ${it.hint ? `<span class="suggestion-hint">${escapeXML(it.hint)}</span>` : ''}
        </div>`;
      }).join('');
      box.style.display = 'block';
    }

    function toggleComboSuggestions(type) {
      const box = document.getElementById('sug-' + type);
      if (!box) return;
      if (box.style.display === 'block') {
        box.style.display = 'none';
      } else {
        showComboSuggestions(type, '');
      }
    }

    function hideSuggestions(type) {
      const box = document.getElementById('sug-' + type);
      if (box) box.style.display = 'none';
    }

    function pickComboSuggestion(type, val) {
      hideSuggestions(type);
      if (type === 'eventIds') {
        const inputEl = document.getElementById('event-name-input');
        inputEl.value = val;
        handleEventNameInput(inputEl);
      } else if (type === 'sectors') {
        const inputEl = document.getElementById('event-sector-input');
        inputEl.value = val;
        handleEventSectorInput(inputEl);
      } else if (type === 'questStages') {
        applyQuestStageSelection(val);
      }
    }

    function handleQuestStageInput(el) {
      const ev = getCurrentEvent();
      const val = el.value.trim();
      ev.questStageLabel = val || 'Normal Event';
      if (val) addSuggestionEntry('questStages', val);
      const lower = val.toLowerCase();
      if (lower.includes('anfang') || lower.includes('start') || lower.includes('stufe 1')) {
        ev.questRole = 'start';
        if (!ev.questChainId) ev.questChainId = ev.name;
        ev.questStepOrder = 1;
      } else if (lower.includes('ende') || lower.includes('abschluss') || lower.includes('stufe 3')) {
        ev.questRole = 'end';
      } else if (lower.includes('zwischen') || lower.includes('etappe') || lower.includes('stufe 2')) {
        ev.questRole = 'step';
      } else if (lower === 'normales event' || !val) {
        ev.questRole = 'normal';
      } else {
        ev.questRole = 'step';
      }
      renderQuestChainStrip(ev);
    }

    function applyQuestStageSelection(val) {
      const ev = getCurrentEvent();
      const inputEl = document.getElementById('quest-stage-input');
      inputEl.value = val;

      if (val.includes('Neue Etappe anlegen')) {
        addIntermediateQuestStep();
        return;
      }
      if (val === 'Als Quest-Referenz merken') {
        exportCurrentQuestReference();
        return;
      }

      ev.questStageLabel = val;
      addSuggestionEntry('questStages', val);

      if (val.startsWith('Stufe 1')) {
        markCurrentEventAsQuestStart();
      } else if (val.startsWith('Stufe 3')) {
        markCurrentEventAsQuestEnd();
      } else if (val.startsWith('Stufe 2')) {
        ev.questRole = 'step';
        if (!ev.questChainId) ev.questChainId = ev.name;
        relinkQuestChain(ev.questChainId);
    
    let currentUILang = 'de';
    const UI_TEXTS = {
      de: {
        uploadBtn: '↑ XML / .append / .FTL laden',
        newEventBtn: '+ Neues Event',
        weaponsBtn: '🔫 Waffen',
        shipsBtn: '🚀 Schiffe',
        spritesBtn: '🖼️ Sprites',
        filesBtn: '📁 Dateien',
        vanillaBtn: '⚡ Vanilla (.ftl)',
        hsBtn: '🚀 Hyperspace (.ftl)',
        modLabel: 'Mod / Datei:',
        eventLabel: 'Event:',
        deleteEventBtn: '✕ Event',
        readyStatus: 'Bereit',
        eventIdLabel: 'Event-ID (Dropdown & eigene ID)',
        sectorLabel: 'Sektor (Dropdown & eigener Sektor)',
        stageLabel: 'Quest-Stufe / Ablauf-Typ (Dropdown & Vorschläge)',
        mainTextLabel: 'Haupttext (Situation)',
        mainTextHint: 'Rechtsklick für weitere Aktionen',
        mainTextPlaceholder: 'Schreibe hier die Hauptbeschreibung des Events...',
        choicesLabel: 'Auswahl-Optionen (anklicken zum Bearbeiten der Antwort, Rechtsklick für Belohnungen & Konsequenzen)',
        effectsBtnPrefix: '🎁 Belohnungen & Konsequenzen (#',
        addChoiceBtn: '+ Auswahl-Option hinzufügen',
        presetsBtn: '✎ Quick-Presets anpassen',
        outcomeEditBtn: '🎁 Belohnung / Konsequenz bearbeiten',
        swapBtn: '⇅ Mit Haupttext tauschen',
        outcomePlaceholder: 'Schreibe hier die Antwort / Konsequenz, die erscheint, wenn der Spieler diese Option anklickt...',
        lintCheckBtn: 'Jetzt prüfen'
      },
      en: {
        uploadBtn: '↑ Load XML / .append / .FTL',
        newEventBtn: '+ New Event',
        weaponsBtn: '🔫 Weapons',
        shipsBtn: '🚀 Ships',
        spritesBtn: '🖼️ Sprites',
        filesBtn: '📁 Files',
        vanillaBtn: '⚡ Vanilla (.ftl)',
        hsBtn: '🚀 Hyperspace (.ftl)',
        modLabel: 'Mod / File:',
        eventLabel: 'Event:',
        deleteEventBtn: '✕ Event',
        readyStatus: 'Ready',
        eventIdLabel: 'Event ID (Dropdown & Custom ID)',
        sectorLabel: 'Sector (Dropdown & Custom Sector)',
        stageLabel: 'Quest Stage / Flow Type (Dropdown & Suggestions)',
        mainTextLabel: 'Main Text (Situation)',
        mainTextHint: 'Right-click for more actions',
        mainTextPlaceholder: 'Write the main event description here...',
        choicesLabel: 'Choice Options (click to edit reply, right-click for rewards & consequences)',
        effectsBtnPrefix: '🎁 Rewards & Consequences (#',
        addChoiceBtn: '+ Add Choice Option',
        presetsBtn: '✎ Edit Quick Presets',
        outcomeEditBtn: '🎁 Edit Reward / Consequence',
        swapBtn: '⇅ Swap with Main Text',
        outcomePlaceholder: 'Write the reply / consequence that appears when the player clicks this option...',
        lintCheckBtn: 'Check Now'
      }
    };

    function setUILanguage(lang) {
      currentUILang = (lang === 'en') ? 'en' : 'de';
      document.documentElement.lang = currentUILang;
      const t = UI_TEXTS[currentUILang];

      const setText = (sel, txt) => {
        const el = document.querySelector(sel);
        if (el) el.textContent = txt;
      };
      const setAttr = (sel, attr, val) => {
        const el = document.querySelector(sel);
        if (el) el.setAttribute(attr, val);
      };

      const topBtns = document.querySelectorAll('.topbar-actions > button.btn');
      if (topBtns[0]) topBtns[0].textContent = t.uploadBtn;
      if (topBtns[1]) topBtns[1].textContent = t.newEventBtn;
      if (topBtns[2]) topBtns[2].firstChild.textContent = t.weaponsBtn + ' (';
      if (topBtns[3]) topBtns[3].firstChild.textContent = t.shipsBtn + ' (';
      if (topBtns[4]) topBtns[4].firstChild.textContent = t.spritesBtn + ' (';
      if (topBtns[5]) topBtns[5].firstChild.textContent = t.filesBtn + ' (';
      if (topBtns[6]) topBtns[6].textContent = t.vanillaBtn;
      if (topBtns[7]) topBtns[7].textContent = t.hsBtn;

      const navLabels = document.querySelectorAll('.nav-bar .nav-label');
      if (navLabels[0]) navLabels[0].textContent = t.modLabel;
      if (navLabels[1]) navLabels[1].textContent = t.eventLabel;
      const delEvBtn = document.querySelector('.nav-bar .btn-danger');
      if (delEvBtn) delEvBtn.textContent = t.deleteEventBtn;

      const headerLabels = document.querySelectorAll('.ftl-header-grid .combo-field > label');
      if (headerLabels[0]) headerLabels[0].textContent = t.eventIdLabel;
      if (headerLabels[1]) headerLabels[1].textContent = t.sectorLabel;
      if (headerLabels[2]) headerLabels[2].textContent = t.stageLabel;

      const secLabels = document.querySelectorAll('.section-block > .section-label');
      if (secLabels[0]) {
        const spans = secLabels[0].querySelectorAll('span');
        if (spans[0]) spans[0].textContent = t.mainTextLabel;
        if (spans[1]) spans[1].textContent = t.mainTextHint;
      }
      if (secLabels[1]) {
        const firstSpan = secLabels[1].querySelector('span');
        if (firstSpan) firstSpan.textContent = t.choicesLabel;
        const effBtn = secLabels[1].querySelector('button');
        if (effBtn && effBtn.firstChild) effBtn.firstChild.textContent = t.effectsBtnPrefix;
      }

      setAttr('#main-event-text', 'placeholder', t.mainTextPlaceholder);
      setAttr('#inline-outcome-text', 'placeholder', t.outcomePlaceholder);

      const choiceBarBtns = document.querySelectorAll('.add-choice-bar > button');
      if (choiceBarBtns[0]) choiceBarBtns[0].textContent = t.addChoiceBtn;
      if (choiceBarBtns[1]) choiceBarBtns[1].textContent = t.presetsBtn;

      const outcomeBtns = document.querySelectorAll('.outcome-box-header button');
      if (outcomeBtns[0]) outcomeBtns[0].textContent = t.outcomeEditBtn;
      if (outcomeBtns[1]) outcomeBtns[1].textContent = t.swapBtn;

      const lintBtn = document.querySelector('.lint-title button');
      if (lintBtn) lintBtn.textContent = t.lintCheckBtn;

      renderAll();
    }

    renderAll();
      } else {
        ev.questRole = 'normal';
        ev.questChainId = '';
        ev.questStepOrder = 0;
        renderAll();
      }
    }

    function createNewEvent() {
      const cur = getCurrentEvent();
      const nextEv = createDefaultEventObj(
        eventsCollection.length + 1,
        cur ? cur.sourceFile : 'Custom Events',
        cur ? cur.sector : 'General / Sector-Independent'
      );
      eventsCollection.push(nextEv);
      currentIndex = eventsCollection.length - 1;
      activeChoiceIndex = 0;
      renderAll();
    }

    function deleteCurrentEvent() {
      if (eventsCollection.length <= 1) {
        eventsCollection[0] = createDefaultEventObj(1);
        currentIndex = 0;
        activeChoiceIndex = 0;
        renderAll();
        return;
      }
      eventsCollection.splice(currentIndex, 1);
      currentIndex = Math.max(0, Math.min(currentIndex, eventsCollection.length - 1));
      activeChoiceIndex = 0;
      renderAll();
    }

    function getQuestChainEvents(chainId) {
      if (!chainId) return [];
      return eventsCollection
        .map((ev, idx) => ({ ev, idx }))
        .filter(item => item.ev.questChainId === chainId)
        .sort((a, b) => (a.ev.questStepOrder || 0) - (b.ev.questStepOrder || 0));
    }

    function relinkQuestChain(chainId) {
      const chain = getQuestChainEvents(chainId);
      if (chain.length < 2) return;
      for (let i = 0; i < chain.length - 1; i++) {
        const curEv = chain[i].ev;
        const nextEv = chain[i + 1].ev;
        if (!curEv.choices.length) {
          curEv.choices.push(createDefaultChoice('Continue...'));
        }
        curEv.choices[0].effects.quest = nextEv.name;
      }
    }

    function markCurrentEventAsQuestStart() {
      const ev = getCurrentEvent();
      ev.questRole = 'start';
      ev.questStageLabel = 'Stage 1: Quest Start';
      if (!ev.questChainId) ev.questChainId = ev.name;
      ev.questStepOrder = 1;
      if (!exportedQuests.includes(ev.name)) exportedQuests.push(ev.name);
      addSuggestionEntry('eventIds', ev.name);
      relinkQuestChain(ev.questChainId);
      renderAll();
    }

    function addIntermediateQuestStep() {
      const cur = getCurrentEvent();
      if (cur.questRole === 'normal') {
        cur.questRole = 'start';
        cur.questStageLabel = 'Stage 1: Quest Start';
        if (!cur.questChainId) cur.questChainId = cur.name;
        cur.questStepOrder = 1;
        if (!exportedQuests.includes(cur.name)) exportedQuests.push(cur.name);
      }

      const chainId = cur.questChainId || cur.name;
      cur.questChainId = chainId;

      const existingChain = getQuestChainEvents(chainId);
      const stepEvents = existingChain.filter(x => x.ev.questRole === 'step');
      const stepNum = stepEvents.length + 1;
      const newStepName = sanitizeID(`${chainId}_STEP_${stepNum}`);

      const newStepEvent = {
        name: newStepName,
        sector: cur.sector || 'General / Sector-Independent',
        questStageLabel: `Stufe 2: Zwischenschritt #${stepNum}`,
        questRole: 'step',
        questChainId: chainId,
        questStepOrder: (cur.questStepOrder || 1) + 1,
        overrideExisting: false,
        sourceFile: cur.sourceFile || 'Custom Events',
        text: `Etappe ${stepNum} der Quest (${chainId}): Was unternimmt die Crew als Nächstes?`,
        choices: [createDefaultChoice('Continue to the next clue...')]
      };

      const insertPos = currentIndex + 1;
      eventsCollection.splice(insertPos, 0, newStepEvent);

      const updatedChain = getQuestChainEvents(chainId);
      const starts = updatedChain.filter(x => x.ev.questRole === 'start');
      const steps = updatedChain.filter(x => x.ev.questRole === 'step');
      const ends = updatedChain.filter(x => x.ev.questRole === 'end');

      let orderCounter = 1;
      starts.forEach(x => { x.ev.questStepOrder = orderCounter++; });
      steps.forEach(x => { x.ev.questStepOrder = orderCounter++; });
      ends.forEach(x => { x.ev.questStepOrder = orderCounter++; });

      if (!exportedQuests.includes(newStepName)) exportedQuests.push(newStepName);
      addSuggestionEntry('eventIds', newStepName);
      relinkQuestChain(chainId);

      currentIndex = insertPos;
      activeChoiceIndex = 0;
      renderAll();
    }

    function markCurrentEventAsQuestEnd() {
      const ev = getCurrentEvent();
      ev.questRole = 'end';
      ev.questStageLabel = 'Stage 3: Quest End (Reward / Resolution)';
      if (!ev.questChainId) {
        const prevQuestStart = [...eventsCollection].reverse().find(item => item !== ev && item.questChainId);
        ev.questChainId = prevQuestStart ? prevQuestStart.questChainId : ev.name;
      }
      const chain = getQuestChainEvents(ev.questChainId);
      const maxOrder = chain.reduce((m, item) => Math.max(m, item.ev.questStepOrder || 0), 1);
      ev.questStepOrder = maxOrder + 1;
      if (!exportedQuests.includes(ev.name)) exportedQuests.push(ev.name);
      addSuggestionEntry('eventIds', ev.name);
      relinkQuestChain(ev.questChainId);
      renderAll();
    }

    function exportCurrentQuestReference() {
      const ev = getCurrentEvent();
      if (ev.questRole === 'normal') {
        ev.questRole = 'start';
        ev.questStageLabel = 'Stage 1: Quest Start';
        if (!ev.questChainId) ev.questChainId = ev.name;
        ev.questStepOrder = 1;
      }
      if (!exportedQuests.includes(ev.name)) exportedQuests.push(ev.name);
      addSuggestionEntry('eventIds', ev.name);
      relinkQuestChain(ev.questChainId);
      renderAll();
      alert(`Quest „${ev.name}“ wurde gespeichert und steht jetzt in <quest event="..."> und den Vorschlägen bereit.`);
    }

    function renderQuestChainStrip(ev) {
      const strip = document.getElementById('quest-chain-strip');
      if (!strip) return;
      if (!ev || !ev.questChainId || ev.questRole === 'normal') {
        strip.style.display = 'none';
        strip.innerHTML = '';
        return;
      }
      const chain = getQuestChainEvents(ev.questChainId);
      if (!chain.length) {
        strip.style.display = 'none';
        strip.innerHTML = '';
        return;
      }
      strip.style.display = 'flex';
      const nodesHtml = chain.map((item, i) => {
        const roleLabel = item.ev.questRole === 'start'
          ? 'Start'
          : (item.ev.questRole === 'end' ? 'Ende' : `Etappe ${i}`);
        const cls = `quest-chain-node${item.idx === currentIndex ? ' current' : ''}`;
        return `<span class="${cls}" onclick="jumpToEvent(${item.idx})">[${roleLabel}] ${escapeXML(item.ev.name)}</span>`;
      }).join('<span style="color:#64748b;">➔</span>');

      strip.innerHTML = `<span style="color:#94a3b8;font-weight:600;">Quest-Verlauf:</span>${nodesHtml}`;
    }

    function renderNavigationDropdowns() {
      const modSel = document.getElementById('nav-mod-select');
      const evSel = document.getElementById('nav-event-select');
      if (!modSel || !evSel) return;

      const mods = Array.from(new Set(eventsCollection.map(e => e.sourceFile || 'Custom Events')));
      if (selectedModFilter !== '__ALL__' && !mods.includes(selectedModFilter)) {
        selectedModFilter = '__ALL__';
      }

      modSel.innerHTML = `<option value="__ALL__">Alle Mods / Dateien (${eventsCollection.length})</option>` +
        mods.map(m => {
          const cnt = eventsCollection.filter(e => (e.sourceFile || 'Custom Events') === m).length;
          return `<option value="${escapeXML(m)}" ${selectedModFilter === m ? 'selected' : ''}>${escapeXML(m)} (${cnt})</option>`;
        }).join('');

      const filteredEvents = eventsCollection
        .map((ev, idx) => ({ ev, idx }))
        .filter(x => selectedModFilter === '__ALL__' || (x.ev.sourceFile || 'Custom Events') === selectedModFilter);

      evSel.innerHTML = filteredEvents.map(({ ev, idx }) => {
        const secTag = ev.sector && ev.sector !== 'General / Sector-Independent' ? ` [${ev.sector}]` : '';
        return `<option value="${idx}" ${idx === currentIndex ? 'selected' : ''}>${escapeXML(ev.name)}${escapeXML(secTag)}</option>`;
      }).join('');
    }

    function handleNavModChange(val) {
      selectedModFilter = val;
      const matchingIdx = eventsCollection.findIndex(e => val === '__ALL__' || (e.sourceFile || 'Custom Events') === val);
      if (matchingIdx !== -1) {
        currentIndex = matchingIdx;
        activeChoiceIndex = 0;
      }
      renderAll();
    }

    function handleNavEventChange(idx) {
      if (idx >= 0 && idx < eventsCollection.length) {
        currentIndex = idx;
        activeChoiceIndex = 0;
        renderAll();
      }
    }

    function renderAll() {
      const ev = getCurrentEvent();
      renderNavigationDropdowns();

      document.getElementById('collection-count').textContent = eventsCollection.length;
      document.getElementById('sprite-count').textContent = spritesCollection.length;
      document.getElementById('ship-count').textContent = shipsCollection.length;
      document.getElementById('weapon-count').textContent = weaponsCollection.length;

      const idInput = document.getElementById('event-name-input');
      if (document.activeElement !== idInput) idInput.value = ev.name;

      const secInput = document.getElementById('event-sector-input');
      if (document.activeElement !== secInput) secInput.value = ev.sector || 'General / Sector-Independent';

      const stageInput = document.getElementById('quest-stage-input');
      if (document.activeElement !== stageInput) stageInput.value = ev.questStageLabel || 'Normal Event';

      renderQuestChainStrip(ev);

      const mainTa = document.getElementById('main-event-text');
      if (document.activeElement !== mainTa) mainTa.value = ev.text || '';

      renderChoices();
      renderOutcomeBox();
      runSlipstreamLint(false);
    }

    function renderChoices() {
      const ev = getCurrentEvent();
      const container = document.getElementById('choices-container');
      container.innerHTML = '';

      if (!ev.choices || !ev.choices.length) {
        ev.choices = [createDefaultChoice('Continue...')];
      }
      if (activeChoiceIndex < 0 || activeChoiceIndex >= ev.choices.length) {
        activeChoiceIndex = 0;
      }

      const btnNumEl = document.getElementById('active-choice-btn-num');
      if (btnNumEl) btnNumEl.textContent = activeChoiceIndex + 1;

      ev.choices.forEach((ch, idx) => {
        const row = document.createElement('div');
        const hasBlue = Boolean(ch.effects.req && ch.effects.req.trim());
        row.className = 'ftl-choice-row' + (idx === activeChoiceIndex ? ' active-choice' : '') + (hasBlue ? ' is-blue' : '');

        row.onclick = () => selectChoice(idx, true);
        row.oncontextmenu = (e) => {
          e.preventDefault();
          e.stopPropagation();
          selectChoice(idx, false);
          openChoiceContextMenu(e.clientX, e.clientY, idx);
        };

        const num = document.createElement('span');
        num.className = 'ftl-choice-num';
        num.textContent = `${idx + 1}.`;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'ftl-choice-input';
        input.value = ch.text;
        input.placeholder = 'Enter choice text...';
        input.onclick = (e) => {
          e.stopPropagation();
          selectChoice(idx, false);
        };
        input.onfocus = () => selectChoice(idx, false);
        input.oninput = (e) => {
          ch.text = e.target.value;
          runSlipstreamLint(false);
        };

        const pills = document.createElement('div');
        pills.className = 'choice-effect-pills';
        const ef = ch.effects;
        if (ef.condition && ef.condition.trim()) pills.innerHTML += `<span class="pill gold">If: ${escapeXML(ef.condition)}</span>`;
        if (ef.rewardMode === 'auto') pills.innerHTML += `<span class="pill blue">Auto-Reward</span>`;
        if (ef.req) pills.innerHTML += `<span class="pill blue">${escapeXML(ef.req)}</span>`;
        if (ef.scrap) pills.innerHTML += `<span class="pill ${ef.scrap > 0 ? 'green' : 'red'}">Scrap ${ef.scrap > 0 ? '+' + ef.scrap : ef.scrap}</span>`;
        if (ef.fuel) pills.innerHTML += `<span class="pill ${ef.fuel > 0 ? 'green' : 'red'}">Fuel ${ef.fuel > 0 ? '+' + ef.fuel : ef.fuel}</span>`;
        if (ef.hull) pills.innerHTML += `<span class="pill ${ef.hull > 0 ? 'green' : 'red'}">Hull ${ef.hull > 0 ? '+' + ef.hull : ef.hull}</span>`;
        if (ef.crew) pills.innerHTML += `<span class="pill ${ef.crew > 0 ? 'green' : 'red'}">Crew ${ef.crew > 0 ? '+1' : '-1'}</span>`;
        if (ef.weapon) pills.innerHTML += `<span class="pill green">${escapeXML(ef.weapon)}</span>`;
        if (ef.drone) pills.innerHTML += `<span class="pill green">${escapeXML(ef.drone)}</span>`;
        if (ef.augment) pills.innerHTML += `<span class="pill green">${escapeXML(ef.augment)}</span>`;
        if (ef.ship) pills.innerHTML += `<span class="pill red">Ship: ${escapeXML(ef.ship)}</span>`;
        if (ef.quest) pills.innerHTML += `<span class="pill gold">Quest ➔ ${escapeXML(ef.quest)}</span>`;
        if (ef.achId || ef.achShip || ef.achText || ef.achArtworkName) {
          pills.innerHTML += `<span class="pill gold">🏆 ${escapeXML(ef.achId || ef.achShip || 'Achievement')}</span>`;
        }

        row.appendChild(num);
        row.appendChild(input);
        row.appendChild(pills);
        container.appendChild(row);
      });
    }

    function selectChoice(idx, reRenderChoices = true) {
      activeChoiceIndex = idx;
      const btnNumEl = document.getElementById('active-choice-btn-num');
      if (btnNumEl) btnNumEl.textContent = idx + 1;

      if (reRenderChoices) {
        renderChoices();
      } else {
        document.querySelectorAll('.ftl-choice-row').forEach((el, i) => {
          el.classList.toggle('active-choice', i === idx);
        });
      }
      renderOutcomeBox();
    }

    function renderOutcomeBox() {
      const ev = getCurrentEvent();
      const ch = ev.choices[activeChoiceIndex] || ev.choices[0];
      if (!ch) return;
      document.getElementById('outcome-label').textContent = `↳ Reply / Outcome Text for Option #${activeChoiceIndex + 1} („${(ch.text || 'Option').slice(0, 36)}“)`;
      const ta = document.getElementById('inline-outcome-text');
      if (document.activeElement !== ta) {
        ta.value = ch.outcomeText || '';
      }
    }

    function handleEventSectorInput(el) {
      const ev = getCurrentEvent();
      const val = el.value.trim();
      ev.sector = val || 'General / Sector-Independent';
      if (val) addSuggestionEntry('sectors', val);
      renderNavigationDropdowns();
    }

    function handleEventNameInput(el) {
      const ev = getCurrentEvent();
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const beforeLen = el.value.length;
      const clean = sanitizeID(el.value);
      if (el.value !== clean) {
        el.value = clean;
        const diff = clean.length - beforeLen;
        if (typeof start === 'number' && typeof end === 'number') {
          el.setSelectionRange(Math.max(0, start + diff), Math.max(0, end + diff));
        }
      }
      ev.name = clean || 'UNNAMED_EVENT';
      if (ev.questChainId) relinkQuestChain(ev.questChainId);
      addSuggestionEntry('eventIds', ev.name);
      renderNavigationDropdowns();
      renderQuestChainStrip(ev);
      runSlipstreamLint(false);
    }

    function handleMainTextInput(el) {
      const ev = getCurrentEvent();
      ev.text = el.value;
      runSlipstreamLint(false);
    }

    function handleOutcomeInput(el) {
      const ev = getCurrentEvent();
      if (!ev.choices.length) {
        ev.choices.push(createDefaultChoice('Continue...'));
        activeChoiceIndex = 0;
      }
      const ch = ev.choices[activeChoiceIndex] || ev.choices[0];
      ch.outcomeText = el.value;
      runSlipstreamLint(false);
    }

    function addNewChoice() {
      const ev = getCurrentEvent();
      ev.choices.push(createDefaultChoice(''));
      activeChoiceIndex = ev.choices.length - 1;
      renderChoices();
      renderOutcomeBox();
      runSlipstreamLint(false);
    }

    function duplicateChoice(idx) {
      hideContextMenu();
      const ev = getCurrentEvent();
      const src = ev.choices[idx];
      if (!src) return;
      const copy = {
        id: 'ch_' + Math.random().toString(36).slice(2, 9),
        text: src.text,
        outcomeText: src.outcomeText,
        effects: { ...src.effects }
      };
      ev.choices.splice(idx + 1, 0, copy);
      activeChoiceIndex = idx + 1;
      renderChoices();
      renderOutcomeBox();
      runSlipstreamLint(false);
    }

    function moveChoice(idx, delta) {
      hideContextMenu();
      const ev = getCurrentEvent();
      const target = idx + delta;
      if (target < 0 || target >= ev.choices.length) return;
      const [item] = ev.choices.splice(idx, 1);
      ev.choices.splice(target, 0, item);
      activeChoiceIndex = target;
      renderChoices();
      renderOutcomeBox();
    }

    function quickEditCondition(idx) {
      hideContextMenu();
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[idx];
      if (!ch) return;
      selectChoice(idx, true);
      const nextCond = prompt('Bedingung für diese Option eingeben (z. B. quest_flag==1 oder scrap>=30):', ch.effects.condition || '');
      if (nextCond === null) return;
      ch.effects.condition = nextCond.trim();
      renderChoices();
      runSlipstreamLint(false);
    }

    function quickAddScrap(idx, amount) {
      hideContextMenu();
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[idx];
      if (!ch) return;
      ch.effects.rewardMode = 'custom';
      ch.effects.scrap = (ch.effects.scrap || 0) + amount;
      selectChoice(idx, true);
      runSlipstreamLint(false);
    }

    function quickToggleAutoReward(idx) {
      hideContextMenu();
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[idx];
      if (!ch) return;
      ch.effects.rewardMode = ch.effects.rewardMode === 'auto' ? 'custom' : 'auto';
      selectChoice(idx, true);
      runSlipstreamLint(false);
    }

    function swapMainAndOutcome() {
      const ev = getCurrentEvent();
      const ch = ev.choices[activeChoiceIndex];
      if (!ch) return;
      const tmp = ev.text;
      ev.text = ch.outcomeText;
      ch.outcomeText = tmp;
      renderAll();
    }

    function openChoiceContextMenu(x, y, idx) {
      const menu = document.getElementById('ctx-menu');
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[idx];
      const ef = ch?.effects || {};
      const presetsHTML = quickPresets.map(p =>
        `<div class="ctx-sub-item" onclick="applyPresetToChoice(${idx}, '${escapeXML(p).replace(/'/g, "\\'")}')">${escapeXML(p)}</div>`
      ).join('');

      menu.innerHTML = `
        <div class="ctx-header">Option #${idx + 1} – Aktionen</div>
        <div class="ctx-item" onclick="focusOutcomeFor(${idx})"><span>💬 Antwort-Text bearbeiten</span></div>
        <div class="ctx-item" onclick="openEffectsModalFor(${idx})"><span>🎁 Belohnungs- &amp; Konsequenzen-Menü…</span></div>
        <div class="ctx-item" onclick="quickEditCondition(${idx})"><span>🔀 Bedingung setzen (${ef.condition ? escapeXML(ef.condition) : 'keine'})</span></div>
        <div class="ctx-item" onclick="quickAddScrap(${idx}, 20)"><span>💰 +20 Scrap schnell</span></div>
        <div class="ctx-item" onclick="quickToggleAutoReward(${idx})"><span>🎲 Auto-Reward (${ch?.effects?.rewardMode === 'auto' ? 'AN' : 'AUS'})</span></div>
        <div class="ctx-sep"></div>
        <div class="ctx-item" onclick="duplicateChoice(${idx})"><span>📄 Option duplizieren</span></div>
        <div class="ctx-item" onclick="moveChoice(${idx}, -1)"><span>▲ Nach oben schieben</span></div>
        <div class="ctx-item" onclick="moveChoice(${idx}, 1)"><span>▼ Nach unten schieben</span></div>
        <div class="ctx-sep"></div>
        <div class="ctx-header">Quick-Preset einfügen</div>
        <div class="ctx-sub-list">${presetsHTML}</div>
        <div class="ctx-sep"></div>
        <div class="ctx-item danger" onclick="deleteChoice(${idx})"><span>🗑️ Option löschen</span></div>
      `;
      positionContextMenu(menu, x, y);
    }

    function openMainTextContextMenu(e) {
      e.preventDefault();
      const menu = document.getElementById('ctx-menu');
      menu.innerHTML = `
        <div class="ctx-header">Haupttext-Aktionen</div>
        <div class="ctx-item" onclick="swapMainAndOutcome(); hideContextMenu();"><span>⇄ Mit Antwort-Text tauschen</span></div>
        <div class="ctx-item" onclick="addIntermediateQuestStep(); hideContextMenu();"><span>🔹 Quest-Zwischenschritt / Etappe anhängen</span></div>
        <div class="ctx-item" onclick="quickEditCondition(activeChoiceIndex); hideContextMenu();"><span>🔀 Bedingung für aktive Option setzen</span></div>
        <div class="ctx-item" onclick="addNewChoice(); hideContextMenu();"><span>➕ Neue Auswahl-Option hinzufügen</span></div>
      `;
      positionContextMenu(menu, e.clientX, e.clientY);
    }

    function positionContextMenu(menu, x, y) {
      menu.style.display = 'block';
      const rect = menu.getBoundingClientRect();
      const posX = Math.min(x, window.innerWidth - rect.width - 12);
      const posY = Math.min(y, window.innerHeight - rect.height - 12);
      menu.style.left = Math.max(8, posX) + 'px';
      menu.style.top = Math.max(8, posY) + 'px';
    }

    function hideContextMenu() {
      document.getElementById('ctx-menu').style.display = 'none';
    }
    document.addEventListener('click', hideContextMenu);

    function focusOutcomeFor(idx) {
      hideContextMenu();
      selectChoice(idx, true);
      document.getElementById('inline-outcome-text').focus();
    }

    function applyPresetToChoice(idx, text) {
      hideContextMenu();
      const ev = getCurrentEvent();
      if (ev && ev.choices[idx]) {
        ev.choices[idx].text = text;
        renderChoices();
        runSlipstreamLint(false);
      }
    }

    function deleteChoice(idx) {
      hideContextMenu();
      const ev = getCurrentEvent();
      if (!ev || ev.choices.length <= 1) return;
      ev.choices.splice(idx, 1);
      activeChoiceIndex = Math.max(0, activeChoiceIndex - 1);
      renderChoices();
      renderOutcomeBox();
      runSlipstreamLint(false);
    }

    /* Belohnungs- und Konsequenzen-Menü */
    function openEffectsModalFor(idx) {
      hideContextMenu();
      const ev = getCurrentEvent();
      selectChoice(idx, true);
      const ch = ev.choices[idx];
      const ef = ch.effects;
      document.getElementById('effects-modal-title').textContent = `Option #${idx + 1} – Belohnungs- & Konsequenzen-Menü`;
      document.getElementById('eff-req').value = ef.req;
      document.getElementById('eff-reqLvl').value = ef.reqLvl || 1;
      document.getElementById('eff-condition').value = ef.condition || '';
      document.getElementById('eff-rewardMode').value = ef.rewardMode || 'custom';
      document.getElementById('eff-scrap').value = ef.scrap || 0;
      document.getElementById('eff-fuel').value = ef.fuel || 0;
      document.getElementById('eff-missiles').value = ef.missiles || 0;
      document.getElementById('eff-drones').value = ef.drones || 0;
      document.getElementById('eff-hull').value = ef.hull || 0;
      document.getElementById('eff-crew').value = ef.crew || 0;
      document.getElementById('eff-weapon').value = ef.weapon || '';
      document.getElementById('eff-drone').value = ef.drone || '';
      document.getElementById('eff-augment').value = ef.augment || '';
      document.getElementById('eff-ship').value = ef.ship || '';
      document.getElementById('eff-quest').value = ef.quest || '';
      document.getElementById('eff-hsVar').value = ef.hsVar || '';
      document.getElementById('eff-achId').value = ef.achId || '';
      populateAchievementShipDropdown(ef.achShip || '');
      document.getElementById('eff-achTrigger').value = ef.achTrigger || 'choice';
      document.getElementById('eff-achText').value = ef.achText || '';
      updateAchievementArtworkUI(ef);
      updateConfirmationLabels(ef);
      document.getElementById('effects-modal').style.display = 'flex';
    }

    function updateEffectField(key, val) {
      const ev = getCurrentEvent();
      const ch = ev.choices[activeChoiceIndex];
      if (!ch) return;
      ch.effects[key] = val;
      if (key === 'achId' && val) addSuggestionEntry('achievements', val);
      if (key === 'achShip' && val) addSuggestionEntry('ships', val);
      if (key === 'weapon' && val) addSuggestionEntry('weapons', val);
      if (key === 'drone' && val) addSuggestionEntry('drones', val);
      if (key === 'augment' && val) addSuggestionEntry('augments', val);
      if (key === 'ship' && val) addSuggestionEntry('ships', val);
      updateConfirmationLabels(ch.effects);
      renderChoices();
      runSlipstreamLint(false);
    }

    function populateAchievementShipDropdown(selectedVal = '') {
      const sel = document.getElementById('eff-achShip');
      if (!sel) return;
      const set = new Set(SUGGESTIONS.ships || []);
      shipsCollection.forEach(s => {
        if (s && s.name) set.add(sanitizeID(s.name));
      });
      const options = Array.from(set).filter(Boolean);
      if (selectedVal && !options.includes(selectedVal)) options.unshift(selectedVal);
      sel.innerHTML = `<option value="">-- Kein Schiff gewählt --</option>` +
        options.map(shipId => `<option value="${escapeXML(shipId)}" ${shipId === selectedVal ? 'selected' : ''}>${escapeXML(shipId)}</option>`).join('');
    }

    function updateAchievementArtworkUI(ef) {
      const imgEl = document.getElementById('eff-achArtworkPreview');
      const nameEl = document.getElementById('eff-achArtworkName');
      const confEl = document.getElementById('conf-achArtwork');
      if (ef.achArtworkDataUrl) {
        imgEl.src = ef.achArtworkDataUrl;
        imgEl.style.display = 'block';
      } else {
        imgEl.removeAttribute('src');
        imgEl.style.display = 'none';
      }
      if (ef.achArtworkName) {
        nameEl.textContent = ef.achArtworkName;
        confEl.textContent = `✓ Artwork gesetzt: ${ef.achArtworkName}`;
      } else {
        nameEl.textContent = 'Kein Artwork ausgewählt';
        confEl.textContent = '';
      }
    }

    function handleAchievementArtworkUpload(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[activeChoiceIndex];
      if (!ch) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        ch.effects.achArtworkName = file.name;
        ch.effects.achArtworkDataUrl = dataUrl;
        addSpriteItem({
          name: sanitizeID(file.name.replace(/\.[^.]+$/, '')),
          category: 'Achievement',
          fileName: file.name,
          sourceArchive: 'Achievement-Upload',
          dataUrl
        });
        updateAchievementArtworkUI(ch.effects);
        renderChoices();
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }

    function removeAchievementArtwork() {
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[activeChoiceIndex];
      if (!ch) return;
      ch.effects.achArtworkName = '';
      ch.effects.achArtworkDataUrl = '';
      updateAchievementArtworkUI(ch.effects);
      renderChoices();
    }

    function clearAchievementFields() {
      const ev = getCurrentEvent();
      const ch = ev && ev.choices[activeChoiceIndex];
      if (!ch) return;
      ch.effects.achId = '';
      ch.effects.achShip = '';
      ch.effects.achText = '';
      ch.effects.achTrigger = 'choice';
      ch.effects.achArtworkName = '';
      ch.effects.achArtworkDataUrl = '';
      document.getElementById('eff-achId').value = '';
      populateAchievementShipDropdown('');
      document.getElementById('eff-achTrigger').value = 'choice';
      document.getElementById('eff-achText').value = '';
      updateAchievementArtworkUI(ch.effects);
      updateConfirmationLabels(ch.effects);
      renderChoices();
    }

    function updateConfirmationLabels(ef) {
      document.getElementById('conf-req').textContent = ef.req ? `✓ Blue Option: req="${ef.req}"` : '';
      document.getElementById('conf-weapon').textContent = ef.weapon ? `✓ Übernommen: <weapon>${ef.weapon}</weapon>` : '';
      document.getElementById('conf-drone').textContent = ef.drone ? `✓ Übernommen: <drone>${ef.drone}</drone>` : '';
      document.getElementById('conf-augment').textContent = ef.augment ? `✓ Übernommen: <augment>${ef.augment}</augment>` : '';
      document.getElementById('conf-achId').textContent = ef.achId ? `✓ Achievement-ID: ${ef.achId}` : '';
      document.getElementById('conf-achShip').textContent = ef.achShip ? `✓ Schiff: ${ef.achShip}` : '';
    }

    function showModalSuggestions(inputEl, type) {
      const box = document.getElementById('sug-' + type);
      if (!box) return;
      const q = inputEl.value.trim().toLowerCase();
      const list = (SUGGESTIONS[type] || []).filter(item => !q || item.toLowerCase().includes(q));
      if (!list.length) {
        box.style.display = 'none';
        return;
      }
      box.innerHTML = list.map(item =>
        `<div class="suggestion-item" onmousedown="event.preventDefault(); pickModalSuggestion('${type}', '${escapeXML(item).replace(/'/g, "\\'")}')">${escapeXML(item)}</div>`
      ).join('');
      box.style.display = 'block';
    }

    function pickModalSuggestion(type, val) {
      const map = {
        weapons: ['eff-weapon', 'weapon'],
        drones: ['eff-drone', 'drone'],
        augments: ['eff-augment', 'augment'],
        reqs: ['eff-req', 'req'],
        achievements: ['eff-achId', 'achId'],
        ships: ['eff-ship', 'ship'],
        eventIds: ['eff-quest', 'quest']
      };
      const [inputId, fieldKey] = map[type];
      document.getElementById(inputId).value = val;
      const box = document.getElementById('sug-' + type);
      if (box) box.style.display = 'none';
      updateEffectField(fieldKey, val);
    }

    /* Waffen-Konfig-Menü */
    function openWeaponConfigModal() {
      if (!weaponsCollection.length) {
        weaponsCollection.push(createDefaultWeapon(1));
        currentWeaponIndex = 0;
      }
      renderWeaponEditor();
      document.getElementById('weapon-modal').style.display = 'flex';
    }

    function createNewWeapon() {
      const w = createDefaultWeapon(weaponsCollection.length + 1);
      weaponsCollection.push(w);
      addSuggestionEntry('weapons', w.name);
      currentWeaponIndex = weaponsCollection.length - 1;
      document.getElementById('weapon-count').textContent = weaponsCollection.length;
      renderWeaponEditor();
    }

    function deleteCurrentWeapon() {
      if (weaponsCollection.length <= 1) return;
      weaponsCollection.splice(currentWeaponIndex, 1);
      currentWeaponIndex = Math.max(0, Math.min(currentWeaponIndex, weaponsCollection.length - 1));
      document.getElementById('weapon-count').textContent = weaponsCollection.length;
      renderWeaponEditor();
    }

    function selectWeaponByIndex(idx) {
      if (idx < 0 || idx >= weaponsCollection.length) return;
      currentWeaponIndex = idx;
      renderWeaponEditor();
    }

    function updateCurrentWeaponField(key, val) {
      const wp = getCurrentWeapon();
      if (!wp) return;
      wp[key] = val;
      if (key === 'name' && val) {
        addSuggestionEntry('weapons', val);
        const sel = document.getElementById('weapon-select');
        if (sel && sel.options[currentWeaponIndex]) sel.options[currentWeaponIndex].textContent = val;
      }
      if (key === 'cost') {
        const sellVal = Math.floor((parseInt(val, 10) || 0) / 2);
        const sellEl = document.getElementById('wp-sell-preview');
        if (sellEl) sellEl.value = `${sellVal} Scrap (50 %)`;
      }
    }

    function renderWeaponEditor() {
      const wp = getCurrentWeapon();
      const sel = document.getElementById('weapon-select');
      sel.innerHTML = weaponsCollection.map((item, idx) =>
        `<option value="${idx}" ${idx === currentWeaponIndex ? 'selected' : ''}>${escapeXML(item.name || `WEAPON_${idx + 1}`)}</option>`
      ).join('');
      if (!wp) return;
      document.getElementById('wp-name-input').value = wp.name || '';
      document.getElementById('wp-type-input').value = wp.type || 'LASER';
      document.getElementById('wp-title-input').value = wp.title || '';
      document.getElementById('wp-damage-input').value = wp.damage ?? 1;
      document.getElementById('wp-shots-input').value = wp.shots ?? 2;
      document.getElementById('wp-cooldown-input').value = wp.cooldown ?? 11;
      document.getElementById('wp-cost-input').value = wp.cost ?? 50;
      document.getElementById('wp-sell-preview').value = `${Math.floor((wp.cost || 0) / 2)} Scrap (50 %)`;
      document.getElementById('wp-power-input').value = wp.power ?? 2;
      document.getElementById('wp-missiles-input').value = wp.missiles ?? 0;
      document.getElementById('wp-desc-input').value = wp.desc || '';
      document.getElementById('wp-art-input').value = wp.weaponArt || 'laser_burst_1';
      document.getElementById('weapon-status-msg').textContent = `Bearbeite: ${wp.name}`;
    }

    function applyWeaponToCurrentEventChoice() {
      const wp = getCurrentWeapon();
      const ev = getCurrentEvent();
      if (!wp || !ev.choices[activeChoiceIndex]) return;
      ev.choices[activeChoiceIndex].effects.weapon = sanitizeID(wp.name);
      addSuggestionEntry('weapons', sanitizeID(wp.name));
      renderChoices();
      document.getElementById('weapon-status-msg').textContent = `✓ Waffe ${wp.name} in Option #${activeChoiceIndex + 1} gesetzt.`;
    }

    function applyWeaponToCurrentShip() {
      const wp = getCurrentWeapon();
      const ship = getCurrentShip();
      if (!wp || !ship) return;
      ship.weapons.push(sanitizeID(wp.name));
      addSuggestionEntry('weapons', sanitizeID(wp.name));
      document.getElementById('weapon-status-msg').textContent = `✓ Waffe ${wp.name} auf Schiff ${ship.name} montiert.`;
    }

    /* Schiff-Editor & Schiffs-Download */
    function openShipEditorModal() {
      if (!shipsCollection.length) {
        shipsCollection.push(createDefaultShip(1, 'kestral'));
        currentShipIndex = 0;
      }
      renderShipEditor();
      document.getElementById('ship-modal').style.display = 'flex';
    }

    function buildSingleShipBlueprintXML(sh, idx = 0) {
      const fallbackName = sanitizeID(sh.layout || sh.img || '') || `CUSTOM_SHIP_${idx + 1}`;
      const safeName = escapeXML(sanitizeID(sh.name || fallbackName));
      const safeLayout = escapeXML(sh.layout || 'kestral');
      const safeImg = escapeXML(sh.img || sh.layout || 'kestral');
      let out = `  <shipBlueprint name="${safeName}" layout="${safeLayout}" img="${safeImg}">\n`;
      out += `    <hull>${parseInt(sh.hull, 10) || 30}</hull>\n`;
      out += `    <weaponSlots>${parseInt(sh.weaponSlots, 10) ?? 4}</weaponSlots>\n`;
      if (sh.weapons && sh.weapons.length) {
        out += `    <weaponList missiles="0" load="DEFAULT">\n`;
        sh.weapons.forEach(w => {
          if (w && w.trim()) out += `      <weapon name="${escapeXML(sanitizeID(w))}"/>\n`;
        });
        out += `    </weaponList>\n`;
      }
      if (sh.crew && sh.crew.length) {
        sh.crew.forEach(cr => {
          const amt = parseInt(cr.amount, 10) || 0;
          if (amt > 0) out += `    <crewCount amount="${amt}" class="${escapeXML(cr.class || 'human')}"/>\n`;
        });
      }
      if (sh.unlockQuest && sh.unlockQuest.trim()) {
        out += `    <unlock>${escapeXML(sanitizeID(sh.unlockQuest))}</unlock>\n`;
      }
      out += `  </shipBlueprint>`;
      return out;
    }

    function downloadCurrentShipXML() {
      const ship = getCurrentShip();
      if (!ship) return;
      const xmlText = `<FTL>\n${buildSingleShipBlueprintXML(ship, currentShipIndex)}\n</FTL>`;
      const fileName = `${(ship.name || 'CUSTOM_SHIP').toLowerCase()}_blueprint.xml`;
      const blob = new Blob([xmlText], { type: 'application/xml;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      document.getElementById('ship-status-msg').textContent = `✓ Schiff ${ship.name} heruntergeladen.`;
    }

    function downloadAllShipsXML() {
      if (!shipsCollection.length) return;
      const blocks = shipsCollection.map((sh, idx) => buildSingleShipBlueprintXML(sh, idx));
      const xmlText = `<FTL>\n${blocks.join('\n')}\n</FTL>`;
      const blob = new Blob([xmlText], { type: 'application/xml;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'custom_ships_blueprints.xml';
      a.click();
      document.getElementById('ship-status-msg').textContent = `✓ Alle ${shipsCollection.length} Schiffe heruntergeladen.`;
    }

    async function handleShipXmlUpload(e) {
      const files = Array.from(e.target.files || []);
      const statusEl = document.getElementById('ship-status-msg');
      if (!files.length) return;
      let loadedShips = 0;

      for (const file of files) {
        if (file.name.toLowerCase().endsWith('.ftl') || file.name.toLowerCase().endsWith('.zip')) {
          const buf = new Uint8Array(await file.arrayBuffer());
          const extracted = await extractXMLsFromZip(buf);
          for (const item of extracted) {
            const prev = shipsCollection.length;
            parseAndImportXML(item.text, `${file.name} (${item.fileName})`);
            loadedShips += Math.max(0, shipsCollection.length - prev);
          }
        } else {
          const txt = await file.text();
          const prev = shipsCollection.length;
          parseAndImportXML(txt, file.name);
          loadedShips += Math.max(0, shipsCollection.length - prev);
        }
      }

      if (loadedShips > 0) currentShipIndex = shipsCollection.length - 1;
      document.getElementById('ship-count').textContent = shipsCollection.length;
      renderShipEditor();
      statusEl.textContent = loadedShips > 0 ? `✓ ${loadedShips} Schiff(e) geladen` : '✕ Keine <shipBlueprint>-Daten gefunden';
      e.target.value = '';
    }

    function createNewShip() {
      const currentLayout = (document.getElementById('ship-layout-input')?.value || getCurrentShip()?.layout || 'kestral').trim() || 'kestral';
      const newShip = createDefaultShip(shipsCollection.length + 1, currentLayout);
      shipsCollection.push(newShip);
      addSuggestionEntry('ships', newShip.name);
      currentShipIndex = shipsCollection.length - 1;
      document.getElementById('ship-count').textContent = shipsCollection.length;
      renderShipEditor();
    }

    function deleteCurrentShip() {
      if (shipsCollection.length <= 1) return;
      shipsCollection.splice(currentShipIndex, 1);
      currentShipIndex = Math.max(0, Math.min(currentShipIndex, shipsCollection.length - 1));
      document.getElementById('ship-count').textContent = shipsCollection.length;
      renderShipEditor();
    }

    function selectShipByIndex(idx) {
      if (idx < 0 || idx >= shipsCollection.length) return;
      currentShipIndex = idx;
      renderShipEditor();
    }

    function updateCurrentShipField(key, value) {
      const ship = getCurrentShip();
      if (!ship) return;
      ship[key] = value;
      if (ship.name) addSuggestionEntry('ships', ship.name);
    }

    function addShipWeapon() {
      const ship = getCurrentShip();
      if (!ship) return;
      ship.weapons.push('LASER_BURST_1');
      renderShipWeaponsAndCrew();
    }

    function updateShipWeapon(idx, val) {
      const ship = getCurrentShip();
      if (!ship) return;
      ship.weapons[idx] = sanitizeID(val);
    }

    function removeShipWeapon(idx) {
      const ship = getCurrentShip();
      if (!ship) return;
      ship.weapons.splice(idx, 1);
      renderShipWeaponsAndCrew();
    }

    function addShipCrew() {
      const ship = getCurrentShip();
      if (!ship) return;
      ship.crew.push({ class: 'human', amount: 1 });
      renderShipWeaponsAndCrew();
    }

    function updateShipCrewClass(idx, cls) {
      const ship = getCurrentShip();
      if (ship && ship.crew[idx]) ship.crew[idx].class = cls;
    }

    function updateShipCrewAmount(idx, amt) {
      const ship = getCurrentShip();
      if (ship && ship.crew[idx]) ship.crew[idx].amount = Math.max(0, parseInt(amt, 10) || 0);
    }

    function removeShipCrew(idx) {
      const ship = getCurrentShip();
      if (!ship) return;
      ship.crew.splice(idx, 1);
      renderShipWeaponsAndCrew();
    }

    function linkCurrentEventToShipUnlock() {
      const ship = getCurrentShip();
      const ev = getCurrentEvent();
      if (!ship || !ev) return;
      ship.unlockQuest = sanitizeID(ev.name);
      document.getElementById('ship-unlock-input').value = ship.unlockQuest;
    }

    function applyShipToCurrentEventChoice() {
      const ship = getCurrentShip();
      const ev = getCurrentEvent();
      if (!ship || !ev.choices[0]) return;
      ev.choices[0].effects.ship = sanitizeID(ship.name);
      renderChoices();
    }

    function renderShipEditor() {
      const ship = getCurrentShip();
      const sel = document.getElementById('ship-select');
      sel.innerHTML = shipsCollection.map((s, idx) =>
        `<option value="${idx}" ${idx === currentShipIndex ? 'selected' : ''}>${escapeXML(s.name || `SHIP_${idx + 1}`)}</option>`
      ).join('');
      if (!ship) return;
      document.getElementById('ship-name-input').value = ship.name || '';
      document.getElementById('ship-layout-input').value = ship.layout || '';
      document.getElementById('ship-img-input').value = ship.img || '';
      document.getElementById('ship-hull-input').value = ship.hull || 30;
      document.getElementById('ship-wslots-input').value = ship.weaponSlots ?? 4;
      document.getElementById('ship-unlock-input').value = ship.unlockQuest || '';
      document.getElementById('ship-unlock-text-input').value = ship.unlockNote || '';
      renderShipWeaponsAndCrew();
    }

    function renderShipWeaponsAndCrew() {
      const ship = getCurrentShip();
      if (!ship) return;
      const wBox = document.getElementById('ship-weapons-list');
      wBox.innerHTML = ship.weapons.length
        ? ship.weapons.map((wName, idx) => `
          <div class="ship-slot-row">
            <span style="font-size:12px;font-family:var(--font-mono);color:#94a3b8;">Slot #${idx + 1}</span>
            <input type="text" value="${escapeXML(wName)}" style="flex:1;background:#090d16;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:5px 8px;font-family:var(--font-mono);font-size:12px;"
              oninput="updateShipWeapon(${idx}, this.value); this.value = sanitizeID(this.value);" />
            <button type="button" class="btn btn-danger" style="padding:3px 8px;font-size:11px;" onclick="removeShipWeapon(${idx})">✕</button>
          </div>`).join('')
        : `<div style="font-size:12px;color:#94a3b8;">Keine Waffen eingetragen.</div>`;

      const cBox = document.getElementById('ship-crew-list');
      cBox.innerHTML = ship.crew.length
        ? ship.crew.map((cr, idx) => `
          <div class="ship-slot-row">
            <select style="background:#090d16;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:5px 8px;font-family:var(--font-mono);font-size:12px;"
              onchange="updateShipCrewClass(${idx}, this.value)">
              ${CREW_CLASSES.map(c => `<option value="${c}" ${cr.class === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
            <input type="number" min="0" max="12" value="${cr.amount ?? 1}" style="width:70px;background:#090d16;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:5px 8px;font-family:var(--font-mono);font-size:12px;"
              oninput="updateShipCrewAmount(${idx}, this.value)" />
            <button type="button" class="btn btn-danger" style="padding:3px 8px;font-size:11px;" onclick="removeShipCrew(${idx})">✕</button>
          </div>`).join('')
        : `<div style="font-size:12px;color:#94a3b8;">Keine Crew eingetragen.</div>`;
    }

    /* Sprites & Crew-Sheets */
    function getMimeForImageFilename(fileName) {
      const lower = String(fileName || '').toLowerCase();
      if (lower.endsWith('.png')) return 'image/png';
      if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
      if (lower.endsWith('.webp')) return 'image/webp';
      if (lower.endsWith('.gif')) return 'image/gif';
      return 'application/octet-stream';
    }

    function addSpriteItem(item) {
      const baseName = item.fileName ? item.fileName.split('/').pop() : 'sprite.png';
      const defaultId = sanitizeID(item.name || baseName.replace(/\.[^.]+$/, ''));
      const entry = {
        id: 'sp_' + Math.random().toString(36).slice(2, 9),
        name: defaultId || 'SPRITE_ITEM',
        category: item.category || 'Crew-Sprite-Sheet',
        fileName: baseName,
        sourceArchive: item.sourceArchive || 'Manuell',
        dataUrl: item.dataUrl || '',
        rawBytes: item.rawBytes || null,
        sheetCols: item.sheetCols || 9,
        sheetRows: item.sheetRows || 9,
        walkFrames: item.walkFrames || 4
      };
      spritesCollection.push(entry);
      document.getElementById('sprite-count').textContent = spritesCollection.length;
      return entry;
    }

    function openSpriteManagerModal(pickerMode = null) {
      spritePickerMode = pickerMode;
      renderSpriteGrid();
      document.getElementById('sprites-modal').style.display = 'flex';
    }

    function renderSpriteGrid() {
      const grid = document.getElementById('sprite-grid');
      if (!spritesCollection.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:18px;text-align:center;color:#94a3b8;font-size:13px;">Noch keine Sprites geladen.</div>`;
        return;
      }
      grid.innerHTML = spritesCollection.map(sp => `
        <div class="sprite-card">
          <div class="sprite-card-preview-wrap">
            ${sp.dataUrl ? `<img src="${sp.dataUrl}" alt="${escapeXML(sp.name)}" />` : `<span style="font-size:11px;color:#94a3b8;">Keine Vorschau</span>`}
          </div>
          <div class="field-group">
            <label>Name / ID</label>
            <input type="text" value="${escapeXML(sp.name)}" oninput="updateSpriteField('${sp.id}', 'name', sanitizeID(this.value)); this.value = sanitizeID(this.value);" />
          </div>
          <div class="field-group">
            <label>Kategorie</label>
            <input type="text" value="${escapeXML(sp.category)}" oninput="updateSpriteField('${sp.id}', 'category', this.value)" />
          </div>
          <div style="display:flex;justify-content:space-between;gap:6px;">
            <button type="button" class="btn" style="padding:3px 8px;font-size:11px;flex:1;" onclick="applySpriteToCurrentAchievement('${sp.id}')">🏆 Achievement-Art</button>
            <button type="button" class="btn btn-danger" style="padding:3px 7px;font-size:11px;" onclick="deleteSpriteItem('${sp.id}')">✕</button>
          </div>
        </div>
      `).join('');
    }

    function updateSpriteField(id, key, val) {
      const sp = spritesCollection.find(s => s.id === id);
      if (sp) sp[key] = val;
    }

    function deleteSpriteItem(id) {
      spritesCollection = spritesCollection.filter(s => s.id !== id);
      document.getElementById('sprite-count').textContent = spritesCollection.length;
      renderSpriteGrid();
    }

    function applySpriteToCurrentAchievement(id) {
      const sp = spritesCollection.find(s => s.id === id);
      const ev = getCurrentEvent();
      const ch = ev.choices[activeChoiceIndex];
      if (!sp || !ch) return;
      ch.effects.achArtworkName = sp.fileName;
      ch.effects.achArtworkDataUrl = sp.dataUrl || '';
      updateAchievementArtworkUI(ch.effects);
      renderChoices();
      closeModal('sprites-modal');
    }

    async function handleSpriteArchiveUpload(e) {
      const files = Array.from(e.target.files || []);
      for (const file of files) {
        const lower = file.name.toLowerCase();
        if (lower.endsWith('.zip') || lower.endsWith('.ftl')) {
          const buf = new Uint8Array(await file.arrayBuffer());
          const entries = await extractArchiveEntries(buf);
          for (const ent of entries.filter(x => /\.(png|jpe?g|webp|gif)$/i.test(x.fileName))) {
            addSpriteItem({
              name: ent.fileName.split('/').pop().replace(/\.[^.]+$/, ''),
              category: ent.fileName.toLowerCase().includes('people') ? 'Crew-Sprite-Sheet' : 'Waffe',
              fileName: ent.fileName,
              dataUrl: bytesToDataUrl(ent.bytes, getMimeForImageFilename(ent.fileName)),
              rawBytes: ent.bytes
            });
          }
        } else if (file.type.startsWith('image/')) {
          const buf = new Uint8Array(await file.arrayBuffer());
          addSpriteItem({
            name: file.name.replace(/\.[^.]+$/, ''),
            category: lower.includes('crew') || lower.includes('sheet') ? 'Crew-Sprite-Sheet' : 'Waffe',
            fileName: file.name,
            dataUrl: bytesToDataUrl(buf, file.type),
            rawBytes: buf
          });
        }
      }
      renderSpriteGrid();
      e.target.value = '';
    }

    /* Dateien & XML Vorschau */
    function openFilesModal() {
      renderFilesAndEventsLists();
      document.getElementById('xml-preview-box').textContent = generateAllXML('hyperspace');
      document.getElementById('files-modal').style.display = 'flex';
    }

    function renderFilesAndEventsLists() {
      const srcBox = document.getElementById('sources-list');
      const filesMap = new Map();
      eventsCollection.forEach(ev => {
        const s = ev.sourceFile || 'Custom Events';
        filesMap.set(s, (filesMap.get(s) || 0) + 1);
      });

      srcBox.innerHTML = Array.from(filesMap.entries()).map(([fileName, count]) => `
        <div class="source-row">
          <span>📄 ${escapeXML(fileName)} (${count} Event${count === 1 ? '' : 's'})</span>
          <button type="button" class="btn btn-danger" onclick="removeSourceFile('${escapeXML(fileName).replace(/'/g, "\\'")}')">✕ Datei entfernen</button>
        </div>
      `).join('');

      const evBox = document.getElementById('events-manage-list');
      evBox.innerHTML = eventsCollection.map((ev, idx) => `
        <div class="source-row">
          <span><strong>${escapeXML(ev.name)}</strong> <span style="color:#94a3b8;">[${escapeXML(ev.sector || 'Allgemein')}]</span></span>
          <div style="display:flex;gap:6px;">
            <button type="button" class="btn" onclick="jumpToEvent(${idx})">Bearbeiten</button>
            <button type="button" class="btn btn-danger" onclick="deleteSingleEvent(${idx})">✕</button>
          </div>
        </div>
      `).join('');
    }

    function removeSourceFile(fileName) {
      eventsCollection = eventsCollection.filter(ev => (ev.sourceFile || 'Custom Events') !== fileName);
      if (!eventsCollection.length) eventsCollection.push(createDefaultEventObj(1));
      currentIndex = 0;
      activeChoiceIndex = 0;
      renderAll();
      renderFilesAndEventsLists();
    }

    function deleteSingleEvent(idx) {
      eventsCollection.splice(idx, 1);
      if (!eventsCollection.length) eventsCollection.push(createDefaultEventObj(1));
      currentIndex = Math.max(0, Math.min(currentIndex, eventsCollection.length - 1));
      activeChoiceIndex = 0;
      renderAll();
      renderFilesAndEventsLists();
    }

    function jumpToEvent(idx) {
      currentIndex = idx;
      activeChoiceIndex = 0;
      renderAll();
      closeModal('files-modal');
    }

    /* IMPORT: Unterstützt normale .xml, .xml.append (inkl. mod:findName / mod:insert / mod:par), .ftl und .zip */
    async function extractArchiveEntries(bytes) {
      const entries = [];
      let offset = 0;
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      while (offset + 30 <= bytes.length) {
        if (view.getUint32(offset, true) !== 0x04034b50) break;
        const flags = view.getUint16(offset + 6, true);
        const method = view.getUint16(offset + 8, true);
        let compSize = view.getUint32(offset + 18, true);
        const nameLen = view.getUint16(offset + 26, true);
        const extraLen = view.getUint16(offset + 28, true);
        const fileName = new TextDecoder('utf-8', { fatal: false }).decode(bytes.subarray(offset + 30, offset + 30 + nameLen));
        const dataStart = offset + 30 + nameLen + extraLen;

        if ((flags & 0x08) !== 0 && compSize === 0) {
          let scan = dataStart;
          while (scan + 4 <= bytes.length) {
            if (view.getUint32(scan, true) === 0x08074b50) {
              compSize = scan - dataStart;
              break;
            }
            scan++;
          }
        }

        const compData = bytes.subarray(dataStart, dataStart + compSize);
        if (!fileName.endsWith('/') && compSize > 0) {
          if (method === 0) {
            entries.push({ fileName, bytes: compData });
          } else if (method === 8 && typeof DecompressionStream !== 'undefined') {
            const ds = new DecompressionStream('deflate-raw');
            const writer = ds.writable.getWriter();
            await writer.write(compData);
            await writer.close();
            const outBuf = await new Response(ds.readable).arrayBuffer();
            entries.push({ fileName, bytes: new Uint8Array(outBuf) });
          }
        }

        offset = dataStart + compSize + ((flags & 0x08) !== 0 && view.getUint32(dataStart + compSize, true) === 0x08074b50 ? 16 : 0);
      }
      return entries;
    }

    function bytesToDataUrl(bytes, mime) {
      let bin = '';
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      return `data:${mime};base64,${btoa(bin)}`;
    }

    async function extractXMLsFromZip(bytes) {
      const entries = await extractArchiveEntries(bytes);
      const results = [];
      for (const ent of entries) {
        const lower = ent.fileName.toLowerCase();
        if (lower.endsWith('.xml') || lower.endsWith('.append') || lower.includes('.xml.') || lower.endsWith('.txt')) {
          results.push({
            fileName: ent.fileName,
            text: new TextDecoder('utf-8', { fatal: false }).decode(ent.bytes)
          });
        }
      }
      return results;
    }

    function applyEffectsFromFragment(containerEl, effects) {
      if (!containerEl) return;
      const children = Array.from(containerEl.children || []);
      if (children.some(el => el.tagName.toLowerCase() === 'autoreward')) {
        effects.rewardMode = 'auto';
      }

      children.forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag === 'item_modify') {
          Array.from(el.children || []).forEach(it => {
            if (it.tagName.toLowerCase() !== 'item') return;
            const t = (it.getAttribute('type') || '').toLowerCase();
            const v = parseInt(it.getAttribute('min') || it.getAttribute('max') || '0', 10) || 0;
            if (t in effects) effects[t] = v;
          });
        } else if (tag === 'weapon') {
          const wName = sanitizeID(el.getAttribute('name') || decodeTextContent(el.textContent || ''));
          effects.weapon = wName;
          if (wName) addSuggestionEntry('weapons', wName);
        } else if (tag === 'drone') {
          const dName = sanitizeID(el.getAttribute('name') || decodeTextContent(el.textContent || ''));
          effects.drone = dName;
          if (dName) addSuggestionEntry('drones', dName);
        } else if (tag === 'augment') {
          const aName = sanitizeID(el.getAttribute('name') || decodeTextContent(el.textContent || ''));
          effects.augment = aName;
          if (aName) addSuggestionEntry('augments', aName);
        } else if (tag === 'ship') {
          const sLoad = sanitizeID(el.getAttribute('load') || decodeTextContent(el.textContent || ''));
          effects.ship = sLoad;
          if (sLoad) addSuggestionEntry('ships', sLoad);
        } else if (tag === 'quest') {
          effects.quest = el.getAttribute('event') || '';
        } else if (tag === 'variable') {
          const vName = el.getAttribute('name') || '';
          const vVal = el.getAttribute('val') || '1';
          if (vName) effects.hsVar = `${vName}=${vVal}`;
        } else if (tag === 'achievement') {
          const achId = sanitizeID(el.getAttribute('id') || el.getAttribute('name') || '');
          if (achId) {
            effects.achId = achId;
            addSuggestionEntry('achievements', achId);
          }
          const achShipAttr = sanitizeID(el.getAttribute('ship') || '');
          const achChildren = Array.from(el.children || []);
          const achTextEl = achChildren.find(c => c.tagName.toLowerCase() === 'text');
          if (achTextEl) effects.achText = decodeTextContent(achTextEl.textContent || '');
          const achImgEl = achChildren.find(c => c.tagName.toLowerCase() === 'img');
          if (achImgEl) effects.achArtworkName = decodeTextContent(achImgEl.textContent || '');
          const achShipEl = achChildren.find(c => c.tagName.toLowerCase() === 'ship');
          const resolvedShip = achShipAttr || (achShipEl ? sanitizeID(decodeTextContent(achShipEl.textContent || '')) : '');
          if (resolvedShip) {
            effects.achShip = resolvedShip;
            addSuggestionEntry('ships', resolvedShip);
          }
        }
      });
    }

    function parseChoiceNode(cNode) {
      const children = Array.from(cNode.children || []);
      const cTextEl = children.find(el => el.tagName.toLowerCase() === 'text');
      const ch = createDefaultChoice(cTextEl ? decodeTextContent(cTextEl.textContent || '') : '');
      ch.effects = createDefaultEffects();
      ch.effects.req = cNode.getAttribute('req') || '';
      ch.effects.reqLvl = parseInt(cNode.getAttribute('lvl') || '1', 10) || 1;
      applyEffectsFromFragment(cNode, ch.effects);

      const subEv = children.find(el => el.tagName.toLowerCase() === 'event');
      if (subEv) {
        const subChildren = Array.from(subEv.children || []);
        const subTextEl = subChildren.find(el => el.tagName.toLowerCase() === 'text');
        ch.outcomeText = subTextEl ? decodeTextContent(subTextEl.textContent || '') : '';
        applyEffectsFromFragment(subEv, ch.effects);
      }
      return ch;
    }

    function repairXMLBeforeImport(rawStr) {
      let fixed = String(rawStr || '')
        .replace(/^\uFEFF/, '')
        .replace(/<\?xml[\s\S]*?\?>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();

      // Slipstream/FTLman mod:-Wrapper bereinigen, aber verschachtelte <event> / <choice> erhalten
      fixed = fixed.replace(/<\/choice>\s*<\/mod:insert>/gi, '</mod:insert></choice>');
      fixed = fixed.replace(
        /(<choice\b[^>]*>[\s\S]*?)(<\/mod:[a-zA-Z0-9_-]+>)/gi,
        (match, inner, closingMod) => {
          if (/<\/choice>/i.test(inner)) return match;
          return `${inner}</choice>${closingMod}`;
        }
      );

      // Alle mod:* Öffnungs- und Schließ-Tags entfernen, damit innere <event> / <choice> / <shipBlueprint> direkt lesbar werden
      fixed = fixed.replace(/<\/?mod:[a-zA-Z0-9_-]+\b[^>]*\/?>/gi, '');
      fixed = fixed.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

      // Tag-Stack reparieren, falls ungeschlossene <choice> oder <event> in .append-Dateien vorkommen
      const tokens = fixed.split(/(<[^>]+>)/g).filter(Boolean);
      const stack = [];
      const out = [];

      function closeChoiceIfOpen() {
        while (stack.length && stack[stack.length - 1] !== 'event' && stack[stack.length - 1] !== 'ftl') {
          const top = stack.pop();
          if (top === 'choice') out.push('</choice>');
          else if (top === 'event') out.push('</event>');
        }
        if (stack.length && stack[stack.length - 1] === 'choice') {
          stack.pop();
          out.push('</choice>');
        }
      }

      function closeEventIfOpen() {
        closeChoiceIfOpen();
        if (stack.length && stack[stack.length - 1] === 'event') {
          stack.pop();
          out.push('</event>');
        }
      }

      for (const tok of tokens) {
        if (!tok.startsWith('<')) {
          out.push(tok);
          continue;
        }
        if (/^<\?|^<!|^<[^>]+?\/\s*>$/.test(tok)) {
          out.push(tok);
          continue;
        }
        const closeMatch = tok.match(/^<\/\s*([a-zA-Z0-9:_-]+)\s*>$/);
        if (closeMatch) {
          const tag = closeMatch[1].toLowerCase();
          if (tag === 'choice') {
            if (stack.includes('choice')) {
              while (stack.length && stack[stack.length - 1] !== 'choice') {
                const popped = stack.pop();
                if (popped === 'event') out.push('</event>');
              }
              if (stack[stack.length - 1] === 'choice') {
                stack.pop();
                out.push('</choice>');
              }
            }
            continue;
          }
          if (tag === 'event') {
            if (stack[stack.length - 1] === 'choice') {
              stack.pop();
              out.push('</choice>');
            }
            if (stack.includes('event')) {
              while (stack.length && stack[stack.length - 1] !== 'event') {
                const popped = stack.pop();
                if (popped === 'choice') out.push('</choice>');
              }
              if (stack[stack.length - 1] === 'event') {
                stack.pop();
                out.push('</event>');
              }
            }
            continue;
          }
          if (tag === 'ftl') {
            closeEventIfOpen();
            if (stack.includes('ftl')) {
              while (stack.length && stack[stack.length - 1] !== 'ftl') {
                const popped = stack.pop();
                if (popped === 'choice') out.push('</choice>');
                else if (popped === 'event') out.push('</event>');
              }
              if (stack[stack.length - 1] === 'ftl') {
                stack.pop();
                out.push('</FTL>');
              }
            }
            continue;
          }
          const idx = stack.lastIndexOf(tag);
          if (idx !== -1) {
            while (stack.length - 1 > idx) {
              const popped = stack.pop();
              if (popped === 'choice') out.push('</choice>');
              else if (popped === 'event') out.push('</event>');
            }
            stack.pop();
            out.push(tok);
          }
          continue;
        }

        const openMatch = tok.match(/^<\s*([a-zA-Z0-9:_-]+)/);
        if (openMatch) {
          const tag = openMatch[1].toLowerCase();
          if (tag === 'ftl') {
            stack.push('ftl');
            out.push(tok);
          } else if (tag === 'event') {
            if (stack[stack.length - 1] === 'choice') {
              stack.push('event');
              out.push(tok);
            } else {
              closeEventIfOpen();
              stack.push('event');
              out.push(tok);
            }
          } else if (tag === 'choice') {
            closeChoiceIfOpen();
            stack.push('choice');
            out.push(tok);
          } else {
            stack.push(tag);
            out.push(tok);
          }
        }
      }

      while (stack.length) {
        const rem = stack.pop();
        if (rem === 'choice') out.push('</choice>');
        else if (rem === 'event') out.push('</event>');
        else if (rem === 'ftl') out.push('</FTL>');
      }

      return out.join('');
    }

    function upsertImportedEvent(importedEvent) {
      // Falls nur das initiale leere Platzhalter-Event existiert, durch das erste echte Import-Event ersetzen
      if (
        eventsCollection.length === 1 &&
        eventsCollection[0].name === 'CUSTOM_EVENT_1' &&
        !eventsCollection[0].text &&
        eventsCollection[0].sourceFile === 'Custom Events'
      ) {
        eventsCollection[0] = importedEvent;
        return;
      }
      const existingIdx = eventsCollection.findIndex(item => item.name === importedEvent.name);
      if (existingIdx !== -1) {
        eventsCollection[existingIdx] = importedEvent;
      } else {
        eventsCollection.push(importedEvent);
      }
    }

    function parseAndImportXML(xmlStr, sourceFile = 'Import') {
      const cleaned = String(xmlStr || '').replace(/^\uFEFF/, '').trim();
      if (!cleaned) return { count: 0, patchCount: 0 };

      // Vor der Tag-Bereinigung die Ziel-Namen aus <mod:findName name="..."> sichern!
      const patchTargetNames = [];
      for (const m of cleaned.matchAll(/<mod:findName\b[^>]*\bname\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
        patchTargetNames.push(sanitizeID(m[1]));
      }
      const patchCount = (cleaned.match(/<mod:[a-zA-Z0-9_-]+\b/gi) || []).length;

      const fixedXml = repairXMLBeforeImport(cleaned);
      const wrapped = `<FTL_IMPORT_ROOT>\n${fixedXml}\n</FTL_IMPORT_ROOT>`;

      const parser = new DOMParser();
      const doc = parser.parseFromString(wrapped, 'text/xml');
      const parseErr = doc.querySelector('parsererror');
      if (parseErr) {
        const detail = (parseErr.textContent || '').trim().split('\n')[0];
        throw new Error(`XML-Syntaxfehler (${detail || 'ungültige Tags'}).`);
      }

      let count = 0;
      const topNodes = [];
      Array.from(doc.documentElement?.children || []).forEach(child => {
        if (child.tagName.toLowerCase() === 'ftl') {
          topNodes.push(...Array.from(child.children || []));
        } else {
          topNodes.push(child);
        }
      });

      // 1) Reguläre <event>-Blöcke
      topNodes
        .filter(el => el.tagName.toLowerCase() === 'event')
        .forEach((node, idx) => {
          const rawName = node.getAttribute('name') || patchTargetNames[idx] || `IMPORTED_EVENT_${idx + 1}`;
          const children = Array.from(node.children || []);
          const directText = children.find(el => el.tagName.toLowerCase() === 'text');
          const textVal = directText ? decodeTextContent(directText.textContent || '') : '';
          const directChoices = children.filter(el => el.tagName.toLowerCase() === 'choice');
          const choices = directChoices.map(parseChoiceNode);

          if (!textVal && !choices.length && !node.getAttribute('name')) return;

          const cleanName = sanitizeID(rawName);
          addSuggestionEntry('eventIds', cleanName);
          upsertImportedEvent({
            name: cleanName,
            sector: 'General / Sector-Independent',
            questStageLabel: 'Normal Event',
            questRole: 'normal',
            questChainId: '',
            questStepOrder: 0,
            overrideExisting: VANILLA_OVERRIDE_IDS.has(cleanName),
            sourceFile,
            text: textVal,
            choices: choices.length ? choices : [createDefaultChoice('Continue...')]
          });
          count++;
        });

      // 2) Top-Level <choice>-Blöcke aus .xml.append-Dateien (z. B. <mod:findName name="START_BEACON"><mod:insert><choice>...)
      const topChoices = topNodes.filter(el => el.tagName.toLowerCase() === 'choice');
      if (topChoices.length > 0) {
        const targetEventName = patchTargetNames[0] || sanitizeID(sourceFile.replace(/\.[^.]+$/, '')) || 'APPEND_PATCH_EVENT';
        addSuggestionEntry('eventIds', targetEventName);
        upsertImportedEvent({
          name: targetEventName,
          sector: 'General / Sector-Independent',
          questStageLabel: 'Normal Event',
          questRole: 'normal',
          questChainId: '',
          questStepOrder: 0,
          overrideExisting: true,
          sourceFile,
          text: `(Patch aus ${sourceFile} für ${targetEventName})`,
          choices: topChoices.map(parseChoiceNode)
        });
        count += topChoices.length;
      }

      // 3) <shipBlueprint>
      topNodes
        .filter(el => el.tagName.toLowerCase() === 'shipblueprint')
        .forEach((sNode, sIdx) => {
          const layout = sNode.getAttribute('layout') || 'kestral';
          const img = sNode.getAttribute('img') || layout;
          const sName = sanitizeID(sNode.getAttribute('name') || layout || `IMPORTED_SHIP_${sIdx + 1}`);
          if (!sName) return;
          const hullEl = Array.from(sNode.children || []).find(c => c.tagName.toLowerCase() === 'hull');
          const wSlotsEl = Array.from(sNode.children || []).find(c => c.tagName.toLowerCase() === 'weaponslots');
          const unlockEl = Array.from(sNode.children || []).find(c => c.tagName.toLowerCase() === 'unlock');
          const weapons = Array.from(sNode.querySelectorAll('weapon[name]')).map(w => sanitizeID(w.getAttribute('name'))).filter(Boolean);
          const crew = Array.from(sNode.querySelectorAll('crewCount')).map(c => ({
            class: (c.getAttribute('class') || 'human').toLowerCase(),
            amount: parseInt(c.getAttribute('amount') || '1', 10) || 1
          }));

          const newShip = {
            id: 'sh_' + Math.random().toString(36).slice(2, 9),
            name: sName,
            layout,
            img,
            hull: hullEl ? (parseInt(hullEl.textContent, 10) || 30) : 30,
            weaponSlots: wSlotsEl ? (parseInt(wSlotsEl.textContent, 10) || 4) : 4,
            unlockQuest: unlockEl ? sanitizeID(unlockEl.textContent || '') : '',
            unlockNote: '',
            weapons,
            crew: crew.length ? crew : [{ class: 'human', amount: 1 }]
          };
          const exIdx = shipsCollection.findIndex(s => s.name === sName);
          if (exIdx !== -1) shipsCollection[exIdx] = newShip;
          else shipsCollection.push(newShip);
          addSuggestionEntry('ships', sName);
          count++;
        });

      // 4) <weaponBlueprint>
      topNodes
        .filter(el => el.tagName.toLowerCase() === 'weaponblueprint')
        .forEach((wNode, wIdx) => {
          const wName = sanitizeID(wNode.getAttribute('name') || `IMPORTED_WEAPON_${wIdx + 1}`);
          if (!wName) return;
          const getChildVal = (tag, fallback) => {
            const found = Array.from(wNode.children || []).find(c => c.tagName.toLowerCase() === tag);
            return found ? decodeTextContent(found.textContent || '').trim() : fallback;
          };
          const newWp = {
            id: 'wp_' + Math.random().toString(36).slice(2, 9),
            name: wName,
            type: getChildVal('type', 'LASER'),
            title: getChildVal('title', wName),
            desc: getChildVal('desc', ''),
            damage: parseInt(getChildVal('damage', '1'), 10) || 0,
            shots: Math.max(1, parseInt(getChildVal('shots', '1'), 10) || 1),
            cooldown: parseFloat(getChildVal('cooldown', '10')) || 10,
            power: Math.max(1, parseInt(getChildVal('power', '1'), 10) || 1),
            missiles: Math.max(0, parseInt(getChildVal('missiles', '0'), 10) || 0),
            cost: Math.max(0, parseInt(getChildVal('cost', '50'), 10) || 0),
            weaponArt: getChildVal('weaponart', 'laser_burst_1')
          };
          const exIdx = weaponsCollection.findIndex(w => w.name === wName);
          if (exIdx !== -1) weaponsCollection[exIdx] = newWp;
          else weaponsCollection.push(newWp);
          addSuggestionEntry('weapons', wName);
          count++;
        });

      return { count, patchCount };
    }

    async function handleFileUpload(e) {
      const files = Array.from(e.target.files || []);
      const statusBadge = document.getElementById('import-status-badge');
      if (!files.length) return;

      let loadedCount = 0;
      let patchCount = 0;
      const errors = [];

      for (const file of files) {
        try {
          const lowerName = file.name.toLowerCase();
          if (lowerName.endsWith('.ftl') || lowerName.endsWith('.zip')) {
            const buf = await file.arrayBuffer();
            const extractedTexts = await extractXMLsFromZip(new Uint8Array(buf));
            if (!extractedTexts.length) {
              errors.push(`${file.name}: Keine XML/.append-Dateien im Archiv gefunden.`);
            }
            for (const item of extractedTexts) {
              const res = parseAndImportXML(item.text, `${file.name} (${item.fileName})`);
              loadedCount += res.count;
              patchCount += res.patchCount;
            }
          } else {
            // Liest sowohl normale .xml als auch .xml.append, .append oder .txt direkt ein
            const txt = await file.text();
            const res = parseAndImportXML(txt, file.name);
            loadedCount += res.count;
            patchCount += res.patchCount;
            if (res.count === 0 && res.patchCount === 0) {
              errors.push(`${file.name}: Keine <event>-, <choice>-, <shipBlueprint>- oder <mod:*>-Tags gefunden.`);
            }
          }
        } catch (err) {
          errors.push(`${file.name}: ${err.message || 'Lesefehler'}`);
        }
      }

      if (loadedCount > 0 || patchCount > 0) {
        selectedModFilter = '__ALL__';
        currentIndex = 0;
        activeChoiceIndex = 0;
        renderAll();
        const msg = `✓ ${loadedCount} Eintrag/Einträge geladen${patchCount ? ` (${patchCount} mod:-Tags)` : ''}`;
        if (statusBadge) statusBadge.textContent = msg;
      } else if (errors.length) {
        if (statusBadge) statusBadge.textContent = `✕ Import-Fehler`;
        alert(`Import fehlgeschlagen:\n- ${errors.join('\n- ')}`);
      }
      e.target.value = '';
    }

    /* XML Generierung & Validierung */
    function buildAchievementXML(ef, indent = '    ', mode = 'hyperspace') {
      const hasAch = Boolean((ef.achId && ef.achId.trim()) || (ef.achShip && ef.achShip.trim()) || (ef.achText && ef.achText.trim()) || (ef.achArtworkName && ef.achArtworkName.trim()));
      if (!hasAch) return '';
      const achId = escapeXML(sanitizeID(ef.achId || 'CUSTOM_ACHIEVEMENT'));
      const shipAttr = ef.achShip && ef.achShip.trim() ? ` ship="${escapeXML(sanitizeID(ef.achShip))}"` : '';
      let out = `${indent}<achievement id="${achId}"${shipAttr}>\n`;
      if (ef.achText && ef.achText.trim()) out += `${indent}  <text>${escapeXML(ef.achText.trim())}</text>\n`;
      if (ef.achArtworkName && ef.achArtworkName.trim()) out += `${indent}  <img>${escapeXML(ef.achArtworkName.trim())}</img>\n`;
      if (mode === 'hyperspace' && ef.achShip && ef.achShip.trim()) out += `${indent}  <ship>${escapeXML(sanitizeID(ef.achShip))}</ship>\n`;
      out += `${indent}</achievement>\n`;
      return out;
    }

    function buildChoiceXML(ch, indent = '    ', mode = 'hyperspace') {
      const ef = ch.effects || createDefaultEffects();
      const reqAttr = ef.req ? ` req="${escapeXML(ef.req)}" lvl="${ef.reqLvl || 1}" hidden="true"` : '';
      let out = `${indent}<choice${reqAttr}>\n`;
      if (ef.condition && ef.condition.trim()) out += `${indent}  <!-- Bedingung: ${escapeXML(ef.condition.trim())} -->\n`;
      out += `${indent}  <text>${escapeXML(ch.text || 'Continue...')}</text>\n`;
      if (mode === 'hyperspace' && ef.achTrigger !== 'event') out += buildAchievementXML(ef, `${indent}  `, mode);
      out += `${indent}  <event>\n`;
      if (ch.outcomeText && ch.outcomeText.trim()) out += `${indent}    <text>${escapeXML(ch.outcomeText)}</text>\n`;
      if (mode === 'hyperspace' && ef.achTrigger === 'event') out += buildAchievementXML(ef, `${indent}    `, mode);
      if (ef.rewardMode === 'auto') {
        out += `${indent}    <autoReward level="MED">standard</autoReward>\n`;
      } else {
        const items = [];
        if (ef.scrap) items.push(`${indent}      <item type="scrap" min="${ef.scrap}" max="${ef.scrap}"/>`);
        if (ef.fuel) items.push(`${indent}      <item type="fuel" min="${ef.fuel}" max="${ef.fuel}"/>`);
        if (ef.missiles) items.push(`${indent}      <item type="missiles" min="${ef.missiles}" max="${ef.missiles}"/>`);
        if (ef.drones) items.push(`${indent}      <item type="drones" min="${ef.drones}" max="${ef.drones}"/>`);
        if (items.length) out += `${indent}    <item_modify>\n${items.join('\n')}\n${indent}    </item_modify>\n`;
      }
      if (ef.hull) out += `${indent}    <damage amount="${-ef.hull}"/>\n`;
      if (ef.crew > 0) out += `${indent}    <crewMember amount="${ef.crew}"/>\n`;
      if (ef.crew < 0) out += `${indent}    <removeCrew><clone>false</clone><text>A crewmember has been lost.</text></removeCrew>\n`;
      if (ef.weapon) out += `${indent}    <weapon name="${escapeXML(ef.weapon)}"/>\n`;
      if (ef.drone) out += `${indent}    <drone name="${escapeXML(ef.drone)}"/>\n`;
      if (ef.augment) out += `${indent}    <augment name="${escapeXML(ef.augment)}"/>\n`;
      if (ef.ship) out += `${indent}    <ship load="${escapeXML(ef.ship)}" hostile="true"/>\n`;
      if (ef.quest) out += `${indent}    <quest event="${escapeXML(ef.quest)}"/>\n`;
      if (mode === 'hyperspace' && ef.hsVar && ef.hsVar.includes('=')) {
        const [vName, vVal] = ef.hsVar.split('=').map(s => s.trim());
        if (vName) out += `${indent}    <variable name="${escapeXML(vName)}" op="set" val="${escapeXML(vVal || '1')}"/>\n`;
      }
      out += `${indent}  </event>\n`;
      out += `${indent}</choice>`;
      return out;
    }

    function generateAllXML(mode = 'hyperspace') {
      const blocks = eventsCollection.map(ev => {
        const safeName = escapeXML(ev.name || 'UNNAMED_EVENT');
        const sectorComment = ev.sector && ev.sector !== 'General / Sector-Independent' ? `  <!-- Sektor: ${escapeXML(ev.sector)} -->\n` : '';
        let out = `${sectorComment}  <event name="${safeName}">\n`;
        out += `    <text>${escapeXML(ev.text)}</text>\n`;
        out += ev.choices.map(ch => buildChoiceXML(ch, '    ', mode)).join('\n') + '\n';
        out += `  </event>`;
        return out;
      });
      return `<FTL>\n${blocks.join('\n')}\n</FTL>`;
    }

    function generateBlueprintsXML() {
      const shipBlocks = shipsCollection.map((sh, idx) => buildSingleShipBlueprintXML(sh, idx));
      const weaponBlocks = weaponsCollection.map((wp, idx) => {
        const safeName = escapeXML(sanitizeID(wp.name || `CUSTOM_LASER_${idx + 1}`));
        return [
          `  <weaponBlueprint name="${safeName}">`,
          `    <type>${escapeXML(wp.type || 'LASER')}</type>`,
          `    <title>${escapeXML(wp.title || safeName)}</title>`,
          `    <short>${escapeXML(wp.title || safeName)}</short>`,
          `    <desc>${escapeXML(wp.desc || 'Custom weapon')}</desc>`,
          `    <damage>${parseInt(wp.damage, 10) || 0}</damage>`,
          `    <shots>${Math.max(1, parseInt(wp.shots, 10) || 1)}</shots>`,
          `    <sp>0</sp>`,
          `    <fireChance>1</fireChance>`,
          `    <breachChance>0</breachChance>`,
          `    <cooldown>${parseFloat(wp.cooldown) || 10}</cooldown>`,
          `    <power>${Math.max(1, parseInt(wp.power, 10) || 1)}</power>`,
          `    <missiles>${Math.max(0, parseInt(wp.missiles, 10) || 0)}</missiles>`,
          `    <cost>${Math.max(0, parseInt(wp.cost, 10) || 0)}</cost>`,
          `    <bp>2</bp>`,
          `    <rarity>1</rarity>`,
          `    <image>laser_light1</image>`,
          `    <launchSounds><sound>lightLaser1</sound></launchSounds>`,
          `    <hitShipSounds><sound>hitHull1</sound></hitShipSounds>`,
          `    <weaponArt>${escapeXML(wp.weaponArt || 'laser_burst_1')}</weaponArt>`,
          `  </weaponBlueprint>`
        ].join('\n');
      });
      return `<FTL>\n${[...shipBlocks, ...weaponBlocks].join('\n')}\n</FTL>`;
    }

    function generateAnimationsXML() {
      const crewSheets = spritesCollection.filter(sp => (sp.category || '').toLowerCase().includes('crew'));
      if (!crewSheets.length) return '';
      const blocks = crewSheets.map(sp => {
        const sheetId = escapeXML(sp.name.toLowerCase());
        const fileName = escapeXML(sp.fileName);
        const totalW = (sp.sheetCols || 9) * 35;
        const totalH = (sp.sheetRows || 9) * 35;
        const walkFrames = sp.walkFrames || 4;
        return [
          `  <animSheet name="${sheetId}" w="${totalW}" h="${totalH}" fw="35" fh="35">people/${fileName}</animSheet>`,
          `  <anim name="${sheetId}_walk_down"><sheet>${sheetId}</sheet><desc length="${walkFrames}" x="0" y="0"/><time>0.45</time></anim>`,
          `  <anim name="${sheetId}_walk_right"><sheet>${sheetId}</sheet><desc length="${walkFrames}" x="0" y="1"/><time>0.45</time></anim>`,
          `  <anim name="${sheetId}_walk_up"><sheet>${sheetId}</sheet><desc length="${walkFrames}" x="0" y="2"/><time>0.45</time></anim>`,
          `  <anim name="${sheetId}_walk_left"><sheet>${sheetId}</sheet><desc length="${walkFrames}" x="0" y="3"/><time>0.45</time></anim>`
        ].join('\n');
      });
      return `<FTL>\n${blocks.join('\n')}\n</FTL>`;
    }

    function validateSlipstreamXML(xmlStr) {
      const issues = [];
      eventsCollection.forEach((ev, i) => {
        if (!ev.name || !/^[A-Z0-9_]+$/.test(ev.name)) {
          issues.push(`Event #${i + 1}: Invalid Event ID („${ev.name || ''}“).`);
        }
        if (!ev.text || !ev.text.trim()) {
          issues.push(`Event ${ev.name || '#' + (i + 1)}: Main text (<text>) is empty.`);
        }
      });
      return issues;
    }

    function runSlipstreamLint(showToastIfClean = false) {
      const panel = document.getElementById('lint-panel');
      const statusEl = document.getElementById('lint-status-text');
      const listEl = document.getElementById('lint-issues-list');
      const issues = validateSlipstreamXML(generateAllXML('hyperspace'));

      if (issues.length > 0) {
        panel.className = 'lint-panel has-errors';
        statusEl.textContent = `✕ FTLman / Slipstream Check: ${issues.length} Hinweis(e)`;
        listEl.style.display = 'block';
        listEl.innerHTML = issues.map(msg => `<li>${escapeXML(msg)}</li>`).join('');
      } else {
        panel.className = 'lint-panel ok';
        statusEl.textContent = '✓ FTLman / Slipstream Check: Ready (.xml & .xml.append active)';
        listEl.style.display = 'none';
        listEl.innerHTML = '';
        if (showToastIfClean) alert('Alle FTLman- und Slipstream-Checks bestanden!');
      }
      return issues;
    }

    function closeModal(id) { document.getElementById(id).style.display = 'none'; }
    function copyXMLToClipboard(mode = 'hyperspace') {
      navigator.clipboard.writeText(generateAllXML(mode));
      alert('XML in die Zwischenablage kopiert!');
    }
    function downloadXMLFile(mode = 'hyperspace') {
      const blob = new Blob([generateAllXML(mode)], { type: 'application/xml;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'events.xml.append';
      a.click();
    }
    function openPresetsEditorModal() {
      document.getElementById('presets-editor-textarea').value = quickPresets.join('\n');
      document.getElementById('presets-modal').style.display = 'flex';
    }
    function savePresetsFromEditor() {
      const lines = document.getElementById('presets-editor-textarea').value.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length) quickPresets = lines;
      closeModal('presets-modal');
    }

    function crc32(bytes) {
      let crc = -1;
      for (let i = 0; i < bytes.length; i++) {
        crc ^= bytes[i];
        for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
      }
      return (crc ^ -1) >>> 0;
    }

    function exportFTLArchive(mode = 'hyperspace') {
      const isVanilla = mode === 'vanilla';
      const enc = new TextEncoder();
      const xmlData = enc.encode(generateAllXML(mode));
      const blueprintsData = enc.encode(generateBlueprintsXML());
      const animationsXML = generateAnimationsXML();
      const baseTitle = document.getElementById('mod-title').value || 'Custom FTL Mod';
      const metaXML = enc.encode(
        `<metadata>\n  <title><![CDATA[${baseTitle}${isVanilla ? ' [Vanilla]' : ' [Hyperspace]'}]]></title>\n` +
        `  <author><![CDATA[${document.getElementById('mod-author').value}]]></author>\n` +
        `  <version><![CDATA[${document.getElementById('mod-version').value}]]></version>\n` +
        `  <description><![CDATA[${document.getElementById('mod-desc').value}]]></description>\n</metadata>`
      );

      const files = [
        { name: 'data/events.xml.append', data: xmlData },
        { name: 'data/blueprints.xml.append', data: blueprintsData },
        { name: 'mod-appendix/metadata.xml', data: metaXML }
      ];
      if (animationsXML) files.push({ name: 'data/animations.xml.append', data: enc.encode(animationsXML) });

      spritesCollection.forEach(sp => {
        if (sp.rawBytes && sp.rawBytes.length) {
          const isCrew = (sp.category || '').toLowerCase().includes('crew');
          files.push({ name: (isCrew ? 'img/people/' : 'img/weapons/') + sp.fileName, data: sp.rawBytes });
        }
      });

      const localParts = [];
      const centralParts = [];
      let offset = 0;
      files.forEach(f => {
        const nameBytes = enc.encode(f.name);
        const crc = crc32(f.data);
        const lh = new Uint8Array(30 + nameBytes.length);
        const lv = new DataView(lh.buffer);
        lv.setUint32(0, 0x04034b50, true);
        lv.setUint16(4, 20, true);
        lv.setUint32(14, crc, true);
        lv.setUint32(18, f.data.length, true);
        lv.setUint32(22, f.data.length, true);
        lv.setUint16(26, nameBytes.length, true);
        lh.set(nameBytes, 30);

        const ch = new Uint8Array(46 + nameBytes.length);
        const cv = new DataView(ch.buffer);
        cv.setUint32(0, 0x02014b50, true);
        cv.setUint16(4, 20, true);
        cv.setUint16(6, 20, true);
        cv.setUint32(16, crc, true);
        cv.setUint32(20, f.data.length, true);
        cv.setUint32(24, f.data.length, true);
        cv.setUint16(28, nameBytes.length, true);
        cv.setUint32(42, offset, true);
        ch.set(nameBytes, 46);

        localParts.push(lh, f.data);
        centralParts.push(ch);
        offset += lh.length + f.data.length;
      });

      const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
      const eocd = new Uint8Array(22);
      const ev = new DataView(eocd.buffer);
      ev.setUint32(0, 0x06054b50, true);
      ev.setUint16(8, files.length, true);
      ev.setUint16(10, files.length, true);
      ev.setUint32(12, centralSize, true);
      ev.setUint32(16, offset, true);

      const blob = new Blob([...localParts, ...centralParts, eocd], { type: 'application/octet-stream' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = isVanilla ? 'custom-vanilla-mod.ftl' : 'custom-hyperspace-mod.ftl';
      a.click();
    }

    renderAll();
