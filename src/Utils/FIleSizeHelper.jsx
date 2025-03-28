export function formatFileSize(bytes) {
    // If bytes is less than 0 or not a number, return 0 MB
    if (!bytes || isNaN(bytes) || bytes < 0) return '0 MB';
  
    // Convert to megabytes and round to two decimal places
    const megabytes = (bytes / (1024 * 1024)).toFixed(2);
  
    return `${megabytes} MB`;
  }