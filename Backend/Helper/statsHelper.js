function HeatMap_records(map, key, title) {
  if (!map.has(key)) map.set(key, { todo: 0, trackers: 0, events: 0, total: 0 })
  const record = map.get(key);
  record[title]++;
  record.total++;
}
function getFormatteddates(DateObj) {
  const y = DateObj.getFullYear();
  const m = String(DateObj.getMonth()).padStart(2, '0');
  const d = String(DateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`
}
module.exports = {
  HeatMap_records,
  getFormatteddates,
}
