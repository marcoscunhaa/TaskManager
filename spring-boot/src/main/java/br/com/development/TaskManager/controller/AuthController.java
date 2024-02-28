package br.com.development.TaskManager.controller;

import br.com.development.TaskManager.config.JwtProvider;
import br.com.development.TaskManager.model.User;
import br.com.development.TaskManager.repository.UserRepository;
import br.com.development.TaskManager.request.LoginRequest;
import br.com.development.TaskManager.response.AuthResponse;
import br.com.development.TaskManager.service.CustomeUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomeUserDetailsService customeUserDetailsService;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception{
        String email=user.getEmail();
        String password=user.getPassword();
        String fullName=user.getFullName();
        byte[] imageProfile=user.getImageProfile();

        User isExistEmail=userRepository.findByEmail(email);
        if(isExistEmail!=null){
            throw new EmailAlreadyUsedException("Email is already used with another account");
        }
        User createdUser=new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFullName(fullName);
        createdUser.setImageProfile(imageProfile);

        User savedUser=userRepository.save(createdUser);

        Authentication authentication=new UsernamePasswordAuthenticationToken(email, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse res=new AuthResponse();

        res.setJwt(token);
        res.setMessage("sign up success!!");

        return res;
    }

    @PostMapping("/signin")
    public AuthResponse signinHandler(@RequestBody LoginRequest loginRequest){
        String username=loginRequest.getEmail();
        String password=loginRequest.getPassword();

        Authentication authentication=authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse res=new AuthResponse();

        res.setJwt(token);
        res.setMessage("sign in success!!");

        return res;
    }

    @PostMapping
    private Authentication authenticate(String username, String password) {
        UserDetails userDetails=customeUserDetailsService.loadUserByUsername(username);
        if(userDetails==null){
            throw new BadCredentialsException("user not found!");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw  new BadCredentialsException("invalid password!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @ResponseStatus(value = HttpStatus.CONFLICT)
    public class EmailAlreadyUsedException extends RuntimeException {
        public EmailAlreadyUsedException(String message) {
            super(message);
        }
    }
}
