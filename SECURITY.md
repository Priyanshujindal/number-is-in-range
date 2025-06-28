# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.0.x   | :white_check_mark: |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report

If you discover a security vulnerability, please follow these steps:

1. **Do not create a public GitHub issue** for the vulnerability
2. **Email us directly** at security@yourdomain.com
3. **Include detailed information** about the vulnerability
4. **Provide proof of concept** if possible
5. **Allow time for response** before public disclosure

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Impact**: Potential impact of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Proof of concept**: Code or examples demonstrating the vulnerability
- **Suggested fix**: If you have ideas for fixing the issue
- **Timeline**: Your preferred disclosure timeline

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 1 week
- **Fix timeline**: Depends on severity and complexity
- **Public disclosure**: After fix is available

## Security Best Practices

### For Users

- **Keep updated**: Always use the latest version
- **Review code**: Audit the source code if needed
- **Report issues**: Report any security concerns
- **Monitor dependencies**: Keep dependencies updated

### For Contributors

- **Follow guidelines**: Adhere to security coding practices
- **Test thoroughly**: Ensure no security regressions
- **Review carefully**: Security-focused code reviews
- **Document changes**: Clear documentation of security fixes

## Security Features

### Input Validation

- **Type checking**: Validates input types
- **Range validation**: Ensures values are within expected ranges
- **Error handling**: Graceful handling of invalid inputs
- **Strict mode**: Optional strict validation

### Data Protection

- **No data collection**: Package doesn't collect user data
- **Local processing**: All operations performed locally
- **No external calls**: No network requests made
- **Memory safe**: Proper memory management

### Code Quality

- **Static analysis**: Regular security audits
- **Dependency scanning**: Automated vulnerability scanning
- **Code review**: Security-focused reviews
- **Testing**: Comprehensive security testing

## Known Vulnerabilities

### None Currently Known

As of the latest version, no security vulnerabilities are known.

### Previously Fixed

- **CVE-YYYY-XXXX**: Description of fixed vulnerability
  - **Fixed in**: Version X.Y.Z
  - **Impact**: Low/Medium/High
  - **Details**: Technical details

## Security Updates

### Automatic Updates

- **npm audit**: Regular dependency vulnerability scanning
- **Dependabot**: Automated security updates
- **GitHub Security**: Integrated security scanning

### Manual Updates

- **Security releases**: Prompt security patch releases
- **Version bumping**: Clear version numbering for security fixes
- **Changelog updates**: Detailed security change documentation

## Responsible Disclosure

### Timeline

1. **Discovery**: Vulnerability is discovered
2. **Reporting**: Vulnerability is reported privately
3. **Investigation**: Team investigates the issue
4. **Fix development**: Security fix is developed
5. **Testing**: Fix is thoroughly tested
6. **Release**: Fixed version is released
7. **Disclosure**: Public disclosure after fix

### Coordination

- **Private communication**: Initial reports kept private
- **Regular updates**: Status updates to reporters
- **Credit acknowledgment**: Proper credit to reporters
- **Coordinated disclosure**: Coordinated public disclosure

## Security Contacts

### Primary Contact

- **Email**: security@yourdomain.com
- **Response time**: Within 48 hours
- **Encryption**: PGP key available on request

### Alternative Contacts

- **GitHub Security**: Use GitHub's security features
- **Maintainer**: Direct contact with maintainers
- **Community**: Security-focused community channels

## Security Resources

### Documentation

- [Security Best Practices](https://github.com/yourusername/number-is-in-range/security)
- [Vulnerability Database](https://github.com/yourusername/number-is-in-range/security/advisories)
- [Security Changelog](https://github.com/yourusername/number-is-in-range/blob/main/SECURITY.md)

### Tools

- **npm audit**: `npm audit`
- **Snyk**: Automated vulnerability scanning
- **GitHub Security**: Integrated security features
- **CodeQL**: Static analysis for security

## Security Policy Updates

This security policy may be updated periodically. Significant changes will be announced through:

- **GitHub releases**: Release notes
- **Security advisories**: GitHub security advisories
- **Documentation updates**: Updated security documentation

## Acknowledgments

We thank the security researchers and community members who help keep this project secure through responsible disclosure and security contributions.

---

**Last updated**: January 15, 2024
**Next review**: April 15, 2024 