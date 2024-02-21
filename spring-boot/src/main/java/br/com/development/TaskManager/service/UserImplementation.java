package br.com.development.TaskManager.service;

import br.com.development.TaskManager.config.JwtProvider;
import br.com.development.TaskManager.model.User;
import br.com.development.TaskManager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserImplementation implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception{
        String email=jwtProvider.getEmailFromJwtToken(jwt);
        if(email==null){
            throw new Exception("provide valid jwt token");
        }
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("user not found with email "+email);
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new Exception("user not found with id "+userId);
        }
        return user.get();
    }
}
