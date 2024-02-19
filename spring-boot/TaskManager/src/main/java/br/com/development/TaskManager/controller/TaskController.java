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

    @PostMapping()
    public Task createTask(@RequestBody Task task, @RequestHeader("Authorization") String jwt) throws Exception {
        User user= userService.findUserByJwt(jwt);
        return taskService.createTask(task, user);
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@RequestBody Task task, @PathVariable Long taskId) throws Exception {
        return taskService.updateTask(task, taskId);
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
