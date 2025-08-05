# Doodba Quick Deploy Task

## Purpose

Execute rapid deployment and testing of Odoo modules using Doodba framework for fast development cycles and immediate validation of brownfield enhancements.

## When to Use This Task

**Use this task when:**

- Need to quickly test newly developed or modified Odoo modules
- Validating brownfield enhancements in isolated environment
- Deploying changes to development or staging environments
- Troubleshooting module installation or upgrade issues
- Setting up rapid development iteration cycles

## Prerequisites

**Environment Requirements:**
- Doodba-based Odoo project structure
- Docker and Docker Compose installed
- Access to project invoke tasks (`tasks.py`)
- Proper database configuration
- Git repository with current changes

**Project Structure Expected:**
```
project_root/
├── docker-compose.yml
├── common.yaml  
├── tasks.py
├── odoo/
│   ├── custom/
│   │   └── src/
│   │       └── addons/
│   │           └── [your_modules]/
│   └── external/
└── .env files
```

## Quick Deploy Instructions

### 1. Pre-Deployment Validation

Validate environment and changes before deployment:

#### Environment Check
```bash
# Verify Doodba project structure
ls -la docker-compose.yml common.yaml tasks.py

# Check Docker services status
docker-compose ps

# Verify Git status for deployment
git status
```

#### Module Validation
```bash
# Check module structure (if applicable)
find odoo/custom/src/addons -name "__manifest__.py" -exec dirname {} \;

# Validate manifest files
grep -r "installable.*True" odoo/custom/src/addons/*/

# Check for syntax errors
python -m py_compile odoo/custom/src/addons/[module_name]/**/*.py
```

### 2. Environment Preparation

Prepare the Doodba environment for deployment:

#### Stop and Clean Environment
```bash
# Stop current services
invoke stop

# Clean up containers if needed (optional)
docker-compose down --volumes --remove-orphans

# Clean Docker system if needed (use with caution)
# docker system prune -f
```

#### Update Dependencies and Build
```bash
# Update git submodules and dependencies
invoke git-aggregate

# Build or rebuild images with latest changes
invoke img-build --pull

# Verify image build completed successfully
docker images | grep $(basename $(pwd))
```

### 3. Database Management

Manage database for deployment:

#### Database Selection Strategy

**For Development/Testing:**
```bash
# Option 1: Reset database completely (fastest for testing)
invoke resetdb

# Option 2: Create new database for testing
invoke resetdb --dbname=test_deployment
```

**For Brownfield Enhancement Testing:**
```bash
# Option 1: Use existing database with module update
# (Database should already exist with base data)

# Option 2: Create database from backup for testing
# invoke resetdb --backup-from=production_backup.sql
```

#### Database Initialization
```bash
# Start services with database initialization
invoke start

# Wait for services to be ready
sleep 30

# Verify database connectivity
invoke logs --tail=50 | grep -i "database\|ready"
```

### 4. Module Installation and Updates

Deploy and validate modules:

#### New Module Installation
```bash
# Install new module (CRITICAL: Always specify module name)
docker-compose run --rm odoo odoo -d [database_name] -i [module_name] --stop-after-init

# Verify installation
docker-compose run --rm odoo odoo -d [database_name] --list-addons | grep [module_name]
```

#### Existing Module Update
```bash
# Update existing module (CRITICAL: Always specify module name)
docker-compose run --rm odoo odoo -d [database_name] -u [module_name] --stop-after-init

# Smart update using click-odoo (recommended for complex updates)
docker-compose run --rm odoo click-odoo-update -d [database_name]
```

#### Multiple Module Operations
```bash
# Install multiple modules
docker-compose run --rm odoo odoo -d [database_name] -i [module1,module2,module3] --stop-after-init

# Update multiple modules
docker-compose run --rm odoo odoo -d [database_name] -u [module1,module2,module3] --stop-after-init
```

### 5. Validation and Testing

Validate deployment success:

#### Service Health Check
```bash
# Check service status
invoke logs --tail=100

# Verify Odoo is responding
curl -I http://localhost:8069/web/health

# Check database connectivity
docker-compose run --rm odoo click-odoo -d [database_name] --rollback -c "print('Database connection OK')"
```

#### Module Validation
```bash
# Verify module installation status
docker-compose run --rm odoo click-odoo -d [database_name] --rollback -c "
modules = env['ir.module.module'].search([('name', 'in', ['[module_name]'])])
for module in modules:
    print(f'{module.name}: {module.state}')
"

# Check for installation errors
invoke logs | grep -i "error\|exception\|traceback" | tail -20
```

