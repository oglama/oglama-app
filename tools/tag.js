/**
 * Make sure the Git tag corresponding to the current app version exists
 *
 * @architect Mark Jivko <mark@oglama.com>
 * @copyright © Oglama https://oglama.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const { version } = require("../package.json");
const spawn = require("cross-spawn");
const path = require("path");

// Fetch git tag
const tag = `v${version}`;
const tagRes = spawn.sync("git", ["tag", "-l", tag], { cwd: path.dirname(__dirname) });

// Git error
if (0 !== tagRes.status) {
    console.error(tagRes.error);
    process.exit(1);
}

// Tag found
if (tag === tagRes.stdout.toString().trim()) {
    console.log(`  • Tag ${tag} found`);
    process.exit();
}

// Create tag and push it
spawn.sync("git", ["tag", tag], { cwd: path.dirname(__dirname), stdio: "inherit" });
spawn.sync("git", ["push", "origin", tag], { cwd: path.dirname(__dirname), stdio: "inherit" });
