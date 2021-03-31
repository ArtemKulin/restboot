package ru.kulinartem.restboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kulinartem.restboot.entity.User;
import ru.kulinartem.restboot.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestContr {

    private final UserService userService;

    @Autowired
    public RestContr(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> showListUsers() {
        return userService.getAllItems();
    }

    @GetMapping("/security")
    public String currentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = null;
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }
        return username;
    }
}
