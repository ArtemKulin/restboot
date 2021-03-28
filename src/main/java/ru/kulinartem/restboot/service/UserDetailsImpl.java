package ru.kulinartem.restboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service ("UserDetailsImpl")
public class UserDetailsImpl implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public UserDetailsImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email)  {
        return userService.getItemByEmail(email);
    }
}
