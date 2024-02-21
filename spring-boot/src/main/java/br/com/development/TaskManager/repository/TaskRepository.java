package br.com.development.TaskManager.repository;

import br.com.development.TaskManager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
