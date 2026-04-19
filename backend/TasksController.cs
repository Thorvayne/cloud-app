using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudBackend.Data;
using CloudBackend.Models;
using CloudBackend.DTOs;

namespace CloudBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskReadDto>>> GetTasks()
    {
        var tasks = await _context.Tasks
            .Select(task => new TaskReadDto
            {
                Id = task.Id,
                Name = task.Name,
                IsCompleted = task.IsCompleted
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskReadDto>> GetTask(int id)
    {
        var task = await _context.Tasks
            .Where(task => task.Id == id)
            .Select(task => new TaskReadDto
            {
                Id = task.Id,
                Name = task.Name,
                IsCompleted = task.IsCompleted
            })
            .FirstOrDefaultAsync();

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<CloudTask>> AddTask(CloudTask newTask)
    {
        if (string.IsNullOrWhiteSpace(newTask.Name))
        {
            return BadRequest("Pole Name jest wymagane.");
        }

        try
        {
            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTask);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd zapisu do bazy: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, CloudTask updatedTask)
    {
        if (string.IsNullOrWhiteSpace(updatedTask.Name))
        {
            return BadRequest("Pole Name jest wymagane.");
        }

        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        task.Name = updatedTask.Name;
        task.IsCompleted = updatedTask.IsCompleted;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}