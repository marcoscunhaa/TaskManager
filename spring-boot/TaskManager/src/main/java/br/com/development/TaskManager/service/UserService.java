package br.com.development.TaskManager.service;

import br.com.development.TaskManager.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User findUserByJwt(String jwt) throws Exception;
}
