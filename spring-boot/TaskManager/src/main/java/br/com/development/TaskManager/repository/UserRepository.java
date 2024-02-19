package br.com.development.TaskManager.repository;

import br.com.development.TaskManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByEmail(String email);
    public User findByPassword(String password);
}
