package ru.kulinartem.restboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kulinartem.restboot.entity.Role;
import ru.kulinartem.restboot.entity.User;
import ru.kulinartem.restboot.service.RoleService;
import ru.kulinartem.restboot.service.UserService;


import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class Admins {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public Admins(@Qualifier("UserServiceImpl") UserService userService, @Qualifier("RoleServiceImpl") RoleService roleService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping("/users")
    public String showAllUsersPage(@ModelAttribute("newUser") User newUser, Model model, Principal principal) {
        String name = principal.getName();
        User user = userService.getItemByEmail(name);
        model.addAttribute("currentUser", user);
        model.addAttribute("users", userService.getAllItems());
        model.addAttribute("roles", roleService.getAllItems());
        return "admin/users";
    }

    @PostMapping("/users")
    public String createNewUserPage(@ModelAttribute("newUser") User newUser) {
        userService.saveItem(newUser);
        return "redirect:/admin/users";
    }

    @PatchMapping("/edit/{id}")
    public String editModalPage(@PathVariable("id") long id,
                            @RequestParam("editEmail") String email,
                            @RequestParam("editPassword") String password,
                            @RequestParam(value = "editRole") Role role,
                            @RequestParam("editName") String name,
                            @RequestParam("editLastName") String lastname,
                            @RequestParam("editAge") int age) throws Exception {
        User user = new User(name, lastname, age, email, password, role);
        userService.updateItem(user, id);
        return "redirect:/admin/users";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteModalPage(@PathVariable("id") long id) throws Exception {
        User deletedUser = userService.getItemById(id);
        userService.deleteItem(deletedUser);
        return "redirect:/admin/users";
    }

    @GetMapping("/user/{id}")
    public String showCurrentUserPage(@PathVariable("id") long id, Model model) throws Exception {
        model.addAttribute("user", userService.getItemById(id));
        return "/admin/user";
    }

    @GetMapping("/test")
    public String showTest() {
        return "/admin/test";
    }
}
