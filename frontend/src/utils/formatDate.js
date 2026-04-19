 export const formatDate = (dateString) => {
    if (!dateString) return "";
    
    // Create a date object from the YYYY-MM-DD string
    const date = new Date(dateString);
    
    // Format using the browser's internationalization API
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };