/**
 * Adds the triage label if the issue has no labels on it
 * @param {object} payload - event payload from github
 * @param {object} github - github interface
 * @returns {undefined}
 * @private
 */
const triage = ({ payload, github }) => {
    if (payload.issue.labels.length === 0) {
        github.issues.addLabels({
            owner: payload.repository.owner.login,
            repo: payload.repository.name,
            number: payload.issue.number,
            labels: ["triage"]
        });
    }
};

/**
 * Add triage label when an issue is opened or reopened
 */
module.exports = (robot) => {
    robot.on("issues.opened", triage);
    robot.on("issues.reopened", triage);
};
