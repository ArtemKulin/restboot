package ru.kulinartem.restboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kulinartem.restboot.entity.Role;
import ru.kulinartem.restboot.entity.User;
import ru.kulinartem.restboot.service.RoleService;
import ru.kulinartem.restboot.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestContr {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RestContr(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {

        List<User> users = userService.getAllItems();

        if (users == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);

    }

    @GetMapping("/security")
    public ResponseEntity<User> showSecurityUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = null;
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }

        User user = userService.getItemByEmail(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> showUserByID (@PathVariable("id") long id) throws Exception {
        User user = userService.getItemById(id);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody  User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

//        String roleName = user.getRole().getRole();
//        Role role = roleService.findRoleByRole(roleName);
//
//        if (role == null) {
//           role = new Role(roleName);
//        }

//        user.setRole(role);
        this.userService.saveItem(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/users")
    public ResponseEntity<User> editUser (@RequestBody User user) {

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        this.userService.saveItem(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser (@PathVariable("id") long id) throws Exception {
        User user = userService.getItemById(id);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        this.userService.deleteItem(user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
