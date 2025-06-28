---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: ['enhancement', 'needs-triage']
assignees: ''
---

## 💡 Feature Description

A clear and concise description of the feature you'd like to see implemented.

## 🎯 Use Case

Explain why this feature is needed and how it would be beneficial:

- **Problem it solves**: What problem does this feature address?
- **Target users**: Who would benefit from this feature?
- **Current workarounds**: How do users currently achieve this functionality?

## 🔧 Proposed API

Describe how you envision this feature working:

```javascript
// Example usage
require('number-is-in-range');

// New feature example
const result = (10).isInRange(0, 20, { 
  newOption: true,
  customValidation: (value) => value % 2 === 0 
});
```

## 📝 Examples

Provide concrete examples of how this feature would be used:

```javascript
// Example 1: Basic usage
const age = 25;
const isValidAge = age.isInRange(0, 120, { validateAge: true });

// Example 2: Advanced usage
const temperature = 20;
const isValidTemp = temperature.isInRange(-273.15, 100, { 
  unit: 'celsius',
  strict: true 
});
```

## 🔄 Alternatives Considered

Describe any alternative solutions you've considered:

- **Current workarounds**: How users currently solve this problem
- **Other packages**: Similar functionality in other libraries
- **Built-in solutions**: Native JavaScript/TypeScript alternatives

## 📊 Impact Assessment

- **Performance impact**: Will this affect performance?
- **Breaking changes**: Does this require breaking changes?
- **Backward compatibility**: Can this be added without breaking existing code?
- **Bundle size**: Will this increase the package size significantly?

## 🧪 Implementation Ideas

If you have ideas about implementation, share them:

- **Algorithm approach**: How might this be implemented?
- **Performance considerations**: Any performance optimizations?
- **Edge cases**: What edge cases should be considered?
- **Testing strategy**: How should this be tested?

## 📋 Checklist

- [ ] I have searched existing issues to avoid duplicates
- [ ] I have provided a clear description of the feature
- [ ] I have explained the use case and benefits
- [ ] I have provided concrete examples
- [ ] I have considered alternatives
- [ ] I have thought about implementation details
- [ ] I have considered the impact on existing functionality

## 🏷️ Labels

Please add appropriate labels to help categorize this request:
- `enhancement` - New feature request
- `high-priority` - Important feature for many users
- `low-priority` - Nice to have but not critical
- `breaking-change` - Requires breaking changes
- `performance` - Performance-related feature
- `api-design` - API design or interface changes

## 📈 Priority

How important is this feature to you?

- [ ] **Critical** - Blocking my project/work
- [ ] **High** - Important for my use case
- [ ] **Medium** - Would be nice to have
- [ ] **Low** - Minor improvement

## 🤝 Contributing

Are you interested in contributing to the implementation?

- [ ] Yes, I can help implement this feature
- [ ] Maybe, I can provide guidance and testing
- [ ] No, but I can provide feedback and testing
- [ ] No, I'm just requesting the feature

## 📝 Additional Context

Add any other context, screenshots, or examples about the feature request here. 