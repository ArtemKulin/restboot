package ru.kulinartem.restboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kulinartem.restboot.service.UserService;


@Controller
@RequestMapping("/user")
public class Users {

    private final UserService userService;

    @Autowired
    public Users(@Qualifier("UserServiceImpl") UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public String showUser(@PathVariable("id") long id, Model model) throws Exception {
        model.addAttribute("user", userService.getItemById(id));
        return "/user/user";
    }
}