#### Functional Testing
```bash
# Access web interface for manual testing
echo "Access Odoo at: http://localhost:8069"
echo "Database: [database_name]"
echo "Default admin login: admin/admin"

# Run automated tests if available
# docker-compose run --rm odoo odoo -d [database_name] --test-enable --stop-after-init
```

### 6. Development Iteration Support

Support rapid development cycles:

#### Quick Code Update Cycle
```bash
# For Python code changes (requires restart)
invoke restart

# For XML/view changes (may not require restart)
# Update module to reload views
docker-compose run --rm odoo odoo -d [database_name] -u [module_name] --stop-after-init
```

#### Debug and Development Tools
```bash
# Interactive Python shell with Odoo environment
docker-compose run --rm odoo click-odoo -d [database_name]

# Execute Python code in Odoo context
echo "
partner = env['res.partner'].search([('name', 'ilike', 'test')], limit=1)
print(f'Found partner: {partner.name}')
" | docker-compose run --rm odoo click-odoo -d [database_name] --rollback

# Access logs in real-time
invoke logs --follow
```

### 7. Troubleshooting Common Issues

Handle common deployment problems:

#### Module Installation Failures
```bash
# Check for missing dependencies
docker-compose run --rm odoo odoo -d [database_name] --list-addons | grep [dependency_name]

# Verify manifest file syntax
python -c "import ast; ast.parse(open('odoo/custom/src/addons/[module]//__manifest__.py').read())"

# Check for Python syntax errors
find odoo/custom/src/addons/[module] -name "*.py" -exec python -m py_compile {} \;
```

#### Database Connection Issues
```bash
# Check database status
invoke logs db

# Verify database exists
docker-compose run --rm odoo click-odoo --list-databases

# Reset database connection
invoke stop
invoke start
```

#### Performance Issues
```bash
# Check resource usage
docker stats

# Monitor database queries
invoke logs --follow | grep -i "sql\|query"

# Check for long-running processes
docker-compose run --rm odoo click-odoo -d [database_name] --rollback -c "
cr.execute('SELECT * FROM pg_stat_activity WHERE state = %s', ('active',))
print(cr.fetchall())
"
```

### 8. Post-Deployment Validation

Confirm successful deployment:

#### Deployment Checklist
- [ ] Services are running and healthy
- [ ] Database connectivity is working
- [ ] Target modules are installed/updated successfully
- [ ] No critical errors in logs
- [ ] Web interface is accessible
- [ ] Basic functionality testing completed
- [ ] Performance is acceptable

#### Documentation and Cleanup
```bash
# Document deployment for team
git log --oneline -5

# Tag successful deployment (optional)
git tag -a deployment-$(date +%Y%m%d-%H%M) -m "Deployment of [modules] to [environment]"

# Clean up unused Docker resources (optional)
docker system prune -f --volumes
```

## Quick Reference Commands

### Essential Doodba Commands
```bash
# Full environment reset and deploy
invoke stop && invoke git-aggregate && invoke img-build --pull && invoke resetdb && invoke start

# Quick module update
docker-compose run --rm odoo odoo -d [db] -u [module] --stop-after-init

# Service restart for code changes
invoke restart

# Real-time log monitoring
invoke logs --follow --tail=100

# Interactive Odoo shell
docker-compose run --rm odoo click-odoo -d [database_name]
```

### Emergency Commands
```bash
# Complete environment reset
invoke stop && docker-compose down --volumes && invoke start

# Database recovery
invoke resetdb --backup-from=[backup_file]

# Module uninstall (use with caution)
docker-compose run --rm odoo odoo -d [db] --uninstall [module] --stop-after-init
```

## Success Criteria

The quick deployment is successful when:

1. All Docker services are running and healthy
2. Database connectivity is established and working
3. Target modules are installed/updated without errors
4. Web interface is accessible and responsive
5. Basic functionality testing passes
6. No critical errors in application logs
7. System performance is acceptable
8. Rollback procedure is documented and available

## Important Notes

- **Always specify module names** in installation/update commands
- **Monitor logs** during deployment for early error detection
- **Test in isolated environment** before deploying to production
- **Keep backups** of working database states
- **Document changes** for team coordination and troubleshooting
- **Use invoke commands** whenever possible for consistency
- **Validate module structure** before deployment

Remember: Quick deployment is about speed and safety. Follow the established patterns and always validate the deployment before considering it complete.