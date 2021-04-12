package ru.kulinartem.restboot.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kulinartem.restboot.entity.User;

import java.util.List;

@Service
public interface UserService {

    public User getItemById(long id) throws Exception;

    public List<User> getAllItems();

    public void saveItem(User item);

    public void deleteItem(User item);

    public User getItemByEmail(String email);
}
