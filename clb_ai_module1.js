// AI Module 1 - independent, no circular imports
module.exports = {
    name: "AI Module 1",
    status: "idle",

    runTask: async function() {
        console.log("AI Module 1 running task...");
        this.status = "running";

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        this.status = "idle";
        console.log("AI Module 1 task completed.");
        return "Task result from AI Module 1";
    }
}
