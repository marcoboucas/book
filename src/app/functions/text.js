import sanitizeHtml from 'sanitize-html';

const sanitize = (text) => sanitizeHtml(text, {
  allowedTags: ['b', 'i', 'em', 'strong', 'center'],
  allowedAttributes: {
    '*': ['style'],
  },
});
export default sanitize;
