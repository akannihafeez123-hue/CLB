module.exports = {
    name: "AI Module 2",
    status: "idle",
    runTask: async function() {
        console.log("AI Module 2 running task...");
        this.status = "running";
        await new Promise(resolve => setTimeout(resolve, 4000));
        this.status = "idle";
        console.log("AI Module 2 task completed.");
        return "Task result from AI Module 2";
    }
}
