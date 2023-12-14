const fs = require("fs");
const path = require("path");

function addPreCommitHook(directory) {
	try {
		const hookContent = `#!/bin/sh

last_commit_message=$(git log --format=%B -n 1)
amended_message="I'm sorry: \$last_commit_message"
git commit --amend -m "\$amended_message"
`;

		const hooksDir = path.join(directory, ".git", "hooks");
		const preCommitPath = path.join(hooksDir, "pre-commit");

		// Check if the .git/hooks directory exists
		if (!fs.existsSync(hooksDir)) {
			console.error(".git/hooks directory not found. Make sure it is a Git repository.");
			return;
		}

		// Write the hook content to pre-commit file
		fs.writeFileSync(preCommitPath, hookContent, { mode: 0o755 }); // Make the file executable

		console.log("Pre-commit hook added successfully.");
	} catch (error) {
		console.error("An error occurred:", error.message);
	}
}

module.exports = addPreCommitHook;
