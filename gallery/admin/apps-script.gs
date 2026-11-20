/**
 * Sara Kim Gallery — 주문 접수 스크립트
 * 구글 시트에 붙여 쓰는 Apps Script입니다. (시트 > 확장 프로그램 > Apps Script)
 *
 * 하는 일
 *  - 갤러리 주문서(빠른/세밀)에서 들어온 주문을 '주문' 시트에 한 줄씩 저장
 *  - 손님이 첨부한 사진을 구글 드라이브 'Sara Kim Gallery 주문 사진' 폴더에 저장하고, 시트 칸에 미리보기로 표시
 *  - 새 주문이 오면 사라 님 메일로 알림(사진 첨부)
 *  - 관리자 페이지(thesarakims.com/gallery/admin)에 주문 목록 제공, 상태·메모 변경, 사진 추가
 *
 * 처음 한 번: 아래 ADMIN_PASSWORD 를 사라 님만 아는 비밀번호로 바꾼 뒤 배포하세요.
 */
const ADMIN_PASSWORD = 'CHANGE_ME';
const NOTIFY_EMAIL = 'ceo@raraland-ai.com';
const SHEET_NAME = '주문';
const FOLDER_NAME = 'Sara Kim Gallery 주문 사진';
const STATUSES = ['입금 대기', '입금 확인', '제작 중', '시안 전달', '배송 중', '완료', '취소'];
const HEADERS = ['접수 시각', '주문번호', '주문 방식', '상태', '주문자', '연락처', '상품', '금액', '배송지',
  '누구를 위한', '스타일', 'AI 프롬프트', '사진 미리보기', '손님 사진', '작가 사진', '메모'];
const MAX_PHOTOS = 6;

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    if (req.action === 'order') return json_(createOrder_(req));
    if (!checkKey_(req.key)) return json_({ ok: false, error: 'auth' });
    if (req.action === 'update') return json_(updateOrder_(req));
    if (req.action === 'addPhotos') return json_(addPhotos_(req));
    return json_({ ok: false, error: 'unknown action' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const p = e.parameter || {};
  if (p.action === 'list') {
    if (!checkKey_(p.key)) return json_({ ok: false, error: 'auth' });
    return json_({ ok: true, statuses: STATUSES, orders: listOrders_() });
  }
  return json_({ ok: true, service: 'Sara Kim Gallery orders' });
}

/* ---------- 주문 저장 ---------- */
function createOrder_(o) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    const oid = String(o.oid || '').slice(0, 40);
    const photos = savePhotos_(oid, (o.photos || []).slice(0, MAX_PHOTOS), '손님');
    sh.appendRow([
      new Date(), oid, s_(o.mode), STATUSES[0], s_(o.name), s_(o.contact), s_(o.product), s_(o.amount), s_(o.addr),
      s_(o.who), s_(o.style), s_(o.prompt, 5000), '', photos.map(f => f.url).join('\n'), '', ''
    ]);
    const row = sh.getLastRow();
    if (photos.length) sh.getRange(row, 13).setFormula('=IMAGE("' + thumb_(photos[0].id) + '")');
    sh.setRowHeight(row, photos.length ? 120 : 40);
    notify_(o, oid, photos);
    return { ok: true, oid: oid, photos: photos.length };
  } finally {
    lock.releaseLock();
  }
}

function notify_(o, oid, photos) {
  const body = [
    '새 그림 주문이 들어왔어요.', '',
    '주문번호: ' + oid, '주문 방식: ' + s_(o.mode), '주문자: ' + s_(o.name), '연락처: ' + s_(o.contact),
    '상품: ' + s_(o.product), '금액: ' + s_(o.amount) + ' (계좌이체 입금 대기)', '배송지: ' + s_(o.addr), '',
    '■ AI 그림 프롬프트', s_(o.prompt, 5000), '',
    '첨부 사진: ' + photos.length + '장', photos.map(f => f.url).join('\n'), '',
    '관리자 페이지: https://thesarakims.com/gallery/admin/'
  ].join('\n');
  const attachments = photos.slice(0, 3).map(f => DriveApp.getFileById(f.id).getBlob());
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[새 주문 ' + oid + '] ' + s_(o.name) + '님 · ' + s_(o.product) + ' · ' + s_(o.amount),
    body: body, attachments: attachments
  });
}

