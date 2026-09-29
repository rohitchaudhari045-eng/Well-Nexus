/**
 * Export Utility for WellNexus Enterprise Node
 * Generates and downloads CSV and formatted text/PDF reports
 */

export function downloadCSV(filename, headers, rows) {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadFormattedReport(filename, title, contentSections) {
  let reportText = `========================================================================\n`;
  reportText += `OIL INDIA LIMITED - WELLNEXUS ENTERPRISE INTELLIGENCE REPORT\n`;
  reportText += `REPORT TITLE: ${title.toUpperCase()}\n`;
  reportText += `DATE & TIME: ${new Date().toLocaleString()}\n`;
  reportText += `========================================================================\n\n`;

  contentSections.forEach(section => {
    reportText += `------------------------------------------------------------------------\n`;
    reportText += `[ ${section.heading.toUpperCase()} ]\n`;
    reportText += `------------------------------------------------------------------------\n`;
    if (Array.isArray(section.items)) {
      section.items.forEach((item, i) => {
        reportText += `  ${i + 1}. ${item}\n`;
      });
    } else if (typeof section.items === 'object') {
      Object.entries(section.items).forEach(([k, v]) => {
        reportText += `  • ${k}: ${v}\n`;
      });
    } else {
      reportText += `  ${section.items}\n`;
    }
    reportText += `\n`;
  });

  reportText += `========================================================================\n`;
  reportText += `END OF REPORT - GENERATED VIA WELLNEXUS FIREBASE ENTERPRISE NODE\n`;
  reportText += `========================================================================\n`;

  const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
