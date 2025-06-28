---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## 🐛 Bug Description

A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce

1. Install the package: `npm install number-is-in-range`
2. Run this code:
   ```javascript
   require('number-is-in-range');
   console.log((10).isInRange(0, 5)); // Expected: false, Actual: true
   ```
3. See the incorrect output

## ✅ Expected Behavior

A clear and concise description of what you expected to happen.

## ❌ Actual Behavior

A clear and concise description of what actually happened.

## 📋 Environment

- **Package Version**: [e.g. 3.0.0]
- **Node.js Version**: [e.g. 16.14.0]
- **Operating System**: [e.g. macOS 12.1, Windows 11, Ubuntu 20.04]
- **Browser**: [e.g. Chrome 96, Firefox 95, Safari 15] (if applicable)

## 📝 Additional Context

Add any other context about the problem here, such as:

- **Code Example**: More detailed code that reproduces the issue
- **Error Messages**: Full error stack traces if applicable
- **Screenshots**: If applicable, add screenshots to help explain your problem
- **Related Issues**: Link to any related issues or discussions

## 🔍 Debugging Information

```javascript
// Add any debugging code you've tried
console.log('Debug info:', {
  value: 10,
  start: 0,
  end: 5,
  result: (10).isInRange(0, 5)
});
```

## 📋 Checklist

- [ ] I have searched existing issues to avoid duplicates
- [ ] I have provided a clear description of the bug
- [ ] I have included steps to reproduce the issue
- [ ] I have specified my environment details
- [ ] I have provided expected vs actual behavior
- [ ] I have included relevant code examples
- [ ] I have checked that this is not a usage question (use Discussions for that)

## 🏷️ Labels

Please add appropriate labels to help categorize this issue:
- `bug` - Confirmed bug
- `high-priority` - Critical issue affecting functionality
- `regression` - Issue that worked in previous versions
- `edge-case` - Unusual or rare scenario
- `performance` - Performance-related issue 