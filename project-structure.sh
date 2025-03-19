# Create the project root directory
mkdir -p vendor-vault
cd vendor-vault

# Initialize Git repository
git init

# Create base project structure
mkdir -p server/src/{controllers,models,routes,middleware,services,utils,config}
mkdir -p server/tests/{unit,integration}
mkdir -p client/src/{components,hooks,pages,services,store,utils,assets}
mkdir -p client/public
mkdir -p .github/workflows
mkdir -p docs

# Create necessary config files
touch .gitignore
touch server/.env.example
touch server/.env
touch client/.env.example
touch client/.env

# Create documentation files
touch README.md
touch CONTRIBUTING.md
touch ROADMAP.md
touch LICENSE
touch CODE_OF_CONDUCT.md

# Initialize npm packages
cd server
npm init -y
cd ../client
npm init -y
cd ..

# Add the GitHub Actions workflow file
touch .github/workflows/main.yml

# Initial commit
git add .
git commit -m "Initial project structure"
