const SHEET_NAME = "MEMO30";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const action = data.action;
    const sheet = getSheet_();

    if (action === "list") {
      return json_({ ok: true, memos: readAll_(sheet) });
    }

    if (action === "save") {
      const no = Number(data.no);
      if (!no || no < 1 || no > 30) throw new Error("invalid no");
      const updatedAt = new Date().toISOString();
      sheet.getRange(no + 1, 1, 1, 4).setValues([[no, String(data.title || ""), String(data.body || ""), updatedAt]]);
      return json_({ ok: true, updatedAt });
    }

    if (action === "delete") {
      const no = Number(data.no);
      if (!no || no < 1 || no > 30) throw new Error("invalid no");
      const updatedAt = new Date().toISOString();
      sheet.getRange(no + 1, 1, 1, 4).setValues([[no, "", "", updatedAt]]);
      return json_({ ok: true, updatedAt });
    }

    return json_({ ok: false, error: "unknown action" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  const sheet = getSheet_();
  return json_({ ok: true, memos: readAll_(sheet) });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 4).setValues([["번호", "제목", "내용", "수정일시"]]);
  }

  if (sheet.getLastRow() < 31) {
    const rows = [];
    for (let i = sheet.getLastRow(); i < 31; i++) rows.push([i, "", "", ""]);
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 4).setValues(rows);
  }

  return sheet;
}

function readAll_(sheet) {
  const values = sheet.getRange(2, 1, 30, 4).getValues();
  return values.map((r, i) => ({
    no: Number(r[0]) || i + 1,
    title: String(r[1] || ""),
    body: String(r[2] || ""),
    updatedAt: r[3] ? String(r[3]) : ""
  }));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
