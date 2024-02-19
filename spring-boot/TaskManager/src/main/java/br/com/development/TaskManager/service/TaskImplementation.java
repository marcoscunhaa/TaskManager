package br.com.development.TaskManager.service;

import br.com.development.TaskManager.model.Task;
import br.com.development.TaskManager.model.User;
import br.com.development.TaskManager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskImplementation implements TaskService{
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> findAllTask() {
        return taskRepository.findAll();
    }
    @Override
    public Task findTaskById(Long id) throws Exception {
        Optional<Task> opt = taskRepository.findById(id);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new Exception("task not found with id: "+id);
    }

    @Override
    public Task createTask(Task task, User user) {
        Task createTask = new Task();
        createTask.setTitle(task.getTitle());
        createTask.setPriority(task.getPriority());
        createTask.setStatus(task.getStatus());
        createTask.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        createTask.setAssignedUser(user);
        return taskRepository.save(createTask);
    }
    @Override
    public Task updateTask(Task task, Long id) throws Exception {
        Task oldTask = findTaskById(id);

        if(task.getAssignedUser() !=null){
            oldTask.setAssignedUser(task.getAssignedUser());
        }
        if(task.getTitle() !=null){
            oldTask.setTitle(task.getTitle());
        }
        if(task.getPriority() != null){
            oldTask.setPriority(task.getPriority());
        }
        if(task.getStatus() !=null){
            oldTask.setStatus(task.getStatus());
        }
        oldTask.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        return taskRepository.save(oldTask);
    }

    @Override
    public void deleteTask(Long id) throws Exception {
        findTaskById(id);
        taskRepository.deleteById(id);
    }

}
