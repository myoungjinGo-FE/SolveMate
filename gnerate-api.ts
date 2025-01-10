import axios from "axios";
import * as fs from "fs/promises";
import path from "path";

const BASE_DIR = process.cwd();
const API_DIR = path.join(BASE_DIR, "src/lib/api");
const TYPES_DIR = path.join(BASE_DIR, "src/lib/types");

// Convert OpenAPI/Swagger types to TypeScript types
const convertType = (schema: any): string => {
  if (!schema) return "any";

  if (schema.$ref) {
    return schema.$ref.split("/").pop();
  }

  const typeMapping: Record<string, string> = {
    integer: "number",
    string: "string",
    boolean: "boolean",
    number: "number",
  };

  if (schema.type === "array") {
    const itemType = convertType(schema.items);
    return `${itemType}[]`;
  }

  if (schema.type === "object") {
    const properties = Object.entries(schema.properties || {})
      .map(([key, prop]: [string, any]) => {
        const isRequired = (schema.required || []).includes(key);
        const typeStr = convertType(prop);
        return `  ${key}${isRequired ? "" : "?"}: ${typeStr};`;
      })
      .join("\n");
    return `{\n${properties}\n}`;
  }

  return typeMapping[schema.type] || "any";
};

// Generate type definitions
const generateTypes = (definitions: any) => {
  let typeContent = "";

  Object.entries(definitions).forEach(([name, schema]: [string, any]) => {
    const typeDefinition = convertType(schema);
    typeContent += `export interface ${name} ${typeDefinition}\n\n`;
  });

  return typeContent;
};

// Generate API methods
const generateApiMethods = (paths: any, tag: string) => {
  let apiContent = `import { apiClient } from "./client";\n`;
  const imports = new Set<string>();
  const methods: string[] = [];

  Object.entries(paths).forEach(([path, operations]: [string, any]) => {
    Object.entries(operations).forEach(([method, operation]: [string, any]) => {
      if (operation.tags?.[0] !== tag) return;

      const operationId = operation.operationId.replace(`${tag}_`, "");
      const responseType =
        operation.responses["200"]?.schema?.$ref?.split("/").pop() || "any";

      if (responseType !== "any") {
        imports.add(responseType);
      }

      // Handle request body if present
      let requestType = "";
      if (operation.parameters?.some((p: any) => p.in === "body")) {
        const bodyParam = operation.parameters.find(
          (p: any) => p.in === "body"
        );
        requestType = bodyParam.schema.$ref?.split("/").pop() || "any";
        if (requestType !== "any") {
          imports.add(requestType);
        }
      }

      // Generate method
      let methodContent = `  ${operationId}: async (`;

      // Add parameters
      const params: string[] = [];
      operation.parameters?.forEach((param: any) => {
        if (param.in === "path") {
          params.push(`${param.name}: ${convertType(param.schema)}`);
        }
      });

      if (requestType) {
        params.push(`data: ${requestType}`);
      }

      methodContent += params.join(", ");
      methodContent += `): Promise<${responseType}> => {\n`;

      // Generate request
      const url = path.replace(/{([^}]+)}/g, "${$1}");
      methodContent += `    const response = await apiClient.${method}<${responseType}>(\`${url}\``;
      if (requestType) {
        methodContent += `, data`;
      }
      methodContent += `);\n    return response.data;\n  }`;

      methods.push(methodContent);
    });
  });

  // Add imports
  if (imports.size > 0) {
    apiContent += `import { ${Array.from(imports).join(
      ", "
    )} } from "../types/${tag.toLowerCase()}";\n\n`;
  }

  // Add methods
  apiContent += `export const ${tag.toLowerCase()}API = {\n${methods.join(
    ",\n\n"
  )}\n};\n`;

  return apiContent;
};

// Main generation function
const generateFiles = async () => {
  try {
    // Read Swagger JSON
    const swaggerContent = await fs.readFile("./swagger.json", "utf-8");
    const swagger = JSON.parse(swaggerContent);

    // Create directories if they don't exist
    await fs.mkdir(API_DIR, { recursive: true });
    await fs.mkdir(TYPES_DIR, { recursive: true });

    // Generate files for each tag
    const tags = new Set(
      Object.values(swagger.paths).flatMap((operations: any) =>
        Object.values(operations)
          .map((operation: any) => operation.tags?.[0])
          .filter(Boolean)
      )
    );

    for (const tag of tags) {
      // Generate types
      const typeContent = generateTypes(swagger.definitions);
      await fs.writeFile(
        path.join(TYPES_DIR, `${tag.toLowerCase()}.ts`),
        typeContent
      );

      // Generate API
      const apiContent = generateApiMethods(swagger.paths, tag);
      await fs.writeFile(
        path.join(API_DIR, `${tag.toLowerCase()}.ts`),
        apiContent
      );
    }

    console.log("API and type files generated successfully!");
  } catch (error) {
    console.error("Error generating files:", error);
    process.exit(1);
  }
};

generateFiles();
