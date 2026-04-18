using CloudBackend.Models;

namespace CloudTasks.Tests;

public class UnitTest1
{
    [Fact]
    public void NewTask_ShouldNotBeCompleted()
    {
        // Arrange
        var task = new CloudTask
        {
            Name = "Przetestować bezpiecznik"
        };

        // Assert
        Assert.False(task.IsCompleted);
    }
}