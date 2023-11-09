const { createUserTable } = require("./Users.model");
const { createPerformanceTable } = require("./Performances.model");
const { createActivitiesTable } = require("./Activities.model");

const createTables = async () => {
    await createUserTable();
    await createActivitiesTable();
    await createPerformanceTable();
}

module.exports = { createTables }