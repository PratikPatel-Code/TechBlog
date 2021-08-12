// Format date as MM/DD/YYYY
// Taken from helpers class activity

module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
