package br.com.development.TaskManager.service;

import br.com.development.TaskManager.model.Task;
import br.com.development.TaskManager.model.User;

import java.util.List;

public interface TaskService {
    public Task findTaskById(Long id) throws Exception;
    public List<Task> findAllTask();
    public Task createTask(Task task, User user) throws Exception;
    public Task updateTask(Task task, Long id) throws Exception;
    public void deleteTask(Long id) throws Exception;
}
