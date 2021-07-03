using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Doritos.Models;

namespace Doritos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {
        private readonly ToDoContext _context;

        public ToDoItemsController(ToDoContext context)
        {
            _context = context;
        }

        private static ToDoItemDTO ItemToDTO(ToDoItem todoItem) =>
            new ToDoItemDTO
            {
                Id = todoItem.Id,
                Name = todoItem.Name,
                IsComplete = todoItem.IsComplete
            };

        // GET: api/ToDoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItemDTO>>> GetToDoItems()
        {
            return await _context.ToDoItems
            .Select(x => ItemToDTO(x))
            .ToListAsync();
        }

        // GET: api/ToDoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItemDTO>> GetToDoItem(int id)
        {
            var toDoItem = await _context.ToDoItems.FindAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            return ItemToDTO(toDoItem);
        }

        // PUT: api/ToDoItems/5 (the 5 is the json item id number).
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, ToDoItemDTO todoItemDTO)
        {
            if (id != todoItemDTO.Id)
            {
                return BadRequest();
            }

            var todoItem = await _context.ToDoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Name = todoItemDTO.Name;
            todoItem.IsComplete = todoItemDTO.IsComplete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ToDoItemExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // Post == returns from client
        // POST: api/ToDoItems 
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // The preceding code is a HTTP POST method, as indicated by the [HttpPost] attribute.
        // The method gets the value of the to-do item from the body of the HTTP request.
        [HttpPost]
        public async Task<ActionResult<ToDoItemDTO>> CreateTodoItem(ToDoItemDTO todoItemDTO)
        {
            var todoItem = new ToDoItem
            {
                
                IsComplete = todoItemDTO.IsComplete,
                Name = todoItemDTO.Name
            };

            _context.ToDoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetToDoItem),
                new { id = todoItem.Id },
                ItemToDTO(todoItem)
            );
        }

        // DELETE: api/ToDoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.ToDoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoItemExists(int id)
        {
            return _context.ToDoItems.Any(e => e.Id == id);
        }

    }
}
