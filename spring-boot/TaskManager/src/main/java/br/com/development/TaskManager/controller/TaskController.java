package br.com.development.TaskManager.controller;

import br.com.development.TaskManager.model.Task;
import br.com.development.TaskManager.model.User;
import br.com.development.TaskManager.service.TaskService;
import br.com.development.TaskManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Task> getAllTasks() throws Exception{
        return taskService.findAllTask();
    }

    @PostMapping("/{assigned}")
    public Task createTask(@RequestBody Task task, @PathVariable String assigned) throws Exception {
        User user= userService.findUserByFullName(assigned);
        return taskService.createTask(task, user);
    }

    @PutMapping("/{taskId}/{assigned}")
    public Task updateTask(@RequestBody Task task, @PathVariable Long taskId, @PathVariable String assigned) throws Exception {
        User user=userService.findUserByFullName(assigned);
        return taskService.updateTask(task, taskId, user);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) throws Exception{
        taskService.deleteTask(taskId);
    }

    @GetMapping("/{taskId}")
    public void findTaskById(@PathVariable Long taskId) throws Exception{
        taskService.findTaskById(taskId);
    }
}
