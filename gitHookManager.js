const fs = require("fs");
const path = require("path");

function addPreCommitHook(directory) {
	try {
		const hookContent = `#!/bin/sh

commit_msg="$(cat $1)"
amended_message="I'm sorry: \$commit_message" > $1
`;

		const hooksDir = path.join(directory, ".git", "hooks");
		const preCommitPath = path.join(hooksDir, "prepare-commit-msg");

		// Check if the .git/hooks directory exists
		if (!fs.existsSync(hooksDir)) {
			console.error(".git/hooks directory not found. Make sure it is a Git repository.");
			return;
		}

		// Write the hook content to pre-commit file
		fs.writeFileSync(preCommitPath, hookContent, { mode: 0o755 }); // Make the file executable

		console.log("prepare-message-commit hook added successfully.");
	} catch (error) {
		console.error("An error occurred:", error.message);
	}
}

module.exports = addPreCommitHook;
