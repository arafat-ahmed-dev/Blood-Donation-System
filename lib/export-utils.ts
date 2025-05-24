import { saveAs } from "file-saver";

/**
 * Export analytics data to CSV format
 */
export function exportToCSV(data: any, filename: string) {
  // Convert data to CSV format
  const csvContent = convertToCSV(data);

  // Create blob and save file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${filename}.csv`);
}

/**
 * Export analytics data to JSON format
 */
export function exportToJSON(data: any, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  saveAs(blob, `${filename}.json`);
}

/**
 * Export analytics data to Excel format
 */
export function exportToExcel(data: any, filename: string) {
  // Convert data to Excel format
  const excelContent = convertToExcel(data);

  // Create blob and save file
  const blob = new Blob([excelContent], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${filename}.xlsx`);
}

/**
 * Convert data to CSV format
 */
function convertToCSV(data: any): string {
  if (Array.isArray(data)) {
    // Handle array of objects
    const headers = Object.keys(data[0]);
    const rows = data.map((obj) => headers.map((header) => obj[header]));
    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  } else {
    // Handle single object
    const rows = Object.entries(data).map(([key, value]) => `${key},${value}`);
    return rows.join("\n");
  }
}

/**
 * Convert data to Excel format
 */
function convertToExcel(data: any): ArrayBuffer {
  // This is a placeholder. In a real implementation, you would use a library like 'xlsx'
  // to properly convert the data to Excel format
  return new ArrayBuffer(0);
}

/**
 * Format date for filename
 */
export function formatDateForFilename(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Export analytics data with all available formats
 */
export function exportAnalyticsData(data: any, baseFilename: string) {
  const timestamp = formatDateForFilename();
  const filename = `${baseFilename}_${timestamp}`;

  return {
    exportCSV: () => exportToCSV(data, filename),
    exportJSON: () => exportToJSON(data, filename),
    exportExcel: () => exportToExcel(data, filename),
  };
}
