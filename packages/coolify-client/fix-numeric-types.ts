#!/usr/bin/env node

import {
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from "fs";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Map of problematic type names to their fixed versions
const typeMap: Record<string, string> = {
  "400Response": "Http400Response",
  "401Response": "Http401Response",
  "404Response": "Http404Response",
  N400Response: "NHttp400Response",
  N401Response: "NHttp401Response",
  N404Response: "NHttp404Response",
};

// Map for fixing import/export paths
const fileMap: Record<string, string> = {
  "./400-response": "./http-400-response",
  "./401-response": "./http-401-response",
  "./404-response": "./http-404-response",
};

function fixTypeReferences(content: string): string {
  let fixed = content;

  // Fix export type declarations that start with numbers
  fixed = fixed.replace(/export type (\d+\w+)/g, (match, typeName: string) => {
    const newName = typeMap[typeName] || `Http${typeName}`;
    return `export type ${newName}`;
  });

  // Fix import type declarations that reference numeric types
  fixed = fixed.replace(
    /import type \{ (\d+\w+) \}/g,
    (match, typeName: string) => {
      const newName = typeMap[typeName] || `Http${typeName}`;
      return `import type { ${newName} }`;
    },
  );

  // Fix type alias assignments that reference numeric types
  fixed = fixed.replace(/= (\d+\w+);/g, (match, typeName: string) => {
    const newName = typeMap[typeName] || `Http${typeName}`;
    return `= ${newName};`;
  });

  // Fix file path references
  Object.entries(fileMap).forEach(([oldPath, newPath]) => {
    const regex = new RegExp(
      oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g",
    );
    fixed = fixed.replace(regex, newPath);
  });

  // Fix any other type references in the code with exact matches
  Object.entries(typeMap).forEach(([oldName, newName]) => {
    const regex = new RegExp(`\\b${oldName}\\b`, "g");
    fixed = fixed.replace(regex, newName);
  });

  return fixed;
}

function processFile(filePath: string): void {
  try {
    const content = readFileSync(filePath, "utf8");
    let fixed = fixTypeReferences(content);

    // Fix index.ts exports that reference renamed files
    if (basename(filePath) === "index.ts") {
      fixed = fixed.replace(
        /export \* from '\.\/(\d+)-response';/g,
        (match, number: string) => {
          return `export * from './http-${number}-response';`;
        },
      );
    }

    // Fix index.msw.gen.ts imports to use correct file extensions
    if (basename(filePath) === "index.msw.gen.ts") {
      fixed = fixed.replace(
        /from '(\.\/[^']+)\.msw'/g,
        (match, path: string) => {
          return `from '${path}.msw.gen'`;
        },
      );
    }

    // Fix N***Response type assignments - they all should point to different types
    if (filePath.includes("n401-response")) {
      fixed = fixed.replace(
        /export type NHttp400Response = Http401Response;/,
        "export type NHttp401Response = Http401Response;",
      );
    }
    if (filePath.includes("n404-response")) {
      fixed = fixed.replace(
        /export type NHttp400Response = Http404Response;/,
        "export type NHttp404Response = Http404Response;",
      );
    }

    if (content !== fixed) {
      writeFileSync(filePath, fixed, "utf8");
      console.log(`Fixed numeric types in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, (error as Error).message);
  }
}

function renameFiles(dir: string): void {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      renameFiles(filePath);
    } else if (file.endsWith(".ts")) {
      // Rename files that start with numbers
      if (/^\d/.test(file)) {
        const newFileName = `http-${file}`;
        const newFilePath = join(dir, newFileName);

        try {
          renameSync(filePath, newFilePath);
          console.log(`Renamed file: ${file} -> ${newFileName}`);

          // Process the renamed file
          processFile(newFilePath);
        } catch (error) {
          console.error(`Error renaming ${file}:`, (error as Error).message);
        }
      } else {
        // Process existing files
        processFile(filePath);
      }
    }
  });
}

// Start processing from the src directory
const srcDir = join(__dirname, "src");
if (existsSync(srcDir)) {
  console.log("Fixing numeric type names...");
  renameFiles(srcDir);
  console.log("Done fixing numeric types.");
} else {
  console.log("src directory not found, skipping numeric type fixes.");
}
