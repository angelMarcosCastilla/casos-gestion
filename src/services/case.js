import { NETSUITE_URL } from '#constant.js';

async function getCases() {
  const response = await fetch(NETSUITE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Operation': 'getCases',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    },
  });

  const cases = await response.json();
  const status = {};
  cases.forEach((item) => {
    status[item.statusId] ??= { total: 0, name: item.status, id: item.statusId };
    status[item.statusId].total++;
  });

  return { cases, totalCases: cases.length, status: Object.values(status) };
}

export const caseApi = {
  getCases,
};
