const fs = require("fs");
const path = require("path");

function addCommitMessageHook(directory) {
	try {
		const hookContent = `#!/bin/sh

FILE_CONTENT="$(cat $1)"
echo "I'm sorry: $FILE_CONTENT" > $1
`;

		const hooksDir = path.join(directory, ".git", "hooks");
		const hookPath = path.join(hooksDir, "prepare-commit-msg");

		// Check if the .git/hooks directory exists
		if (!fs.existsSync(hooksDir)) {
			console.error(".git/hooks directory not found. Make sure it is a Git repository.");
			return;
		}

		// Write the hook content to pre-commit file
		fs.writeFileSync(hookPath, hookContent, { mode: 0o755 }); // Make the file executable

		console.log("prepare-message-commit hook added successfully.");
	} catch (error) {
		console.error("An error occurred:", error.message);
	}
}

module.exports = addCommitMessageHook;
