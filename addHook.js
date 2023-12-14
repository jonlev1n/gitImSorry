#!/usr/bin/env node

const path = require("path");
const addPreCommitHook = require("./gitHookManager");

// Get the current working directory
const currentDirectory = process.cwd();

// Resolve the package directory path
const packageDirectory = path.resolve(currentDirectory);

addPreCommitHook(packageDirectory);
