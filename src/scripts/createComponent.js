const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name.");
  process.exit(1);
}

const templatesDir = path.join(__dirname, "templates");
const componentDir = path.join(__dirname, "..", "components", componentName);

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir);
}

const templates = [
  {
    name: `${componentName}.component.js`,
    template: "Component.component.js.ejs",
  },
  {
    name: `${componentName}.module.css`,
    template: "module.css.ejs",
  },
];

templates.forEach((template) => {
  const filePath = path.join(componentDir, template.name);
  const templatePath = path.join(templatesDir, template.template);

  const fileContent = ejs.render(fs.readFileSync(templatePath, "utf8"), {
    componentName,
  });

  fs.writeFileSync(filePath, fileContent);
});

console.log(`Component "${componentName}" created successfully.`);
