const SHEET_NAMES = ['Settings','Itinerary','Activities','Current_Status','Van_Log','Journal','GPS_Track','Expenses'];

function doGet() {
  return json_({ok:true, service:'Lofoten 2026 Roadbook', version:1});
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    checkKey_(body.key);
    const action = body.action || '';
    if (action === 'load') return json_({ok:true, state:loadState_()});
    if (action === 'save') {
      if (!body.state || typeof body.state !== 'object') throw new Error('Missing state');
      saveState_(body.state);
      return json_({ok:true, updatedAt:new Date().toISOString()});
    }
    if (action === 'setup') {
      ensureSpreadsheet_();
      return json_({ok:true, spreadsheetUrl:getSpreadsheet_().getUrl()});
    }
    throw new Error('Unknown action');
  } catch (err) {
    return json_({ok:false, error:String(err && err.message || err)});
  }
}

function setRoadbookKey() {
  const ui = SpreadsheetApp.getUi();
  const answer = ui.prompt('Roadbook access key', 'Enter a private phrase used by the website.', ui.ButtonSet.OK_CANCEL);
  if (answer.getSelectedButton() !== ui.Button.OK) return;
  const key = answer.getResponseText().trim();
  if (key.length < 8) throw new Error('Use at least 8 characters.');
  PropertiesService.getScriptProperties().setProperty('ROADBOOK_KEY', key);
  ui.alert('Access key saved. Redeploy the web app after code changes, but not after changing this key.');
}

function setupRoadbook() {
  ensureSpreadsheet_();
  SpreadsheetApp.getUi().alert('Roadbook ready: ' + getSpreadsheet_().getUrl());
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Lofoten Roadbook')
    .addItem('Initialize sheets', 'setupRoadbook')
    .addItem('Set access key', 'setRoadbookKey')
    .addToUi();
}

function checkKey_(key) {
  const expected = PropertiesService.getScriptProperties().getProperty('ROADBOOK_KEY');
  if (!expected) throw new Error('ROADBOOK_KEY is not configured in Apps Script.');
  if (String(key || '') !== expected) throw new Error('Invalid access key.');
}

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('Attach this script to a Google Sheet, or set SPREADSHEET_ID in Script Properties.');
  props.setProperty('SPREADSHEET_ID', active.getId());
  return active;
}

function ensureSpreadsheet_() {
  const ss = getSpreadsheet_();
  SHEET_NAMES.forEach(name => {
    if (!ss.getSheetByName(name)) ss.insertSheet(name);
  });
  return ss;
}

function saveState_(state) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = ensureSpreadsheet_();
    write_(ss, 'Settings', [['key','value'],['state_json',JSON.stringify(state)],['updated_at',new Date().toISOString()]]);
    write_(ss, 'Itinerary', [['Date','Departure','Arrival','Km','Hours','Type','Plan A','Plan B']].concat(state.itinerary || []));
    write_(ss, 'Activities', [['Activity','Area','Category','Duration','Terrain','Paddy','Latitude','Longitude']].concat(state.activities || []));
    const c = state.current || {};
    write_(ss, 'Current_Status', [['date','place','weather','olivier','sorya','paddy','decision'],[c.date,c.place,c.weather,c.olivier,c.sorya,c.paddy,c.decision]]);
    const v = state.van || {};
    write_(ss, 'Van_Log', [['fuel','water','grey','battery','toilet','next'],[v.fuel,v.water,v.grey,v.battery,v.toilet,v.next]]);
    write_(ss, 'Journal', [['date','place','km','weather','highlight','issue']].concat((state.journal || []).map(x => [x.date,x.place,x.km,x.weather,x.highlight,x.issue])));
    write_(ss, 'GPS_Track', [['latitude','longitude','time','accuracy']].concat(((state.gps && state.gps.points) || []).map(p => [p.lat,p.lon,p.t,p.acc])));
    write_(ss, 'Expenses', [['category','amount','place','note','date']].concat(state.expenses || []));
  } finally {
    lock.releaseLock();
  }
}

function loadState_() {
  const sheet = ensureSpreadsheet_().getSheetByName('Settings');
  if (sheet.getLastRow() < 2) return null;
  const values = sheet.getRange(1,1,sheet.getLastRow(),2).getValues();
  const row = values.find(r => r[0] === 'state_json');
  return row && row[1] ? JSON.parse(row[1]) : null;
}

function write_(ss, name, values) {
  const sheet = ss.getSheetByName(name);
  sheet.clearContents();
  if (!values || !values.length) return;
  const width = Math.max.apply(null, values.map(r => r.length));
  const normalized = values.map(r => r.concat(Array(Math.max(0,width-r.length)).fill('')));
  sheet.getRange(1,1,normalized.length,width).setValues(normalized);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1,width);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
