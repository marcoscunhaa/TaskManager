package br.com.development.TaskManager.controller;

import br.com.development.TaskManager.model.User;
import br.com.development.TaskManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public User findUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        return userService.findUserByJwt(jwt);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
