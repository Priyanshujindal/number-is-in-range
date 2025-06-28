# Contributing to number-is-in-range

Thank you for your interest in contributing to `number-is-in-range`! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Here are the main ways you can help:

### 🐛 Reporting Bugs

- Use the [GitHub Issues](https://github.com/yourusername/number-is-in-range/issues) page
- Include a clear description of the bug
- Provide steps to reproduce the issue
- Include your environment details (Node.js version, browser, etc.)
- Add code examples if possible

### 💡 Suggesting Features

- Use the [GitHub Issues](https://github.com/yourusername/number-is-in-range/issues) page
- Describe the feature and its use case
- Explain why this feature would be beneficial
- Provide examples of how it would be used

### 🔧 Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests**: `npm test`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 10.4.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/number-is-in-range.git
cd number-is-in-range

# Install dependencies
npm install

# Run tests
npm test
```

### Project Structure

```
number-is-in-range/
├── index.js          # Main implementation
├── index.d.ts        # TypeScript declarations
├── test.js           # Test suite
├── example.js        # Usage examples
├── README.md         # Documentation
├── package.json      # Package configuration
├── CHANGELOG.md      # Version history
├── CONTRIBUTING.md   # This file
└── LICENSE           # MIT License
```

## 📝 Coding Standards

### JavaScript/TypeScript

- Follow modern JavaScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Maintain backward compatibility
- Write self-documenting code

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes and constructors

### Testing

- Write tests for all new functionality
- Maintain 100% test coverage
- Test edge cases and error conditions
- Use descriptive test names
- Follow the existing test patterns

### Documentation

- Update README.md for new features
- Add examples for new functionality
- Update TypeScript declarations
- Keep CHANGELOG.md current

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure

- Unit tests for individual functions
- Integration tests for complex scenarios
- Edge case testing
- Performance testing for critical paths

### Test Guidelines

- Test both success and failure cases
- Test edge cases (null, undefined, NaN, etc.)
- Test with different data types (Number, BigInt)
- Test performance with large datasets
- Ensure tests are deterministic

## 📚 Documentation

### README Updates

- Add new features to the features list
- Include usage examples
- Update API documentation
- Add real-world use cases
- Keep installation instructions current

### TypeScript Declarations

- Update `index.d.ts` for new functions
- Add proper type annotations
- Include JSDoc comments
- Test type declarations

### Examples

- Add examples to `example.js`
- Include practical use cases
- Show different configuration options
- Demonstrate best practices

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure tests pass**: `npm test`
2. **Check code style**: Follow the coding standards
3. **Update documentation**: README, TypeScript declarations, examples
4. **Add to changelog**: Update CHANGELOG.md with your changes
5. **Test in different environments**: Node.js, browsers

### Pull Request Guidelines

- **Clear title**: Describe the change concisely
- **Detailed description**: Explain what and why
- **Reference issues**: Link to related issues
- **Include tests**: New functionality should have tests
- **Update documentation**: Keep docs in sync with code

### Review Process

- All PRs require review
- Address review comments promptly
- Maintain a constructive discussion
- Be open to feedback and suggestions

## 🏷️ Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a release tag
4. Publish to npm
5. Update documentation

## 🐛 Bug Reports

### What to Include

- **Clear description**: What happened vs. what was expected
- **Steps to reproduce**: Detailed steps to recreate the issue
- **Environment details**: Node.js version, OS, browser
- **Code examples**: Minimal code that reproduces the issue
- **Error messages**: Full error stack traces

### Example Bug Report

```markdown
## Bug Description
The `isInRange` method returns incorrect results for BigInt values.

## Steps to Reproduce
1. Install the package: `npm install number-is-in-range`
2. Run this code:
   ```javascript
   require('number-is-in-range');
   console.log((10n).isInRange(0n, 5n)); // Expected: false, Actual: true
   ```

## Environment
- Node.js: 16.14.0
- OS: macOS 12.1
- Package version: 2.0.0

## Expected Behavior
BigInt range checking should work correctly.

## Actual Behavior
BigInt values are not being compared properly.
```

## 💡 Feature Requests

### What to Include

- **Feature description**: What functionality you want
- **Use case**: Why this feature is needed
- **Proposed API**: How you envision it working
- **Examples**: Code examples of usage
- **Alternatives**: Other ways to achieve the same goal

### Example Feature Request

```markdown
## Feature Description
Add support for array-based range validation.

## Use Case
When validating multiple values against the same range, it would be convenient to pass an array.

## Proposed API
```javascript
[1, 5, 10, 15].isInRange(0, 20); // Returns array of booleans
```

## Examples
```javascript
const ages = [25, 30, 150, 5];
const validAges = ages.isInRange(0, 120); // [true, true, false, true]
```

## Alternatives
Currently users need to map over arrays manually.
```

## 🤝 Community Guidelines

### Be Respectful

- Treat all contributors with respect
- Be constructive in feedback
- Avoid personal attacks
- Focus on the code, not the person

### Be Helpful

- Answer questions when you can
- Provide constructive feedback
- Share knowledge and best practices
- Help newcomers get started

### Be Patient

- Maintainers are volunteers
- Response times may vary
- Complex issues take time to resolve
- Be understanding of constraints

## 📞 Getting Help

### Resources

- [GitHub Issues](https://github.com/yourusername/number-is-in-range/issues)
- [GitHub Discussions](https://github.com/yourusername/number-is-in-range/discussions)
- [Documentation](https://github.com/yourusername/number-is-in-range#readme)
- [Examples](https://github.com/yourusername/number-is-in-range/blob/main/example.js)

### Before Asking

- Check existing issues and discussions
- Read the documentation thoroughly
- Try the examples in the README
- Search for similar problems

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page
- Package.json contributors field

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to `number-is-in-range`! 🚀 