/* ---------- 관리자 ---------- */
function listOrders_() {
  const sh = sheet_();
  const n = sh.getLastRow() - 1;
  if (n < 1) return [];
  const rows = sh.getRange(2, 1, n, HEADERS.length).getValues();
  return rows.map((r, i) => ({
    row: i + 2, time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), oid: r[1], mode: r[2], status: r[3],
    name: r[4], contact: r[5], product: r[6], amount: r[7], addr: r[8], who: r[9], style: r[10], prompt: r[11],
    customerPhotos: links_(r[13]), artistPhotos: links_(r[14]), memo: r[15]
  })).reverse();
}

function updateOrder_(req) {
  const sh = sheet_();
  const row = findRow_(sh, req.oid);
  if (!row) return { ok: false, error: 'not found' };
  if (req.status !== undefined && STATUSES.indexOf(req.status) >= 0) sh.getRange(row, 4).setValue(req.status);
  if (req.memo !== undefined) sh.getRange(row, 16).setValue(s_(req.memo, 2000));
  return { ok: true };
}

function addPhotos_(req) {
  const sh = sheet_();
  const row = findRow_(sh, req.oid);
  if (!row) return { ok: false, error: 'not found' };
  const photos = savePhotos_(req.oid, (req.photos || []).slice(0, MAX_PHOTOS), '작가');
  const cell = sh.getRange(row, 15);
  const prev = String(cell.getValue() || '');
  cell.setValue((prev ? prev + '\n' : '') + photos.map(f => f.url).join('\n'));
  return { ok: true, added: photos.length };
}

/* ---------- 도우미 ---------- */
function savePhotos_(oid, list, who) {
  if (!list.length) return [];
  const root = folder_(FOLDER_NAME, DriveApp.getRootFolder());
  const dir = folder_(oid || 'unknown', root);
  return list.map((p, i) => {
    const type = /^image\/(jpeg|png|webp|heic|heif|gif)$/.test(p.type) ? p.type : 'image/jpeg';
    const blob = Utilities.newBlob(Utilities.base64Decode(p.data), type, who + '-' + (i + 1) + '-' + s_(p.name, 80));
    const f = dir.createFile(blob);
    f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return { id: f.getId(), url: 'https://drive.google.com/file/d/' + f.getId() + '/view' };
  });
}

function links_(cell) {
  return String(cell || '').split('\n').filter(Boolean).map(u => {
    const m = u.match(/\/d\/([^/]+)/);
    return m ? { url: u, thumb: thumb_(m[1]) } : { url: u, thumb: '' };
  });
}

function thumb_(id) { return 'https://drive.google.com/thumbnail?id=' + id + '&sz=w800'; }

function folder_(name, parent) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#111111').setFontColor('#f2f2f2');
    sh.setColumnWidth(12, 360); sh.setColumnWidth(13, 160);
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
    sh.getRange('D2:D').setDataValidation(rule);
  }
  return sh;
}

function findRow_(sh, oid) {
  const n = sh.getLastRow() - 1;
  if (n < 1 || !oid) return 0;
  const ids = sh.getRange(2, 2, n, 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(oid)) return i + 2;
  return 0;
}

function checkKey_(k) { return ADMIN_PASSWORD !== 'CHANGE_ME' && String(k || '') === ADMIN_PASSWORD; }
function s_(v, max) { return String(v == null ? '' : v).slice(0, max || 500); }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

/* 설치 직후 한 번 실행: 시트와 폴더를 만들고 권한을 승인합니다. */
function setup() {
  sheet_();
  folder_(FOLDER_NAME, DriveApp.getRootFolder());
  MailApp.getRemainingDailyQuota();
}
